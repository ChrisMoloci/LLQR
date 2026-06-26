import { DATA_ENCODING_MODE } from "../../data_structures/constants/DATA_ENCODING_MODE";
import { EncodedDataSegment } from "../../data_structures/types/EncodedDataSegment";
import { DataEncodingMode } from "../../data_structures/types/constantTypes/DataEncodingMode";
import encodeAlphanumeric from "../binary/modes/encodeAlphanumeric";
import encodeBinary from "../binary/modes/encodeBinary";
import encodeKanji from "../binary/modes/encodeKanji";
import encodeNumeric from "../binary/modes/encodeNumeric";


export function encodeWithSingleMode(data: string, mode: DataEncodingMode): Array<EncodedDataSegment> {
    // Encodes all data using a single specified mode thats compatible
    const segments: Array<EncodedDataSegment> = [];

    switch(mode) {
        case DATA_ENCODING_MODE.NUMERIC:
            segments.push(encodeNumeric(data));
            break;
        case DATA_ENCODING_MODE.ALPHANUMERIC:
            segments.push(encodeAlphanumeric(data));
            break;
        case DATA_ENCODING_MODE.KANJI:
            // Try to encode in kanji mode
            const kanjiSegment = encodeKanji(data);
            if (kanjiSegment) {
                // Successfully encoded in kanji mode
                segments.push(kanjiSegment);
                break;
            }
            // If kanji encoding fails, fallthrough to byte encoding
        default:
            // Encode to byte mode if all else fails
            segments.push(encodeBinary(data));
            break;
        // default:
        //     throw new Error("Unsupported encoding mode for single mode encoding.");
    }

    return segments;
}