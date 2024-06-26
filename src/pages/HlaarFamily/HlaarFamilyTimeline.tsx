import "./HlaarFamilyTree.scss";
import { getLocalFilePath } from "components/utility/getLocalFile";

import FlowChart from "components/flowchart/FlowChart";
import axios from "axios";

import { useEffect, useMemo, useState } from "react";
import { ICharacter, ICharacterListItem } from "content/characters/Characters";

import {
    CustomNode,
    multiplyPosition,
} from "components/flowchart/utility/NodeUtility";
import { ITableSet } from "models/ITableSet";
import {
    INodePositions,
    computeAbsolutePositions,
} from "./utility/NodePosition";
import { Edge } from "reactflow";
import {
    ITimelineCharacterNode,
    ITimelineCharacterNodes,
} from "./utility/TimelineNodes";

const NODE_WIDTH = 8;
const NODE_HEIGHT = 4;

const HlaarFamilyTimeline = () => {
    const [characterList, setCharacterList] = useState<ICharacterListItem[]>(
        []
    );

    const [positionList, setPositionList] = useState<ITimelineCharacterNodes>(
        {}
    );

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
            const response = await axios.get<
                Record<string, ITimelineCharacterNode>
            >(getLocalFilePath(`/HlaarFamilyTimelinePos.json`) ?? "");
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

    const { nodes, edges } = useMemo(() => {
        if (characterList.length > 0) {
            return characterList.reduce(
                ({ nodes, edges }, character) => {
                    const position = positionList[character.id];
                    const data = characterData.values[character.id];

                    const tempNodes: CustomNode[] = [];
                    const tempEdges: Edge[] = [];

                    if (position && data) {
                        tempNodes.push({
                            id: character.id,
                            type: "characterSide",
                            data,
                            position: multiplyPosition(position),
                        });

                        const introAge = data.data.introAge ?? {
                            year: 0,
                            month: 0,
                        };

                        const external = position.external !== undefined;
                        if (external) {
                            tempNodes.push({
                                id: character.id + "-external",
                                type: "timelineEvent",
                                data: {
                                    type: "event",
                                    currentAge: {
                                        year: introAge.year,

                                        month: introAge.month,
                                    },
                                    offsetAge: {
                                        year: 0,
                                        month: 0,
                                    },
                                    agePos: position.external
                                        ? "top"
                                        : undefined,
                                },
                                position: multiplyPosition({
                                    x: position.x + NODE_WIDTH + 0.5,
                                    y:
                                        (position.y ?? 0) +
                                        NODE_HEIGHT / 2 -
                                        0.5,
                                }),
                            });
                        }

                        if (position.timeNodes) {
                            position.timeNodes.forEach((node, index) => {
                                tempNodes.push({
                                    id: character.id + "-event-" + index,
                                    type: "timelineEvent",
                                    data: {
                                        type: node.type,
                                        currentAge: {
                                            year:
                                                introAge.year +
                                                Math.floor(node.x / 12),
                                            month:
                                                introAge.month + (node.x % 12),
                                        },
                                        offsetAge: {
                                            year: Math.floor(node.x / 12),
                                            month: node.x % 12,
                                        },
                                        agePos: node.agePos,
                                    },
                                    position: multiplyPosition({
                                        x:
                                            position.x +
                                            node.x +
                                            NODE_WIDTH +
                                            (external ? 0.5 : -0.5),
                                        y:
                                            (position.y ?? 0) +
                                            (node.y ?? 0) +
                                            NODE_HEIGHT / 2 -
                                            0.5,
                                    }),
                                });
                            });
                        }

                        if (tempNodes.length > 1) {
                            for (let i = 0; i < tempNodes.length - 1; i++) {
                                const node = tempNodes[i];

                                const nextNode = tempNodes[i + 1];

                                tempEdges.push({
                                    id: node.id + "_" + nextNode.id,
                                    source: node.id,
                                    sourceHandle: "right-handle-" + node.id,
                                    target: nextNode.id,
                                    targetHandle: "left-handle-" + nextNode.id,
                                    type: "step",
                                    style: {
                                        strokeWidth: 16,
                                        stroke: "gray",
                                    },
                                    data: {},
                                });
                            }
                        }
                    }

                    nodes.push(...tempNodes);
                    edges.push(...tempEdges);

                    return { nodes, edges };
                },
                { nodes: [], edges: [] } as {
                    nodes: CustomNode[];
                    edges: Edge[];
                }
            );
        }

        return { nodes: [], edges: [] } as {
            nodes: CustomNode[];
            edges: Edge[];
        };
    }, [characterList, positionList, characterData]);

    return (
        <div className="hlaar-family-tree">
            <h1>The Hlaar's</h1>
            <FlowChart nodes={nodes} edges={edges} />
        </div>
    );
};

export default HlaarFamilyTimeline;
