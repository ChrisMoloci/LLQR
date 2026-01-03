import { DEFAULT_IMAGE_SPECS } from "../const";
import { ImageSpecs } from "../types";

export function generateImageCanvasFromMatrix(matrix: Array<Array<number>>, imageSpecs: ImageSpecs = DEFAULT_IMAGE_SPECS, pixelSize: number): HTMLCanvasElement {
    // -- 1. Initial Calculations --
    const size = matrix.length;
    const moduleSize = Math.floor(pixelSize / (size + 8)); // 8 for quiet zone (4 per side)
    const safeAreaPixelSize = moduleSize * (size + 8); // Total size including quiet zone
    const radius = Math.ceil(imageSpecs.roundness * (moduleSize / 2)); // Calculate radius based on module size
    pixelSize = (size * moduleSize) + (safeAreaPixelSize * 2); // Recalculate canvas size based on new module size

    // -- 2. Initialize the main canvas (includes quiet zone) --
    const mainCanvas = document.createElement("canvas");
    const mainCtx = mainCanvas.getContext("2d")!;

    mainCanvas.width = pixelSize;
    mainCanvas.height = pixelSize;

    // -- 3. Initialize the Matrix canvas (inside main canvas) --
    const matrixCanvas = document.createElement("canvas");
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
    
    // Render Finder Patterns

    // Render Alignment Patterns

    // Render Modules

    // Render Grid

    // Return the canvas
    return mainCanvas;
}