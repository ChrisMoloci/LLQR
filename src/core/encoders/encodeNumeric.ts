import { EncodedSegmentDraft, PlainTextDataSegment } from "../../types";

function encodeNumeric(plainTextDataSegment: PlainTextDataSegment): EncodedSegmentDraft {
    if (!/^\d+$/.test(plainTextDataSegment.data)) {
        throw new Error("Data is not numeric.");
    }

    console.log(`Encoding numeric data: ${plainTextDataSegment.data}`);

    const encodedSegmentDraft: EncodedSegmentDraft = {
        mode: plainTextDataSegment.mode,
        charCount: plainTextDataSegment.data.length,
        characterSet: null,
        useECIInSegment: false,
        encodedData: [],
        unencodedData: plainTextDataSegment.data,
    }

    if (plainTextDataSegment.data.length === 0) {
        console.warn("Provided data was empty.")
        return encodedSegmentDraft; // Return empty encoding for empty input
    }

    // Iterate through the data in chunks of 3 digits
    let i = 0; // Start from the first character
    while (i < plainTextDataSegment.data.length) {
        let chunk = plainTextDataSegment.data.slice(i, i + 3); // Get the next 3 or less digits

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
        encodedSegmentDraft.encodedData.push(chunk); // Concatenate the binary string
    }
    return encodedSegmentDraft; // Return the encoded numeric data
}

export default encodeNumeric;