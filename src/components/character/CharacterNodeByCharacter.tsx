import { TCharacters } from "content/characters/Characters";
import CharacterNode from "./CharacterNode";
import { getImage } from "components/utility/images";
import { CharacterList } from "content/characters/CharacterList";

interface IProps {
    character: TCharacters;
    onClick: (character: TCharacters) => void;
}

const CharacterNodeByCharacter = (props: IProps) => {
    const character = CharacterList[props.character];

    const handleOnClick = () => {
        props.onClick(props.character);
    };

    if (!character) {
        return null;
    }

    return (
        <CharacterNode
            title={character.name}
            avatar={
                <img
                    src={getImage(character.avatar?.ref)}
                    alt={character.avatar?.alt}
                />
            }
            onClick={handleOnClick}
        />
    );
};

export default CharacterNodeByCharacter;
