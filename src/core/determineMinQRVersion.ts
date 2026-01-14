import { DataEncodingMode } from "../enums";
import { qrDataCapacityBits } from "../datasets/qrDataCapacityBits";
import { qrEncodingCharCounts } from "../datasets/qrEncodingCharCounts";
import { ECC_LEVEL_CODES, ECCLevelCode } from "../enums";
import { EncodedSegmentDraft, FinalizedEncodedSegment, QRSpecs, QRVersions } from "../types";

export default function determineMinQRVersion(encodedData: Array<EncodedSegmentDraft>, eccLevel: ECCLevelCode, minPrefferedVersion: QRVersions | null = null): {version: QRVersions, finalizedEncodedSegments: Array<FinalizedEncodedSegment>} {
    const dataLength = encodedData.reduce((length, segment) => {
        // Get the length of the encoded data in bits
        const encodedDataLength = segment.encodedData.reduce((sum, val) => sum + val.length, 0) 

        // Get the length of the ECI assignment number if applicable
        let eciSegmentSize: number = 0;
        switch(true) {
            case segment.charCount <= 127:
                eciSegmentSize = 12; // mode + assignment number
                break;
            case segment.charCount <= 16383:
                eciSegmentSize = 20; // mode + assignment number
                break;
            case segment.charCount <= 999999:
                eciSegmentSize = 28; // mode + assignment number
                break;
            default:
                throw new Error("ECI Assignment Number too large in detemine min version.");
        }

        return length + eciSegmentSize + encodedDataLength;
    }, 0);

    let encodedDataSegmentsWithLengths: Array<FinalizedEncodedSegment> = encodedData.map((segment: EncodedSegmentDraft) => {
        return {
            ...segment,
            charCountIndicatorLength: getCharCountIndicatorLength(segment.mode, 1) // Start with version 1
        }
    }) as Array<FinalizedEncodedSegment>;

    let bestVersion: QRVersions | null = null; // Stores best version found through iterations (eventuall the best version)
    let prevVersion: QRVersions | null = null; // Stores the previous best version

    while (true) {
        if (bestVersion !== null && prevVersion !== null && encodedDataSegmentsWithLengths.every(item => item.charCountIndicatorLength !== null)) {
            break;
        } // If all are populated, a suitable version was found

        prevVersion = bestVersion; // Update prev version to be current before updaing current

        // Get the total bits of data (including hypothetical mode and length indicators)
        const totalBits = (encodedData.length * 4) + encodedDataSegmentsWithLengths.reduce((sum, item) => sum + item.charCountIndicatorLength!, 0) + dataLength; // Get length in bits of the data

        const totalBytes = Math.ceil(totalBits / 8); // Get length in Bytes of the total data

        console.log("Total Bits:", totalBits, "Total Bytes:", totalBytes);

        let versionCandidate: QRVersions | null = null; // Holds a potential version candidate

        // Iterate through all versions to find a suitable one
        for (let versionNum: number = 1; versionNum <= 40; versionNum++) {
            const capacity = qrDataCapacityBits[versionNum.toString()]; // Get info about a particullar QR Code version

            console.log("Capacity for version", versionNum, ":", capacity);

            if (!capacity) continue; // Skip if no capacity data for this version

            const eccLevelKey = Object.entries(ECC_LEVEL_CODES).find(([key, value]) => value === eccLevel)?.[0];

            const availableBytes = capacity[eccLevelKey].data;  // Get the available bytes for the selected ecc level

            console.log("Available bytes for version", versionNum, "and ECC level", eccLevel, ":", availableBytes);

            // When we reach a version that can hold the data, we can stop
            if (availableBytes >= totalBytes) {
                versionCandidate = versionNum as QRVersions;
                console.log("Found version candidate:", versionCandidate);
                break; // Found a suitable version
            }
        }

        // If no version candidate was found, throw an error (should only occur if data is too large)
        if (versionCandidate === null) {
            throw new Error(`No suitable QR code version found for data length ${length}`);
        }

        // Update char count indicator lengths for all segments to be for versionCandidate
        encodedDataSegmentsWithLengths.map(segment => {
            segment.charCountIndicatorLength = getCharCountIndicatorLength(segment.mode, versionCandidate);
        });

        bestVersion = versionCandidate; // Set best version to version candidata

        // Do not stop here, rather stop at beginning of next iteration if all values are populated
    }

    // bestVersion = 3;
    // currentCharCountIndicatorLength = getCharCountIndicatorLength(mode, bestVersion);

    // Check if preffered min version is higher than determined best version
    if (minPrefferedVersion !== null && bestVersion < minPrefferedVersion) {
        // Use preffered min version if possible
        bestVersion = minPrefferedVersion; // Set best version to preffered min version

        // Update char count indicator lengths for all segments to be for minPrefferedVersion
        encodedDataSegmentsWithLengths.map(segment => {
            segment.charCountIndicatorLength = getCharCountIndicatorLength(segment.mode, minPrefferedVersion);
        });
    }

    // Return the determined best version and the encoded segments with their char count indicator lengths
    return {
        version: bestVersion as QRVersions,
        finalizedEncodedSegments: encodedDataSegmentsWithLengths
    };
}

// Helper function for determinVersion()
function getCharCountIndicatorLength(mode: DataEncodingMode, version: QRVersions): number {
    console.log(`Getting Character Count Indicator Length for mode ${mode} and version ${version}`);
    // ternary is used to convert ECI to Byte mode for lookup table
    // While encoding for the two work a little different, char count remains the same 
    // since it's still binary mode (even data will be the same in constraints of Latin-1 in UTF-8 encoding)
    let length;
    if (version >= 1 && version <= 9) {
        // length = qrEncodingCharCounts.v1_9[mode == "0111" ? "0100" : mode]; // Use "0100" for Byte mode in v1_9
        length = qrEncodingCharCounts.v1_9[mode]; // Use "0100" for Byte mode in v1_9
    }
    else if (version >= 10 && version <= 26) {
        // length = qrEncodingCharCounts.v10_26[mode == "0111" ? "0100" : mode];
        length = qrEncodingCharCounts.v10_26[mode];
    }
    else if (version >= 27 && version <= 40) {
        // length = qrEncodingCharCounts.v27_40[mode == "0111" ? "0100" : mode];
        length = qrEncodingCharCounts.v27_40[mode];
    }
    else {
        throw new Error("Invalid QR code version " + version);
    }
    return length;
}