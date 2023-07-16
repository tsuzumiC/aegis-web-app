import { IImageProps } from "components/utility/images";
import { TGender } from "./Gender";
export interface ICharacter {
    id: string;
    name: string;
    avatar?: IImageProps;
    mainImage?: IImageProps;
    gender: TGender;
    children?: {
        asMother?: TCharacters[];
        asFather?: TCharacters[];
    };
}

export const Characters = {
    Alani_Hlaar: "Alani Hlaar",
    Amber_Hlaar: "Amber Hlaar",
    Annie_Hlaar: "Annie Hlaar",
    Azmah: "Azmah",
    Cica_Hlaar: "Cica Hlaar",
    Emily_Hlaar: "Emily Hlaar",
    Gawen_Hlaar: "Gawen Hlaar",
    Ginger_Hlaar: "Ginger Hlaar",
    Gwain_Hlaar: "Gwain Hlaar",
    Haru_Hlaar: "Haru Hlaar",
    Hira_Hlaar: "Hira Hlaar",
    Julie_Hlaar: "Julie Hlaar",
    Kimi_Hlaar: "Kimi Hlaar",
    Lael_Caerl: "Lael Caerl",
    Lin_Hlaar: "Lin Hlaar",
    Lola_Hlaar: "Lola Hlaar",
    Marnie_Bryne: "Marnie Bryne",
    Meila_Hlaar: "Meila Hlaar",
    Mika_Hlaar: "Mika Hlaar",
    Nuala_Hlaar: "Nuala Hlaar",
    Risaria: "Risaria",
    Robin_Hemingway: "Robin Hemingway",
    Rosie_Hlaar: "Rosie Hlaar",
    Saya_Hlaar: "Saya Hlaar",
    Seori: "Seori",
    Shilli_Akehurst: "Shilli Akehurst",
    Tana_Hlaar: "Tana Hlaar",
    Tarluk: "Tarluk",
    Val_Hlaar: "Val Hlaar",
    Yuela_Hlaar: "Yuela Hlaar",
    Yumi_Hlaar: "Yumi Hlaar",
    Zeenel_Hlaar: "Zeenel Hlaar",
} as const;

const _Character = Object.values(Characters);

export type TCharacters = (typeof _Character)[number];
