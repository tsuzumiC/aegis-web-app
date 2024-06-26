import { XYPosition } from "components/flowchart/utility/NodeUtility";

export interface INodePosition extends XYPosition {
    parentId?: string;
}

export interface INodePositions {
    [key: string]: INodePosition;
}

const getAbsolutePosition = (
    characterId: string,
    characters: INodePositions,
    cache = {} as INodePositions
): INodePosition => {
    if (cache[characterId]) {
        return cache[characterId];
    }

    const character = characters[characterId];

    if (!character) {
        return { x: 0, y: 0 };
    }

    if (!character.parentId) {
        cache[characterId] = {
            ...character,
            x: character.x,
            y: character.y ?? 0,
        };
        return cache[characterId];
    }

    const parentPos = getAbsolutePosition(
        character.parentId,
        characters,
        cache
    );

    const absolutePos = {
        ...character,
        x: parentPos.x + character.x,
        y: (parentPos.y ?? 0) + (character.y ?? 0),
    };

    cache[characterId] = absolutePos;
    return absolutePos;
};

export const computeAbsolutePositions = (characters: INodePositions) => {
    const result = {} as INodePositions;
    for (let charId in characters) {
        result[charId] = getAbsolutePosition(charId, characters);
    }
    return result;
};
