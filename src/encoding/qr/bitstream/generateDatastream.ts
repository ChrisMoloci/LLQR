import {
    DataEncodingCharacterSet,
    DataEncodingMode,
    ECISwitchingStrategy,
    EncodedDataSegment,
    ModeSwitchingStrategy,
    QRVersion
} from "../../../types";
import {DATA_ENCODING_MODE, ECI_SWITCHING_STRATEGY, MODE_SWITCHING_STRATEGY} from "../../../constants";
import {
    generateLengthIndicator,
    generateECIIndicatorAndAssignmentNumber,
    optimizeAdjacentAlphanumericNumericSegments,
    getCharCountIndicatorLength, optimizeAdjacentByteSegments
} from "./..";

export function generateDatastream(encodedSegments: Array<EncodedDataSegment>, version: QRVersion, eciSwitchingMode: ECISwitchingStrategy = ECI_SWITCHING_STRATEGY.DISABLED, modeSwitchingMode: ModeSwitchingStrategy): Array<string> {
    const dataStream: Array<string> = []; // Will hold the final data stream (as an array of codewords)

    // Store Encoding Mode and ECI Assignment Number states for mode switching checks
    // let encodingModeState: DataEncodingMode | null = null; // Holds current encoding mode state for mode switching
    let eciModeAssignmentNumberState: DataEncodingCharacterSet | null = null; // Holds current ECI mode charset state for mode switching

    let i = 0; // Index to track the current segment being processed

    let remainingOptimizedNumericAlphanumericSegmentsCount = 0;
    let remainingOptimizedByteSegmentsCount = 0;

    // Iterate through each encoded segment to build the data stream
    while (i < encodedSegments.length) {
        // Get the segment we are going to be working on
        let segment: EncodedDataSegment = encodedSegments[i]!;
        console.log("Preparing segment for datastream:", segment);

        // -- 1. Consolidate cross compatible segments (alphanumeric and numeric) if possible --
        const crossCompatibleAlphanumericNumericSegments: Array<EncodedDataSegment> = [];

        // Only attempt consolidation if mode switching is "auto" and current segment is alphanumeric or numeric
        if (modeSwitchingMode === MODE_SWITCHING_STRATEGY.AUTO && remainingOptimizedNumericAlphanumericSegmentsCount === 0 && (
            segment.encodingMode === DATA_ENCODING_MODE.ALPHANUMERIC || segment.encodingMode === DATA_ENCODING_MODE.NUMERIC
        )) {
            crossCompatibleAlphanumericNumericSegments.push(segment); // Add the current segment to the list of cross compatible segments

            for (let j = i + 1; j < encodedSegments.length; j++) {
                // Iterate through subsequent segments to see if any are cross-compatible for consolidation

                const followingSegment = encodedSegments[j]; // Next segment to check
                const followingEncodingMode = followingSegment?.encodingMode; // Next segment's encoding mode

                if (followingSegment && (followingEncodingMode === DATA_ENCODING_MODE.ALPHANUMERIC || followingEncodingMode === DATA_ENCODING_MODE.NUMERIC)) {
                    // If the following segment is cross-compatible, add it to the collection
                    crossCompatibleAlphanumericNumericSegments.push(followingSegment!); // Add to cross-compatible segments
                    // i = j; // Move index forward since we've collected this segment
                } else break; // No more consecutive cross-compatible segments
            }
        }

        // Now, process the collected cross-compatible segments to see if consolidation saves space
        if (crossCompatibleAlphanumericNumericSegments.length > 1) {
            const optimizedCrossCompatSegments = optimizeAdjacentAlphanumericNumericSegments(crossCompatibleAlphanumericNumericSegments, version);

            encodedSegments.splice(i, crossCompatibleAlphanumericNumericSegments.length, ...optimizedCrossCompatSegments); // Replace the original segments with the optimized segments

            segment = encodedSegments[i]!; // Update current segment to the first of the optimized segments for size calculation
            // encodingMode = segment.encodingMode; // Update encoding mode for segment

            remainingOptimizedNumericAlphanumericSegmentsCount = optimizedCrossCompatSegments.length; // Set the remaining optimized segment count to skip optimizing the next segments that were just optimized

            console.log("Optimized cross-compatible segments:", optimizedCrossCompatSegments);
            console.log("Updated encoded segments after optimization:", encodedSegments);
        }

        // -- 2. Consolidate cross compatible segments (byte) if possible --
        const crossCompatibleByteSegments: Array<EncodedDataSegment> = [];

        if (modeSwitchingMode === MODE_SWITCHING_STRATEGY.AUTO &&
            remainingOptimizedNumericAlphanumericSegmentsCount === 0 &&
            segment.encodingMode === DATA_ENCODING_MODE.BYTE) {
            crossCompatibleByteSegments.push(segment);

            for (let j = i + 1; j < encodedSegments.length; j++) {
                // Iterate through subsequent segments to see if any are cross-compatible for consolidation

                const followingSegment = encodedSegments[j]; // Next segment to check
                const followingEncodingMode = followingSegment?.encodingMode; // Next segment's encoding mode

                if (followingSegment && followingEncodingMode === DATA_ENCODING_MODE.BYTE) {
                    // If the following segment is cross-compatible, add it to the collection
                    crossCompatibleAlphanumericNumericSegments.push(followingSegment!); // Add to cross-compatible segments
                } else break; // No more consecutive cross-compatible segments
            }
        }

        // Now, process the collected cross-compatible segments to see if consolidation saves space
        if (crossCompatibleByteSegments.length > 1) {
            const optimizedCrossCompatSegments = optimizeAdjacentByteSegments(crossCompatibleByteSegments, version)

            encodedSegments.splice(i, crossCompatibleAlphanumericNumericSegments.length, ...optimizedCrossCompatSegments); // Replace the original segments with the optimized segments

            segment = encodedSegments[i]!; // Update current segment to the first of the optimized segments for size calculation
            // encodingMode = segment.encodingMode; // Update encoding mode for segment

            remainingOptimizedByteSegmentsCount = optimizedCrossCompatSegments.length; // Set the remaining optimized segment count to skip optimizing the next segments that were just optimized

            console.log("Optimized cross-compatible segments:", optimizedCrossCompatSegments);
            console.log("Updated encoded segments after optimization:", encodedSegments);
        }

        // -- 2. Add Header to datastream

        // -- A: ECI headers --
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

        // // Mode headers
        // if (encodingModeState !== segment.encodingMode ||
        //     (
        //         // Always add mode indicator + char count indicator if ECI switching is forced since it must acompany every ECI mode indicator + assignment number
        //         eciSwitchingMode === ECI_SWITCHING_STRATEGY.FORCED &&
        //         segment.encodingMode == DATA_ENCODING_MODE.BYTE
        //     ) ||
        //     (
        //         // Add a mode indicator + char count indicator if ECI switching is "auto" and adjacent byte segments have different ECI assignment numbers
        //         eciSwitchingMode === ECI_SWITCHING_STRATEGY.AUTO &&
        //         segment.encodingMode === DATA_ENCODING_MODE.BYTE &&
        //         eciModeAssignmentNumberState !== segment.charSetAssignmentNumber
        //     )
        // ) {
        //     // If encoding mode has changed
        //
        //     // Add Mode Indicator
        //     const encodingMode: DataEncodingMode = segment.encodingMode;
        //
        //     // Add Character Count Indicator
        //     const charCountIndicator = generateLengthIndicator(segment.plainTextData, segment.encodedData, getCharCountIndicatorLength(segment.encodingMode, version), segment.encodingMode);
        //
        //     // Add Mode Indicator and Character Count Indicator to data stream
        //     dataStream.push(encodingMode, charCountIndicator);
        //     console.log(`Added Mode Indicator ${encodingMode} and Character Count Indicator ${charCountIndicator} to data stream.`);
        //
        //     // Update encoding mode state
        //     encodingModeState = encodingMode;
        // }

        // -- B: Add Mode Indicator --
        const encodingMode: DataEncodingMode = segment.encodingMode;

        // Add Character Count Indicator
        const charCountIndicator = generateLengthIndicator(segment.plainTextData, segment.encodedData, getCharCountIndicatorLength(segment.encodingMode, version), segment.encodingMode);

        // Add Mode Indicator and Character Count Indicator to data stream
        dataStream.push(encodingMode, charCountIndicator);
        console.log(`Added Mode Indicator ${encodingMode} and Character Count Indicator ${charCountIndicator} to data stream.`);

        // Update encoding mode state
        // encodingModeState = encodingMode;

        // -- C: Add the encoded data for the segment to the data stream --
        dataStream.push(...segment.encodedData); // Append the encoded data to the data stream
        console.log("Added Encoded Data to data stream:", segment.encodedData);

        i++; // Move to the next segment

        remainingOptimizedNumericAlphanumericSegmentsCount = Math.max(0, remainingOptimizedNumericAlphanumericSegmentsCount - 1); // Decrease remaining optimized segment count if we are in optimized segments territory
        remainingOptimizedByteSegmentsCount = Math.max(0, remainingOptimizedByteSegmentsCount - 1);
    }

    console.log("Final Prepared Data Stream:", dataStream);

    // Return the prepared data stream
    return dataStream;
}

export default generateDatastream;