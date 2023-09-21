import { XYPosition } from "react-flow-renderer";

export const multiplyPosition = (
    position: XYPosition,
    multiplier = 50
): XYPosition => ({
    x: position.x * multiplier,
    y: position.y * multiplier,
});
