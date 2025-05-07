import { TimeDate } from "content/timeDate/TimeDate";
import { ITableSet } from "models/ITableSet";
import { TimelineEventNodeType } from "pages/HlaarFamily/utility/TimelineNodes";

export interface IEvent {
    id: string;
    characterId: string;
    name?: string;
    description: string;
    date?: TimeDate;
    age?: TimeDate;
    location: string;
    type: TimelineEventNodeType;
}

export interface IEvents extends ITableSet<IEvent> {}
