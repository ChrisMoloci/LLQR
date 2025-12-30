import { DEFAULT_QR_SPECS } from "../const";
import { qrSpecs } from "../types";
import generateQRMatrix from "./generateQRMatrix";

function generateFullQR(data: string, specs: qrSpecs = DEFAULT_QR_SPECS) {
    // Generate the QR Matrix
    const qrMatrix = generateQRMatrix(data, specs);

    // Generate An Image from the Matrix

    // Return the Image
}

export default generateFullQR;