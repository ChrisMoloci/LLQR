// import { ShapeLocation } from "../../types/ShapeLocation";
// import { QR_ELEMENT_SHAPE } from "../../api/exports/constants";
// import { ImageSpecs } from "../../api/exports/types";
// import drawCircleModule from "../draw/drawCircleModule";
// import drawRoundedModule from "../draw/drawRoundedModule";
// import drawSquareModule from "../draw/drawSquareModule";

import {ImageSpecs, ShapeLocation} from "../../types";
import {QR_ELEMENT_SHAPE} from "../../constants";
import {drawCircleModule, drawRoundedModule, drawSquareModule} from "../.";

export function renderFinderPatterns(matrixCtx: CanvasRenderingContext2D, finderPatterns: Array<ShapeLocation>, size: number, moduleSize: number, imageSpecs: ImageSpecs, radius: number): HTMLCanvasElement {
    // Get the colors
    const outlineColor = imageSpecs.finderPatternOutlineColor;

    const innerColor = imageSpecs.finderPatternInnerColor;

    for (let i = 0; i < 3; i++) {
        const finderPatternLocation = finderPatterns[i]!;

        // Set the CTX fill color to outline color
        matrixCtx.fillStyle = outlineColor[i];

        // Draw the outline and background
        switch (imageSpecs.finderPatternOutlineShapes[i]) {
            case QR_ELEMENT_SHAPE.SQUARE:
                drawSquareModule(
                    matrixCtx, 
                    finderPatternLocation.x * moduleSize,
                    finderPatternLocation.y * moduleSize,
                    moduleSize * 7
                );
                break;
            case QR_ELEMENT_SHAPE.CIRCLE:
                drawCircleModule(
                    matrixCtx, 
                    finderPatternLocation.x * moduleSize,
                    finderPatternLocation.y * moduleSize,
                    moduleSize * 7 / 2,
                );
                break;
            case QR_ELEMENT_SHAPE.ROUNDED:
                drawRoundedModule(
                    matrixCtx, 
                    finderPatternLocation.x * moduleSize,
                    finderPatternLocation.y * moduleSize,
                    moduleSize * 7,
                    radius
                );
                break;
        }

        // Draw finder pattern inner background
        matrixCtx.fillStyle = imageSpecs.finderPatternInnerBackgroundColor[i];
        switch (imageSpecs.finderPatternInnerBackgroundShapes[i]) {
            case QR_ELEMENT_SHAPE.SQUARE:
                drawSquareModule(
                    matrixCtx, 
                    (finderPatternLocation.x * moduleSize) + moduleSize,
                    (finderPatternLocation.y * moduleSize) + moduleSize,
                    moduleSize * 5
                );
                break;
            case QR_ELEMENT_SHAPE.CIRCLE:
                drawCircleModule(
                    matrixCtx, 
                    (finderPatternLocation.x * moduleSize) + moduleSize,
                    (finderPatternLocation.y * moduleSize) + moduleSize,
                    moduleSize * 5 / 2,
                );
                break;
            case QR_ELEMENT_SHAPE.ROUNDED:
                drawRoundedModule(
                    matrixCtx, 
                    (finderPatternLocation.x * moduleSize) + moduleSize,
                    (finderPatternLocation.y * moduleSize) + moduleSize,
                    moduleSize * 5,
                    radius
                );
                break;
        }

        // Draw the inner area of the finder patterns
        matrixCtx.fillStyle = innerColor[i];
        switch (imageSpecs.finderPatternInnerShapes[i]) {
            case QR_ELEMENT_SHAPE.SQUARE:
                drawSquareModule(
                    matrixCtx, 
                    (finderPatternLocation.x * moduleSize) + (2 * moduleSize),
                    (finderPatternLocation.y * moduleSize) + (2 * moduleSize),
                    moduleSize * 3
                );
                break;
            case QR_ELEMENT_SHAPE.CIRCLE:
                drawCircleModule(
                    matrixCtx, 
                    (finderPatternLocation.x * moduleSize) + (2 * moduleSize),
                    (finderPatternLocation.y * moduleSize) + (2 * moduleSize),
                    (moduleSize * 3) / 2,
                );
                break;
            case QR_ELEMENT_SHAPE.ROUNDED:
                drawRoundedModule(
                    matrixCtx, 
                    (finderPatternLocation.x * moduleSize) + (2 * moduleSize),
                    (finderPatternLocation.y * moduleSize) + (2 * moduleSize),
                    moduleSize * 3,
                    radius
                );
                break;
        }
    }

    return matrixCtx.canvas;
}

export default renderFinderPatterns;