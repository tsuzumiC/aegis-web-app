import { IShowModalPayload } from "../models/ModalMangerModels";

export const makeCallId = (payload: IShowModalPayload) => {
    if (payload.customList) {
        if (payload.id) {
            return `${payload.customList.path}_${payload.id}`;
        } else {
            return payload.customList.path;
        }
    }

    if (payload.id) {
        return `${payload.type}_${payload.id}`;
    }

    if (payload.modalFor) {
        return `${payload.type}_${payload.modalFor.type}_${payload.modalFor.id}`;
    }

    return payload.type;
};
