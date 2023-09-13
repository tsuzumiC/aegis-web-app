$sourceDirectory = "G:\Dropbox\RP\Aegis\Characters\Hlaar Family"

$sourceFolders = Get-ChildItem -Path $sourceDirectory -Directory

$idNameArray = @()

foreach ($folder in $sourceFolders) {
    $path = $folder.Name
    $dataFilePath = Join-Path -Path $folder.FullName -ChildPath "${path}.data.json"
    
    if (Test-Path $dataFilePath) {
        $data = Get-Content -Path $dataFilePath | ConvertFrom-Json 

        $idNameArray += [PSCustomObject]@{
            "id"   = $data.id
            "name" = $data.fullName
            "path" = $data.path
        }
    }
}

$idNameJson = $idNameArray | ConvertTo-Json -Depth 100 -EscapeHandling Default

$finalJsonFilePath = "I:\Aegis\aegis-web-app\public\CharacterList.json"

$idNameJson | Set-Content -Path $finalJsonFilePath -Encoding UTF8