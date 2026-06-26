import { ShapeLocation } from "../../types/ShapeLocation";

function computeFinderPatternsLocations(size: number): Array<ShapeLocation> {
    // Only compute once
    return [
        { x: 0, y: 0, x2: 6, y2: 6 }, // Top Left
        { x: size - 7, y: 0, x2: size - 1, y2: 6 }, // Top Right
        { x: 0, y: size - 7, x2: 6, y2: size - 1 } // Bottom Left
    ];
}

export default computeFinderPatternsLocations;