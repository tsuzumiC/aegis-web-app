import { TCharacters } from "content/characters/Characters";
import CharacterNode from "./CharacterNode";
import { getLocalFilePath } from "components/utility/getLocalFile";
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
                    src={getLocalFilePath(character.avatar?.ref)}
                    alt={character.avatar?.alt}
                />
            }
            onClick={handleOnClick}
        />
    );
};

export default CharacterNodeByCharacter;
