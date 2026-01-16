import { DATA_ENCODING_MODES, DataEncodingMode } from "../enums";

// Determines the most efficient encoding mode required to encode the whole data (mode switching is handled later)
export default function determineMode(data: string): DataEncodingMode {
    if(/^\d+$/.test(data)) {
        return DATA_ENCODING_MODES.NUMERIC; // Numeric mode
    } else if (/^[0-9A-Z $%*+\-./:]+$/.test(data)) {
        return DATA_ENCODING_MODES.ALPHANUMERIC; // Alphanumeric mode
    } else if (/^[^\x00-\x7F\uFF61-\uFF9F]+/.test(data)) {
        return DATA_ENCODING_MODES.KANJI; // Kanji mode
    } else {
        return DATA_ENCODING_MODES.BYTE; // Byte mode
    }
}