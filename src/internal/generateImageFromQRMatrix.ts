import { DEFAULT_IMAGE_SPECS } from "../const";
import generateImageCanvasFromMatrix from "../render/generateImageCanvasFromMatrix";
import { ImageSpecs } from "../types";

function generateImageFromQRMatrix(qrMatrix: Array<Array<number>>, imageSpecs: ImageSpecs | null = DEFAULT_IMAGE_SPECS, size: number = 512): HTMLCanvasElement {
    const canvas: HTMLCanvasElement = generateImageCanvasFromMatrix(qrMatrix, size);

    // Return a canvas for now, later we can return some kind of image
    return canvas;
}

export default generateImageFromQRMatrix;