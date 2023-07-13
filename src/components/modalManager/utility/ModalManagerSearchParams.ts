import {
    IModalFor,
    IModalListItem,
    IModalOptions,
    ModalTypes,
    TModalListTypes,
    TModalTypes,
} from "../models/ModalMangerModels";
import {
    ModalOptionsObjectify,
    ModalOptionsStringify,
} from "./ModalOptionsUtils";

export const getModalParams = (search: string) => {
    const query = new URLSearchParams(search);

    const stringType = query.get("modal") ?? undefined;

    let type: TModalTypes | undefined = undefined;
    if (stringType) {
        type = getModalType(stringType);
    }

    const stringId = query.get("id") ?? undefined;

    let id: TModalListTypes[TModalTypes] | undefined = undefined;
    if (type && stringId) {
        id = getModalId(stringId, type);
    }

    const modalFor = parseModalFor(query.get("for") ?? undefined);

    const getOptions = query.get("options");
    const options: IModalOptions | undefined = getOptions
        ? ModalOptionsObjectify(getOptions)
        : undefined;

    return { type, id, options, modalFor };
};

export const makeModalParams = (modalItem: IModalListItem) => {
    const { type: modalType, id, modalFor, options, customList } = modalItem;
    let result = `?modal=${customList ? customList.path : modalType}`;

    if (id) {
        result += `&id=${id}`;
    }

    if (modalFor) {
        result += `&for=${modalFor.type},${modalFor.id}`;
    }

    if (options) {
        result += "&options=" + ModalOptionsStringify(options);
    }

    return result;
};

const parseModalFor = (modalFor?: string): IModalFor | undefined => {
    if (modalFor) {
        const [stringType, stringId] = modalFor.split(",");

        let type: TModalTypes | undefined = undefined;
        if (stringType) {
            type = getModalType(stringType);
        }

        let id: TModalListTypes[TModalTypes] | undefined = undefined;
        if (type && stringId) {
            id = getModalId(stringId, type);
        }

        return type && id ? { type, id } : undefined;
    }
};

const getModalType = (type: string): TModalTypes | undefined => {
    return ModalTypes[type as TModalTypes];
};

const getModalId = (
    id: string,
    type: TModalTypes
): TModalListTypes[TModalTypes] | undefined => {
    return id as TModalListTypes[TModalTypes];
};
