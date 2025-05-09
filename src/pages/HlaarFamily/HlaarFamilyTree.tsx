import "./HlaarFamilyTree.scss";
import { getLocalFilePath } from "components/utility/getLocalFile";

import FlowChart from "components/flowchart/FlowChart";
import axios from "axios";

import { useEffect, useMemo, useState } from "react";
import { ICharacter, ICharacterListItem } from "content/characters/Character";

import {
    CustomNode,
    multiplyPosition,
} from "components/flowchart/utility/NodeUtility";
import { ITableSet } from "models/ITableSet";
import {
    INodePositions,
    INodePosition,
    computeAbsolutePositions,
} from "./utility/NodePosition";
import { Edge } from "reactflow";

const HlaarFamilyTree = () => {
    const [characterList, setCharacterList] = useState<ICharacterListItem[]>(
        []
    );

    const [positionList, setPositionList] = useState<INodePositions>({});

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
                const result = computeAbsolutePositions(response.data);

                setPositionList(result);
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

    const nodes: CustomNode<ICharacter>[] = useMemo(() => {
        if (characterList.length > 0) {
            return characterList.reduce((acc, character) => {
                if (
                    positionList[character.id] &&
                    characterData.values[character.id]
                ) {
                    acc.push({
                        id: character.id,
                        type: "character",
                        data: characterData.values[character.id],
                        position: multiplyPosition(positionList[character.id]),
                    });
                }
                return acc;
            }, [] as CustomNode<ICharacter>[]);
        }

        return [];
    }, [characterList, positionList, characterData]);

    const edges: Edge[] = useMemo(() => {
        return [
            {
                id: "e-zeenelHlaar-katyBrooksHlaar",
                source: "zeenelHlaar",
                target: "katyBrooksHlaar",
                type: "step",
            },
        ];
    }, []);

    return (
        <div className="hlaar-family-tree">
            <h1>The Hlaar's</h1>
            <FlowChart nodes={nodes} edges={edges} />
        </div>
    );
};

export default HlaarFamilyTree;
