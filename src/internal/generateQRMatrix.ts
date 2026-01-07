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
    // -- 1. Get Current QR Configurations --
    const qrSpecs: QRSpecs = getCurrentConfigs().qrConfig;
    console.log("Generating QR Code with specs:", qrSpecs);

    // -- 2. Determine Mode (or use Byte if forced) --
    const mode: DataEncodingMode = qrSpecs.forceByteEncoding ? DATA_ENCODING_MODES.BYTE : determineMode(data);
    if (!mode) throw new Error("Unable to determine encoding mode for the provided data."); 

    // -- 3. Encode Data to Binary --
    const encodedData: Array<string> | undefined = autoEncodeData(data, mode, qrSpecs.useModeSwitching);

    if (!encodedData) throw new Error("Data encoding failed.");

    console.log("Encoded Data:", encodedData);

    // -- 4. Determine the Min Version of the QR Code (Or use Preferred Minimum if possible) --
    const {version: minVersion, charCountIndicatorLength: charCountIndicatorLength} = determineMinQRVersion(encodedData, qrSpecs.eccLevel, mode, qrSpecs.minPreferredVersion);

    console.log("Determined Minimum QR Version:", minVersion);
    console.log("Character Count Indicator Length:", charCountIndicatorLength);

    // -- 5. Prepare data stream for ECC generation (add mode, length indicators, etc.) --
    const preparedDataStream: Array<string> = prepareDatastream(data, encodedData, charCountIndicatorLength, mode);

    console.log("Prepared Data Stream:", preparedDataStream);
    
    // -- 6. Generate Error Correction Codewords --
    const eccStream: Array<string> = generateECCStream(preparedDataStream, minVersion, qrSpecs.eccLevel);
    console.log("Generated ECC Stream:", eccStream);

    // -- 7. Generate the matrix using the ecc data stream --
    const matrix: Array<Array<number>> = generateMatrix(eccStream, minVersion, qrSpecs.eccLevel, qrSpecs.maskPattern);
    console.log("Generated QR Matrix:", matrix);

    // -- 8. Return the generated matrix --
    return matrix;
}

export default generateQRMatrix;