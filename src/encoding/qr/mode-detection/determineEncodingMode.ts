import {DataEncodingMode} from "../../../types";
import {DATA_ENCODING_MODE} from "../../../constants";

// Determines the most efficient encoding mode required to encode the whole data (mode switching is handled later)
export function determineMode(data: string): DataEncodingMode {
    if(/^\d+$/.test(data)) {
        return DATA_ENCODING_MODE.NUMERIC; // Numeric mode
    } else if (/^[0-9A-Z $%*+\-./:]+$/.test(data)) {
        return DATA_ENCODING_MODE.ALPHANUMERIC; // Alphanumeric mode
    } else if (/^[^\x00-\x7F\uFF61-\uFF9F]+/.test(data)) {
        return DATA_ENCODING_MODE.KANJI; // Kanji mode
    } else {
        return DATA_ENCODING_MODE.BYTE; // Byte mode
    }
}