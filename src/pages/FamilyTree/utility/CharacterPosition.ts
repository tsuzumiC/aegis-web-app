export interface INodePosition {
    x: number;
    y: number;
    parentId?: string;
}

export interface ICharacterPositions {
    [key: string]: INodePosition;
}

const getAbsolutePosition = (
    characterId: string,
    characters: ICharacterPositions,
    cache = {} as ICharacterPositions
): INodePosition => {
    if (cache[characterId]) {
        return cache[characterId];
    }

    const character = characters[characterId];

    if (!character) {
        return { x: 0, y: 0 };
    }

    if (!character.parentId) {
        cache[characterId] = { x: character.x, y: character.y };
        return cache[characterId];
    }

    const parentPos = getAbsolutePosition(
        character.parentId,
        characters,
        cache
    );

    const absolutePos = {
        x: parentPos.x + character.x,
        y: parentPos.y + character.y,
    };

    cache[characterId] = absolutePos;
    return absolutePos;
};

export const computeAbsolutePositions = (characters: ICharacterPositions) => {
    const result = {} as ICharacterPositions;
    for (let charId in characters) {
        result[charId] = getAbsolutePosition(charId, characters);
    }
    return result;
};
