import {ECCLevel, EncodedDataSegment, PreparedDatastream, QRDataCapacityBitsTableEntry} from "../../../types";
import {
    DataEncodingCharacterSet,
    DataEncodingMode,
    ECISwitchingStrategy,
    ModeSwitchingStrategy,
    QRVersion
} from "../../../types";
import {
    DATA_ENCODING_MODE,
    ECC_LEVEL_CODE,
    ECI_SWITCHING_STRATEGY,
    MODE_SWITCHING_STRATEGY,
    QR_VERSION
} from "../../../constants";
import {
    optimizeCrossCompatibleSegments,
    generateECIIndicatorAndAssignmentNumber,
    generateLengthIndicator,
    getCharCountIndicatorLength
} from "../.";
import {qrDataCapacityBits} from "../../../datasets";
import {version} from "node:os";

export function prepareDatastream(encodedData: Array<EncodedDataSegment>, eccLevel: ECCLevel, eciSwitchingMode: ECISwitchingStrategy = ECI_SWITCHING_STRATEGY.DISABLED, modeSwitchingMode: ModeSwitchingStrategy, preferredVersion?: QRVersion): PreparedDatastream {
    let bestVersion: QRVersion | null = null; // Stores best version found through iterations (eventuall the best version)
    let datastream: Array<string> = [];

    let preparedDatastream: PreparedDatastream;

    // Loop through all QR versions from 1 to 40
    for (let version: QRVersion = QR_VERSION.V1; version <= QR_VERSION.V40; version++) {
        // Create a copy of encodedData so it can be mutated without affecting the original data
        const workingEncodedData = [...encodedData];

        // -- 1. Try Creating a datastream for this version --
        datastream = createDatastream(encodedData, version as QRVersion, eciSwitchingMode, modeSwitchingMode);;

        // -- 2. Take the datastream for this version and check if it fits in the QR Code

        const eccLevelKey = Object.entries(ECC_LEVEL_CODE).find(([key, value]) => value === eccLevel)?.[0];
        if (!eccLevelKey) throw Error("Invalid ECC LEVEL_CODE");

        // Get the capacity information for this version
        const versionTableVersion: Record<string, QRDataCapacityBitsTableEntry> | undefined = qrDataCapacityBits[version];
        if (!versionTableVersion) throw Error("Invalid ECC LEVEL_CODE");

        // Get the data capacity for the version
        const capacity = versionTableVersion[eccLevelKey]!.data; // Get info about a particullar QR Code version

        let datastreamSize = datastream.reduce((acc, current) => acc + current.length, 0);

        // Calculate for terminator and byte alignment
        datastreamSize += Math.min(4, Math.max(0, (capacity * 8) - datastreamSize)); // Terminator (up to 4 bits)
        datastreamSize += (8 - (datastreamSize % 8)) % 8; // Byte alignment

        // -- 2. When we find a version that can hold the data, return it
        if (capacity >= Math.ceil(datastreamSize / 8)) {
            bestVersion = version as QRVersion;
            break; // Found a suitable version
        }
    }

    if (bestVersion === null) throw new Error(`No suitable QR code version found for the provided data and ECC level.`);

    if (preferredVersion && bestVersion < preferredVersion) {
        // If best version is less than the preferred version, use preferred version

        // Re-encode the data for the preferred version
        datastream = createDatastream(encodedData, preferredVersion as QRVersion, eciSwitchingMode, modeSwitchingMode);

        return {
            version: preferredVersion,
            datastream: datastream,
        };
    } else {
        // If best version is >= preferred version just use best version
        return {
            version: bestVersion,
            datastream: datastream,
        }
    }

}

// TODO: Move to its own file
export function createDatastream(encodedSegments: Array<EncodedDataSegment>, version: QRVersion, eciSwitchingMode: ECISwitchingStrategy = ECI_SWITCHING_STRATEGY.DISABLED, modeSwitchingMode: ModeSwitchingStrategy): Array<string> {
    const dataStream: Array<string> = []; // Will hold the final data stream (as an array of codewords)

    // Store Encoding Mode and ECI Assignment Number states for mode switching checks
    let encodingModeState: DataEncodingMode | null = null; // Holds current encoding mode state for mode switching
    let eciModeAssignmentNumberState: DataEncodingCharacterSet | null = null; // Holds current ECI mode charset state for mode switching

    let i = 0; // Index to track the current segment being processed

    let remainingOptimizedSegmentsCount = 0;

    // Iterate through each encoded segment to build the data stream
    while (i < encodedSegments.length) {
        // Get the segment we are going to be working on
        let segment: EncodedDataSegment = encodedSegments[i]!;
        console.log("Preparing segment for datastream:", segment);

        // -- 1. Consolidate cross compatible segments (alphanumeric and numeric) if possilbe --
        const crossCompatibleSegments: Array<EncodedDataSegment> = [];

        // Only attempt consolidation if mode switching is "auto" and current segment is alphanumeric or numeric
        if (modeSwitchingMode === MODE_SWITCHING_STRATEGY.AUTO && remainingOptimizedSegmentsCount === 0 && (
            segment.encodingMode === DATA_ENCODING_MODE.ALPHANUMERIC || segment.encodingMode === DATA_ENCODING_MODE.NUMERIC
        )) {
            crossCompatibleSegments.push(segment); // Add the current segment to the list of cross compatible segments

            for (let j = i + 1; j < encodedSegments.length; j++) {
                // Iterate through subsequent segments to see if any are cross-compatible for consolidation

                const followingSegment = encodedSegments[j]; // Next segment to check
                const followingEncodingMode = followingSegment?.encodingMode; // Next segment's encoding mode

                if (followingSegment && (followingEncodingMode === DATA_ENCODING_MODE.ALPHANUMERIC || followingEncodingMode === DATA_ENCODING_MODE.NUMERIC)) {
                    // If the following segment is cross-compatible, add it to the collection
                    crossCompatibleSegments.push(followingSegment!); // Add to cross-compatible segments
                    // i = j; // Move index forward since we've collected this segment
                } else break; // No more consecutive cross-compatible segments
            }
        }

        // Now, process the collected cross-compatible segments to see if consolidation saves space
        if (crossCompatibleSegments.length > 1) {
            const optimizedCrossCompatSegments = optimizeCrossCompatibleSegments(crossCompatibleSegments, version);

            encodedSegments.splice(i, crossCompatibleSegments.length, ...optimizedCrossCompatSegments); // Replace the original segments with the optimized segments

            segment = encodedSegments[i]!; // Update current segment to the first of the optimized segments for size calculation
            // encodingMode = segment.encodingMode; // Update encoding mode for segment

            remainingOptimizedSegmentsCount = optimizedCrossCompatSegments.length; // Set the remaining optimized segment count to skip optimizing the next segments that were just optimized

            console.log("Optimized cross-compatible segments:", optimizedCrossCompatSegments);
            console.log("Updated encoded segments after optimization:", encodedSegments);
        }

        // -- 2.

        // ECI headers
        if (eciSwitchingMode === ECI_SWITCHING_STRATEGY.FORCED && segment.encodingMode === DATA_ENCODING_MODE.BYTE) {
            // Always add ECI Indicator and Assignment Number for Byte mode segments if ECI switching is forced
            const eciStream = generateECIIndicatorAndAssignmentNumber(segment.charSetAssignmentNumber);
            dataStream.push(...eciStream); // Append ECI indicator and assignment number to the data stream
            console.log("Added ECI Segment to data stream (forced):", eciStream);
        } else if (eciSwitchingMode === ECI_SWITCHING_STRATEGY.AUTO && segment.encodingMode === DATA_ENCODING_MODE.BYTE && eciModeAssignmentNumberState !== segment.charSetAssignmentNumber) {
            // Add ECI Indicator and Assignment Number for Byte mode segments if ECI switching is "auto" and charset has changed
            const eciStream = generateECIIndicatorAndAssignmentNumber(segment.charSetAssignmentNumber);
            dataStream.push(...eciStream); // Append ECI indicator and assignment number to the data stream
            console.log("Added ECI Segment to data stream (auto):", eciStream);
            eciModeAssignmentNumberState = segment.charSetAssignmentNumber; // Update ECI charset state
        }

        // Mode headers
        if (encodingModeState !== segment.encodingMode ||
            (
                // Always add mode indicator + char count indicator if ECI switching is forced since it must acompany every ECI mode indicator + assignment number
                eciSwitchingMode === ECI_SWITCHING_STRATEGY.FORCED &&
                segment.encodingMode == DATA_ENCODING_MODE.BYTE
            ) ||
            (
                // Add a mode indicator + char count indicator if ECI switching is "auto" and adjacent byte segments have different ECI assignment numbers
                eciSwitchingMode === ECI_SWITCHING_STRATEGY.AUTO &&
                segment.encodingMode === DATA_ENCODING_MODE.BYTE &&
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

        // Add the encoded data for the segment to the data stream
        dataStream.push(...segment.encodedData); // Append the encoded data to the data stream
        console.log("Added Encoded Data to data stream:", segment.encodedData);

        i++; // Move to the next segment

        remainingOptimizedSegmentsCount = Math.max(0, remainingOptimizedSegmentsCount - 1); // Decrease remaining optimized segment count if we are in optmized segments territory
    }

    console.log("Final Prepared Data Stream:", dataStream);

    // Return the prepared data stream
    return dataStream;
}

export default prepareDatastream;