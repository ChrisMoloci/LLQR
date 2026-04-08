
import { DATA_ENCODING_CHARACTER_SETS } from "../../../data_structures/enums/DATA_ENCODING_CHARACTER_SETS";
import encodeISO_8859_1 from "./ISO_IEC_8859/encodeISO-8859-1";
import encodeUTF8 from "./unicode/encodeUTF-8";

const BINARY_ENCODER_FUNCTION_MAPPINGS = {
    [DATA_ENCODING_CHARACTER_SETS["ISO-8859-1"]]: encodeISO_8859_1,
    [DATA_ENCODING_CHARACTER_SETS["UTF-8"]]: encodeUTF8,
}

export default BINARY_ENCODER_FUNCTION_MAPPINGS;