import "./CharacterListItem.scss";

import {
    getCharacterImagePath,
    getLocalFilePath,
} from "components/utility/getLocalFile";

import EmptyImage from "components/EmptyImage";
import { useGetCharacterById } from "content/characters/api/hooks";
import { ICharacter } from "content/characters/Characters";

interface IProps {
    character: ICharacter;
}

const CharacterListItem = (props: IProps) => {
    const { character } = props;

    const _image = {
        ref: getCharacterImagePath(character.path, "treeAvatar"),
        alt: character.name,
    };

    return (
        <div className="character-list-item">
            <div className="character-list-item--info">
                <div className="character-list-item--title">
                    {character.name}
                </div>
                <div className="character-list-item--description">
                    <p>{character.appearance}</p>
                    <p>{character.bio}</p>
                </div>
            </div>
            <div className="character-list-item--image">
                {(
                    <img
                        src={getLocalFilePath(_image?.ref)}
                        alt={_image?.alt}
                    />
                ) ?? <EmptyImage />}
            </div>
        </div>
    );
};

export default CharacterListItem;
