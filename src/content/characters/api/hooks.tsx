import { getLocalFile } from "components/utility/getLocalFile";
import { ICharacter } from "../Characters";
import { useQuery } from "react-query";
import axios from "axios";
import { ITableSetWithOptions } from "models/ITableSet";

export const useGetCharacterById = (characterPath?: string) => {
    const url =
        getLocalFile(
            `/characters/${characterPath}/${characterPath}_data.json`
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
        }
    );
};

export const useGetCharacterList = () => {
    const url = getLocalFile(`/characters/Characters.json`) ?? "";

    return useQuery(["get-character-list"], async (context) => {
        const response = await axios.get(url, {
            signal: context.signal,
        });

        const characterList = response.data.characterList as Record<
            string,
            string
        >;
        if (characterList) {
            const tableSet = Object.keys(characterList).reduce<
                ITableSetWithOptions<string>
            >(
                (acc, id) => {
                    acc.ids.push(id);
                    acc.values[id] = characterList[id];
                    acc.options.push({ id, value: characterList[id] });
                    return acc;
                },
                { ids: [], values: {}, options: [] }
            );

            return tableSet;
        }
    });
};
