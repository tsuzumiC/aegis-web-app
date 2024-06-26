import { Node } from "reactflow";

export interface XYPosition {
    x: number;
    y?: number;
}

export interface CustomNode<T = any> extends Omit<Node<T>, "position"> {
    position: XYPosition;
}

export const multiplyPosition = (
    position: XYPosition,
    multiplier = 50
): XYPosition => ({
    x: position.x * multiplier,
    y: position.y !== undefined ? position.y * multiplier : undefined,
});
