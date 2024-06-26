function Merge-Objects {
    [CmdletBinding()]
    param (
        [Parameter(Mandatory = $true)]
        [PSCustomObject]$Object1,

        [Parameter(Mandatory = $true)]
        [PSCustomObject]$Object2
    )

    $Object1.PSObject.Properties | ForEach-Object {
        $key = $_.Name
        $value1 = $_.Value

        if ($Object2.PSObject.Properties.Name -contains $key) {
            $value2 = $Object2.$key
            if ($value1 -is [PSCustomObject] -and $value2 -is [PSCustomObject]) {
                Merge-Objects -Object1 $value1 -Object2 $value2
            }
            else {
                $Object1.$key = $value2
            }
        }
    }

    $Object2.PSObject.Properties | ForEach-Object {
        $key = $_.Name
        if ($Object1.PSObject.Properties.Name -notcontains $key) {
            $value = $_.Value
            $Object1 | Add-Member -MemberType $_.MemberType -Name $key -Value $value -Force
        }
    }

    return $Object1
}

$alwaysIncludeNames = @("Fujimori", "Novák", "Sagedew", "Logstead", "Bryne", "Eriksdotter", "Hlaar")

function UpdateOrCreateDataFile ($folder) {
    try {
        $pathName = $folder.Name
        $fileName = $pathName -replace "_", "" -replace ",", ""
        $id = $fileName.Substring(0, 1).ToLower() + $fileName.Substring(1)
        $fullName = $pathName -replace "_", " " -replace ",", " "

        $splitName = $pathName -split ',(?=[^,]*$)'
        
        $firstNames = $splitName[0] -split ","
        $lastNames = $splitName[1] -split "_"

        $characterName = $firstNames[0]

        if ($lastNames.Length -eq 1) {
            $characterName += " " + $lastNames[0]
        }
        else {
            foreach ($name in $lastNames) {
                if ($alwaysIncludeNames -contains $name) {
                    $characterName += " " + $name
                }
            }
        }
        

        $dataFilePath = Join-Path -Path $folder.FullName -ChildPath "${pathName}.data.json"

        $dataFileContent = [PSCustomObject]@{
            "id"         = "id"
            "path"       = "path"
            "name"       = "name"
            "player"     = "tsuzumi"
            "fullName"   = "fullName"
            "firstName"  = "firstName"
            "lastName"   = "lastName"
            "data"       = @{
                "race"        = "race"
                "gender"      = "gender"
                "age"         = "age"
                "orientation" = "orientation"
            }
            "appearance" = @{
                "text"   = "text"
                "eyes"   = "eyes"
                "hair"   = "hair"
                "skin"   = "skin"
                "height" = "height"
                "weight" = "weight"
            }
            "bio"        = "text"
        }

        # Check if the data file already exists
        if (Test-Path $dataFilePath) {
            # Convert the existing data from JSON
            $existingData = Get-Content -Path $dataFilePath | ConvertFrom-Json

            $dataFileContent = Merge-Objects -Object1 $dataFileContent -Object2 $existingData
        }

        # Set metadata
        $dataFileContent.id = $id
        $dataFileContent.path = $pathName
        $dataFileContent.name = $characterName
        $dataFileContent.fullName = $fullName
        $dataFileContent.firstName = $firstNames
        $dataFileContent.lastName = $lastNames

        # Convert the updated data back to JSON
        $dataFileContent = $dataFileContent | ConvertTo-Json -Depth 100 -EscapeHandling Default

        # Save the data to the data file
        $dataFileContent | Set-Content -Path $dataFilePath -Encoding UTF8
        
        # Assuming $pathName is the folder name and the image follows the pattern: FolderName.treeAvatar.jpg
        $imageFileName = $folder.Name + ".treeAvatar.jpg"
        $imageFilePath = Join-Path -Path $folder.FullName -ChildPath $imageFileName
        $folderImageFilePath = Join-Path -Path $folder.FullName -ChildPath "folder.jpg"

        # Check if the image file exists
        if (Test-Path $imageFilePath) {
            # Remove any existing folder.jpg to avoid conflicts
            if (Test-Path $folderImageFilePath) {
                Remove-Item $folderImageFilePath -Force
            }

            # Copy and rename the image file to folder.jpg
            Copy-Item -Path $imageFilePath -Destination $folderImageFilePath

            # Refresh the folder to show changes if needed
            # $shell = New-Object -ComObject Shell.Application
            # $folderItem = $shell.Namespace($folder.FullName)
            # $folderItem.Self.InvokeVerb("Refresh")
        }
        else {
            Write-Host "Image file $imageFileName not found in folder $pathName"
        }
    }
    catch {
        Write-Host "An error occurred for folder ${folder}: $_"
    }
}
