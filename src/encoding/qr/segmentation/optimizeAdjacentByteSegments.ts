import {DataEncodingCharacterSet, ECISwitchingStrategy, EncodedDataSegment, QRVersion} from "../../../types";
import {encodeBinary} from "../../binary";
import getCharCountIndicatorLength from "./getCharCountIndicatorLength";
import {DATA_ENCODING_CHARACTER_SET, DATA_ENCODING_MODE, ECI_SWITCHING_STRATEGY} from "../../../constants";
import getECIAssignmentNumberSize from "../eci/getECIAssignmentNumberSize";

const calculateECICost = (encodedSegment: EncodedDataSegment, eciState: DataEncodingCharacterSet, eciSwitchingStrategy: ECISwitchingStrategy): number => {
    if (encodedSegment.encodingMode !== DATA_ENCODING_MODE.BYTE) throw Error("Only byte segments can have ECI segments");

    return (
        encodedSegment &&
        (eciSwitchingStrategy === ECI_SWITCHING_STRATEGY.AUTO && (eciState !== encodedSegment.charSetAssignmentNumber || eciState === -1)) ||
        eciSwitchingStrategy === ECI_SWITCHING_STRATEGY.FORCED
    ) ?
        4 + getECIAssignmentNumberSize(encodedSegment.charSetAssignmentNumber) : 0;
}


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

    // console.log("Matches:")
    // for (const match of textData.matchAll(inefficientRange)) {
    //     console.log(match);
    // }

    // Get the character count indicator length per byte segment
    const characterCountIndicatorLength = getCharCountIndicatorLength(DATA_ENCODING_MODE.BYTE, version);

    // Calculate the overhead for MODE + Character Count Indicator
    const headerOverhead = (4 + characterCountIndicatorLength);

    // Will store the optimized segments from segment
    let efficientSegments: Array<EncodedDataSegment> = [];

    // ECI state passed from generateDatastream
    let eciState = eciModeAssignmentNumberState ?? -1; // -1 means unset

    // Represents index of data between a previous match and current
    let head = 0;

    for (const match of matches) {
        // Get the previous added segment
        const prevSegment = efficientSegments[efficientSegments.length - 1];

        // Get the inefficient data (from the match and encoded it)
        const inefficientText = match[0];
        const inefficientEncodedData = encodeBinary(inefficientText);
        const start = match.index;
        const end = start + inefficientText.length;

        // Get the data between the last match and this one (the gap) and encode it
        const gapText = textData.slice(head, start);
        const gapEncodedData = gapText.length > 0 ? encodeBinary(gapText) : null;

        // Join both the inefficient and gap text so we can also see the size of the data combined
        const joinedText = gapText + inefficientText;
        const joinedEncodedData = encodeBinary(joinedText);

        // This is just to make TypeScript happy, since we are only using encodeBinary they will obviously be BYTE mode
        if (
            (prevSegment != null && prevSegment.encodingMode !== DATA_ENCODING_MODE.BYTE) ||
            inefficientEncodedData.encodingMode !== DATA_ENCODING_MODE.BYTE ||
            (gapEncodedData != null && gapEncodedData.encodingMode !== DATA_ENCODING_MODE.BYTE) ||
            joinedEncodedData.encodingMode !== DATA_ENCODING_MODE.BYTE
        ) {
            console.log(prevSegment)
            console.log(gapEncodedData);
            console.log(inefficientEncodedData);
            console.log(joinedEncodedData);
            throw new Error("One or more created segments were encoded with the incorrect mode :(");
        }

        let localECIState = eciState;

        // Calculate ECI costs
        const gapSegmentECIOverhead = gapEncodedData ? calculateECICost(gapEncodedData, localECIState, eciSwitchingStrategy) : 0;

        localECIState = gapSegmentECIOverhead > 0 && gapEncodedData ? gapEncodedData.charSetAssignmentNumber : localECIState;

        const inefficientSegmentECIOverhead = calculateECICost(inefficientEncodedData, localECIState, eciSwitchingStrategy);

        localECIState = inefficientSegmentECIOverhead > 0 ? inefficientEncodedData.charSetAssignmentNumber : localECIState;

        const joinedSegmentECIOverhead = calculateECICost(joinedEncodedData, eciState, eciSwitchingStrategy);

        // Calculate overhead using ECI cost + overhead (overhead is only applied if whatever segment is not going to be merged with the previous one)
        const gapSegmentOverhead = (gapEncodedData && (!prevSegment || gapEncodedData.charSetAssignmentNumber !== prevSegment.charSetAssignmentNumber)) ?
            (headerOverhead + gapSegmentECIOverhead) : 0;
        const inefficientSegmentOverhead = (
            (gapEncodedData && inefficientEncodedData.charSetAssignmentNumber !== gapEncodedData.charSetAssignmentNumber) ||
            (!gapEncodedData && (!prevSegment || inefficientEncodedData.charSetAssignmentNumber !== prevSegment.charSetAssignmentNumber))
        ) ?
            (headerOverhead + inefficientSegmentECIOverhead) : 0;
        const joinedSegmentOverhead = (!prevSegment || joinedEncodedData.charSetAssignmentNumber !== prevSegment.charSetAssignmentNumber) ?
            (headerOverhead + joinedSegmentECIOverhead) : 0;

        // Calculate datastream sizes
        const splitStreamSize = (gapEncodedData ? (gapSegmentOverhead + (gapEncodedData.encodedData.length * 8)) : 0) + (inefficientSegmentOverhead + (inefficientEncodedData.encodedData.length * 8));
        const joinedStreamSize = joinedSegmentOverhead + (joinedEncodedData.encodedData.length * 8);

        console.log("---")
        console.log(gapEncodedData)
        console.log("Gap Segment ECI Overhead:", gapSegmentOverhead, "ECI", gapSegmentECIOverhead);
        console.log(inefficientEncodedData)
        console.log("Inefficient Segment Overhead:", inefficientSegmentOverhead, "ECI", inefficientSegmentECIOverhead);
        console.log("Encoded Data:", joinedEncodedData);
        console.log("Joined Segment ECI Overhead:", joinedSegmentOverhead, "ECI", joinedSegmentECIOverhead);
        console.log("Split datastream size", splitStreamSize);
        console.log("Joined datastream size:", joinedStreamSize);
        console.log("===")

        if (splitStreamSize < joinedStreamSize) {
            // Use separate segments if more efficient

            // Since we are using 2 segments, we update ECI state to local state
            eciState = localECIState;

            if (gapEncodedData) {
                // Only push gapEncodedData if it exists.
                efficientSegments.push(gapEncodedData);
            }
            efficientSegments.push(inefficientEncodedData); // Also push the latin-1 segment
        } else {
            // Use joined segments if more efficient

            // Set ECIState to whatever joinedEncodedData is set to
            eciState = joinedEncodedData.charSetAssignmentNumber;

            efficientSegments.push(joinedEncodedData); // Push the joined segment
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

    console.log("Unoptimized Segments")
    console.log(structuredClone(efficientSegments));

    efficientSegments = mergedSegments; // Update efficient segments

    console.log("Optimized segments: ");
    console.log(efficientSegments);

    return efficientSegments;
}

export default optimizeAdjacentByteSegments;