import { IAge } from "content/characters/Characters";
import { INodePosition } from "./NodePosition";

export interface ITimelineCharacterNode extends INodePosition {
    timeNodes?: ITimelineEventNode[];
    external?: boolean;
}

export interface ITimelineEventNode extends INodePosition {
    type: TimelineEventNodeType;
    currentAge?: IAge;
    offsetAge?: IAge;
    agePos: "top" | "bottom";
}

export enum TimelineEventNodeType {
    event = "event",
    birth = "birth",
}

export interface ITimelineCharacterNodes {
    [key: string]: ITimelineCharacterNode;
}
