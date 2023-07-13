import { arrayMoveTo } from "components/utility/arrayUtils";
import { IModalManagerState } from "../ModalManager";

const checkIfDuplicate = (
    state: IModalManagerState,
    id: string
): IModalManagerState | undefined => {
    if (state.order && state.order.find((x) => x === id)) {
        if (state.activeModal === id) {
            return state;
        } else {
            const newOrder = arrayMoveTo(
                state.order,
                state.order.findIndex((x) => x === id),
                state.order.length - 1
            );

            return {
                ...state,
                order: newOrder,
                activeModal: newOrder[newOrder.length - 1],
            };
        }
    } else {
        return undefined;
    }
};

export default checkIfDuplicate;
