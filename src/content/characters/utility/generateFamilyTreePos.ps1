# Path to the original JSON file
$characterListPath = "I:\Aegis\aegis-web-app\public\CharacterList.json"

# Load the content of the JSON file and convert to an array of objects
$characterArray = Get-Content -Path $characterListPath | ConvertFrom-Json

# Use an ordered hashtable
$idNameHashtable = [ordered]@{}

foreach ($character in $characterArray) {
    # Use the 'id' property of each character object as a key in the hashtable
    $idNameHashtable[$character.id] = @{
        "x" = 0
        "y" = 0
    }
}

# Convert ordered hashtable to JSON
$idNameJson = $idNameHashtable | ConvertTo-Json -Depth 100 -EscapeHandling Default

# Specify where you want to save the new JSON file
$finalJsonFilePath = "I:\Aegis\aegis-web-app\public\HlaarFamilyTreePos.json"

# Save the JSON file
#Disabled for safety
#$idNameJson | Set-Content -Path $finalJsonFilePath -Encoding UTF8