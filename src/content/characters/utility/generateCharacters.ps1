$characters = @{
    Alani_And_Annie_Hlaar = "Alani And Annie Hlaar"
    Amber_Hlaar           = "Amber Hlaar"
    Ayenda                = "Ayenda"
    Azmah                 = "Azmah"
    Celine_Hlaar          = "Celine Hlaar"
    Chole_Hlaar           = "Chole Hlaar"
    Cica_Hlaar            = "Cica Hlaar"
    Elalie_Hlaar          = "Elalie Hlaar"
    Emily_Hlaar           = "Emily Hlaar"
    Erica_Arklight        = "Erica Arklight"
    Esfir                 = "Esfir"
    Fanaa_Hlaar           = "Fanaa Hlaar"
    Fylae_Hlaar           = "Fylae Hlaar"
    Gawen_And_Gwain_Hlaar = "Gawen And Gwain Hlaar"
    Ghan                  = "Ghan"
    Ginger_Hlaar          = "Ginger Hlaar"
    Haru_Hlaar            = "Haru Hlaar"
    Hira_Hlaar            = "Hira Hlaar"
    Isis_Brooks           = "Isis Brooks"
    Julie_Hlaar           = "Julie Hlaar"
    Katy_Hlaar            = "Katy Hlaar"
    Kimi_Hlaar            = "Kimi Hlaar"
    Lael_Caerl            = "Lael Caerl"
    Leiwa_Hlaar           = "Leiwa Hlaar"
    Lily_Hlaar            = "Lily Hlaar"
    Lin_Hlaar             = "Lin Hlaar"
    Lola_Hlaar            = "Lola Hlaar"
    Marnie_Bryne          = "Marnie Bryne"
    Meila_Hlaar           = "Meila Hlaar"
    Miikeeno              = "Miikeeno"
    Mika_Hlaar            = "Mika Hlaar"
    Naamah_Hlaar          = "Naamah Hlaar"
    Nish                  = "Nish"
    Nuala_Hlaar           = "Nuala Hlaar"
    Rika                  = "Rika"
    Risaria               = "Risaria"
    Robin_Hemingway       = "Robin Hemingway"
    Rosie_Hlaar           = "Rosie Hlaar"
    Saya_Hlaar            = "Saya Hlaar"
    Scarlet_Hlaar         = "Scarlet Hlaar"
    Seori                 = "Seori"
    Shadi_Hlaar           = "Shadi Hlaar"
    Shilli_Akehurst       = "Shilli Akehurst"
    Tana_Hlaar            = "Tana Hlaar"
    Tarluk                = "Tarluk"
    Trevana_Arklight      = "Trevana Arklight"
    Val_Hlaar             = "Val Hlaar"
    Vorix                 = "Vorix"
    Yuela_Hlaar           = "Yuela Hlaar"
    Yumi_Hlaar            = "Yumi Hlaar"
    Zeenel_Hlaar          = "Zeenel Hlaar"
    Zilda_Hlaar           = "Zilda Hlaar"
    Zumi_Hlaar            = "Zumi Hlaar"
}

$pairCharacters = @{
    Alani_And_Annie_Hlaar = @( 
        @{ Alani_And_Annie_Hlaar = "Alani And Annie Hlaar" },
        @{ Alani_Hlaar = "Alani Hlaar" },
        @{ Annie_Hlaar = "Annie Hlaar" }
    )
    Gawen_And_Gwain_Hlaar = @(
        @{ Gawen_And_Gwain_Hlaar = "Gawen And Gwain Hlaar" },
        @{ Gawen_Hlaar = "Gawen Hlaar" },
        @{ Gwain_Hlaar = "Gwain Hlaar" }
    )
}

$characters.GetEnumerator() | ForEach-Object {
    $characterKey = $_.Key
    $characterName = $_.Value
    $fileName = $characterKey -replace "_", ""
    $id = $fileName.Substring(0, 1).ToLower() + $fileName.Substring(1) 
    $pairCharacterList = $pairCharacters[$characterKey]
    
    if ($pairCharacterList) {
        $pairCharacterList | ForEach-Object {
            $pairCharacter = $_
            $pairCharacterKey = $pairCharacter.Keys[0]
            $pairCharacterName = $pairCharacter.Values[0]
            $pairFileName = $pairCharacterKey -replace "_", ""
            $pairId = $pairFileName.Substring(0, 1).ToLower() + $pairFileName.Substring(1)
            $pairFileContent = @"
import { ICharacter } from "../Characters";

const ${pairFileName}: ICharacter = {
  id: "$pairId",
  name: "$pairCharacterName",
  avatar: { ref: "/characters/$characterKey/${pairCharacterKey}_treeAvatar.jpg", alt: "$pairCharacterName" },
  mainImage: { ref: "/characters/$characterKey/${pairCharacterKey}_ref.jpg", alt: "$pairCharacterName" }
};

export default ${pairFileName};
"@
            $pairFileContent | Out-File "$pairFileName.ts" -Encoding UTF8
        }
    }

    $fileContent = @"
import { ICharacter } from "../Characters";

const ${fileName}: ICharacter = {
  id: "$id",
  name: "$characterName",
  avatar: { ref: "/characters/${characterKey}/${characterKey}_treeAvatar.jpg", alt: "$characterName" },
  mainImage: { ref: "/characters/${characterKey}/${characterKey}_ref.jpg", alt: "$characterName" }
};

export default ${fileName};
"@
    $fileContent | Out-File "$fileName.ts" -Encoding UTF8
}

Write-Output "All characters have been created."