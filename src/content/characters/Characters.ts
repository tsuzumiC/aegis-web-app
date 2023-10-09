import { IImageProps } from "components/utility/getLocalFile";
import { TGender } from "./Gender";

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
    data: ICharacterData;
    appearance: ICharacterAppearance;
    bio: string;
}

export interface ICharacterListItem {
    id: string;
    name: string;
    path: string;
}

export const CharacterDataTypes = {
    Race: "race",
    Gender: "gender",
    Age: "age",
    Orientation: "orientation",
} as const;

export const CharacterDataTypeOrder = [
    CharacterDataTypes.Race,
    CharacterDataTypes.Gender,
    CharacterDataTypes.Age,
    CharacterDataTypes.Orientation,
];

const CharacterDataTypesList = Object.values(CharacterDataTypes);

export type TCharacterDataType = (typeof CharacterDataTypesList)[number];

type MappedCharacterDataTypes = {
    [key in TCharacterDataType]?: string;
};

export interface ICharacterData extends MappedCharacterDataTypes {
    [CharacterDataTypes.Gender]?: TGender;
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
