import "./AllCharactersPage.scss";

import { ChangeEvent, useEffect, useState } from "react";

import axios from "axios";

import CharacterListItem from "components/character/CharacterListItem";
import { ICharacter, ICharacterListItem } from "content/characters/Characters";
import { getLocalFilePath } from "components/utility/getLocalFile";

const AllCharactersPage: React.FC = () => {
    const [searchField, setSearchField] = useState("");

    const [characterList, setCharacterList] = useState<
        ICharacterListItem[] | null
    >(null);
    const [filteredCharacterData, setFilteredCharacterData] = useState<
        ICharacter[]
    >([]);

    useEffect(() => {
        // Fetch the character list when the component mounts
        fetchCharacterList();
    }, []);

    useEffect(() => {
        // Update the filtered character data based on the search input
        if (characterList) {
            const filteredCharacters = characterList.filter((item) =>
                item.name.toLowerCase().includes(searchField.toLowerCase())
            );
            setFilteredCharacterData([]);

            // Fetch character data for the filtered characters
            if (filteredCharacters.length > 0) {
                fetchCharacterData(filteredCharacters);
            }
        }
    }, [searchField, characterList]);

    const fetchCharacterList = async () => {
        try {
            const response = await axios.get(
                getLocalFilePath("/CharacterList.json") ?? ""
            );
            const data = response.data as ICharacterListItem[];
            setCharacterList(data);
        } catch (error) {
            // Handle the error
        }
    };

    const fetchCharacterData = async (characters: ICharacterListItem[]) => {
        try {
            const characterDataPromises = characters.map(async (character) => {
                const response = await axios.get(
                    getLocalFilePath(
                        `/characters/${character.path}/${character.path}.data.json`
                    ) ?? ""
                );
                return response.data as ICharacter;
            });

            const data = await Promise.all(characterDataPromises);
            setFilteredCharacterData(data);
        } catch (error) {
            // Handle the error
        }
    };

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchField(value);
    };

    return (
        <div className="all-characters-page">
            <h1>All Characters Page</h1>
            <input
                type="text"
                placeholder="Search"
                onChange={handleOnChange}
                value={searchField}
            />
            <div className="all-characters-page--list">
                {filteredCharacterData.map((item) => {
                    return <CharacterListItem key={item.id} character={item} />;
                })}
            </div>
        </div>
    );
};

export default AllCharactersPage;
