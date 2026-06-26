// import { ShapeLocation } from "../../types/ShapeLocation";
// import { alignmentPatternLocations } from "../../datasets/alignmentPatternLocations";
// import { QRVersion } from "../../api/exports/types";

import {QRVersion} from "../../types/constantTypes";
import {ShapeLocation} from "../../types";
import {alignmentPatternLocations} from "../../datasets";

export function computeAlignmentPatternsLocations(size: number, version: QRVersion): Array<ShapeLocation> {
    const alignmentPatterns = alignmentPatternLocations[version]?.flatMap(coord1 => {
        return alignmentPatternLocations[version]!
            .filter(coord2 =>
                !(
                    (coord1 < 9 && coord2 < 9) || // Top-left finder
                    (coord1 > size - 10 && coord2 < 9) || // Top-right finder
                    (coord1 < 9 && coord2 > size - 10) // Bottom-left finder  
                )
            )
            .map(coord2 => {
                return { x: coord1 - 2, y: coord2 - 2, x2: coord1 + 2, y2: coord2 + 2 };
            });
        });

    return alignmentPatterns == undefined ? [] : alignmentPatterns;
}

export default computeAlignmentPatternsLocations;