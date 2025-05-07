. "I:\Aegis\aegis-web-app\src\content\event\utility\generateEventFileUtils.ps1"
# Main script body
$sourceDirectory = "G:\Dropbox\RP\Aegis\Characters\Hlaar Family"
$sourceFolders = Get-ChildItem -Path $sourceDirectory -Directory

foreach ($folder in $sourceFolders) {
    UpdateOrCreateEventFile -folder $folder
}