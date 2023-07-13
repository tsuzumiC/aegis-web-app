import { TCharacters } from "content/characters/Characters";

export const ModalTypes = {
    character: "character",
} as const;

const ModalTypeList = Object.values(ModalTypes);

export type TModalTypes = (typeof ModalTypeList)[number];

export type TModalListTypes = {
    [ModalTypes.character]: TCharacters;
};

export interface IModalOptions {
    [key: string]: any;
}

export interface IModalFor<T extends TModalTypes = TModalTypes> {
    type: T;
    id: TModalListTypes[T];
}

interface IModalItem<T extends TModalTypes = TModalTypes> {
    id?: TModalListTypes[T];
    modalFor?: IModalFor;
    type: T | string;
    customList?: { id: string; path: string };
    options?: IModalOptions;
}

export interface IShowModalPayload<T extends TModalTypes = TModalTypes>
    extends IModalItem<T> {
    callerAddress: string;
}

export interface IModalHaveChangesPayload {
    callId: string;
    haveChanges: boolean;
}

export interface ICloseModalPayload {
    callId: string;
    onSave?: boolean;
    extraById?: string[];
    navigateTo?: string;
}

export interface IUpdateModalPayload<T extends TModalTypes = TModalTypes> {
    callId?: string;
    newId: TModalListTypes[T];
    newType: T;
    newOptions?: IModalOptions;
    onSave?: boolean;
}

export interface IModalRenderer {
    [key: string]: JSX.Element;
}

export interface IModalListItem<T extends TModalTypes = TModalTypes>
    extends IModalItem<T> {
    callId: string;
}

export interface IIdModalListItems<T extends TModalTypes = TModalTypes> {
    [key: string]: IModalListItem<T>;
}

export interface IIdModalHaveChanges {
    [key: string]: boolean;
}
