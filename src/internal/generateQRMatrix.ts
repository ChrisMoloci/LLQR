import { DataEncodingMode, DEFAULT_QR_SPECS } from "../const";
import { qrSpecs } from "../types";
import autoEncodeData from "../core/autoEncodeData";
import determineMode from "../core/determineEncodingMode";
import determineMinQRVersion from "../core/determineMinQRVersion";
import prepareDatastream from "../core/prepareDatastream";
import generateECCStream from "../core/generateECCStream";
import generateMatrix from "../core/generateMatrix";

function generateQRMatrix(data: string, specs: qrSpecs = DEFAULT_QR_SPECS): Array<Array<string>> {
    console.log("Generating QR Code with specs:", specs);

    // Determine Mode
    const mode: DataEncodingMode = determineMode(data);
    if (!mode) throw new Error("Unable to determine encoding mode for the provided data.");

    // Encode Data to Binary
    const encodedData: Array<string> | undefined = autoEncodeData(data, mode);

    if (!encodedData) throw new Error("Data encoding failed.");

    console.log("Encoded Data:", encodedData);

    // Determine the Min Version of the QR Code
    const {version: minVersion, charCountIndicatorLength: charCountIndicatorLength} = determineMinQRVersion(encodedData, specs.eccLevel, mode);

    console.log("Determined Minimum QR Version:", minVersion);
    console.log("Character Count Indicator Length:", charCountIndicatorLength);

    // Prepare data stream for ECC generation (add mode, length indicators, etc.)
    const preparedDataStream: Array<string> = prepareDatastream(data, encodedData, charCountIndicatorLength, mode);

    console.log("Prepared Data Stream:", preparedDataStream);
    
    // Generate Error Correction Codewords
    const eccStream: Array<string> = generateECCStream(preparedDataStream, minVersion, specs.eccLevel);
    console.log("Generated ECC Stream:", eccStream);

    // Generate the matrix using the ecc data stream
    const matrix = generateMatrix(eccStream, minVersion, specs.eccLevel);
    console.log("Generated QR Matrix:", matrix);

    return new Array<Array<string>>();
}

export default generateQRMatrix;