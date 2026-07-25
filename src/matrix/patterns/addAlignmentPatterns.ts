import {QRMatrixCanvas, QRVersion} from "../../types";
import {alignmentPatternLocations} from "../../datasets";

export function addAlignmentPatterns(qrMatrixCanvas: QRMatrixCanvas, version: QRVersion, size: number): QRMatrixCanvas {
    const alignmentPatternTemplate: Array<Array<number>> = [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1]
    ];

    const alignmentPatterns: number[] | undefined = alignmentPatternLocations[version!];

    // If no alignment patterns are needed, return the matrix as is
    if (!alignmentPatterns || alignmentPatterns.length === 0) return qrMatrixCanvas;

    console.log("Alignment pattern locations for version", version, ":", alignmentPatterns);

    for (let i = 0; i < alignmentPatterns!.length; i++) {
        for (let j = 0; j < alignmentPatterns!.length; j++) {
            const centerX: number = alignmentPatterns![i]!;
            const centerY: number = alignmentPatterns![j]!;

            /**
             * Skip if this would overlap with finder patterns
             * Finder patterns are at (0,0), (0, size-7), and (size-7, 0)
             */
            if ((centerX < 9 && centerY < 9) ||                    // Top-left finder
                (centerX < 9 && centerY > size - 10) ||            // Bottom-left finder  
                (centerX > size - 10 && centerY < 9)) {            // Top-right finder
                    // TODO: Verify necessity of this check
                    console.log(`Skipping alignment pattern at (${centerX}, ${centerY}) due to overlap with finder pattern.`);
                    continue;
            }

            // Place the 5x5 alignment pattern centered at (centerX, centerY)
            for (let x = 0; x < 5; x++) {
                for (let y = 0; y < 5; y++) {
                    const matrixX = centerX - 2 + x; // Offset by 2 to center the pattern
                    const matrixY = centerY - 2 + y; // Offset by 2 to center the pattern
                    
                    // Ensure we're within matrix bounds
                    if (matrixX >= 0 && matrixX < size && matrixY >= 0 && matrixY < size) {
                        // Place the alignment pattern modules in the matrix
                        qrMatrixCanvas.matrix[matrixY]![matrixX]! = alignmentPatternTemplate[y]![x]!;
                        // Reserve the alignment pattern in the reserved matrix
                        qrMatrixCanvas.reservedMatrix[matrixY]![matrixX]! = true;
                    }
                }
            }
        }
    }

    // Return the updated QR matrix canvas
    return qrMatrixCanvas;
}

export default addAlignmentPatterns;