// import { DATA_ENCODING_MODE } from "../constants/DATA_ENCODING_MODE";
// import { EncodedDataSegment } from "../types/EncodedDataSegment";
// import { DataEncodingCharacterSet } from "../types/constantTypes/DataEncodingCharacterSet";
// import { DataEncodingMode } from "../types/constantTypes/DataEncodingMode";
// import { ECI_SWITCHING_STRATEGY } from "../constants/ECI_SWITCHING_STRATEGY";
// import { QRVersion } from "../types/constantTypes/QRVersion";
// import { ECISwitchingStrategy } from "../types/constantTypes/ECISwitchingStrategy";
// import { getCharCountIndicatorLength } from "../encoding/qr/segmentation/getCharCountIndicatorLength";
// import optimizeCrossCompatibleSegments from "../encoding/qr/segmentation/optimizeCrossCompatSegments";
// import { ModeSwitchingStrategy } from "../types/constantTypes/ModeSwitchingStrategy";
// import { getECIAssignmentNumberSize } from "../encoding/qr/eci/getECIAssignmentNumberSize";



// Helper functions for determinVersion()
import {EncodedDataSegment} from "../types";
import {
    DataEncodingCharacterSet,
    DataEncodingMode,
    ECISwitchingStrategy,
    ModeSwitchingStrategy,
    QRVersion
} from "../types/constantTypes";
import {DATA_ENCODING_MODE, ECI_SWITCHING_STRATEGY} from "../constants";
import {getCharCountIndicatorLength, getECIAssignmentNumberSize, optimizeCrossCompatibleSegments} from "../encoding";

export function computeTheoreticalSizeOfDataForVersion(encodedData: Array<EncodedDataSegment>, version: QRVersion, eciSwitchingMode: ECISwitchingStrategy, modeSwitchingMode: ModeSwitchingStrategy): number {
    let encodingModeState: DataEncodingMode | null = null; // Holds current encoding mode state for mode switching
    let eciModeAssignmentNumberState: DataEncodingCharacterSet | null = null; // Holds current ECI mode state for mode switching

    let totalSize = 0; // Total size in bits
    let i = 0; // Index to iterate through encodedData segments

    // When an run of alpha/num segments is optimized, this is used to skip repeatedly optimizing size (for performance)
    let remainingOptimizedSegmentCount = 0;

    while (i < encodedData.length) {
        // -- 1. Consolidate cross-compatible segments (alphanumeric/numeric) if possible --
        let segment = encodedData[i]!; // Stores current segment being processed
        let encodingMode = segment.encodingMode; // Current segment's encoding mode

        const crossCompatSegments: Array<EncodedDataSegment> = [];

        // Only attempt consolidation if mode switching is "auto" and current segment is alphanumeric or numeric
        if (modeSwitchingMode === ECI_SWITCHING_STRATEGY.AUTO && remainingOptimizedSegmentCount === 0 && (encodingMode === DATA_ENCODING_MODE.ALPHANUMERIC || encodingMode === DATA_ENCODING_MODE.NUMERIC)) {
            crossCompatSegments.push(segment!); // Add current segment to cross-compatible segments

            for (let j = i + 1; j < encodedData.length; j++) {
                // Iterate through subsequent segments to see if any are cross-compatible for consolidation

                const followingSegment = encodedData[j]; // Next segment to check
                const followingEncodingMode = followingSegment?.encodingMode; // Next segment's encoding mode

                if (followingSegment && (followingEncodingMode === DATA_ENCODING_MODE.ALPHANUMERIC || followingEncodingMode === DATA_ENCODING_MODE.NUMERIC)) {
                    // If the following segment is cross-compatible, add it to the collection
                    crossCompatSegments.push(followingSegment!); // Add to cross-compatible segments
                    // i = j; // Move index forward since we've collected this segment
                } else break; // No more consecutive cross-compatible segments
            }
        }

        // Now, process the collected cross-compatible segments to see if consolidation saves space
        if (crossCompatSegments.length > 1) {
            const optimizedCrossCompatSegments = optimizeCrossCompatibleSegments(crossCompatSegments, version);

            encodedData.splice(i, crossCompatSegments.length, ...optimizedCrossCompatSegments); // Replace the original segments with the optimized segments

            segment = encodedData[i]!; // Update current segment to the first of the optimized segments for size calculation 
            encodingMode = segment.encodingMode; // Update encoding mode for segment

            remainingOptimizedSegmentCount = optimizedCrossCompatSegments.length; // Set the remaining optimized segment count to skip optimizing the next segments that were just optimized
        }

        // -- 2. Calculate sizing for the segments (works with optimized segments to since we are modiyfing encodedData) --
        
        // Mode indicator + char count indicator if switching modes or adjacent byte segments have ECI mode indicator + assignment number
        if (encodingModeState !== segment.encodingMode ||
            (
                // Always add mode indicator + char count indicator size if ECI switching is forced since it must acompany every ECI mode indicator + assignment number
                eciSwitchingMode === ECI_SWITCHING_STRATEGY.FORCED &&
                segment.encodingMode == DATA_ENCODING_MODE.BYTE
            ) ||
            (
                // Add a mode indicator + char count indicator size if ECI switching is "auto" and adjacent byte segments have different ECI assignment numbers
                eciSwitchingMode === ECI_SWITCHING_STRATEGY.AUTO &&
                segment.encodingMode === DATA_ENCODING_MODE.BYTE &&
                eciModeAssignmentNumberState !== segment.charSetAssignmentNumber
            )
        ) {
            totalSize += 4; // Mode indicator size

            // Get length indicator size for this segment based on version
            totalSize += getCharCountIndicatorLength(segment.encodingMode, version as QRVersion);

            // Update encoding mode state
            encodingModeState = segment.encodingMode;
        }

        if (eciSwitchingMode === ECI_SWITCHING_STRATEGY.FORCED && segment.encodingMode == DATA_ENCODING_MODE.BYTE) {
            // ECI indicator + assignment number for every byte instance if ECI switching is "forced"
            totalSize += 4; // ECI Mode Indicator size

            // Get assignment number size based on char count
            // console.log("Getting ECI assignment number size for assignment number:", segment.charSetAssignmentNumber);
            totalSize += getECIAssignmentNumberSize(segment.charSetAssignmentNumber);

            // Update ECI mode state
            eciModeAssignmentNumberState = segment.charSetAssignmentNumber;
        }

        else if (eciSwitchingMode === ECI_SWITCHING_STRATEGY.AUTO && segment.encodingMode === DATA_ENCODING_MODE.BYTE && eciModeAssignmentNumberState !== segment.charSetAssignmentNumber) {
            // ECI indicator + assignment number based on state change if ECI switching is "auto"
            totalSize += 4; // ECI Mode Indicator size

            // Get assignment number size based on char count
            // console.log("Getting ECI assignment number size for assignment number:", segment.charSetAssignmentNumber);
            totalSize += getECIAssignmentNumberSize(segment.charSetAssignmentNumber);

            // Update ECI mode state
            eciModeAssignmentNumberState = segment.charSetAssignmentNumber;
        }

        // Add the length of the encoded data in bits
        totalSize += segment.encodedData.reduce((sum, codeWord) => sum + codeWord.length, 0); // Add encoded data length in bits

        i++; // Move to next segment

        remainingOptimizedSegmentCount = Math.max(0, remainingOptimizedSegmentCount - 1); // Decrease remaining optimized segment count if we are in optmized segments territory
    }

    return totalSize;
}

export default computeTheoreticalSizeOfDataForVersion;