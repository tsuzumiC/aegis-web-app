import { getLocalFilePath } from "components/utility/getLocalFile";
import "./FamilyTree.scss";

import FlowChart from "components/flowchart/FlowChart";
import axios from "axios";
import { Node, XYPosition } from "react-flow-renderer";
import { useEffect, useMemo, useState } from "react";
import { ICharacter, ICharacterListItem } from "content/characters/Characters";
import { ICharacterNodeProps } from "components/flowchart/components/CharacterNode";
import { multiplyPosition } from "components/flowchart/utility/NodeUtility";
import { ITableSet } from "models/ITableSet";

interface INodePosition {
    x: number;
    y: number;
    parentId?: string;
}

const FamilyTree = () => {
    const [characterList, setCharacterList] = useState<ICharacterListItem[]>(
        []
    );

    const [positionList, setPositionList] = useState<
        Record<string, INodePosition>
    >({});

    const [characterData, setCharacterData] = useState<ITableSet<ICharacter>>({
        ids: [],
        values: {},
    });

    const fetchCharacterList = async () => {
        try {
            const response = await axios.get<ICharacterListItem[]>(
                getLocalFilePath("/CharacterList.json") ?? ""
            );

            if (response.data) {
                setCharacterList(response.data);
            }
        } catch (error) {
            // Handle the error
        }
    };

    const fetchPositionList = async () => {
        try {
            const response = await axios.get<Record<string, INodePosition>>(
                getLocalFilePath(`/HlaarFamilyTreePos.json`) ?? ""
            );
            if (response.data) {
                setPositionList(response.data);
            }
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

            const characterData = data.reduce(
                (acc, character) => {
                    acc.ids.push(character.id);
                    acc.values[character.id] = character;

                    return acc;
                },
                { ids: [], values: {} } as ITableSet<ICharacter>
            );

            setCharacterData(characterData);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchPositionList();
        fetchCharacterList();
    }, []);

    useEffect(() => {
        if (characterList.length > 0) {
            fetchCharacterData(characterList);
        }
    }, [characterList]);

    const elements: Node<ICharacter>[] = useMemo(() => {
        if (characterList.length > 0) {
            return characterList.reduce((acc, character) => {
                if (
                    positionList[character.id] &&
                    characterData.values[character.id]
                ) {
                    const parentId = positionList[character.id].parentId;
                    const parentPosition = parentId
                        ? positionList[parentId]
                        : { x: 0, y: 0 };
                    const position = {
                        x: positionList[character.id].x + parentPosition.x,
                        y: positionList[character.id].y + parentPosition.y,
                    };
                    acc.push({
                        id: character.id,
                        type: "character",
                        data: characterData.values[character.id],
                        position: multiplyPosition(position),
                    });
                }
                return acc;
            }, [] as Node<ICharacter>[]);
        }

        return [];
    }, [characterList, positionList, characterData]);

    return (
        <div className="family-tree">
            <h1>The Hlaar's</h1>
            <FlowChart elements={elements} />
        </div>
    );
};

export default FamilyTree;

/* 

    const [filteredCharacterData, setFilteredCharacterData] = React.useState<
        ICharacter[]
    >([]);
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

    useEffect(() => {
        fetchCharacterData([
            {
                id: "agnesHlaar",
                name: "Agnes Hlaar",
                path: "Agnes,Hlaar",
            },
        ]);
    }, []);

    const elements: Node[] = useMemo(() => {
        if (filteredCharacterData.length > 0) {
            return filteredCharacterData.map((character) => {
                return {
                    id: character.id,
                    type: ENodeTypes.character,
                    data: { character },
                    position: { x: 250, y: 5 },
                };
            });
        }

        return [];
    }, [filteredCharacterData]);
*/
