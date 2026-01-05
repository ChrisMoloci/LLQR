import { DEFAULT_IMAGE_SPECS } from "../const";
import { alignmentPatternLocations } from "../datasets/alignmentPatternLocations";
import { ImageSpecs, QRELEMENTSHAPES } from "../types";

function generateImageCanvasFromMatrix(matrix: Array<Array<number>>, imageSpecs: ImageSpecs = DEFAULT_IMAGE_SPECS, pixelSize: number): HTMLCanvasElement {
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
    matrixCanvas = renderFinderPatterns(matrix, matrixCtx, size, moduleSize, imageSpecs, radius);
    console.log(matrixCanvas)

    // Render Alignment Patterns
    console.log(isReserved(0, 0, size, version));

    // Render Modules

    // Render Grid

    // -- 3. Add the matrix canvas to the main canvas with quiet zone offset --
    mainCtx.drawImage(matrixCanvas, safeAreaPixelSize / 2, safeAreaPixelSize / 2);

    // Return the canvas
    return mainCanvas;
}

function renderFinderPatterns(matrix: Array<Array<number>>, matrixCtx: CanvasRenderingContext2D, size: number, moduleSize: number, imageSpecs: ImageSpecs, radius: number): HTMLCanvasElement {
    // Compute the finder pattern locations
    const finderPatternLocations = [
        { x: 0, y: 0 }, // Top Left
        { x: size - 7, y: 0 }, // Top Right
        { x: 0, y: size - 7 } // Bottom Left
    ]

    // Get the colors
    const outlineColor = imageSpecs.finderPatternOutlineColor;
    const backgroundColor = imageSpecs.backgroundColor;
    const innerColor = imageSpecs.finderPatternInnerColor;

    for (let i = 0; i < 3; i++) {
        const finderPatternLocation = finderPatternLocations[i]!;

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

// Drawing Helper Functions

function drawSquareModule(ctx: CanvasRenderingContext2D, x: number, y: number, size: number): HTMLCanvasElement {
    ctx.fillRect(x, y, size, size);

    return ctx.canvas;
}

function drawRoundedModule(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, radius: number): HTMLCanvasElement {
    ctx.beginPath();

    ctx.moveTo(x + radius, y);
    ctx.lineTo(x - radius + size, y);

    ctx.quadraticCurveTo(x + size, y, x + size, y + radius);
    ctx.lineTo(x + size, y + size - radius);

    ctx.quadraticCurveTo(x + size, y + size, x + size - radius, y + size);
    ctx.lineTo(x + radius, y + size);

    ctx.quadraticCurveTo(x, y + size, x, y + size - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
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

let finderPatterns: { x: number, y: number, x2: number, y2: number }[]
let alignmentPatterns : { x: number, y: number, x2: number, y2: number }[];

// Checks if an area is reserved (that means that that part was already drawn)
function isReserved(x: number, y: number, size: number, version: number): boolean {
    if (!finderPatterns) {
        // Only compute once
        finderPatterns = [
            { x: 0, y: 0, x2: 6, y2: 6 }, // Top Left
            { x: size - 7, y: 0, x2: size - 1, y2: 6 }, // Top Right
            { x: 0, y: size - 7, x2: 6, y2: size - 1 } // Bottom Left
        ];
        console.log("Computed Finder Patterns:", finderPatterns);
    }
    if (!alignmentPatterns) {
        // Only compute once
        alignmentPatterns = alignmentPatternLocations[version]?.flatMap(coord1 => {
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

export default generateImageCanvasFromMatrix;