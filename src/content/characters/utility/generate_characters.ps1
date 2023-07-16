$characters = @{
    Alani_Hlaar     = "Alani Hlaar"
    Amber_Hlaar     = "Amber Hlaar"
    Annie_Hlaar     = "Annie Hlaar"
    Azmah           = "Azmah"
    Cica_Hlaar      = "Cica Hlaar"
    Emily_Hlaar     = "Emily Hlaar"
    Gawen_Hlaar     = "Gawen Hlaar"
    Ginger_Hlaar    = "Ginger Hlaar"
    Gwain_Hlaar     = "Gwain Hlaar"
    Haru_Hlaar      = "Haru Hlaar"
    Hira_Hlaar      = "Hira Hlaar"
    Julie_Hlaar     = "Julie Hlaar"
    Kimi_Hlaar      = "Kimi Hlaar"
    Lael_Caerl      = "Lael Caerl"
    Lin_Hlaar       = "Lin Hlaar"
    Lola_Hlaar      = "Lola Hlaar"
    Marnie_Bryne    = "Marnie Bryne"
    Meila_Hlaar     = "Meila Hlaar"
    Mika_Hlaar      = "Mika Hlaar"
    Nuala_Hlaar     = "Nuala Hlaar"
    Risaria         = "Risaria"
    Robin_Hemingway = "Robin Hemingway"
    Rosie_Hlaar     = "Rosie Hlaar"
    Saya_Hlaar      = "Saya Hlaar"
    Seori           = "Seori"
    Shilli_Akehurst = "Shilli Akehurst"
    Tana_Hlaar      = "Tana Hlaar"
    Tarluk          = "Tarluk"
    Val_Hlaar       = "Val Hlaar"
    Yuela_Hlaar     = "Yuela Hlaar"
    Yumi_Hlaar      = "Yumi Hlaar"
    Zeenel_Hlaar    = "Zeenel Hlaar"
}

foreach ($character in $characters.GetEnumerator()) {
    $characterName = $character.Value 
    $fileName = $character.Key -replace " ", ""
    $imagePath = $character.Key
    $fileContent = @"
import { ICharacter } from "./Characters";

const ${fileName}: ICharacter = {
  name: "$characterName",
  avatar: { ref: "/hlaar/${imagePath}_treeAvatar.jpg", alt: "$characterName" },
  mainImage: { ref: "/hlaar/${imagePath}.jpg", alt: "$characterName" }
};

export default ${fileName};
"@
    $fileContent | Out-File "$fileName.ts" -Encoding UTF8
}

Write-Output "All characters have been created."