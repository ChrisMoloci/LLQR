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

        // Generate the ECI Indicator and Assignment Number if applicable
        if (segment.useECIInSegment && segment.characterSet !== null) {
            const eciStream = generateECIIndicatorAndAssignmentNumber(segment.encodedData, segment.characterSet);
            dataStream.push(...eciStream); // Append ECI indicator and assignment number to the data stream
            console.log("Added ECI Segment to data stream:", eciStream);
        }

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

function generateECIIndicatorAndAssignmentNumber(data: Array<string>, assignmentNumber: number): Array<string> {
    // ECI Mode Indicator is always '0111'
    const eciModeIndicator = '0111';

    // Convert assignment number to binary (8 bits for 0-127, 16 bits for 128-16383)
    let assignmentNumberBinary: string;
    if (assignmentNumber >= 0 && assignmentNumber <= 127) {
        assignmentNumberBinary = assignmentNumber.toString(2).padStart(8, '0');
    } else if (assignmentNumber >= 128 && assignmentNumber <= 16383) {
        assignmentNumberBinary = assignmentNumber.toString(2).padStart(16, '0');
    } else if (assignmentNumber >= 16384 && assignmentNumber <= 999999) {
        assignmentNumberBinary = assignmentNumber.toString(2).padStart(24, '0');
    } else {
        throw new Error("ECI Assignment Number out of range (0-999999).");
    }

    return [eciModeIndicator, assignmentNumberBinary];
}

export default prepareDatastream;