import { DATA_ENCODING_MODES, DataEncodingMode } from "../const";

function autoEncodeData(data: string, encodingMode: DataEncodingMode) {
    switch (encodingMode) {
        case DATA_ENCODING_MODES.NUMERIC:
            break;
        case DATA_ENCODING_MODES.ALPHANUMERIC:
            break;
        case DATA_ENCODING_MODES.BYTE:
            break;
        case DATA_ENCODING_MODES.KANJI:
            // TODO: Implement Kanji encoding
            break;
        default:
            throw new Error("Unsupported encoding mode");
    }
}

export default autoEncodeData;