import { DataEncodingMode, DEFAULT_QR_SPECS } from "../const";
import autoEncodeData from "../core/autoEncodeData";
import determineMode from "../core/determineEncodingMode";
import determineMinQRVersion from "../core/determineMinQRVersion";
import { qrSpecs } from "../types";

function generateQRMatrix(data: string, specs: qrSpecs = DEFAULT_QR_SPECS){
        console.log("Generating QR Code with specs:", specs);

    // Determine Mode
    const mode: DataEncodingMode = determineMode(data);
    if (!mode) throw new Error("Unable to determine encoding mode for the provided data.");

    // Encode Data to Binary
    const encodedData: string[] | undefined = autoEncodeData(data, mode);

    if (!encodedData) throw new Error("Data encoding failed.");

    console.log("Encoded Data:", encodedData);

    // Determine the Min Version of the QR Code
    const minVersion = determineMinQRVersion(encodedData, specs.eccLevel, mode);

    console.log("Determined Minimum QR Version:", minVersion);

    // Generate Error Correction Codewords
}

export default generateQRMatrix;