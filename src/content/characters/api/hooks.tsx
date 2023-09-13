import { getLocalFilePath } from "components/utility/getLocalFile";
import { ICharacter, ICharacterListItem } from "../Characters";
import { useQuery } from "react-query";
import axios from "axios";
import { ITableSetWithOptions } from "models/ITableSet";

export const useGetCharacters = (characterPaths: string[]) => {
    const fetchCharacterPromises = characterPaths.map(async (characterPath) => {
        const url =
            getLocalFilePath(
                `/characters/${characterPath}/${characterPath}.data.json`
            ) ?? "";

        const response = await axios.get(url);

        return response.data as ICharacter;
    });

    return useQuery(
        ["get-character", characterPaths],
        () => Promise.all(fetchCharacterPromises),
        {
            enabled: characterPaths.length > 0,
            refetchOnWindowFocus: false,
        }
    );
};

export const useGetCharacterById = (characterPath?: string) => {
    const url =
        getLocalFilePath(
            `/characters/${characterPath}/${characterPath}.data.json`
        ) ?? "";

    return useQuery(
        ["get-character", characterPath],
        async (context) => {
            const response = await axios.get(url, {
                signal: context.signal,
            });

            const characterData = response.data as ICharacter;

            return characterData;
        },
        {
            enabled: !!characterPath,
            refetchOnWindowFocus: false,
        }
    );
};

export const useGetCharacterList = () => {
    const url = getLocalFilePath(`/CharacterList.json`) ?? "";

    return useQuery(
        ["get-character-list"],
        async (context) => {
            const response = await axios.get(url, {
                signal: context.signal,
            });

            const characterList = response.data as ICharacterListItem[];
            if (characterList) {
                return characterList;
            }
        },
        { refetchOnWindowFocus: true }
    );
};
