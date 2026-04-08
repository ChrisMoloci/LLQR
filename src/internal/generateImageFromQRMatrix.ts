import { DEFAULT_IMAGE_SPECS } from "../const";
import generateImageCanvasFromMatrix from "../render/generateImageCanvasFromMatrix";

function generateImageFromQRMatrix(qrMatrix: Array<Array<number>>, size: number = 512): HTMLImageElement {
    // Generate the canvas from the matrix
    const canvas: HTMLCanvasElement = generateImageCanvasFromMatrix(qrMatrix, size);

    // Convert canvas to an image
    const imageSrc: string = canvas.toDataURL("image/png");
    console.log("Generated Image Source from QR Matrix:", imageSrc);

    const image: HTMLImageElement = new Image();
    image.src = imageSrc;

    return image;
}

export default generateImageFromQRMatrix;