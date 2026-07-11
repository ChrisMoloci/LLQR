import {DataEncodingCharacterSet, ECISwitchingStrategy, EncodedDataSegment, QRVersion} from "../../../types";
import {encodeBinary} from "../../binary";
import getCharCountIndicatorLength from "./getCharCountIndicatorLength";
import {DATA_ENCODING_CHARACTER_SET, DATA_ENCODING_MODE, ECI_SWITCHING_STRATEGY} from "../../../constants";
import getECIAssignmentNumberSize from "../eci/getECIAssignmentNumberSize";

export function optimizeAdjacentByteSegments(segment: EncodedDataSegment, version: QRVersion, eciSwitchingStrategy: ECISwitchingStrategy, eciModeAssignmentNumberState?: DataEncodingCharacterSet): Array<EncodedDataSegment> {
    if (segment.encodingMode !== DATA_ENCODING_MODE.BYTE || segment.charSetAssignmentNumber !== DATA_ENCODING_CHARACTER_SET["UTF-8"]) {
        throw new Error("optimizeAdjacentByteSegments only supports Byte Segments with a character set of UTF-8");
    }

    console.log(`Attempting to optimize segment: ` + JSON.stringify(segment));

    // Characters in this range may be better encoded in Latin-1
    const inefficientRange = /[\u0080-\u00FF]+/g;
    const textData = segment.plainTextData

    // Get all substrings greedily
    const matches = textData.matchAll(inefficientRange);

    console.log("Matches:")
    for (const match of textData.matchAll(inefficientRange)) {
        console.log(match);
    }

    // Get the character count indicator length per byte segment
    const characterCountIndicatorLength = getCharCountIndicatorLength(DATA_ENCODING_MODE.BYTE, version);

    // Calculate the overhead for MODE + Character Count Indicator
    const headerOverhead = (4 + characterCountIndicatorLength);

    // Will store the optimized segments from segment
    let efficientSegments: Array<EncodedDataSegment> = [];

    // ECI state passed from generateDatastream
    let eciState = eciModeAssignmentNumberState ?? -1;

    // Represents index of data between a previous match and current
    let head = 0;

    // Collect all efficient matches
    for (const match of matches) {
        // Latin-1 Segment based on match
        const latin1Text = match[0];
        const start = match.index;
        const end = start + latin1Text.length;
        const latin1EncodedData = encodeBinary(latin1Text);

        // Gap Segment between prev match and this one
        const gapText = textData.slice(head, start);
        const gapEncodedData= gapText.length > 0 ? encodeBinary(gapText) : null;

        // Joined Data
        const joinedText = gapText + latin1Text;
        const encodedJoinedText = encodeBinary(joinedText);

        const previousSegments = efficientSegments[efficientSegments.length - 1];

        if (
            latin1EncodedData.encodingMode !== DATA_ENCODING_MODE.BYTE ||
            gapEncodedData?.encodingMode !== DATA_ENCODING_MODE.BYTE ||
            encodedJoinedText.encodingMode !== DATA_ENCODING_MODE.BYTE
        ) {
            throw new Error("One or more created segments were encoded with the incorrect mode :(");
        }

        let localECIState = eciState;

        // Calculate ECI overhead
        const gapECIOverhead = (
            (
                gapEncodedData &&
                (eciSwitchingStrategy === ECI_SWITCHING_STRATEGY.AUTO && (localECIState !== gapEncodedData.charSetAssignmentNumber || localECIState === -1)) ||
                eciSwitchingStrategy === ECI_SWITCHING_STRATEGY.FORCED
            )
        ) ? 4 + getECIAssignmentNumberSize(gapEncodedData.charSetAssignmentNumber) : 0;


        // If gapEncodedData exists, set localECI state to gapEncoedData charset
        localECIState = (gapEncodedData && gapEncodedData.encodingMode === DATA_ENCODING_MODE.BYTE) ? gapEncodedData.charSetAssignmentNumber : localECIState;

        const latin1ECIOverhead =
            (
                (eciSwitchingStrategy === ECI_SWITCHING_STRATEGY.AUTO && (localECIState !== latin1EncodedData.charSetAssignmentNumber || localECIState === -1)) ||
                eciSwitchingStrategy === ECI_SWITCHING_STRATEGY.FORCED
            ) ? 4 + getECIAssignmentNumberSize(latin1EncodedData.charSetAssignmentNumber) : 0;

        // If latin1ECIOverhead > 0, ECI state has changed, make sure to reflect that
        localECIState = (latin1ECIOverhead > 0 && latin1EncodedData.encodingMode === DATA_ENCODING_MODE.BYTE) ? latin1EncodedData.charSetAssignmentNumber : localECIState;

        // Use separate ECIOverhead as this would not reflect ECI switching for UTF-8 + Latin-1
        const joinedECIOverhead =
            (
                (eciSwitchingStrategy === ECI_SWITCHING_STRATEGY.AUTO && (eciState !== encodedJoinedText.charSetAssignmentNumber || eciState === -1)) ||
                eciSwitchingStrategy === ECI_SWITCHING_STRATEGY.FORCED
            )
                ? 4 + getECIAssignmentNumberSize(encodedJoinedText.charSetAssignmentNumber) : 0;

        // Calculate total overhead for segments

        // gapEncodedData overhead should only cost if previous 2 segments were not merged, if prev segment is UTF-8, this segment will be merged with that one unless previous segment is from before main segment
        const gapOverhead = (gapEncodedData && gapEncodedData.encodingMode === DATA_ENCODING_MODE.BYTE && (eciState !== gapEncodedData.charSetAssignmentNumber || efficientSegments.length === 0)) ?
            headerOverhead + gapECIOverhead : 0;
        console.log("UTF-8 Overhead: " + gapOverhead)

        // Due to how matchAll behaves, UTF-8 section could encode to latin-1, as these segments will later be merged, this should cost nothing if they are the same charset
        const latin1Overhead = (
            (
                latin1EncodedData.encodingMode === DATA_ENCODING_MODE.BYTE &&
                gapEncodedData.charSetAssignmentNumber !== latin1EncodedData.charSetAssignmentNumber
            ) ||
                (
                    !gapEncodedData &&
                    (eciState !== latin1EncodedData.charSetAssignmentNumber || efficientSegments.length === 0)
                )
        ) ?
            headerOverhead + latin1ECIOverhead : 0;
        console.log("Latin-1 Overhead: " + latin1Overhead)

        // Joined overhead should only cost if previous 2 segments were not merged into a UTF-8 segment, if this happens, this segment will be merged with the previous
        const joinedOverhead = (eciState !== encodedJoinedText.charSetAssignmentNumber || efficientSegments.length === 0) ? (headerOverhead + joinedECIOverhead) : 0;
        console.log("Joined Overhead: " + joinedOverhead)

        // Calculate bitstream sizes for split segments or joined segments
        const separatedStreamSize = (gapEncodedData ? gapOverhead + gapEncodedData.encodedData.length * 8 : 0) + latin1Overhead + (latin1EncodedData.encodedData.length * 8);
        const joinedStreamSize = joinedOverhead + (encodedJoinedText.encodedData.length * 8);

        console.log("Latin-1 Segment on its own: " + latin1Text + " Size: " + (latin1Overhead + (latin1EncodedData.encodedData.length * 8)));
        console.log(latin1EncodedData)
        console.log("UTF-8 Segment on its own: " + gapText + " Size: " + (gapEncodedData ? gapOverhead + gapEncodedData.encodedData.length * 8 : 0));
        console.log(gapEncodedData)
        console.log("Joined: " + joinedText + " Size: " + joinedStreamSize);
        console.log(encodedJoinedText)

        if (separatedStreamSize < joinedStreamSize) {
            // Use separate segments if more efficient

            // Since we are using 2 segments, we update ECI state to local state
            eciState = localECIState;

            if (gapEncodedData) {
                // Only push gapEncodedData if it exists.
                efficientSegments.push(gapEncodedData);
            }
            efficientSegments.push(latin1EncodedData); // Also push the latin-1 segment
        } else {
            // Use joined segments if more efficient

            // Set ECIState to UTF-8
            eciState = encodedJoinedText.charSetAssignmentNumber;

            efficientSegments.push(encodedJoinedText); // Push the joined segment
        }

        // Sets the head to the end of the latin-1 segment to help parse the text between this segment and the next
        head = end;
    }

    // Add any remaining trailing text
    if (head < textData.length) {
        const trailingText = textData.slice(head);
        const encodedTrailingText = encodeBinary(trailingText);
        efficientSegments.push(encodedTrailingText);
    }

    // Merge adjacent byte segments that use the same character set.
    // This is intentionally done after optimization so the optimizer can still compare split vs joined layouts.
    const mergedSegments: Array<EncodedDataSegment> = [];

    for (const segment of efficientSegments) {
        // Get the segment before this one
        const previousSegment = mergedSegments[mergedSegments.length - 1];

        if (
            previousSegment !== undefined &&
            previousSegment.encodingMode === DATA_ENCODING_MODE.BYTE &&
            segment.encodingMode === DATA_ENCODING_MODE.BYTE &&
            previousSegment.charSetAssignmentNumber === segment.charSetAssignmentNumber
        ) {
            // If both segments are byte encoded and share same charset, merge them
            const mergedText = previousSegment.plainTextData + segment.plainTextData;
            mergedSegments[mergedSegments.length - 1] = encodeBinary(mergedText);
        } else {
            // If segment not adjacent to another segment with same charset, don't merge with previousSegment
            mergedSegments.push(segment);
        }
    }

    efficientSegments = mergedSegments; // Update efficient segments

    console.log("Optimized segments: ");
    console.log(efficientSegments);

    return efficientSegments;
}

export default optimizeAdjacentByteSegments;