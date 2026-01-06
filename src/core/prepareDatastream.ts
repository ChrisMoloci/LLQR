import { DataEncodingMode } from "../enums";

function prepareDatastream(unencodedData: string, encodedData: Array<string>, charCountIndicatorLength: number, mode: DataEncodingMode): Array<string> {
    // Generate Binary Length Indicator and make it the size of charCountIndicatorLength
    const charCountLengthIndicator = generateLengthIndicator(unencodedData, encodedData, charCountIndicatorLength, mode);
    console.log("Character Count Length Indicator:", charCountLengthIndicator);

    // Create the byte stream using the provided properties
    const dataStream: Array<string> = [mode, charCountLengthIndicator, ...encodedData];

    return dataStream;
}

function generateLengthIndicator(unencodedData: string, encodedData: Array<string>, charCountIndicatorLength: number, mode: DataEncodingMode) {
    const length = mode === "0100" ? encodedData.length : unencodedData.length;

    return length.toString(2).padStart(charCountIndicatorLength, '0'); // Return the length as a binary string
}

export default prepareDatastream;