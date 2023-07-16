import "./CharacterModal.scss";

import Character from "components/character/Character";
import { ModalManagerContext } from "components/modalManager/ModalManager";
import {
    IModalListItem,
    TModalListTypes,
} from "components/modalManager/models/ModalMangerModels";
import { getImage } from "components/utility/images";

import CharacterList from "content/characters/list/CharacterList";
import { PropsWithRef, useContext } from "react";

interface IProps<T extends keyof TModalListTypes> {
    modalItem: IModalListItem<T>;
}

const CharacterModal = <T extends keyof TModalListTypes>(
    props: PropsWithRef<IProps<T>>
) => {
    const {
        modalItem: { callId, id, options },
    } = props;

    const modalManagerContext = useContext(ModalManagerContext);

    const character = id ? CharacterList[id] : undefined;

    const handleOnClose = (onSave?: boolean) => {
        modalManagerContext.onCloseModal({ callId, onSave });
    };

    const handleOnHaveChanges = (haveChanges: boolean) => {
        modalManagerContext.onModalHaveChanges({ callId, haveChanges });
    };

    if (!character) {
        return <div>"NOT_FOUND"</div>;
    }

    return (
        <div className="character-modal">
            <Character
                title={character.name}
                mainImage={
                    <img
                        src={getImage(character.mainImage?.ref)}
                        alt={character.mainImage?.alt}
                    />
                }
            />
        </div>
    );
};

export default CharacterModal;
