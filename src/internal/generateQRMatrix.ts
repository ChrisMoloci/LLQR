import { DATA_ENCODING_MODES, DataEncodingMode } from "../enums";
import { EncodedDataSegment, QRSpecs } from "../types";
import determineMode from "../core/determineEncodingMode";
import determineMinQRVersion from "../core/determineMinQRVersion";
import prepareDatastream from "../core/prepareDatastream";
import generateECCStream from "../core/generateECCStream";
import generateMatrix from "../core/generateMatrix";
import { getCurrentConfigs } from "../core/defineConfig";
import { encodeWithSingleMode } from "../core/encodeWithSingleMode";
import { encodeWithModeSwitching } from "../core/encodeWithModeSwitching";

function generateQRMatrix(data: string): Array<Array<number>> {
    // -- 1. Get Current QR Configurations --
    const qrSpecs: QRSpecs = getCurrentConfigs().qrConfig;
    console.log("Generating QR Code with specs:", qrSpecs);

    // -- 2. Determine Mode (or use Byte if forced) --
    const mode: DataEncodingMode = qrSpecs.forceByteEncoding ? DATA_ENCODING_MODES.BYTE : determineMode(data);
    if (!mode) throw new Error("Unable to determine encoding mode for the provided data."); 
    
    // Will hold the encoded data segments
    let encodedData: Array<EncodedDataSegment> | null = null;

    // -- 3. Encode Data to Binary as EncodedSegmentDraft --
    if (qrSpecs.useModeSwitching === "disabled") {
        // Encode using a single mode
        console.log("Encoding data using single mode:", mode);
        encodedData = encodeWithSingleMode(data, mode);
    } else if (qrSpecs.useModeSwitching === "auto" || qrSpecs.useModeSwitching === "forced") {
        console.log("Encoding data using mode switching:", qrSpecs.useModeSwitching);
        // Encode using mode switching
        encodedData = encodeWithModeSwitching(data, qrSpecs.useModeSwitching);
    }
    
    // Throw an error if encoding failed
    if (!encodedData) throw new Error("Data encoding failed.");

    console.log("Encoded Data:", encodedData);

    // -- 4. Determine the Min Version of the QR Code (Or use Preferred Minimum if possible)
    /**
     * Also determines the character count indicator lengths for each segment and adds them to the segments
     * returning FinalizedEncodedSegment[]
     */
    const version = determineMinQRVersion(encodedData, qrSpecs.eccLevel, qrSpecs.useECISwitching, qrSpecs.useModeSwitching, qrSpecs.minPreferredVersion);

    console.log("Determined Minimum QR Version:", version);
    // console.log("Character Count Indicator Length:", charCountIndicatorLength);

    // -- 5. Prepare data stream for ECC generation (add mode, length indicators, etc.) --
    const preparedDataStream: Array<string> = prepareDatastream(encodedData, version, qrSpecs.useECISwitching, qrSpecs.useModeSwitching);

    console.log("Prepared Data Stream:", preparedDataStream);
    
    // -- 6. Generate Error Correction Codewords --
    const eccStream: Array<string> = generateECCStream(preparedDataStream, version, qrSpecs.eccLevel);
    console.log("Generated ECC Stream:", eccStream);

    // -- 7. Generate the matrix using the ecc data stream --
    const matrix: Array<Array<number>> = generateMatrix(eccStream, version, qrSpecs.eccLevel, qrSpecs.maskPattern);
    console.log("Generated QR Matrix:", matrix);

    // -- 8. Return the generated matrix --
    return matrix;
}

export default generateQRMatrix;