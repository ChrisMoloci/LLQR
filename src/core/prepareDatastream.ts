import { DataEncodingMode } from "../enums";
import { EncodedSegment } from "../types";

function prepareDatastream(encodedSegment: Array<EncodedSegment>): Array<string> {
    let dataStream: Array<string> = [];
    for (const segment of encodedSegment) {
        console.log("Preparing segment for datastream:", segment);
        // Generate Binary Length Indicator and make it the size of charCountIndicatorLength
        if (segment.charCountIndicatorLength == null) {
            throw new Error("Character Count Length Indicator is missing in the encoded segment: " + JSON.stringify(segment));
        }
        const charCountLengthIndicator = generateLengthIndicator(segment.unencodedData, segment.encodedData, segment.charCountIndicatorLength!, segment.mode);
        console.log("Character Count Length Indicator:", segment.charCountIndicatorLength);

        // Append Mode Indicator, Length Indicator, and Encoded Data to the data stream
        dataStream.push(segment.mode, charCountLengthIndicator, ...segment.encodedData); // Add Mode Indicator
    }

    // Create the byte stream using the provided properties
    // const dataStream: Array<string> = [mode, charCountLengthIndicator, ...encodedData];

    console.log("Final Prepared Data Stream:", dataStream);

    return dataStream;
}

function generateLengthIndicator(unencodedData: string, encodedData: Array<string>, charCountIndicatorLength: number, mode: DataEncodingMode) {
    const length = mode === "0100" ? encodedData.length : unencodedData.length;

    return length.toString(2).padStart(charCountIndicatorLength, '0'); // Return the length as a binary string
}

export default prepareDatastream;