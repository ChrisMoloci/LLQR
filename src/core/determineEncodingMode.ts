import { DATA_ENCODING_MODES, DataEncodingMode } from "../const";

export default function determineMode(data: string): DataEncodingMode {
    if(/^\d+$/.test(data)) {
        return DATA_ENCODING_MODES.NUMERIC; // Numeric mode
    } else if (/^[0-9A-Z $%*+\-./:]+$/.test(data)) {
        return DATA_ENCODING_MODES.ALPHANUMERIC; // Alphanumeric mode
    } else {
        return DATA_ENCODING_MODES.BYTE; // Byte mode
    }
}

// TODO: Add Kanji mode detection