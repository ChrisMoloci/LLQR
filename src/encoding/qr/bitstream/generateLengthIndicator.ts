import { DataEncodingMode } from "../../../data_structures/types/ConstantTypes/DataEncodingMode";

// Creates a length indicator based on data length, mode, and char count indicator length
function generateLengthIndicator(unencodedData: string, encodedData: Array<string>, charCountIndicatorLength: number, mode: DataEncodingMode) {
    // If byte mode, use the encoded byte length; otherwise use the unencoded character length
    const length = mode === "0100" ? encodedData.length : unencodedData.length;
    // const length = unencodedData.length; // Use unencoded data length for all modes

    return length.toString(2).padStart(charCountIndicatorLength, '0'); // Return the length as a binary string
}

export default generateLengthIndicator;