import { getCurrentConfig } from "../helpers/defineConfig";
import { ImageSpecs } from "../../data_structures/types/ImageSpecs";
import { QRVersion } from "../../exports/types";
import { ShapeLocation } from "../../data_structures/types/ShapeLocation";
import renderFinderPatterns from "./renderFinderPatterns";
import computeFinderPatternsLocations from "./computeFinderPatternLocations";
import computeAlignmentPatternsLocations from "./computeAlignmentPatternLocations";
import renderAlignmentPatterns from "./renderAlignmentPatterns";
import isReserved from "./isReserved";
import renderDataStream from "./renderDatastream";

// TODO: Move other helper functions to their own files

function generateImageCanvasFromMatrix(matrix: Array<Array<number>>, pixelSize: number): HTMLCanvasElement {
    const imageSpecs: ImageSpecs = getCurrentConfig().imageConfig;
    console.log("Generating Image from QR Matrix with Image Specs:", imageSpecs);
    
    // -- 1. Initial Calculations --
    const size = matrix.length;
    const version = (size - 21) / 4 + 1 as QRVersion; // Compute the version (for convenience so it doesn't have to be passed in)
    console.log("Generating Image for QR Version:", version, "Matrix Size:", size);
    const moduleSize = Math.floor(pixelSize / (size + 8)); // 8 for quiet zone (4 per side)
    const safeAreaPixelSize = moduleSize * 4; // Total size including quiet zone
    const radius = Math.ceil(imageSpecs.roundness * (moduleSize / 2)); // Calculate radius based on module size
    pixelSize = (size * moduleSize) + (safeAreaPixelSize * 2); // Recalculate canvas size based on new module size
    console.log("Module Size:", moduleSize, "Radius:", radius, "Pixel Size:", pixelSize);
    
    // Stores the 4 points of each finder pattern and alignment pattern
    const finderPatterns: Array<ShapeLocation> = computeFinderPatternsLocations(size);
    const alignmentPatterns: Array<ShapeLocation> = computeAlignmentPatternsLocations(size, version);
    console.log("Finder Patterns:", finderPatterns, "Alignment Patterns:", alignmentPatterns);

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
    matrixCanvas = renderFinderPatterns(matrixCtx, finderPatterns, size, moduleSize, imageSpecs, radius);
    console.log(matrixCanvas);

    // -- 5. Render Alignment Patterns --
    matrixCanvas = renderAlignmentPatterns(matrixCtx, alignmentPatterns, finderPatterns, size, moduleSize, imageSpecs, radius, version);
    console.log(isReserved(0, 0, size, version, finderPatterns, alignmentPatterns));

    // -- 6. Render Modules --
    matrixCanvas = renderDataStream(matrix, matrixCtx, size, moduleSize, imageSpecs, radius, version, finderPatterns, alignmentPatterns);

    // -- 7. Render Grid --
    // TODO: Add grid renderer

    // -- 8. Add the matrix canvas to the main canvas with quiet zone offset --
    mainCtx.drawImage(matrixCanvas, safeAreaPixelSize, safeAreaPixelSize);

    // -- 9. Return the canvas --
    return mainCanvas;
} 

export default generateImageCanvasFromMatrix;