$scriptDirectory = Split-Path -Parent $MyInvocation.MyCommand.Path

$path = (Get-Item -Path $scriptDirectory).Name
$fileName = $path -replace "_", "" -replace ",", ""
$id = $fileName.Substring(0, 1).ToLower() + $fileName.Substring(1)
$fullName = $path -replace "_", " " -replace ",", " "

$splitName = $path -split ',(?=[^,]*$)'

$firstNames = $splitName[0] -split ","
$lastNames = $splitName[1] -split "_"

$lastIndex = $lastNames.Length - 1
$characterName = $firstNames[0] + " " + $lastNames[$lastIndex]

$dataFileContent = [PSCustomObject]@{
    "id"         = $id
    "path"       = $path
    "name"       = $characterName
    "fullName"   = $fullName
    "firstName"  = $firstNames
    "lastName"   = $lastNames
    "appearance" = "wip"
    "bio"        = "wip"
} | ConvertTo-Json -Depth 100 -EscapeHandling Default

$dataFilePath = Join-Path -Path $scriptDirectory -ChildPath "${path}.data.json"
$dataFileContent | Set-Content -Path $dataFilePath -Encoding UTF8


