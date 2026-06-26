import { DATA_ENCODING_CHARACTER_SET } from "../../../constants/DATA_ENCODING_CHARACTER_SET";
import encodeISO_8859_1 from "./ISO_IEC_8859/encodeISO-8859-1";
import encodeUTF8 from "./unicode/encodeUTF-8";

const BINARY_ENCODER_FUNCTION_MAPPINGS = {
    [DATA_ENCODING_CHARACTER_SET["ISO-8859-1"]]: encodeISO_8859_1,
    [DATA_ENCODING_CHARACTER_SET["UTF-8"]]: encodeUTF8,
}

export default BINARY_ENCODER_FUNCTION_MAPPINGS;