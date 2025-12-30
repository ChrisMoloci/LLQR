import { DataEncodingMode, DEFAULT_QR_SPECS } from "../const";
import autoEncodeData from "../core/autoEncodeData";
import determineMode from "../core/determineEncodingMode";
import determineMinQRVersion from "../core/determineMinQRVersion";
import { qrSpecs } from "../types";
import generateQRMatrix from "./generateQRMatrix";

function generateFullQR(data: string, specs: qrSpecs = DEFAULT_QR_SPECS) {
    // Generate the QR Matrix
    const qrMatrix = generateQRMatrix(data, specs);

    // Generate An Image from the Matrix

    // Return the Image
}

export default generateFullQR;