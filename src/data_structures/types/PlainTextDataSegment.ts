import { DataEncodingMode } from "../enums/DATA_ENCODING_MODE";

// Stores plain text
export interface PlainTextDataSegment {
    mode: DataEncodingMode;
    data: string;
}