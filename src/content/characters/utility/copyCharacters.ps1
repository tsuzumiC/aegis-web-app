

$sourceDirectory = "G:\Dropbox\RP\Aegis\Characters\Hlaar Family"
$destinationDirectory = "I:\Aegis\aegis-web-app\public\characters"
$filePatterns = "*.ref.jpg", "*.treeAvatar.jpg", "*.data.json" 

# Get a list of folders in the source directory
$sourceFolders = Get-ChildItem -Path $sourceDirectory -Directory

foreach ($folder in $sourceFolders) {
    $folderName = $folder.Name
    $destinationFolderPath = Join-Path -Path $destinationDirectory -ChildPath $folderName
    New-Item -Path $destinationFolderPath -ItemType Directory -Force
    
    # Get all files from the source folder and then filter using Where-Object
    $filesToCopy = Get-ChildItem -Path $folder.FullName -File | Where-Object {
        $_.Name -like $filePatterns[0] -or
        $_.Name -like $filePatterns[1] -or
        $_.Name -like $filePatterns[2]

    }
    
    foreach ($file in $filesToCopy) {
        $destinationFilePath = Join-Path -Path $destinationFolderPath -ChildPath $file.Name
        Copy-Item -Path $file.FullName -Destination $destinationFilePath
    }
}