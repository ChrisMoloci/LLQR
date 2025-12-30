import { DataEncodingMode, DEFAULT_QR_SPECS } from "../const";
import autoEncodeData from "../core/autoEncodeData";
import determineMode from "../core/determineEncodingMode";
import { qrSpecs } from "../types";

function generateFullQR(data: string, specs: qrSpecs = DEFAULT_QR_SPECS) {
    console.log("Generating QR Code with specs:", specs);

    // Determine Mode
    const mode: DataEncodingMode = determineMode(data);
    if (!mode) throw new Error("Unable to determine encoding mode for the provided data.");

    // Encode Data to Binary
    const encodedData = autoEncodeData(data, mode);

    console.log("Encoded Data:", encodedData);

    // Determine the Min Version of the QR Code

    // Generate Error Correction Codewords

    // Generate the QR Matrix

    // Generate An Image from the Matrix

    // Return the Image
}

export default generateFullQR;