import { ShapeLocation } from "../../data_structures/types/ShapeLocation";
import { QR_ELEMENT_SHAPE } from "../../data_structures/constants/QR_ELEMENT_SHAPE";
import { ImageSpecs } from "../../data_structures/types/ImageSpecs";
import drawCircleModule from "../draw/drawCircleModule";
import drawRoundedModule from "../draw/drawRoundedModule";
import drawSquareModule from "../draw/drawSquareModule";
import { QRVersion } from "../../data_structures/types/QRSpecTypes/QRVersion";

function renderAlignmentPatterns(matrixCtx: CanvasRenderingContext2D, alignmentPatterns: Array<ShapeLocation>, finderPatterns: Array<ShapeLocation>, size: number, moduleSize: number, imageSpecs: ImageSpecs, radius: number, version: QRVersion): HTMLCanvasElement {
    // Colors
    const outlineColor = imageSpecs.alignmentPatternOutlineColor;
    const backgroundColor = imageSpecs.alignmentPatternInnerBackgroundColor;
    const innerColor = imageSpecs.alignmentPatternInnerColor;

    // Insert each alignment pattern
    for (const alignmentPatternLocation of alignmentPatterns) {
        // Draw the outline
        matrixCtx.fillStyle = outlineColor; // Set to outline color
        switch (imageSpecs.alignmentPatternOutlineShapes) {
            case QR_ELEMENT_SHAPE.SQUARE:
                drawSquareModule(
                    matrixCtx, 
                    alignmentPatternLocation.x * moduleSize,
                    alignmentPatternLocation.y * moduleSize,
                    moduleSize * 5
                );
                break;
            case QR_ELEMENT_SHAPE.CIRCLE:
                drawCircleModule(
                    matrixCtx, 
                    alignmentPatternLocation.x * moduleSize,
                    alignmentPatternLocation.y * moduleSize,
                    moduleSize * 5 / 2,
                );
                break;
            case QR_ELEMENT_SHAPE.ROUNDED:
                drawRoundedModule(
                    matrixCtx, 
                    alignmentPatternLocation.x * moduleSize,
                    alignmentPatternLocation.y * moduleSize,
                    moduleSize * 5,
                    radius
                );
                break;
        }

        // Draw the inner background
        matrixCtx.fillStyle = backgroundColor; // Set to background color
        switch (imageSpecs.alignmentPatternInnerBackgroundShapes) {
            case QR_ELEMENT_SHAPE.SQUARE:
                drawSquareModule(
                    matrixCtx, 
                    (alignmentPatternLocation.x * moduleSize) + moduleSize,
                    (alignmentPatternLocation.y * moduleSize) + moduleSize,
                    moduleSize * 3
                );
                break;
            case QR_ELEMENT_SHAPE.CIRCLE:
                drawCircleModule(
                    matrixCtx, 
                    (alignmentPatternLocation.x * moduleSize) + moduleSize,
                    (alignmentPatternLocation.y * moduleSize) + moduleSize,
                    moduleSize * 3 / 2,
                );
                break;
            case QR_ELEMENT_SHAPE.ROUNDED:
                drawRoundedModule(
                    matrixCtx, 
                    (alignmentPatternLocation.x * moduleSize) + moduleSize,
                    (alignmentPatternLocation.y * moduleSize) + moduleSize,
                    moduleSize * 3,
                    radius
                );
                break;
        }

        // Draw the inner area
        matrixCtx.fillStyle = innerColor; // Set to inner color
        switch (imageSpecs.alignmentPatternInnerShapes) {
            case QR_ELEMENT_SHAPE.SQUARE:
                drawSquareModule(
                    matrixCtx, 
                    (alignmentPatternLocation.x * moduleSize) + (2 * moduleSize),
                    (alignmentPatternLocation.y * moduleSize) + (2 * moduleSize),
                    moduleSize * 1
                );
                break;
            case QR_ELEMENT_SHAPE.CIRCLE:
                drawCircleModule(
                    matrixCtx, 
                    (alignmentPatternLocation.x * moduleSize) + (2 * moduleSize),
                    (alignmentPatternLocation.y * moduleSize) + (2 * moduleSize),
                    (moduleSize * 1) / 2,
                );
                break;
            case QR_ELEMENT_SHAPE.ROUNDED:
                drawRoundedModule(
                    matrixCtx, 
                    (alignmentPatternLocation.x * moduleSize) + (2 * moduleSize),
                    (alignmentPatternLocation.y * moduleSize) + (2 * moduleSize),
                    moduleSize * 1,
                    radius
                );
                break;
        }
    }

    return matrixCtx.canvas;
}

export default renderAlignmentPatterns;