import { IEvents } from "content/events/Event";
import { TGender } from "./Gender";
import { TimeDate } from "content/timeDate/TimeDate";

export enum ECharacterType {
    Single,
    Group,
}

export enum ECharacterLinkType {
    Father,
    Mother,
    Daughter,
    Son,
}

export interface ICharacterLink {
    id: string;
    linkType: ECharacterLinkType;
}

export interface ICharacter {
    id: string;
    path: string;
    name: string;
    player: string;
    guestPlayer?: string;
    fullName: string;
    firstName: string;
    lastName: string;
    birth: TimeDate;
    intro?: TimeDate;
    data: ICharacterData;
    appearance: ICharacterAppearance;
    bio: string;
    events?: IEvents;
    yOrder: number;
}

export interface ICharacterListItem {
    id: string;
    name: string;
    path: string;
}

export const CharacterDataTypes = {
    Race: "race",
    Gender: "gender",
    Orientation: "orientation",
} as const;

export const CharacterDataTypeOrder = [
    CharacterDataTypes.Race,
    CharacterDataTypes.Gender,
    CharacterDataTypes.Orientation,
];

const CharacterDataTypesList = Object.values(CharacterDataTypes);

export type TCharacterDataType = (typeof CharacterDataTypesList)[number];

export interface ICharacterData {
    [CharacterDataTypes.Race]: string;
    [CharacterDataTypes.Gender]: TGender;
    [CharacterDataTypes.Orientation]: string;
}

export const AppearanceTypes = {
    Eyes: "eyes",
    Hair: "hair",
    Skin: "skin",
    Height: "height",
    Weight: "weight",
} as const;

export const AppearanceTypeOrder = [
    AppearanceTypes.Eyes,
    AppearanceTypes.Hair,
    AppearanceTypes.Skin,
    AppearanceTypes.Height,
    AppearanceTypes.Weight,
];

const AppearanceTypesList = Object.values(AppearanceTypes);

export type TAppearanceType = (typeof AppearanceTypesList)[number];

type MappedAppearanceTypes = {
    [key in TAppearanceType]?: string;
};
export interface ICharacterAppearance extends MappedAppearanceTypes {
    text: string;
}
