import { DATA_ENCODING_CHARACTER_SETS, DataEncodingCharacterSet } from "../../enums";
import { EncodedSegmentDraft, PlainTextDataSegment } from "../../types";
import BINARY_ENCODER_FUNCTION_MAPPINGS from "./byteEncoders/binaryEncoderFunctionMappings";

function encodeBinary(plainTextDataSegment: PlainTextDataSegment): EncodedSegmentDraft {
    // -- 1. Create an array of all the chars from data --
    let plainDataChars: Array<string>; // Create empty array to store characters

    if (typeof plainTextDataSegment.data === 'string') {
        // Add data as characters to plainDataChars
        plainDataChars = plainTextDataSegment.data.split('');
    } else {
        // If data is not a string, throw an error
        throw new Error("Data must be a string for binary encoding."); 
    }

    // -- Prepare the encoded segment draft --
    const encodedSegmentDraft: EncodedSegmentDraft = {
        mode: plainTextDataSegment.mode,
        charCount: plainTextDataSegment.data.length,
        characterSet: null,
        useECIInSegment: false,
        encodedData: [], // Will be filled after encoding
        unencodedData: plainTextDataSegment.data,
    }

    if (plainDataChars.length === 0) {
        // If no data is provided, return empty encoding
        console.warn("Provided data was empty.")
        return encodedSegmentDraft; // Return empty encoded segment for empty input
    }

    // -- 2. Determine Character Set --
    const charSet: DataEncodingCharacterSet = getCharSet(plainDataChars);
    encodedSegmentDraft.characterSet = charSet; // Set the char set

    // -- 3. Encode the data and place it in the encodedSegmentDraft --
    encodedSegmentDraft.encodedData = BINARY_ENCODER_FUNCTION_MAPPINGS[charSet]!(plainDataChars);

    // -- 4. Return the encoded segment draft --
    return encodedSegmentDraft;
}

function getCharSet(plainDataChars: Array<string>): DataEncodingCharacterSet {
    console.log("Plain data chars: ", plainDataChars);

    // Define compatible charsets for binary encoding (order determines priority)
    const compatibleCharsets: Array<DataEncodingCharacterSet> = [
        DATA_ENCODING_CHARACTER_SETS["ISO-8859-1"], // Priority 1
        DATA_ENCODING_CHARACTER_SETS["UTF-8"] // Priority 2
    ];

    // Check each charset for compatibility
    for (const charset of compatibleCharsets) {
        if (checkCharsetCompatibility(plainDataChars, charset)) {
            console.log(`Using character set ${Object.keys(DATA_ENCODING_CHARACTER_SETS).find(key => DATA_ENCODING_CHARACTER_SETS[key] === charset)} for binary encoding.`);
            return charset; // Return the first compatible charset found
        }
    }

    // If character set could not be determined, something is probably wrong with the data
    throw new Error("Unable to determine character set for binary encoding.");

    // Checks if a provided char set is compatible for the provided data
    function checkCharsetCompatibility(plainDataChars: Array<string>, charset: DataEncodingCharacterSet): boolean {
        // Loop through all chars
        for (const element of plainDataChars) {
            // Get the code point of the character (hex)
            const cp = element.codePointAt(0);
            if (cp === undefined) {
                // Throw error if character is invalid
                throw new Error(`Invalid character in data for binary encoding: ${element}`);
            }

            // Test for incompatibility based on provided charset
            switch (charset) {
                case DATA_ENCODING_CHARACTER_SETS["ISO-8859-1"]:
                    if (cp < 0x00 || cp > 0xFF) {
                        return false; // Character not compatible with ISO-8859-1
                    }
                    break;
                case DATA_ENCODING_CHARACTER_SETS["UTF-8"]:
                    if (cp < 0x00 || cp > 0x10FFFF) {
                        return false; // Character not compatible with UTF-8
                    }
                    break;
                default:
                    return false; // Unsupported charset
            }
        }
        return true; // All characters are compatible with the charset
    }
}

export default encodeBinary;