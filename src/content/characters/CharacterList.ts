import {
    Characters,
    ICharacter,
    PairCharacters,
    TCharacters,
    TPairCharacters,
} from "./Characters";

import {
    AlaniAndAnnieHlaar,
    AlaniHlaar,
    AmberHlaar,
    AnnieHlaar,
    Ayenda,
    Azmah,
    CelineHlaar,
    CholeHlaar,
    CicaHlaar,
    ElalieHlaar,
    EmilyHlaar,
    EricaArklight,
    Esfir,
    FanaaHlaar,
    FylaeHlaar,
    GawenAndGwainHlaar,
    GawenHlaar,
    Ghan,
    GingerHlaar,
    GwainHlaar,
    HaruHlaar,
    HiraHlaar,
    IsisBrooks,
    JulieHlaar,
    KatyHlaar,
    KimiHlaar,
    LaelCaerl,
    LeiwaHlaar,
    LilyHlaar,
    LinHlaar,
    LolaHlaar,
    MarnieBryne,
    MeilaHlaar,
    Miikeeno,
    MikaHlaar,
    NaamahHlaar,
    Nish,
    NualaHlaar,
    Rika,
    Risaria,
    RobinHemingway,
    RosieHlaar,
    SayaHlaar,
    ScarletHlaar,
    Seori,
    ShadiHlaar,
    ShilliAkehurst,
    TanaHlaar,
    Tarluk,
    TrevanaArklight,
    ValHlaar,
    Vorix,
    YuelaHlaar,
    YumiHlaar,
    ZeenelHlaar,
    ZildaHlaar,
    ZumiHlaar,
} from "./list";

export type TCharacterList = {
    [K in TCharacters | TPairCharacters]: ICharacter;
};

export const CharacterList: TCharacterList = {
    [PairCharacters.AlaniAndAnnieHlaar]: AlaniAndAnnieHlaar,
    [Characters.AlaniHlaar]: AlaniHlaar,
    [Characters.AmberHlaar]: AmberHlaar,
    [Characters.AnnieHlaar]: AnnieHlaar,
    [Characters.Ayenda]: Ayenda,
    [Characters.Azmah]: Azmah,
    [Characters.CelineHlaar]: CelineHlaar,
    [Characters.CholeHlaar]: CholeHlaar,
    [Characters.CicaHlaar]: CicaHlaar,
    [Characters.ElalieHlaar]: ElalieHlaar,
    [Characters.EmilyHlaar]: EmilyHlaar,
    [Characters.EricaArklight]: EricaArklight,
    [Characters.Esfir]: Esfir,
    [Characters.FanaaHlaar]: FanaaHlaar,
    [Characters.FylaeHlaar]: FylaeHlaar,
    [PairCharacters.GawenAndGwainHlaar]: GawenAndGwainHlaar,
    [Characters.GawenHlaar]: GawenHlaar,
    [Characters.Ghan]: Ghan,
    [Characters.GingerHlaar]: GingerHlaar,
    [Characters.GwainHlaar]: GwainHlaar,
    [Characters.HaruHlaar]: HaruHlaar,
    [Characters.HiraHlaar]: HiraHlaar,
    [Characters.IsisBrooks]: IsisBrooks,
    [Characters.JulieHlaar]: JulieHlaar,
    [Characters.KatyHlaar]: KatyHlaar,
    [Characters.KimiHlaar]: KimiHlaar,
    [Characters.LaelCaerl]: LaelCaerl,
    [Characters.LeiwaHlaar]: LeiwaHlaar,
    [Characters.LilyHlaar]: LilyHlaar,
    [Characters.LinHlaar]: LinHlaar,
    [Characters.LolaHlaar]: LolaHlaar,
    [Characters.MarnieBryne]: MarnieBryne,
    [Characters.MeilaHlaar]: MeilaHlaar,
    [Characters.Miikeeno]: Miikeeno,
    [Characters.MikaHlaar]: MikaHlaar,
    [Characters.NaamahHlaar]: NaamahHlaar,
    [Characters.Nish]: Nish,
    [Characters.NualaHlaar]: NualaHlaar,
    [Characters.Rika]: Rika,
    [Characters.Risaria]: Risaria,
    [Characters.RobinHemingway]: RobinHemingway,
    [Characters.RosieHlaar]: RosieHlaar,
    [Characters.SayaHlaar]: SayaHlaar,
    [Characters.ScarletHlaar]: ScarletHlaar,
    [Characters.Seori]: Seori,
    [Characters.ShadiHlaar]: ShadiHlaar,
    [Characters.ShilliAkehurst]: ShilliAkehurst,
    [Characters.TanaHlaar]: TanaHlaar,
    [Characters.Tarluk]: Tarluk,
    [Characters.TrevanaArklight]: TrevanaArklight,
    [Characters.ValHlaar]: ValHlaar,
    [Characters.Vorix]: Vorix,
    [Characters.YuelaHlaar]: YuelaHlaar,
    [Characters.YumiHlaar]: YumiHlaar,
    [Characters.ZeenelHlaar]: ZeenelHlaar,
    [Characters.ZildaHlaar]: ZildaHlaar,
    [Characters.ZumiHlaar]: ZumiHlaar,
};