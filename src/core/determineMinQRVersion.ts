import { DataEncodingMode } from "../enums";
import { qrDataCapacityBits } from "../datasets/qrDataCapacityBits";
import { qrEncodingCharCounts } from "../datasets/qrEncodingCharCounts";
import { ECC_LEVEL_CODES, ECCLevelCode } from "../enums";
import { QRSpecs, QRVersions } from "../types";
import { getCurrentConfigs } from "./defineConfig";
import { EncodedSegment } from "../types"
import { version } from "../../node_modules/typescript/lib/typescript";

export default function determineMinQRVersion(encodedData: Array<EncodedSegment>, eccLevel: ECCLevelCode, mode: DataEncodingMode, minPrefferedVersion: QRVersions | null = null): {version: QRVersions, encodedSegments: Array<EncodedSegment>} {
    const dataLength = encodedData.reduce((length, segment) => length + segment.encodedData.reduce((sum, val) => sum + val.length, 0), 0);

    let encodedDataWithLengths: Array<EncodedSegment> = encodedData.map(segment => {
        segment.charCountIndicatorLength = getCharCountIndicatorLength(segment.mode, 1);
        return segment;
    });
    let bestVersion: QRVersions | null = null;
    let prevVersion: QRVersions | null = null;

    // console.log("Initial Character Count Indicator Lengths:", charCountIndicatorLengths);

    while (true) {
        if (bestVersion !== null && prevVersion !== null && encodedDataWithLengths.every(item => item.charCountIndicatorLength !== null)) {
            break;
        } // If all are populated, a suitable version was found

        prevVersion = bestVersion; // Update prev version to be current before updaing current

        const totalBits = (encodedData.length * 4) + encodedDataWithLengths.reduce((sum, item) => sum + item.charCountIndicatorLength!, 0) + dataLength; // Get length in bits of the data

        const totalBytes = Math.ceil(totalBits / 8); // Get length in Bytes of the total data

        console.log("Total Bits:", totalBits, "Total Bytes:", totalBytes);

        let versionCandidate: QRVersions | null = null; // Holds a potential version candidate
        for (let versionNum: number = 1; versionNum <= 40; versionNum++) {
            const capacity = qrDataCapacityBits[versionNum.toString()]; // Get info about a particullar QR Code version

            console.log("Capacity for version", versionNum, ":", capacity);

            if (!capacity) continue; // Skip if no capacity data for this version

            const eccLevelKey = Object.entries(ECC_LEVEL_CODES).find(([key, value]) => value === eccLevel)?.[0];

            const availableBytes = capacity[eccLevelKey].data;  // Get the available bytes for the selected ecc level

            console.log("Available bytes for version", versionNum, "and ECC level", eccLevel, ":", availableBytes);

            if (availableBytes >= totalBytes) {
                versionCandidate = versionNum as QRVersions;
                console.log("Found version candidate:", versionCandidate);
                break; // Found a suitable version
            }
        }

        if (versionCandidate === null) {
            throw new Error(`No suitable QR code version found for data length ${length} and mode ${mode}`);
        }

        encodedDataWithLengths.map(segment => {
            segment.charCountIndicatorLength = getCharCountIndicatorLength(segment.mode, versionCandidate);
        });

        bestVersion = versionCandidate;
    }

    // bestVersion = 3;
    // currentCharCountIndicatorLength = getCharCountIndicatorLength(mode, bestVersion);

    // Check if preffered min version is higher than determined best version
    if (minPrefferedVersion !== null && bestVersion < minPrefferedVersion) {
        // Use preffered min version if possible
        bestVersion = minPrefferedVersion;
        encodedDataWithLengths.map(segment => {
            segment.charCountIndicatorLength = getCharCountIndicatorLength(segment.mode, minPrefferedVersion);
        });
    }

    return {
        version: bestVersion as QRVersions,
        encodedSegments: encodedDataWithLengths
    };
}

// export default function determineMinQRVersion(encodedData: Array<string>, eccLevel: ECCLevelCode, mode: DataEncodingMode, minPrefferedVersion: qrVersions | null = null): {charCountIndicatorLength: number, version: qrVersions} {
//     // Determine length of data
    // let length = encodedData.reduce((length, el) => length + el.length, 0);

//     let currentCharCountIndicatorLength = getCharCountIndicatorLength(mode, 1); // Start with version 1
//     let bestVersion = null;
//     let prevVersion = -1;

//     while (true) {
//         if (currentCharCountIndicatorLength && bestVersion && prevVersion !== null) {
//             break;
//         } // If all are populated, a suitable version was found

//         prevVersion = currentCharCountIndicatorLength; // Update prev version to be current before updaing current

//         const totalBits = 4 + currentCharCountIndicatorLength + length; // Get length in bits of the data

//         const totalBytes = Math.ceil(totalBits / 8); // Get length in Bytes of the total data

//         let versionCandidate = null; // Holds a potential version candidate

//         for (let versionNum: number = 1; versionNum <= 40; versionNum++) {
//             const versionIndex = versionNum.toString();
//             if (!versionIndex) throw new Error("Invalid version number during min version determination.");
//             const capacity = qrDataCapacityBits[versionNum.toString()]; // Get info about a particullar QR Code version
            
//             if (!capacity) continue; // Skip if no capacity data for this version

//             const eccLevelKey = Object.entries(ECC_LEVEL_CODES).find(([key, value]) => value === eccLevel)?.[0];

//             const availableBytes = capacity[eccLevelKey].data;  // Get the available bytes for the selected ecc level

//             if (availableBytes >= totalBytes) {
//                 versionCandidate = versionNum;
//                 break; // Found a suitable version
//             }

//         }
//         if (versionCandidate === null) {
//             throw new Error(`No suitable QR code version found for data length ${length} and mode ${mode}`);
//         }

//         currentCharCountIndicatorLength = getCharCountIndicatorLength(mode, versionCandidate);

//         bestVersion = versionCandidate;
//     }

//     // bestVersion = 3;
//     // currentCharCountIndicatorLength = getCharCountIndicatorLength(mode, bestVersion);

//     // Check if preffered min version is higher than determined best version
//     if (minPrefferedVersion !== null && bestVersion < minPrefferedVersion) {
//         // Use preffered min version if possible
//         bestVersion = minPrefferedVersion;
//         currentCharCountIndicatorLength = getCharCountIndicatorLength(mode, bestVersion);
//     }

//     return {charCountIndicatorLength: currentCharCountIndicatorLength, version: bestVersion as qrVersions};
// }

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