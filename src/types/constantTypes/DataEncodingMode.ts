import { DATA_ENCODING_MODE } from "../../constants";

export type DataEncodingMode = typeof DATA_ENCODING_MODE[keyof typeof DATA_ENCODING_MODE];
export type DataEncodingModeKey = keyof typeof DATA_ENCODING_MODE;