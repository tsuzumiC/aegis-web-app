import { PropsWithRef } from "react";
import {
    IModalListItem,
    ModalTypes,
    TModalListTypes,
    TModalTypes,
} from "../models/ModalMangerModels";
import CharacterModal from "./modals/CharacterModal";

interface IProps<T extends TModalTypes> {
    modalItem: IModalListItem<T>;
}

export const ModalByType = <T extends TModalTypes>(
    props: PropsWithRef<IProps<T>>
) => {
    let modalComponent: any;

    switch (props.modalItem.type) {
        case ModalTypes.character:
            modalComponent = <CharacterModal {...props} />;
            break;

        default:
            modalComponent = <div>"NOT_FOUND"</div>;
    }

    return modalComponent;
};
