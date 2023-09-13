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
    fullName: string;
    firstName: string;
    lastName: string;
    appearance: string;
    bio: string;
}

export interface ICharacterListItem {
    id: string;
    name: string;
    path: string;
    avatar?: IImageProps;
}
