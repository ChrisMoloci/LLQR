import { DATA_ENCODING_MODES } from "../../enums";
import { EncodedDataSegment } from "../../types";

function encodeAlphanumeric(data: string): EncodedDataSegment {
    if (!/^[0-9A-Z $%*+\-./:]+$/.test(data)) {
        throw new Error("Data must be alphanumeric for alphanumeric encoding.");
    }

    // console.log(`Encoding alphanumeric data: ${data}`);

    const encodedDataSegment: EncodedDataSegment = {
        encodingMode: DATA_ENCODING_MODES.ALPHANUMERIC,
        charCount: data.length,
        plainTextData: data,
        encodedData: []
    }

    if (data.length === 0) {
        console.warn("Provided data was empty.")
        return encodedDataSegment; // Return empty encoded data segment for empty input
    }

    const alphanumericChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";

    let i = 0; // Start from the first character
    while (i < data.length) {
        if (data.length - i >= 2) {
            let value1 = alphanumericChars.indexOf(data[i]!);
            let value2 = alphanumericChars.indexOf(data[i + 1]!);
            let combinedValue = (value1 * 45) + value2; // Combine two characters into a single value
            encodedDataSegment.encodedData.push(combinedValue.toString(2).padStart(11, '0')); // Convert to binary and pad to 11 bits
            i += 2
        } else if (data.length - i === 1) {
            let value1 = alphanumericChars.indexOf(data[i]!);
            if (value1 === -1) {
                throw new Error("Invalid character in alphanumeric data.");
            }
            encodedDataSegment.encodedData.push(value1.toString(2).padStart(6, '0')); // Convert to binary and pad to 6 bits
            i += 1;
        }
    }
    return encodedDataSegment;
}

export default encodeAlphanumeric;