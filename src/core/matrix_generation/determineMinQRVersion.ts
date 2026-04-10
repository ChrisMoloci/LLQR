import { DATA_ENCODING_MODE } from "../../data_structures/enums/DATA_ENCODING_MODE";
import { ECI_SWITCHING_STRATEGY } from "../../data_structures/enums/ECI_SWITCHING_STRATEGY";
import { EncodedDataSegment } from "../../data_structures/types/EncodedDataSegment";
import { DataEncodingCharacterSet } from "../../data_structures/types/EnumTypes/DataEncodingCharacterSet";
import { DataEncodingMode } from "../../data_structures/types/EnumTypes/DataEncodingMode";
import { qrDataCapacityBits } from "../../datasets/qrDataCapacityBits";
import { qrEncodingCharCounts } from "../../datasets/qrEncodingCharCounts";
import { ECC_LEVEL_CODE, QR_VERSION } from "../../exports/constants";
import { ECCLevelCode, ECISwitchingStrategy, ModeSwitchingStrategy, QRVersion } from "../../exports/types";
import { computeTheoreticalSizeOfDataForVersion } from "../helpers/computeTheoreticalSizeOfDataForVersion";
import { getCharCountIndicatorLength } from "../helpers/getCharCountIndicatorLength";
import optimizeCrossCompatibleSegments from "../helpers/optimizeCrossCompatSegments";
import prepareDatastream from "./prepareDatastream";


export default function determineMinQRVersion(encodedData: Array<EncodedDataSegment>, eccLevel: ECCLevelCode, eciSwitchingMode: ECISwitchingStrategy = ECI_SWITCHING_STRATEGY.DISABLED, modeSwitchingMode: ModeSwitchingStrategy, minPrefferedVersion: QRVersion | null = null): QRVersion {
    let bestVersion: QRVersion | null = null; // Stores best version found through iterations (eventuall the best version)

    // Loop through all QR versions from 1 to 40
    for (let version: QRVersion = QR_VERSION.V1; version <= QR_VERSION.V40; version++) {
        // Create a copy of encodedData so it can be mutated without affecting the original data
        const workingEncodedData = [...encodedData];

        // -- 1. Determine how much data can fit in this version with the given ECC level
        const eccLevelKey = Object.entries(ECC_LEVEL_CODE).find(([key, value]) => value === eccLevel)?.[0];
        const capacity = qrDataCapacityBits[version][eccLevelKey!].data; // Get info about a particullar QR Code version

        // -- 1. Calculate the total bits needed to encode all the data for a particullar version
        let dataStreamSize = computeTheoreticalSizeOfDataForVersion(workingEncodedData, version as QRVersion, eciSwitchingMode, modeSwitchingMode);

        // Calculate for terminator and byte alignment
        dataStreamSize += Math.min(4, Math.max(0, (capacity * 8) - dataStreamSize)); // Terminator (up to 4 bits)
        dataStreamSize += (8 - (dataStreamSize % 8)) % 8; // Byte alignment

        // -- 2. When we find a version that can hold the data, return it
        if (capacity >= Math.ceil(dataStreamSize / 8)) {
            bestVersion = version as QRVersion;
            break; // Found a suitable version
        }
    }

    // Check if preferred min version can be used
    if (minPrefferedVersion !== null && bestVersion !== null && bestVersion < minPrefferedVersion && minPrefferedVersion <= 40) {
        bestVersion = minPrefferedVersion; // Use preffered min version if possible
    }

    if (bestVersion === null || bestVersion > 40) {
        // TODO: Replace with proper error rather than debug error
        const dataStreamSize = prepareDatastream(encodedData, 40, eciSwitchingMode, modeSwitchingMode).reduce((sum, codeWord) => sum + codeWord.length, 0) / 8; // Just to see the size of the prepared datastream for version 40
        throw new Error(`No suitable QR code version found for the provided data and ECC level. Plain Data: \"${encodedData.map(segment => segment.plainTextData).join("")}\". Binary Data: ${encodedData.map(segment => segment.encodedData)}. Size: ${dataStreamSize} bytes. ECC Level: ${eccLevel}. ECI Switching Mode: ${eciSwitchingMode}.`);
    }

    return bestVersion;
}