import { DATA_ENCODING_MODES, DataEncodingMode } from "../const";
import encodeAlphanumeric from "./encoders/encodeAlphanumeric";
import encodeBinary from "./encoders/encodeBinary";
import encodeNumeric from "./encoders/encodeNumeric";

function autoEncodeData(data: string, encodingMode: DataEncodingMode): Array<string> | undefined {
    switch (encodingMode) {
        case DATA_ENCODING_MODES.NUMERIC:
            return encodeNumeric(data);
        case DATA_ENCODING_MODES.ALPHANUMERIC:
            return encodeAlphanumeric(data);
        case DATA_ENCODING_MODES.BYTE:
            return encodeBinary(data);
        case DATA_ENCODING_MODES.KANJI:
            // TODO: Implement Kanji encoding
            break;
        default:
            throw new Error("Unsupported encoding mode");
    }
}

export default autoEncodeData;