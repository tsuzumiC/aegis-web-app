import { Characters, TCharacters } from "../Characters";

const characterIds: { [K in TCharacters]: string } = {} as any;

for (const character in Characters) {
    const key = character as TCharacters;
    characterIds[key] = character[0].toLowerCase() + character.slice(1);
}

console.log("Generated CharacterIds:");
console.log(characterIds);
