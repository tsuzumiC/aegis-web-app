import { CharacterList, TCharacters } from "content/characters/Characters";
import CharacterNode from "./CharacterNode";
import { getImage } from "components/utility/images";

interface IProps {
    character: TCharacters;
    onClick: (character: TCharacters) => void;
}

const CharacterNodeByCharacter = (props: IProps) => {
    const character = CharacterList[props.character];

    const handleOnClick = () => {
        props.onClick(props.character);
    };

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
