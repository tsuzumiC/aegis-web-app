import { TCharacters } from "content/characters/Characters";
import CharacterNode from "./CharacterNode";
import { getLocalFile } from "components/utility/getLocalFile";
import { useGetCharacterById } from "content/characters/api/hooks";

interface IProps {
    character: TCharacters;
    onClick: (character: TCharacters) => void;
}

const CharacterNodeByCharacter = (props: IProps) => {
    const { data: character } = useGetCharacterById(props.character);

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
                    src={getLocalFile(character.avatar?.ref)}
                    alt={character.avatar?.alt}
                />
            }
            onClick={handleOnClick}
        />
    );
};

export default CharacterNodeByCharacter;
