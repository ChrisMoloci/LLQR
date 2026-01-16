import { DATA_ENCODING_MODES, DataEncodingCharacterSet, DataEncodingMode } from "../enums";
import { qrDataCapacityBits } from "../datasets/qrDataCapacityBits";
import { qrEncodingCharCounts } from "../datasets/qrEncodingCharCounts";
import { ECC_LEVEL_CODES, ECCLevelCode } from "../enums";
import { ECISwitchingModes, EncodedDataSegment, QRVersions } from "../types";

export default function determineMinQRVersion(encodedData: Array<EncodedDataSegment>, eccLevel: ECCLevelCode, eciSwitchingMode: ECISwitchingModes = "disabled", minPrefferedVersion: QRVersions | null = null): QRVersions {
    let bestVersion: QRVersions | null = null; // Stores best version found through iterations (eventuall the best version)

    // Loop through all QR versions from 1 to 40
    for (let version: QRVersions = 1; version <= 40; version++) {
        // -- 1. Determine how much data can fit in this version with the given ECC level
        const eccLevelKey = Object.entries(ECC_LEVEL_CODES).find(([key, value]) => value === eccLevel)?.[0];
        const capacity = qrDataCapacityBits[version][eccLevelKey!].data; // Get info about a particullar QR Code version

        // -- 1. Calculate the total bits needed to encode all the data for a particullar version
        let encodingModeState: DataEncodingMode | null = null; // Holds current encoding mode state for mode switching
        let eciModeAssignmentNumberState: DataEncodingCharacterSet | null = null; // Holds current ECI mode state for mode switching
        let dataStreamSize = encodedData.reduce((length, segment) => {
            // Mode indicator + char count indicator if switching modes or adjacent byte segments have ECI mode indicator + assignment number
            if (encodingModeState !== segment.encodingMode ||
                (
                    // Always add mode indicator + char count indicator size if ECI switching is forced since it must acompany every ECI mode indicator + assignment number
                    eciSwitchingMode === "forced" &&
                    segment.encodingMode == DATA_ENCODING_MODES.BYTE
                ) ||
                (
                    // Add a mode indicator + char count indicator size if ECI switching is "auto" and adjacent byte segments have different ECI assignment numbers
                    eciSwitchingMode === "auto" &&
                    segment.encodingMode === DATA_ENCODING_MODES.BYTE &&
                    eciModeAssignmentNumberState !== segment.charSetAssignmentNumber
                )
            ) {
                length += 4; // Mode indicator size

                // Get length indicator size for this segment based on version
                length += getCharCountIndicatorLength(segment.encodingMode, version as QRVersions);

                // Update encoding mode state
                encodingModeState = segment.encodingMode;
            }

            if (eciSwitchingMode === "forced" && segment.encodingMode == DATA_ENCODING_MODES.BYTE) {
                // ECI indicator + assignment number for every byte instance if ECI switching is "forced"
                length += 4; // ECI Mode Indicator size

                // Get assignment number size based on char count
                console.log("Getting ECI assignment number size for assignment number:", segment.charSetAssignmentNumber);
                length += getECIAssignmentNumberSize(segment.charSetAssignmentNumber);

                // Update ECI mode state
                eciModeAssignmentNumberState = segment.charSetAssignmentNumber;
            }

            else if (eciSwitchingMode === "auto" && segment.encodingMode === DATA_ENCODING_MODES.BYTE && eciModeAssignmentNumberState !== segment.charSetAssignmentNumber) {
                // ECI indicator + assignment number based on state change if ECI switching is "auto"
                length += 4; // ECI Mode Indicator size

                // Get assignment number size based on char count
                console.log("Getting ECI assignment number size for assignment number:", segment.charSetAssignmentNumber);
                length += getECIAssignmentNumberSize(segment.charSetAssignmentNumber);

                // Update ECI mode state
                eciModeAssignmentNumberState = segment.charSetAssignmentNumber;
            }

            // Add the length of the encoded data in bits
            length += segment.encodedData.reduce((sum, codeWord) => sum + codeWord.length, 0); // Add encoded data length in bits

            return length;

        }, 0);

        // Calculate for terminator and byte alignment
        dataStreamSize += Math.min(4, Math.max(0, (capacity * 8) - dataStreamSize)); // Terminator (up to 4 bits)
        dataStreamSize += (8 - (dataStreamSize % 8)) % 8; // Byte alignment

        // -- 2. When we find a version that can hold the data, return it
        if (capacity >= Math.ceil(dataStreamSize / 8)) {
            bestVersion = version as QRVersions;
            break; // Found a suitable version
        }
    }

    // Check if preferred min version can be used
    if (minPrefferedVersion !== null && bestVersion !== null && bestVersion < minPrefferedVersion && minPrefferedVersion <= 40) {
        bestVersion = minPrefferedVersion; // Use preffered min version if possible
    }

    if (bestVersion === null || bestVersion > 40) {
        throw new Error("No suitable QR code version found for the provided data and ECC level.");
    }

    return bestVersion;
}

// Helper function for determinVersion()
export function getCharCountIndicatorLength(mode: DataEncodingMode, version: QRVersions): number {
    console.log(`Getting Character Count Indicator Length for mode ${mode} and version ${version}`);
    // ternary is used to convert ECI to Byte mode for lookup table
    // While encoding for the two work a little different, char count remains the same 
    // since it's still binary mode (even data will be the same in constraints of Latin-1 in UTF-8 encoding)
    let length;
    if (version >= 1 && version <= 9) {
        length = qrEncodingCharCounts.v1_9[mode]; // Use "0100" for Byte mode in v1_9
    }
    else if (version >= 10 && version <= 26) {
        length = qrEncodingCharCounts.v10_26[mode];
    }
    else if (version >= 27 && version <= 40) {
        length = qrEncodingCharCounts.v27_40[mode];
    }
    else {
        throw new Error("Invalid QR code version " + version);
    }
    return length;
}

// Helper function to get ECI assignment number size in bits
function getECIAssignmentNumberSize(assignmentNumber: number): number {
    switch(true) {
        case assignmentNumber >= 0 && assignmentNumber <= 127:
            return 8; // assignment number size
        case assignmentNumber >= 128 && assignmentNumber <= 16383:
            return 16; // assignment number size
        case assignmentNumber >= 16384 && assignmentNumber <= 999999:
            return 24; // assignment number size
        default:
            throw new Error("ECI Assignment Number too large in determine min version.");
    }
}