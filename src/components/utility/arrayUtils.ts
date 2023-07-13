export const arrayMoveTo = <T>(source: T[], from: number, to: number): T[] => {
    const item = source[from];

    const tempArray = [...source];
    tempArray.splice(from, 1);
    tempArray.splice(to, 0, item);

    return tempArray;
};

export const arrayMoveManyTo = <T>(
    source: T[],
    from: number,
    to: number,
    amount: number,
): T[] => {
    const tempArray = [...source];
    const items = tempArray.splice(from, amount);
    tempArray.splice(to, 0, ...items);

    return tempArray;
};

export type Infer<T> = T extends (infer U)[] ? U : T;
