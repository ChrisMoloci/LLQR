// import { ShapeLocation } from "../../types/ShapeLocation";
// import { QRVersion } from "../../api/exports/types";


import {QRVersion} from "../../types/constantTypes";
import {ShapeLocation} from "../../types";

// Checks if an area is reserved (that means that that part was already drawn)
export function isReserved(x: number, y: number, size: number, version: QRVersion, finderPatterns: Array<ShapeLocation>, alignmentPatterns: Array<ShapeLocation>): boolean {
    // Check finder patterns
    if (finderPatterns.some(finderPattern => {
        return x >= finderPattern.x && x <= finderPattern.x2 && 
            y >= finderPattern.y && y <= finderPattern.y2
    })) {
        return true;
    }

    // Check alignment patterns
    if (alignmentPatterns && alignmentPatterns.some(alignmentPattern => {
        return x >= alignmentPattern.x && x <= alignmentPattern.x2 &&
            y >= alignmentPattern.y && y <= alignmentPattern.y2
    })) {
        return true;
    }

    // If neither finder nor alignment patterns are matched, return false
    return false;
}

export default isReserved;