import { DATA_ENCODING_CHARACTER_SET } from "../../constants/DATA_ENCODING_CHARACTER_SET";

export type DataEncodingCharacterSet = typeof DATA_ENCODING_CHARACTER_SET[keyof typeof DATA_ENCODING_CHARACTER_SET];