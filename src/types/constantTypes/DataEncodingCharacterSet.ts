import { DATA_ENCODING_CHARACTER_SET } from "../../constants";

export type DataEncodingCharacterSet = typeof DATA_ENCODING_CHARACTER_SET[keyof typeof DATA_ENCODING_CHARACTER_SET];
export type DataEncodingCharacterSetKey = keyof typeof DATA_ENCODING_CHARACTER_SET;