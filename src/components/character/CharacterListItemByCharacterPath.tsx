import "./CharacterListItem.scss";

import {
    getCharacterImagePath,
    getLocalFilePath,
} from "components/utility/getLocalFile";

import EmptyImage from "components/EmptyImage";
import { useGetCharacterById } from "content/characters/api/hooks";

interface IProps {
    characterPath: string;
    childItem?: boolean;
}

const CharacterListItemByCharacterPath = (props: IProps) => {
    const { childItem = false } = props;

    const { data: character } = useGetCharacterById(props.characterPath);

    if (!character) {
        return null;
    }
    const _image = {
        ref: getCharacterImagePath(character.path, "treeAvatar"),
        alt: character.name,
    };

    return (
        <div className={`character-list-item${childItem ? " child-item" : ""}`}>
            <div className="character-list-item--info">
                <div
                    className={`character-list-item--title${
                        childItem ? " child-item" : ""
                    }`}
                >
                    {character.name}
                </div>
                <div className="character-list-item--description">
                    <p>{character.appearance}</p>
                    <p>{character.bio}</p>
                </div>
            </div>
            <div
                className={`character-list-item--image${
                    childItem ? " child-item" : ""
                }`}
            >
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

export default CharacterListItemByCharacterPath;
