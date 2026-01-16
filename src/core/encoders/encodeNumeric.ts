import { DATA_ENCODING_MODES } from "../../enums";
import { EncodedDataSegment } from "../../types";

function encodeNumeric(data: string): EncodedDataSegment {
    if (!/^\d+$/.test(data)) {
        throw new Error("Data is not numeric.");
    }

    console.log(`Encoding numeric data: ${data}`);

    const encodedDataSegment: EncodedDataSegment = {
        encodingMode: DATA_ENCODING_MODES.NUMERIC,
        charCount: data.length,
        plainTextData: data,
        encodedData: []
    }

    if (data.length === 0) {
        console.warn("Provided data was empty.")
        return encodedDataSegment; // Return empty encoding for empty input
    }

    // Iterate through the data in chunks of 3 digits
    let i = 0; // Start from the first character
    while (i < data.length) {
        let chunk = data.slice(i, i + 3); // Get the next 3 or less digits

        // Convert the chunk to binary with appropriate padding
        if (chunk.length >= 3) {
            chunk = parseInt(chunk, 10).toString(2).padStart(10, '0');
            i += 3; // Move to the next chunk
        } else if (chunk.length === 2) {
            chunk = parseInt(chunk, 10).toString(2).padStart(7, '0');
            i += 2; // Move to the next chunk
        } else if (chunk.length === 1) {
            chunk = parseInt(chunk, 10).toString(2).padStart(4, '0');
            i += 1; // Move to the next chunk
        }
        encodedDataSegment.encodedData.push(chunk); // Concatenate the binary string
    }
    return encodedDataSegment; // Return the encoded numeric data
}

export default encodeNumeric;