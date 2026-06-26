import { ImageSpecs } from "../../data_structures/types/ImageSpecs";
import drawCircleModule from "../draw/drawCircleModule";
import drawSquareModule from "../draw/drawSquareModule";
import isReserved from "../geometry/isReserved";
import { QRVersion } from "../../data_structures/types/ConstantTypes/QRVersion";
import { QR_ELEMENT_SHAPE } from "../../data_structures/constants/QR_ELEMENT_SHAPE";
import { ShapeLocation } from "../../data_structures/types/ShapeLocation";
import drawRoundedModule from "../draw/drawRoundedModule";
import { Radiuses } from "../../data_structures/types/Radiuses";

function renderDataStream(matrix: Array<Array<number>>, matrixCtx: CanvasRenderingContext2D, size: number, moduleSize: number, imageSpecs: ImageSpecs, radius: number, version: QRVersion, finderPatterns: Array<ShapeLocation>, alignmentPatterns: Array<ShapeLocation>): HTMLCanvasElement {
    const dataColor = imageSpecs.moduleColor;
    const bgColor = imageSpecs.backgroundColor;

    switch (imageSpecs.moduleShape) {
        case QR_ELEMENT_SHAPE.SQUARE:
            // Draw square modules
            for (let row = 0; row < size; row++) {
                for (let col = 0; col < size; col++) {
                    if (!isReserved(col, row, size, version, finderPatterns, alignmentPatterns)) {
                        matrixCtx.fillStyle = matrix[row]![col]! ? dataColor : bgColor;
                        drawSquareModule(
                            matrixCtx,
                            col * moduleSize,
                            row * moduleSize,
                            moduleSize
                        );
                    }
                }
            }
            break;
        case QR_ELEMENT_SHAPE.CIRCLE:
            // Draw circle modules
            for (let row = 0; row < size; row++) {
                for (let col = 0; col < size; col++) {
                    if (!isReserved(col, row, size, version, finderPatterns, alignmentPatterns)) {
                        matrixCtx.fillStyle = matrix[row]![col]! ? dataColor : bgColor;
                        drawCircleModule(
                            matrixCtx,
                            col * moduleSize,
                            row * moduleSize,
                            moduleSize / 2
                        );
                    }
                }
            }
            break;
        case QR_ELEMENT_SHAPE.ROUNDED:
            for (let row = 0; row < size; row++) {
                for (let col = 0; col < size; col++) {
                    if (!isReserved(col, row, size, version, finderPatterns, alignmentPatterns)) {
                        // Creating radiuses
                        const radiuses: Radiuses = {
                            topLeft: 0,
                            topRight: 0,
                            bottomRight: 0,
                            bottomLeft: 0
                        };

                        // Top left corner - round if there's no black module above OR to the left
                        if ((row === 0 || matrix[row-1][col] === 0) && (col === 0 || matrix[row][col-1] === 0)) {
                            radiuses.topLeft = radius;
                        }
        
                        // Top right corner - round if there's no black module above OR to the right
                        if ((row === 0 || matrix[row-1][col] === 0) && (col === size-1 || matrix[row][col+1] === 0)) {
                            radiuses.topRight = radius;
                        }
        
                        // Bottom right corner - round if there's no black module below OR to the right
                        if ((row === size-1 || matrix[row+1][col] === 0) && (col === size-1 || matrix[row][col+1] === 0)) {
                            radiuses.bottomRight = radius;
                        }
        
                        // Bottom left corner - round if there's no black module below OR to the left
                        if ((row === size-1 || matrix[row+1][col] === 0) && (col === 0 || matrix[row][col-1] === 0)) {
                            radiuses.bottomLeft = radius;
                        }

                        matrixCtx.fillStyle = matrix[row]![col]! ? dataColor : bgColor;
                        drawRoundedModule(
                            matrixCtx,
                            col * moduleSize,
                            row * moduleSize,
                            moduleSize,
                            radiuses
                        );
                    }
                }
            }
            break;
    }

    return matrixCtx.canvas;
}

export default renderDataStream;