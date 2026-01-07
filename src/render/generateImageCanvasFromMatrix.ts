import { getCurrentConfigs } from "../core/defineConfig";
import { alignmentPatternLocations } from "../datasets/alignmentPatternLocations";
import { ImageSpecs } from "../types";
import { QRELEMENTSHAPES } from "../enums";

let finderPatterns: { x: number, y: number, x2: number, y2: number }[]
let alignmentPatterns : { x: number, y: number, x2: number, y2: number }[];

function generateImageCanvasFromMatrix(matrix: Array<Array<number>>, pixelSize: number): HTMLCanvasElement {
    const imageSpecs: ImageSpecs = getCurrentConfigs().imageConfig;
    console.log("Generating Image from QR Matrix with Image Specs:", imageSpecs);
    
    // -- 1. Initial Calculations --
    const size = matrix.length;
    const version = (size - 21) / 4 + 1; // Compute the version (for convenience so it doesn't have to be passed in)
    console.log("Generating Image for QR Version:", version, "Matrix Size:", size);
    const moduleSize = Math.floor(pixelSize / (size + 8)); // 8 for quiet zone (4 per side)
    const safeAreaPixelSize = moduleSize * 4; // Total size including quiet zone
    const radius = Math.ceil(imageSpecs.roundness * (moduleSize / 2)); // Calculate radius based on module size
    pixelSize = (size * moduleSize) + (safeAreaPixelSize * 2); // Recalculate canvas size based on new module size
    console.log("Module Size:", moduleSize, "Radius:", radius, "Pixel Size:", pixelSize);

    // -- 2. Initialize the main canvas (includes quiet zone) --
    const mainCanvas = document.createElement("canvas");
    const mainCtx = mainCanvas.getContext("2d")!;

    mainCanvas.width = pixelSize;
    mainCanvas.height = pixelSize;

    // -- 3. Initialize the Matrix canvas (inside main canvas) --
    let matrixCanvas = document.createElement("canvas");
    const matrixCtx = matrixCanvas.getContext("2d")!;

    matrixCanvas.width = size * moduleSize;
    matrixCanvas.height = size * moduleSize;

    // -- 4. Render Background --

    // Main Canvas
    mainCtx.fillStyle = imageSpecs.backgroundColor; // Set background color
    mainCtx.fillRect(0, 0, mainCanvas.width, mainCanvas.height); // Fill entire canvas

    // Matrix Canvas
    matrixCtx.fillStyle = imageSpecs.backgroundColor; // Set background color
    matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height); // Fill entire canvas
    
    // -- 4. Render Finder Patterns --
    matrixCanvas = renderFinderPatterns(matrixCtx, size, moduleSize, imageSpecs, radius);
    console.log(matrixCanvas)

    // -- 5. Render Alignment Patterns --
    matrixCanvas = renderAlignmentPatterns(matrixCtx, size, moduleSize, imageSpecs, radius, version);
    console.log(isReserved(0, 0, size, version));

    // -- 6. Render Modules --
    matrixCanvas = renderDataStream(matrix, matrixCtx, size, moduleSize, imageSpecs, radius, version);

    // -- 7. Render Grid --

    // -- 8. Add the matrix canvas to the main canvas with quiet zone offset --
    mainCtx.drawImage(matrixCanvas, safeAreaPixelSize, safeAreaPixelSize);

    // -- 9. Return the canvas --
    return mainCanvas;
}

function renderFinderPatterns(matrixCtx: CanvasRenderingContext2D, size: number, moduleSize: number, imageSpecs: ImageSpecs, radius: number): HTMLCanvasElement {
    // Compute the finder pattern locations
    if (!finderPatterns) {
        finderPatterns = computeFinderPatternsLocations(size);
        console.log("Computed Finder Patterns:", finderPatterns);
    }

    // Get the colors
    const outlineColor = imageSpecs.finderPatternOutlineColor;
    const backgroundColor = imageSpecs.backgroundColor;
    const innerColor = imageSpecs.finderPatternInnerColor;

    for (let i = 0; i < 3; i++) {
        const finderPatternLocation = finderPatterns[i]!;

        // Set the CTX fill color to outline color
        matrixCtx.fillStyle = outlineColor[i];

        // Draw the outline and background
        switch (imageSpecs.finderPatternOutlineShapes[i]) {
            case QRELEMENTSHAPES.SQUARE:
                drawSquareModule(
                    matrixCtx, 
                    finderPatternLocation.x * moduleSize,
                    finderPatternLocation.y * moduleSize,
                    moduleSize * 7
                );
                break;
            case QRELEMENTSHAPES.CIRCLE:
                drawCircleModule(
                    matrixCtx, 
                    finderPatternLocation.x * moduleSize,
                    finderPatternLocation.y * moduleSize,
                    moduleSize * 7 / 2,
                );
                break;
            case QRELEMENTSHAPES.ROUNDED:
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
            case QRELEMENTSHAPES.SQUARE:
                drawSquareModule(
                    matrixCtx, 
                    (finderPatternLocation.x * moduleSize) + moduleSize,
                    (finderPatternLocation.y * moduleSize) + moduleSize,
                    moduleSize * 5
                );;
                break;
            case QRELEMENTSHAPES.CIRCLE:
                drawCircleModule(
                    matrixCtx, 
                    (finderPatternLocation.x * moduleSize) + moduleSize,
                    (finderPatternLocation.y * moduleSize) + moduleSize,
                    moduleSize * 5 / 2,
                );
                break;
            case QRELEMENTSHAPES.ROUNDED:
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
            case QRELEMENTSHAPES.SQUARE:
                drawSquareModule(
                    matrixCtx, 
                    (finderPatternLocation.x * moduleSize) + (2 * moduleSize),
                    (finderPatternLocation.y * moduleSize) + (2 * moduleSize),
                    moduleSize * 3
                );
                break;
            case QRELEMENTSHAPES.CIRCLE:
                drawCircleModule(
                    matrixCtx, 
                    (finderPatternLocation.x * moduleSize) + (2 * moduleSize),
                    (finderPatternLocation.y * moduleSize) + (2 * moduleSize),
                    (moduleSize * 3) / 2,
                );
                break;
            case QRELEMENTSHAPES.ROUNDED:
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

function renderAlignmentPatterns(matrixCtx: CanvasRenderingContext2D, size: number, moduleSize: number, imageSpecs: ImageSpecs, radius: number, version: number): HTMLCanvasElement {
    if (!finderPatterns) {
        finderPatterns = computeFinderPatternsLocations(size);
        console.log("Computed Finder Patterns:", finderPatterns);
    }
    if (!alignmentPatterns) {
        // Only compute once
        alignmentPatterns = computeAlignmentPatternsLocations(size, version);
        console.log("Computed Alignment Patterns:", alignmentPatterns);
    }

    // Colors
    const outlineColor = imageSpecs.alignmentPatternOutlineColor;
    const backgroundColor = imageSpecs.alignmentPatternInnerBackgroundColor;
    const innerColor = imageSpecs.alignmentPatternInnerColor;

    // Insert each alignment pattern
    for (const alignmentPatternLocation of alignmentPatterns) {
        // Draw the outline
        matrixCtx.fillStyle = outlineColor; // Set to outline color
        switch (imageSpecs.alignmentPatternOutlineShapes) {
            case QRELEMENTSHAPES.SQUARE:
                drawSquareModule(
                    matrixCtx, 
                    alignmentPatternLocation.x * moduleSize,
                    alignmentPatternLocation.y * moduleSize,
                    moduleSize * 5
                );
                break;
            case QRELEMENTSHAPES.CIRCLE:
                drawCircleModule(
                    matrixCtx, 
                    alignmentPatternLocation.x * moduleSize,
                    alignmentPatternLocation.y * moduleSize,
                    moduleSize * 5 / 2,
                );
                break;
            case QRELEMENTSHAPES.ROUNDED:
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
            case QRELEMENTSHAPES.SQUARE:
                drawSquareModule(
                    matrixCtx, 
                    (alignmentPatternLocation.x * moduleSize) + moduleSize,
                    (alignmentPatternLocation.y * moduleSize) + moduleSize,
                    moduleSize * 3
                );;
                break;
            case QRELEMENTSHAPES.CIRCLE:
                drawCircleModule(
                    matrixCtx, 
                    (alignmentPatternLocation.x * moduleSize) + moduleSize,
                    (alignmentPatternLocation.y * moduleSize) + moduleSize,
                    moduleSize * 3 / 2,
                );
                break;
            case QRELEMENTSHAPES.ROUNDED:
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
            case QRELEMENTSHAPES.SQUARE:
                drawSquareModule(
                    matrixCtx, 
                    (alignmentPatternLocation.x * moduleSize) + (2 * moduleSize),
                    (alignmentPatternLocation.y * moduleSize) + (2 * moduleSize),
                    moduleSize * 1
                );
                break;
            case QRELEMENTSHAPES.CIRCLE:
                drawCircleModule(
                    matrixCtx, 
                    (alignmentPatternLocation.x * moduleSize) + (2 * moduleSize),
                    (alignmentPatternLocation.y * moduleSize) + (2 * moduleSize),
                    (moduleSize * 1) / 2,
                );
                break;
            case QRELEMENTSHAPES.ROUNDED:
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

function renderDataStream(matrix: Array<Array<number>>, matrixCtx: CanvasRenderingContext2D, size: number, moduleSize: number, imageSpecs: ImageSpecs, radius: number, version: number): HTMLCanvasElement {
    const dataColor = imageSpecs.moduleColor;
    const bgColor = imageSpecs.backgroundColor;

    switch (imageSpecs.moduleShape) {
        case QRELEMENTSHAPES.SQUARE:
            // Draw square modules
            for (let row = 0; row < size; row++) {
                for (let col = 0; col < size; col++) {
                    if (!isReserved(col, row, size, version)) {
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
        case QRELEMENTSHAPES.CIRCLE:
            // Draw circle modules
            for (let row = 0; row < size; row++) {
                for (let col = 0; col < size; col++) {
                    if (!isReserved(col, row, size, version)) {
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
        case QRELEMENTSHAPES.ROUNDED:
            for (let row = 0; row < size; row++) {
                for (let col = 0; col < size; col++) {
                    if (!isReserved(col, row, size, version)) {
                        // Creating radiuses
                        const radiuses: Radiuses = {
                            topLeft: 0,
                            topRight: 0,
                            bottomRight: 0,
                            bottomLeft: 0
                        }

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

// Drawing Helper Functions

function drawSquareModule(ctx: CanvasRenderingContext2D, x: number, y: number, size: number): HTMLCanvasElement {
    ctx.fillRect(x, y, size, size);

    return ctx.canvas;
}

interface Radiuses {
    topLeft: number,
    topRight: number,
    bottomRight: number,
    bottomLeft: number
}

function drawRoundedModule(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, radiuses: Radiuses | number): HTMLCanvasElement {
    if (typeof radiuses === "number") {
        radiuses = {
            topLeft: radiuses,
            topRight: radiuses,
            bottomRight: radiuses,
            bottomLeft: radiuses
        }    
    }

    ctx.beginPath();

    ctx.moveTo(x + radiuses.topLeft, y);
    ctx.lineTo(x - radiuses.topRight + size, y);

    ctx.quadraticCurveTo(x + size, y, x + size, y + radiuses.topRight);
    ctx.lineTo(x + size, y + size - radiuses.bottomRight);

    ctx.quadraticCurveTo(x + size, y + size, x + size - radiuses.bottomRight, y + size);
    ctx.lineTo(x + radiuses.bottomLeft, y + size);

    ctx.quadraticCurveTo(x, y + size, x, y + size - radiuses.bottomLeft);
    ctx.lineTo(x, y + radiuses.topLeft);

    ctx.quadraticCurveTo(x, y, x + radiuses.topLeft, y);
    ctx.closePath();   

    ctx.fill();

    return ctx.canvas;
}

function drawCircleModule(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number): HTMLCanvasElement {
    ctx.beginPath();
    ctx.arc(x + radius, y + radius, radius, 0, Math.PI * 2);
    ctx.closePath();

    ctx.fill();

    return ctx.canvas;
}

// Checks if an area is reserved (that means that that part was already drawn)
function isReserved(x: number, y: number, size: number, version: number): boolean {
    if (!finderPatterns) {
        finderPatterns = computeFinderPatternsLocations(size);
        console.log("Computed Finder Patterns:", finderPatterns);
    }
    if (!alignmentPatterns) {
        // Only compute once
        alignmentPatterns = computeAlignmentPatternsLocations(size, version);
        console.log("Computed Alignment Patterns:", alignmentPatterns);
    }

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

function computeFinderPatternsLocations(size: number): { x: number, y: number, x2: number, y2: number }[] {
    // Only compute once
    return [
        { x: 0, y: 0, x2: 6, y2: 6 }, // Top Left
        { x: size - 7, y: 0, x2: size - 1, y2: 6 }, // Top Right
        { x: 0, y: size - 7, x2: 6, y2: size - 1 } // Bottom Left
    ];
}

function computeAlignmentPatternsLocations(size: number, version: number): { x: number, y: number, x2: number, y2: number }[] {
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
    

export default generateImageCanvasFromMatrix;