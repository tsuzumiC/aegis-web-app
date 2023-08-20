import "./CharacterListItem.scss";

import { TCharacters, TPairCharacters } from "content/characters/Characters";

import { getImage } from "components/utility/images";
import { CharacterList } from "content/characters/CharacterList";

import EmptyImage from "components/EmptyImage";

interface IProps {
    character: TCharacters | TPairCharacters;
    childItem?: boolean;
}

const CharacterListItemByCharacter = (props: IProps) => {
    const { childItem } = props;
    const character = CharacterList[props.character];

    if (!character) {
        return null;
    }
    const _image = childItem ? character.avatar : character.mainImage;

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
                    Description
                </div>
            </div>
            <div
                className={`character-list-item--image${
                    childItem ? " child-item" : ""
                }`}
            >
                {<img src={getImage(_image?.ref)} alt={_image?.alt} /> ?? (
                    <EmptyImage />
                )}
            </div>
        </div>
    );
};

export default CharacterListItemByCharacter;
