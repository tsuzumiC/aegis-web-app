import "./HlaarFamilyTree.scss";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import { getLocalFilePath } from "components/utility/getLocalFile";

import FlowChart from "components/flowchart/FlowChart";

import { ICharacter, ICharacterListItem } from "content/characters/Character";
import { IEvent, IEvents } from "content/events/Event";

import {
    CustomNode,
    XYPosition,
} from "components/flowchart/utility/NodeUtility";
import { ITableSet } from "models/ITableSet";
import { Edge, Node } from "reactflow";
import { TimeDate } from "content/timeDate/TimeDate";

const NODE_WIDTH = 220;
const NODE_HEIGHT = 270;

const zeroDate = new TimeDate(300, 1, 1);

const msInDay = 1000 * 60 * 60 * 24;

const HlaarFamilyTimeline = () => {
    const [characterList, setCharacterList] = useState<ICharacterListItem[]>(
        []
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

    const fetchCharacterData = async (characters: ICharacterListItem[]) => {
        try {
            const characterDataPromises = characters.map(async (character) => {
                const dataPath =
                    getLocalFilePath(
                        `/characters/${character.path}/${character.path}.data.json`
                    ) ?? "";

                const eventPath =
                    getLocalFilePath(
                        `/characters/${character.path}/${character.path}.events.json`
                    ) ?? "";

                const [dataResponse, eventResponse] = await Promise.all([
                    axios.get<ICharacter>(dataPath),
                    axios.get<IEvents>(eventPath),
                ]);

                const data = dataResponse.data;

                data.birth = TimeDate.fromJSON(data.birth);

                if (data.intro) {
                    data.intro = TimeDate.fromJSON(data.intro);
                }

                const events = eventResponse.data;

                if (events.ids.length > 0) {
                    events.ids.forEach((eventId) => {
                        const event = events.values[eventId];

                        if (event.date) {
                            event.date = TimeDate.fromJSON(event.date);
                        }

                        if (event.age) {
                            event.age = TimeDate.fromJSON(event.age);
                        }
                    });
                }

                return {
                    data,
                    events,
                };
            });

            const charactersInfo = await Promise.all(characterDataPromises);

            const characterData = charactersInfo.reduce(
                (acc, info) => {
                    acc.ids.push(info.data.id);
                    acc.values[info.data.id] = {
                        ...info.data,
                        events: info.events,
                    };

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
                ({ nodes, edges }, item) => {
                    const tempNodes: Node<ICharacter | IEvent>[] = [];
                    const tempEdges: Edge[] = [];

                    const character = characterData.values[item.id];

                    if (character) {
                        const firstDateTime = character.intro
                            ? character.intro.add(character.birth)
                            : character.birth;

                        const xPos =
                            firstDateTime.getDayDiff(zeroDate) - NODE_WIDTH;

                        const yPos = character.yOrder * (NODE_HEIGHT + 50);

                        tempNodes.push({
                            id: item.id,
                            type: "character",
                            data: character,
                            width: NODE_WIDTH,
                            height: NODE_HEIGHT,
                            position: { x: xPos, y: yPos },
                        });

                        const events = character?.events;

                        if (events && (events?.ids.length ?? 0) > 0) {
                            for (var i = 0; i < events.ids.length; i++) {
                                const eventId = events.ids[i];
                                const event = events.values[eventId];

                                const hasAge = event.age !== undefined;
                                const hasDate = event.date !== undefined;

                                if (!hasAge && !hasDate) {
                                    continue;
                                }

                                const eventDate = hasAge
                                    ? character.birth.add(event.age!)
                                    : event.date!;

                                const xPos = eventDate.getDayDiff(zeroDate);

                                tempNodes.push({
                                    id: eventId,
                                    type: "timelineEvent",
                                    data: event,
                                    position: {
                                        x: xPos,
                                        y: yPos,
                                    },
                                });
                            }
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
                                    type: "timelineEdge",
                                    style: {
                                        strokeWidth: 16,
                                        stroke: "gray",
                                    },
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
    }, [characterList, characterData]);

    return (
        <div className="hlaar-family-tree">
            <h1>The Hlaar's</h1>
            <FlowChart nodes={nodes} edges={edges} />
        </div>
    );
};

export default HlaarFamilyTimeline;
