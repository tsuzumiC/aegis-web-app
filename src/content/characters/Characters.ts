import { IImageProps } from "components/utility/images";
import { TGender } from "./Gender";
export interface ICharacter {
    id: string;
    name: string;
    avatar?: IImageProps;
    mainImage?: IImageProps;
    gender?: TGender;
    children?: {
        asMother?: string[];
        asFather?: string[];
    };
}

export const Characters = {
    AlaniHlaar: "Alani Hlaar",
    AmberHlaar: "Amber Hlaar",
    AnnieHlaar: "Annie Hlaar",
    Ayenda: "Ayenda",
    Azmah: "Azmah",
    CelineHlaar: "Celine Hlaar",
    CholeHlaar: "Chole Hlaar",
    CicaHlaar: "Cica Hlaar",
    ElalieHlaar: "Elalie Hlaar",
    EmilyHlaar: "Emily Hlaar",
    EricaArklight: "Erica Arklight",
    Esfir: "Esfir",
    FanaaHlaar: "Fanaa Hlaar",
    FylaeHlaar: "Fylae Hlaar",
    GawenHlaar: "Gawen Hlaar",
    Ghan: "Ghan",
    GingerHlaar: "Ginger Hlaar",
    GwainHlaar: "Gwain Hlaar",
    HaruHlaar: "Haru Hlaar",
    HiraHlaar: "Hira Hlaar",
    IsisBrooks: "Isis Brooks",
    JulieHlaar: "Julie Hlaar",
    KatyHlaar: "Katy Hlaar",
    KimiHlaar: "Kimi Hlaar",
    LaelCaerl: "Lael Caer'l",
    LeiwaHlaar: "Leiwa Hlaar",
    LilyHlaar: "Lily Hlaar",
    LinHlaar: "Lin Hlaar",
    LolaHlaar: "Lola Hlaar",
    MarnieBryne: "Marnie Bryne",
    MeilaHlaar: "Meila Hlaar",
    Miikeeno: "Miikeeno",
    MikaHlaar: "Mika Hlaar",
    NaamahHlaar: "Naamah Hlaar",
    Nish: "Nish",
    NualaHlaar: "Nuala Hlaar",
    Rika: "Rika",
    Risaria: "Risaria",
    RobinHemingway: "Robin Hemingway",
    RosieHlaar: "Rosie Hlaar",
    SayaHlaar: "Saya Hlaar",
    ScarletHlaar: "Scarlet Hlaar",
    Seori: "Seori",
    ShadiHlaar: "Shadi Hlaar",
    ShilliAkehurst: "Shilli Akehurst",
    TanaHlaar: "Tana Hlaar",
    Tarluk: "Tarluk",
    TrevanaArklight: "Trevana Arklight",
    ValHlaar: "Val Hlaar",
    Vorix: "Vorix",
    YuelaHlaar: "Yuela Hlaar",
    YumiHlaar: "Yumi Hlaar",
    ZeenelHlaar: "Zeenel Hlaar",
    ZildaHlaar: "Zilda Hlaar",
    ZumiHlaar: "Zumi Hlaar",
} as const;

const Character = Object.keys(Characters);

export type TCharacters = (typeof Character)[number];

export const PairCharacters = {
    AlaniAndAnnieHlaar: "Alani and Annie Hlaar",
    GawenAndGwainHlaar: "Gawen and Gwain Hlaar",
} as const;

const PairCharacter = Object.keys(PairCharacters);

export type TPairCharacters = (typeof PairCharacter)[number];

export const CharacterIds: { [K in TCharacters | TPairCharacters]: string } = {
    AlaniAndAnnieHlaar: "alaniAndAnnieHlaar",
    AlaniHlaar: "alaniHlaar",
    AmberHlaar: "amberHlaar",
    AnnieHlaar: "annieHlaar",
    Ayenda: "ayenda",
    Azmah: "azmah",
    CelineHlaar: "celineHlaar",
    CholeHlaar: "choleHlaar",
    CicaHlaar: "cicaHlaar",
    ElalieHlaar: "elalieHlaar",
    EmilyHlaar: "emilyHlaar",
    EricaArklight: "ericaArklight",
    Esfir: "esfir",
    FanaaHlaar: "fanaaHlaar",
    FylaeHlaar: "fylaeHlaar",
    GawenAndGwainHlaar: "gawenAndGwainHlaar",
    GawenHlaar: "gawenHlaar",
    Ghan: "ghan",
    GingerHlaar: "gingerHlaar",
    GwainHlaar: "gwainHlaar",
    HaruHlaar: "haruHlaar",
    HiraHlaar: "hiraHlaar",
    IsisBrooks: "isisBrooks",
    JulieHlaar: "julieHlaar",
    KatyHlaar: "katyHlaar",
    KimiHlaar: "kimiHlaar",
    LaelCaerl: "laelCaerl",
    LeiwaHlaar: "leiwaHlaar",
    LilyHlaar: "lilyHlaar",
    LinHlaar: "linHlaar",
    LolaHlaar: "lolaHlaar",
    MarnieBryne: "marnieBryne",
    MeilaHlaar: "meilaHlaar",
    Miikeeno: "miikeeno",
    MikaHlaar: "mikaHlaar",
    NaamahHlaar: "naamahHlaar",
    Nish: "nish",
    NualaHlaar: "nualaHlaar",
    Rika: "rika",
    Risaria: "risaria",
    RobinHemingway: "robinHemingway",
    RosieHlaar: "rosieHlaar",
    SayaHlaar: "sayaHlaar",
    ScarletHlaar: "scarletHlaar",
    Seori: "seori",
    ShadiHlaar: "shadiHlaar",
    ShilliAkehurst: "shilliAkehurst",
    TanaHlaar: "tanaHlaar",
    Tarluk: "tarluk",
    TrevanaArklight: "trevanaArklight",
    ValHlaar: "valHlaar",
    Vorix: "vorix",
    YuelaHlaar: "yuelaHlaar",
    YumiHlaar: "yumiHlaar",
    ZeenelHlaar: "zeenelHlaar",
    ZildaHlaar: "zildaHlaar",
    ZumiHlaar: "zumiHlaar",
};
