import { EncodedDataSegment } from "../../types";
import unicodeToShiftJIS from "../../datasets/unicode_to_shiftjis";
import { DATA_ENCODING_MODES } from "../../enums";

function encodeKanji(data: string): EncodedDataSegment | null {
    // Validate that the data is possibly kanji characters

    // TODO: Fix regex to supports all kanji characters
    if (!/^[\u0100-\u9FFF\uF900-\uFAFF]+/.test(data)) {
        // throw new Error("Data must be kanji for kanji encoding.");
        console.warn("Data does not appear to be kanji characters. Kanji encoding aborted.");
        return null; // Return null to indicate kanji encoding is not possible
    }

    // console.log(`Encoding kanji data: ${data}`);

    const encodedDataSegment: EncodedDataSegment = {
        encodingMode: DATA_ENCODING_MODES.KANJI,
        charCount: data.length,
        plainTextData: data,
        encodedData: []
    }

    // Handle empty input
    if (data.length === 0) {
        console.warn("Provided data was empty.")
        return encodedDataSegment; // Return empty encoded data segment for empty input
    }
    
    // Try encoding in kanji, if an incompatible char is found, return null signifying to encode in byte mode instead
    try {
        // Convert chars to Shift JIS
        const shiftJISChars = Array.from(data).map(char => {
            const shiftJISChar = unicodeToShiftJIS["0x" + char.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')];
            if (shiftJISChar === undefined) {
                throw new Error(`Character "${char}" cannot be converted to Shift JIS for Kanji encoding. Unicode point: 0x${char.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')}`);
            }
            return shiftJISChar;
        }).filter(code => 
                code !== undefined).map(code => 
                    parseInt(code, 16));

        // console.log("Converted Shift JIS Codes: ", shiftJISChars);

        // console.log("Attempting Kanji Encoding for Shift JIS chars: ", shiftJISChars);
        // Encode each Shift JIS char to kanji and return as binary strings
        encodedDataSegment.encodedData = shiftJISChars.map(charCode => {
            if (charCode >= 0x8140 && charCode <= 0x9FFC) {
                // Encoding bytes in the range 0x8140 to 0x9FFC
                charCode -= 0x8140;
                // console.log("Adjusted Code: ", "0x" + charCode.toString(16).toUpperCase());

                // Get the LSB and MSB assuming number is two bytes (which kanji characters are in Shift JIS)
                const lsb = charCode & 0xFF; // Isolate lsb by masking with 0xFF
                const msb = (charCode >> 8) & 0xFF; // Isolate msb by shifting right 8 bits and masking with 0xFF
                // console.log("MSB: ", "0x" + msb.toString(16).toUpperCase(), "LSB: ", "0x" + lsb.toString(16).toUpperCase());

                return ((msb * 0xC0) + lsb).toString(2).padStart(13, '0'); // Convert to binary and pad to 13 bits
            } else if(charCode >= 0xE040 && charCode <= 0xEBBF) {
                // Encoding bytes in the range 0xE040 to 0xEBBF
                charCode -= 0xC140;

                const lsb = charCode & 0xFF; // Isolate lsb by masking with 0xFF
                const msb = (charCode >> 8) & 0xFF; // Isolate msb by shifting right 8 bits and masking with 0xFF
                // console.log("MSB: ", "0x" + msb.toString(16).toUpperCase(), "LSB: ", "0x" + lsb.toString(16).toUpperCase());

                return ((msb * 0xC0) + lsb).toString(2).padStart(13, '0'); // Convert to binary and pad to 13 bits
            } else {
                throw new Error(`Character with Shift JIS code "0x${charCode.toString(16).toUpperCase()}" cannot be encoded in Kanji mode at index ${data.indexOf(charCode.toString(16).toUpperCase())}.`);
            }
        })
        // console.log("Kanji Encoded Data: ", encodedDataSegment.encodedData);
        return encodedDataSegment;
    } catch (error) {
        // console.error("Error during Kanji encoding: ", error);
        console.warn("Kanji encoding failed. Falling back to Byte encoding. Error: ", error);
        return null; // Return null to indicate kanji encoding failed
    }

}

export default encodeKanji;