$sourceDirectory = "G:\Dropbox\RP\Aegis\Characters\Hlaar Family"

$sourceFolders = Get-ChildItem -Path $sourceDirectory -Directory

foreach ($folder in $sourceFolders) {
    $path = $folder.Name
    $fileName = $path -replace "_", ""
    $id = $fileName.Substring(0, 1).ToLower() + $fileName.Substring(1)
    $characterName = $path -replace "_", " "

    $fileContent = @"
{
    "id": "$id",
    "path": "$path",
    "name": "$characterName",
    "type": "",
    "gender": "",
    "avatar": {
        "ref": "/characters/$path/${path}_treeAvatar.jpg",
        "alt": "$characterName"
    },
    "mainImage": {
        "ref": "/characters/$path/${path}_ref.jpg",
        "alt": "$characterName"
    }
}
"@
    $filePath = Join-Path -Path $folder.FullName -ChildPath "${path}_data.json"
    $fileContent | Set-Content -Path $filePath
}
