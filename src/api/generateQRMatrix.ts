// Types & Constants
import {EncodedDataSegment, PreparedDatastream, QRSpecs} from "../types"
import { DataEncodingMode } from "../types"
import {DATA_ENCODING_MODE, MODE_SWITCHING_STRATEGY} from "../constants";

// Functions
import { getCurrentConfig } from "../config";
import { determineMode } from "../encoding";
import encodeWithSingleMode from "../encoding/qr/encodeWithSingleMode";
import encodeWithModeSwitching from "../encoding/qr/encodeWithModeSwitching";
import prepareDatastream from "../encoding/qr/bitstream/prepareDatastream";
import {generateECCStream} from "../ecc";
import {generateMatrix} from "../matrix";

/**
 *
 * @param data string for the data to be encoded
 * @returns Array<Array<number>
 */
export function generateQRMatrix(data: string): Array<Array<number>> {
    // -- 1. Get Current QR Configuration --
    const qrSpecs: QRSpecs = getCurrentConfig().qrConfig;
    console.log("Generating QR Code with specs:", qrSpecs);

    // -- 2. Determine Mode (or use Byte if forced) --
    const mode: DataEncodingMode = qrSpecs.forceByteEncoding ? DATA_ENCODING_MODE.BYTE : determineMode(data);
    if (!mode) throw new Error("Unable to determine encoding mode for the provided data."); 
    
    // Will hold the encoded data segments
    let encodedData: Array<EncodedDataSegment> | null = null;

    // -- 3. Encode Data to Binary as an array of EncodedDataSegment objects --
    if (
        qrSpecs.useModeSwitching === MODE_SWITCHING_STRATEGY.DISABLED ||
        qrSpecs.forceByteEncoding
    ) {
        // Encode using a single mode (stores a single EncodedDataSegment in the array)
        console.log("Encoding data using single mode:", mode);
        encodedData = encodeWithSingleMode(data, mode);
    } else if (
        qrSpecs.useModeSwitching === MODE_SWITCHING_STRATEGY.AUTO ||
        qrSpecs.useModeSwitching === MODE_SWITCHING_STRATEGY.FORCED
    ) {
        // Encode using mode switching (creates segments as necessary)
        console.log("Encoding data using mode switching:", qrSpecs.useModeSwitching);
        encodedData = encodeWithModeSwitching(data, qrSpecs.useModeSwitching);
    }
    
    // Throw an error if encoding failed
    if (!encodedData) throw new Error("Data encoding failed.");

    console.log("Encoded Data:", structuredClone(encodedData));

    // -- 4. Prepare datastream and determine version (min | preferred)
    const preparedDatastream: PreparedDatastream = prepareDatastream(encodedData, qrSpecs.eccLevel, qrSpecs.useECISwitching, qrSpecs.useModeSwitching, qrSpecs.minPreferredVersion);
    const version = preparedDatastream.version;
    const datastream = preparedDatastream.datastream;

    console.log("Prepared Data Stream:", preparedDatastream);

    // -- 5. Generate Error Correction Codewords --
    const eccStream: Array<string> = generateECCStream(datastream, version, qrSpecs.eccLevel);
    console.log("Generated ECC Stream:", eccStream);

    // -- 6. Generate the matrix using the ecc data stream --
    const matrix: Array<Array<number>> = generateMatrix(eccStream, version, qrSpecs.eccLevel, qrSpecs.maskPattern);
    console.log("Generated QR Matrix:", matrix);

    // -- 8. Return the generated matrix --
    return matrix;
}

export default generateQRMatrix;