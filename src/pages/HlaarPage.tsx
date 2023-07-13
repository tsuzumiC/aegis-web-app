import Character from "components/character/Character";
import "./HlaarPage.scss";
import { getImage } from "components/utility/images";
import CharacterNode from "components/character/CharacterNode";
import { useContext } from "react";
import { ModalManagerContext } from "components/modalManager/ModalManager";
import {
    IShowModalPayload,
    ModalTypes,
    TModalTypes,
} from "components/modalManager/models/ModalMangerModels";
import { useLocation } from "react-router-dom";
import CharacterNodeByCharacter from "components/character/CharacterNodeByCharacter";
import { Characters, TCharacters } from "content/characters/Characters";

const HlaarPage = () => {
    const modalManagerContext = useContext(ModalManagerContext);

    const location = useLocation();

    const handleOnShowModal = (character: TCharacters) => {
        const payload: IShowModalPayload = {
            id: character,
            type: ModalTypes.character,
            callerAddress: location.pathname,
        };
        modalManagerContext.onShowModal(payload);
    };
    return (
        <div className="hlaar-page">
            <h1>The Hlaar's</h1>

            <CharacterNodeByCharacter
                character={Characters.Zeenel_Hlaar}
                onClick={handleOnShowModal}
            />
        </div>
    );
};

export default HlaarPage;
