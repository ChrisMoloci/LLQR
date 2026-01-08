import { DataEncodingMode } from "../enums";
import { FinalizedEncodedSegment } from "../types";

function prepareDatastream(encodedSegments: Array<FinalizedEncodedSegment>): Array<string> {
    let dataStream: Array<string> = []; // Will hold the final data stream (as an array of codewords)

    // Iterate through each encoded segment to build the data stream
    for (const segment of encodedSegments) {
        console.log("Preparing segment for datastream:", segment);

        // Generate Binary Length Indicator and make it the size of charCountIndicatorLength
        const charCountLengthIndicator = generateLengthIndicator(segment.unencodedData, segment.encodedData, segment.charCountIndicatorLength!, segment.mode);
        console.log("Character Count Length Indicator:", segment.charCountIndicatorLength);

        // Append Mode Indicator, Length Indicator, and Encoded Data to the data stream
        dataStream.push(segment.mode, charCountLengthIndicator, ...segment.encodedData); // Add Mode Indicator
    }

    console.log("Final Prepared Data Stream:", dataStream);

    // Return the prepared data stream
    return dataStream;
}

// Creates a length indicator based on data length, mode, and char count indicator length
function generateLengthIndicator(unencodedData: string, encodedData: Array<string>, charCountIndicatorLength: number, mode: DataEncodingMode) {
    // If byte mode, 
    const length = mode === "0100" ? encodedData.length : unencodedData.length;
    // const length = unencodedData.length; // Use unencoded data length for all modes

    return length.toString(2).padStart(charCountIndicatorLength, '0'); // Return the length as a binary string
}

export default prepareDatastream;