import { DATA_ENCODING_MODE } from "../../enums/DATA_ENCODING_MODE";

export type DataEncodingMode = typeof DATA_ENCODING_MODE[keyof typeof DATA_ENCODING_MODE];