
import prepareDatastream from "../core/matrix_generation/prepareDatastream";

import generateMatrix from "../core/matrix_generation/generateMatrix";
import { getCurrentConfig } from "../core/helpers/defineConfig";
import { encodeWithModeSwitching } from "../core/matrix_generation/encodeWithModeSwitching";
import { QRSpecs } from "../data_structures/types/QRSpecs";
import determineMode from "../core/matrix_generation/determineEncodingMode";
import { EncodedDataSegment } from "../data_structures/types/EncodedDataSegment";
import { encodeWithSingleMode } from "../core/matrix_generation/encodeWithSingleMode";
import determineMinQRVersion from "../core/matrix_generation/determineMinQRVersion";
import generateECCStream from "../core/matrix_generation/generateECCStream";
import { DataEncodingMode } from "../data_structures/types/EnumTypes/DataEncodingMode";
import { DATA_ENCODING_MODE } from "../data_structures/enums/DATA_ENCODING_MODE";

function generateQRMatrix(data: string): Array<Array<number>> {
    // -- 1. Get Current QR Configurations --
    const qrSpecs: QRSpecs = getCurrentConfig().qrConfig;
    console.log("Generating QR Code with specs:", qrSpecs);

    // -- 2. Determine Mode (or use Byte if forced) --
    const mode: DataEncodingMode = qrSpecs.forceByteEncoding ? DATA_ENCODING_MODE.BYTE : determineMode(data);
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