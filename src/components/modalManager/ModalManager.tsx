import { createContext, useEffect, useState } from "react";
import {
    ICloseModalPayload,
    IIdModalHaveChanges,
    IIdModalListItems,
    IModalHaveChangesPayload,
    IModalListItem,
    IShowModalPayload,
    IUpdateModalPayload,
    ModalTypes,
    TModalTypes,
} from "./models/ModalMangerModels";
import { useLocation, useNavigate } from "react-router-dom";
import {
    getModalParams,
    makeModalParams,
} from "./utility/ModalManagerSearchParams";
import { makeCallId } from "./utility/ModalCallId";
import checkIfDuplicate from "./utility/CheckIfDuplicate";
import ModalManagerChangeNavBlocker from "./components/ModalManagerChangeNavBlocker";
import ModalRenderer from "./components/ModalRenderer";

export interface IModalManagerState {
    readonly modalList: IIdModalListItems;
    readonly initialCaller?: string;
    readonly order: string[];
    readonly activeModal?: string;
    readonly haveChangesList: IIdModalHaveChanges;
    readonly isModalOpen: boolean;
    readonly modalTypes: Record<string, TModalTypes>;
    readonly navigateAfterClose?: string;
}

export interface IModalManagerContext {
    readonly state: IModalManagerState;
    onShowModal: (payload: IShowModalPayload) => void;
    onCloseModal: (payload: ICloseModalPayload) => void;

    resetInitialState: () => void;
    onModalHaveChanges: (payload: IModalHaveChangesPayload) => void;
    onUpdateModal: (payload: IUpdateModalPayload) => void;
}

const initialState: IModalManagerState = {
    modalList: {},
    initialCaller: undefined,
    order: [],
    activeModal: undefined,
    haveChangesList: {},
    isModalOpen: false,
    modalTypes: ModalTypes,
    navigateAfterClose: undefined,
};

export const ModalManagerContext = createContext<IModalManagerContext>(
    {} as IModalManagerContext
);

const ModalManager: React.FC<React.PropsWithChildren> = (props) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [state, setState] = useState(initialState);
    const {
        modalList,
        order,
        activeModal: topId,
        haveChangesList,
        initialCaller,
        modalTypes,
        navigateAfterClose,
    } = state;

    useEffect(() => {
        if (initialCaller) {
            const { type, id, options, modalFor } = getModalParams(
                location.search
            );

            if (order.length > 0 && modalList && topId) {
                const modal = modalList[topId];

                if (
                    type === undefined ||
                    modal.type !== type ||
                    modal.id !== id ||
                    modal.modalFor !== modalFor ||
                    JSON.stringify(modal.options) !== JSON.stringify(options)
                ) {
                    const address = initialCaller + makeModalParams(modal);

                    navigate(address);
                }
            } else {
                navigate(navigateAfterClose ?? initialCaller);

                resetInitialState();
            }
        }
    }, [order, navigateAfterClose]);

    useEffect(() => {
        const { type, id, options, modalFor } = getModalParams(location.search);

        if (order.length > 0) {
            if (type) {
                const index = order.indexOf(
                    makeCallId({ type, id, modalFor } as IShowModalPayload)
                );

                if (index !== -1 && index !== order.length - 1) {
                    const [first, ...rest] = order.slice(index + 1);

                    const payload: ICloseModalPayload = {
                        callId: first,
                        extraById: rest,
                    };

                    onCloseModal(payload);
                } else if (index === -1) {
                    let payload: IShowModalPayload = {
                        id,
                        modalFor,
                        callerAddress: location.pathname,
                        type: modalTypes[type],
                        options,
                    };

                    if (payload.type) {
                        onShowModal(payload);
                    }
                }
            } else if (location.pathname === initialCaller) {
                const [first, ...rest] = order;

                const payload: ICloseModalPayload = {
                    callId: first,
                    extraById: rest,
                };

                onCloseModal(payload);
            }
        } else if (type) {
            let payload: IShowModalPayload = {
                id,
                modalFor,
                callerAddress: location.pathname,
                type: modalTypes[type],
                options,
            };

            if (payload.type) {
                onShowModal(payload);
            }
        }
    }, [location, modalTypes]);

    const resetInitialState = () => {
        setState((prev) => ({
            ...prev,
            modalList: {},
            initialCaller: undefined,
            order: [],
            activeModal: undefined,
            haveChangesList: {},
            isModalOpen: false,
            navigateAfterClose: undefined,
        }));
    };

    const onCloseModal = (payload: ICloseModalPayload) => {
        setState((prev) => {
            let ids = [payload.callId];

            if (payload.extraById) {
                ids = ids.concat(payload.extraById);
            }
            const { modals, changes } = ids.reduce(
                (map, cur) => {
                    const { [cur]: v1, ...modals } = map.modals;
                    const { [cur]: v2, ...changes } = map.changes;
                    return { modals, changes };
                },
                {
                    modals: prev.modalList,
                    changes: prev.haveChangesList,
                }
            );

            const newOrder = prev.order.filter((x) => !ids.includes(x));

            return {
                ...prev,
                modalList: modals,
                order: newOrder,
                activeModal:
                    newOrder.length !== 0
                        ? newOrder[newOrder.length - 1]
                        : undefined,
                haveChangesList: changes,
                navigateAfterClose: payload.navigateTo,
            };
        });
    };

    const handleOnCloseModal = async (payload: ICloseModalPayload) => {
        onCloseModal(payload);
        /*  if (payload.onSave) {
            onCloseModal(payload);
        } else if (haveChangesList && haveChangesList[payload.callId]) {
            const args: IShowConfirmArgs = {
                message: t(k.THERE_ARE_UNSAVED_CHANGES),
            };

            if (await showConfirmNoThunk(dispatch, args)) {
                onCloseModal(payload);
            }
        } else {
            onCloseModal(payload);
        } */
    };

    const handleOnBackgroundClick = () => {
        if (topId) {
            handleOnCloseModal({ callId: topId });
        }
    };

    const handleOnHaveChanges = (payload: IModalHaveChangesPayload) => {
        if (
            haveChangesList &&
            haveChangesList[payload.callId] !== payload.haveChanges
        ) {
            onModalHaveChanges(payload);
        }
    };

    const onShowModal = (payload: IShowModalPayload) => {
        const callId = makeCallId(payload);

        const newModal: IModalListItem = {
            ...payload,
            callId,
        };

        setState(
            (prev) =>
                checkIfDuplicate(prev, callId) ?? {
                    ...prev,
                    modalList: {
                        ...prev.modalList,
                        [callId]: newModal,
                    },
                    order: prev.order ? prev.order.concat(callId) : [callId],
                    activeModal: callId,
                    haveChangesList: {
                        ...prev.haveChangesList,
                        [callId]: false,
                    },
                    initialCaller:
                        prev.initialCaller === undefined
                            ? payload.callerAddress
                            : prev.initialCaller,
                    isModalOpen: true,
                }
        );
    };

    const onModalHaveChanges = (payload: IModalHaveChangesPayload) => {
        setState((prev) => ({
            ...prev,
            haveChangesList: {
                ...prev.haveChangesList,
                [payload.callId]: payload.haveChanges,
            },
        }));
    };

    const handleOnUpdateModal = async (payload: IUpdateModalPayload) => {
        if (payload.callId) {
            onUpdateModal(payload);
            /* if (state.haveChangesList[payload.callId] && !payload.onSave) {
                const args: IShowConfirmArgs = {
                    message: t(k.THERE_ARE_UNSAVED_CHANGES),
                };

                if (await showConfirmNoThunk(dispatch, args)) {
                    onUpdateModal(payload);
                }
            } else {
                onUpdateModal(payload);
            } */
        }
    };

    const onUpdateModal = (payload: IUpdateModalPayload) => {
        if (payload.callId) {
            const { callId, newId, newType, newOptions } = payload;

            setState((prev) => {
                const { [callId]: value, ...modals } = prev.modalList;

                const newCallId = `${newType}_${newId}`;

                const newModal: IModalListItem = {
                    type: newType,
                    callId: newCallId,
                    id: newId,
                    options: newOptions,
                };

                return {
                    ...prev,
                    modalList: { ...modals, [newCallId]: newModal },
                    order: prev.order.map((x) =>
                        x === callId ? newCallId : x
                    ),
                    activeModal: newCallId,
                };
            });
        }
    };

    return (
        <ModalManagerContext.Provider
            value={{
                state,
                onShowModal,
                onCloseModal: handleOnCloseModal,

                resetInitialState,
                onModalHaveChanges: handleOnHaveChanges,
                onUpdateModal: handleOnUpdateModal,
            }}
        >
            <ModalManagerChangeNavBlocker haveChangesList={haveChangesList} />
            <ModalRenderer
                onBackgroundClick={handleOnBackgroundClick}
                modalList={modalList}
                order={order}
            />
            {props.children}
        </ModalManagerContext.Provider>
    );
};

export default ModalManager;
