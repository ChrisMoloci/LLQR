import generateImageFromQRMatrix from "./generateImageFromQRMatrix";
import generateQRMatrix from "./generateQRMatrix";

function generateFullQR(data: string): HTMLImageElement {
    // -- 1. Generate the QR Matrix --
    const qrMatrix = generateQRMatrix(data);

    // -- 2. Generate An Image from the Matrix --
    const image: HTMLImageElement = generateImageFromQRMatrix(qrMatrix);

    // -- 3. Return the Image --
    return image;
}

export default generateFullQR;