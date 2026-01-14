import { EncodedSegmentDraft, PlainTextDataSegment } from "../../types";
import unicodeToShiftJIS from "../../datasets/unicode_to_shiftjis";

function encodeKanji(plainTextDataSegment: PlainTextDataSegment): EncodedSegmentDraft {
    // Validate that the data is possibly kanji characters
    if (!/^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\u3000-\u303F]+/u.test(plainTextDataSegment.data)) {
        throw new Error("Data must be kanji for kanji encoding.");
    }

    console.log(`Encoding kanji data: ${plainTextDataSegment.data}`);

    // Create the initial encoded segment draft (without encoded data)
    const encodedSegmentDraft: EncodedSegmentDraft = {
        mode: plainTextDataSegment.mode,
        charCount: plainTextDataSegment.data.length,
        characterSet: null,
        useECIInSegment: false,
        encodedData: [],
        unencodedData: plainTextDataSegment.data,
    }

    // Handle empty input
    if (plainTextDataSegment.data.length === 0 || !plainTextDataSegment.data) {
        console.warn("Provided data was empty.")
        return encodedSegmentDraft; // Return empty encoded data segment for empty input
    }

    // Convert chars to Shift JIS
    const shiftJISChars = Array.from(plainTextDataSegment.data).map(char => 
        unicodeToShiftJIS["0x" + char.charCodeAt(0).toString(16).toUpperCase()]).filter(code => 
            code !== undefined).map(code => 
                parseInt(code, 16));
    
    // Encode each Shift JIS char to kanji and return as binary strings
    encodedSegmentDraft.encodedData = shiftJISChars.map(charCode => {
        if (charCode >= 0x8140 && charCode <= 0x9FFC) {
            // Encoding bytes in the range 0x8140 to 0x9FFC
            charCode -= 0x8140;
            console.log("Adjusted Code: ", "0x" + charCode.toString(16).toUpperCase());

            // Get the LSB and MSB assuming number is two bytes (which kanji characters are in Shift JIS)
            const lsb = charCode & 0xFF; // Isolate lsb by masking with 0xFF
            const msb = (charCode >> 8) & 0xFF; // Isolate msb by shifting right 8 bits and masking with 0xFF
            console.log("MSB: ", "0x" + msb.toString(16).toUpperCase(), "LSB: ", "0x" + lsb.toString(16).toUpperCase());

            return ((msb * 0xC0) + lsb).toString(2).padStart(13, '0'); // Convert to binary and pad to 13 bits
        } else if(charCode >= 0xE040 && charCode <= 0xEBBF) {
            // Encoding bytes in the range 0xE040 to 0xEBBF
            charCode -= 0xC140;

            const lsb = charCode & 0xFF; // Isolate lsb by masking with 0xFF
            const msb = (charCode >> 8) & 0xFF; // Isolate msb by shifting right 8 bits and masking with 0xFF
            console.log("MSB: ", "0x" + msb.toString(16).toUpperCase(), "LSB: ", "0x" + lsb.toString(16).toUpperCase());

            return ((msb * 0xC0) + lsb).toString(2).padStart(13, '0'); // Convert to binary and pad to 13 bits
        } else {
            throw new Error(`Character with Shift JIS code "0x${charCode.toString(16).toUpperCase()}" cannot be encoded in Kanji mode.`);
        }
    })

    return encodedSegmentDraft
}

export default encodeKanji;