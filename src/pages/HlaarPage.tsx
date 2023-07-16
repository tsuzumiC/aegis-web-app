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
import FamilyTree from "components/flowchart/FamilyTree";

const HlaarPage = () => {
    return (
        <div className="hlaar-page">
            <h1>The Hlaar's</h1>
            <FamilyTree />
        </div>
    );
};

export default HlaarPage;
