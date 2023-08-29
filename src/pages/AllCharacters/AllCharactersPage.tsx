import { useGetCharacterList } from "content/characters/api/hooks";
import "./AllCharactersPage.scss";

import CharacterListItemByCharacter from "components/character/CharacterListItemByCharacter";

const AllCharactersPage: React.FC = () => {
    const { data: characterList } = useGetCharacterList();
    return (
        <div className="all-characters-page">
            <h1>All Characters Page</h1>
            <div className="all-characters-page--list">
                {characterList?.options.map((item) => {
                    return (
                        <CharacterListItemByCharacter
                            key={item.id}
                            characterPath={item.value}
                        />
                    );
                    /* else {
                        const pairId = Object.keys(item)[0];

                        const childIds = item[pairId] as string[];

                        return (
                            <div className="all-characters-page--list--child-item">
                                <CharacterListItemByCharacter
                                    characterId={pairId}
                                />
                                {childIds.map((child) => (
                                    <CharacterListItemByCharacter
                                        characterId={child}
                                        childItem
                                    />
                                ))}
                            </div>
                        );
                    } */
                })}
            </div>
        </div>
    );
};

export default AllCharactersPage;
