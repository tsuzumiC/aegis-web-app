import "./AllCharactersPage.scss";
import { Characters, PairCharacters } from "content/characters/Characters";
import { AllCharactersLayout } from "./AllCharacters_utils";
import CharacterListItemByCharacter from "components/character/CharacterListItem";

const AllCharactersPage: React.FC = () => {
    return (
        <div className="all-characters-page">
            <h1>All Characters Page</h1>
            <div className="all-characters-page--list">
                {AllCharactersLayout.map((layout) => {
                    if (typeof layout === "string") {
                        const characterId = layout as keyof typeof Characters;

                        return (
                            <CharacterListItemByCharacter
                                character={characterId}
                            />
                        );
                    } else {
                        const pairId = Object.keys(
                            layout
                        )[0] as keyof typeof PairCharacters;
                        const childIds = layout[
                            pairId
                        ] as (keyof typeof Characters)[];
                        return (
                            <div className="all-characters-page--list--child-item">
                                <CharacterListItemByCharacter
                                    character={pairId}
                                />
                                {childIds.map((child) => (
                                    <CharacterListItemByCharacter
                                        character={child}
                                        childItem
                                    />
                                ))}
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default AllCharactersPage;
