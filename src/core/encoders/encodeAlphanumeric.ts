import { EncodedSegmentDraft, PlainTextDataSegment } from "../../types";

function encodeAlphanumeric(plainTextDataSegment: PlainTextDataSegment): EncodedSegmentDraft {
    if (!/^[0-9A-Z $%*+\-./:]+$/.test(plainTextDataSegment.data)) {
        throw new Error("Data must be alphanumeric for alphanumeric encoding.");
    }

    console.log(`Encoding alphanumeric data: ${plainTextDataSegment.data}`);

    const encodedSegmentDraft: EncodedSegmentDraft = {
        mode: plainTextDataSegment.mode,
        charCount: plainTextDataSegment.data.length,
        characterSet: null,
        useECIInSegment: false,
        encodedData: [],
        unencodedData: plainTextDataSegment.data,
    }

    if (plainTextDataSegment.data.length === 0 || !plainTextDataSegment.data) {
        console.warn("Provided data was empty.")
        return encodedSegmentDraft; // Return empty encoded data segment for empty input
    }

    const alphanumericChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";

    let i = 0; // Start from the first character
    while (i < plainTextDataSegment.data.length) {
        if (plainTextDataSegment.data.length - i >= 2) {
            let value1 = alphanumericChars.indexOf(plainTextDataSegment.data[i]!);
            let value2 = alphanumericChars.indexOf(plainTextDataSegment.data[i + 1]!);
            let combinedValue = (value1 * 45) + value2; // Combine two characters into a single value
            encodedSegmentDraft.encodedData.push(combinedValue.toString(2).padStart(11, '0')); // Convert to binary and pad to 11 bits
            i += 2
        } else if (plainTextDataSegment.data.length - i === 1) {
            let value1 = alphanumericChars.indexOf(plainTextDataSegment.data[i]!);
            if (value1 === -1) {
                throw new Error("Invalid character in alphanumeric data.");
            }
            encodedSegmentDraft.encodedData.push(value1.toString(2).padStart(6, '0')); // Convert to binary and pad to 6 bits
            i += 1;
        }
    }
    return encodedSegmentDraft;
}

export default encodeAlphanumeric;