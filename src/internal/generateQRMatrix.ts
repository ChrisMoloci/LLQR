import { DATA_ENCODING_MODES, DataEncodingMode } from "../enums";
import { QRSpecs } from "../types";
import autoEncodeData from "../core/autoEncodeData";
import determineMode from "../core/determineEncodingMode";
import determineMinQRVersion from "../core/determineMinQRVersion";
import prepareDatastream from "../core/prepareDatastream";
import generateECCStream from "../core/generateECCStream";
import generateMatrix from "../core/generateMatrix";
import { getCurrentConfigs } from "../core/defineConfig";

function generateQRMatrix(data: string): Array<Array<number>> {
    const qrSpecs: QRSpecs = getCurrentConfigs().qrConfig;
    console.log("Generating QR Code with specs:", qrSpecs);

    // Determine Mode (or use Byte if forced)
    const mode: DataEncodingMode = qrSpecs.forceByteEncoding ? DATA_ENCODING_MODES.BYTE : determineMode(data);
    if (!mode) throw new Error("Unable to determine encoding mode for the provided data."); 

    // Encode Data to Binary
    const encodedData: Array<string> | undefined = autoEncodeData(data, mode);

    if (!encodedData) throw new Error("Data encoding failed.");

    console.log("Encoded Data:", encodedData);

    // Determine the Min Version of the QR Code
    const {version: minVersion, charCountIndicatorLength: charCountIndicatorLength} = determineMinQRVersion(encodedData, qrSpecs.eccLevel, mode, qrSpecs.minPreferredVersion);

    console.log("Determined Minimum QR Version:", minVersion);
    console.log("Character Count Indicator Length:", charCountIndicatorLength);

    // Prepare data stream for ECC generation (add mode, length indicators, etc.)
    const preparedDataStream: Array<string> = prepareDatastream(data, encodedData, charCountIndicatorLength, mode);

    console.log("Prepared Data Stream:", preparedDataStream);
    
    // Generate Error Correction Codewords
    const eccStream: Array<string> = generateECCStream(preparedDataStream, minVersion, qrSpecs.eccLevel);
    console.log("Generated ECC Stream:", eccStream);

    // Generate the matrix using the ecc data stream
    const matrix: Array<Array<number>> = generateMatrix(eccStream, minVersion, qrSpecs.eccLevel, qrSpecs.maskPattern);
    console.log("Generated QR Matrix:", matrix);

    return matrix;
}

export default generateQRMatrix;