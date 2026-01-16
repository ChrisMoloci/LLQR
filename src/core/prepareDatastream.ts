import { DATA_ENCODING_MODES, DataEncodingCharacterSet, DataEncodingMode } from "../enums";
import { ECISwitchingModes, EncodedDataSegment, QRVersions } from "../types";
import { getCharCountIndicatorLength } from "./determineMinQRVersion";

function prepareDatastream(encodedSegments: Array<EncodedDataSegment>, version: QRVersions, eciSwitchingMode: ECISwitchingModes = "disabled"): Array<string> {
    const dataStream: Array<string> = []; // Will hold the final data stream (as an array of codewords)

    // Store Encoding Mode and ECI Assignment Number states for mode switching checks
    let encodingModeState: DataEncodingMode | null = null; // Holds current encoding mode state for mode switching
    let eciModeAssignmentNumberState: DataEncodingCharacterSet | null = null; // Holds current ECI mode charset state for mode switching

    // Iterate through each encoded segment to build the data stream
    for (const segment of encodedSegments) {
        console.log("Preparing segment for datastream:", segment);

        if (eciSwitchingMode === "forced" && segment.encodingMode === DATA_ENCODING_MODES.BYTE) {
            // Always add ECI Indicator and Assignment Number for Byte mode segments if ECI switching is forced
            const eciStream = generateECIIndicatorAndAssignmentNumber(segment.charSetAssignmentNumber);
            dataStream.push(...eciStream); // Append ECI indicator and assignment number to the data stream
            console.log("Added ECI Segment to data stream (forced):", eciStream);
        } else if (eciSwitchingMode === "auto" && segment.encodingMode === DATA_ENCODING_MODES.BYTE && eciModeAssignmentNumberState !== segment.charSetAssignmentNumber) {
            // Add ECI Indicator and Assignment Number for Byte mode segments if ECI switching is "auto" and charset has changed
            const eciStream = generateECIIndicatorAndAssignmentNumber(segment.charSetAssignmentNumber);
            dataStream.push(...eciStream); // Append ECI indicator and assignment number to the data stream
            console.log("Added ECI Segment to data stream (auto):", eciStream);
            eciModeAssignmentNumberState = segment.charSetAssignmentNumber; // Update ECI charset state
        }

        if (encodingModeState !== segment.encodingMode ||
            (
                // Always add mode indicator + char count indicator if ECI switching is forced since it must acompany every ECI mode indicator + assignment number
                eciSwitchingMode === "forced" &&
                segment.encodingMode == DATA_ENCODING_MODES.BYTE
            ) ||
            (
                // Add a mode indicator + char count indicator if ECI switching is "auto" and adjacent byte segments have different ECI assignment numbers
                eciSwitchingMode === "auto" &&
                segment.encodingMode === DATA_ENCODING_MODES.BYTE &&
                eciModeAssignmentNumberState !== segment.charSetAssignmentNumber
            )
        ) {
            // Add Mode Indicator if encoding mode has changed
            const encodingMode: DataEncodingMode = segment.encodingMode;

            // Add Character Count Indicator
            const charCountIndicator = generateLengthIndicator(segment.plainTextData, segment.encodedData, getCharCountIndicatorLength(segment.encodingMode, version), segment.encodingMode);

            // Add Mode Indicator and Character Count Indicator to data stream
            dataStream.push(encodingMode, charCountIndicator);
            console.log(`Added Mode Indicator ${encodingMode} and Character Count Indicator ${charCountIndicator} to data stream.`);

            // Update encoding mode state
            encodingModeState = encodingMode;
        }

        dataStream.push(...segment.encodedData); // Append the encoded data to the data stream
        console.log("Added Encoded Data to data stream:", segment.encodedData);
    }

    console.log("Final Prepared Data Stream:", dataStream);

    // Return the prepared data stream
    return dataStream;
}

// Creates a length indicator based on data length, mode, and char count indicator length
function generateLengthIndicator(unencodedData: string, encodedData: Array<string>, charCountIndicatorLength: number, mode: DataEncodingMode) {
    // If byte mode, use the encoded byte length; otherwise use the unencoded character length
    const length = mode === "0100" ? encodedData.length : unencodedData.length;
    // const length = unencodedData.length; // Use unencoded data length for all modes

    return length.toString(2).padStart(charCountIndicatorLength, '0'); // Return the length as a binary string
}

// Generates the ECI Mode Indicator and Assignment Number binary strings to be added to the data stream
function generateECIIndicatorAndAssignmentNumber(assignmentNumber: number): Array<string> {
    // ECI Mode Indicator is always '0111'
    const eciModeIndicator = '0111';

    // Convert assignment number to binary (8 bits for 0-127, 16 bits for 128-16383)
    let assignmentNumberBinary: string;
    if (assignmentNumber >= 0 && assignmentNumber <= 127) {
        assignmentNumberBinary = assignmentNumber.toString(2).padStart(8, '0');
    } else if (assignmentNumber >= 128 && assignmentNumber <= 16383) {
        assignmentNumberBinary = assignmentNumber.toString(2).padStart(16, '0');
    } else if (assignmentNumber >= 16384 && assignmentNumber <= 999999) {
        assignmentNumberBinary = assignmentNumber.toString(2).padStart(24, '0');
    } else {
        throw new Error("ECI Assignment Number out of range (0-999999).");
    }

    return [eciModeIndicator, assignmentNumberBinary];
}

export default prepareDatastream;