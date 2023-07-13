import { IImageProps } from "components/utility/images";
import ZeenelHlaar from "./ZeenelHlaar";

export interface ICharacter {
    name: string;
    avatar?: IImageProps;
    mainImage?: IImageProps;
}

export const Characters = {
    Zeenel_Hlaar: "zeenel_hlaar",
} as const;

const _Character = Object.values(Characters);

export type TCharacters = (typeof _Character)[number];

export const CharacterList: { [key in TCharacters]: ICharacter } = {
    [Characters.Zeenel_Hlaar]: ZeenelHlaar,
};
