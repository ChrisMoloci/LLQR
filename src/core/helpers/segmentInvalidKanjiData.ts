import { EncodedDataSegment } from "../../data_structures/types/EncodedDataSegment";
import unicodeToShiftJIS from "../../datasets/unicode_to_shiftjis";
import { MODE_SWITCHING_STRATEGY } from "../../data_structures/enums/MODE_SWITCHING_STRATEGY";
import { ModeSwitchingStrategy } from "../../data_structures/types/QRSpecTypes/ModeSwitchingStrategy"
import encodeKanji from "../../encoders/encodeKanji";
import encodeBinary from "../../encoders/encodeBinary";
import determineMode from "../matrix_generation/determineEncodingMode";
import { encodeWithSingleMode } from "../matrix_generation/encodeWithSingleMode";

// When an a kanjiCandidate fails to encode, we must try to segment it into smaller kanji and byte segments (or just create a byte segment if all chars are invalid)
export function segmentInvalidKanjiCandidate(data: string, useModeSwitching: ModeSwitchingStrategy): Array<EncodedDataSegment> {
    const segments: Array<EncodedDataSegment> = [];

    /*
     * Note: You may be wondering why we dont do proper validation for kanji data in the first place.
     * 
     * The answer is simply because it is very rare that kanji encoding will actually fail. This means
     * that using a regex is in most use cases more efficient since the validation function would never have
     * to run. Here we are segmenting the kanji data into smaller byte and kanji segments as needed to ensure
     * that kanji data is properly encoded while also keeping efficiency high.
     * 
     * This works both for forced and auto mode switching.
     */

    // Seperate the chars further to segment byte and kanji based on validation

    // Proper function to validate if a char can be encoded in kanji
    const validateChar = (char: string): boolean => {
        const shiftJISChar = unicodeToShiftJIS["0x" + char.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')];
        return shiftJISChar !== undefined;
    }

    const failedKanjiChars: Array<string> = Array.from(data); // Split the failed kanji candidate into individual chars

    let index = 0 ; // Index to iterate through the segment chars

    // Iterate through the failed kanji chars to segment byte and kanji segments
    while (index < failedKanjiChars.length) {
        let startPos = index; // Will store the start position of our next slice

        // If first char is valid kanji 
        const isFirstCharKanji = validateChar(failedKanjiChars[startPos]!);
        index++; // Move to next char

        // From next char, check how many more chars are either valid kanji chars or byte chars
        if (isFirstCharKanji) {
            // Collect kanji chars
            while (index < failedKanjiChars.length && validateChar(failedKanjiChars[index]!)) {
                index++;
            }
        } else {
            // Collect byte chars
            while (index < failedKanjiChars.length && !validateChar(failedKanjiChars[index]!)) {
                index++;
            }
        }

        // Create a slice of the chars from startPos to index
        const dataSlice = failedKanjiChars.slice(startPos, index).join('');

        // Encode the slice based on whether its kanji or byte and the mode switching settings
        if (isFirstCharKanji) {
            if (useModeSwitching === MODE_SWITCHING_STRATEGY.FORCED || useModeSwitching === MODE_SWITCHING_STRATEGY.AUTO && dataSlice.length >= 2) {
                // Encode kanji segment if its valid and meets min size and is auto mode
                segments.push(encodeKanji(dataSlice)!);
            } else {
                // Encode byte segment if kanji segment is too small and/or is forced mode
                segments.push(encodeBinary(dataSlice));
            }
        } else {
            // Encode Segment with most effective mode
            const sliceMode = determineMode(dataSlice);
            const encodedSegment = encodeWithSingleMode(dataSlice, sliceMode).pop()!;
            segments.push(encodedSegment);
        }
    }

    return segments; // Return the array of segments
}