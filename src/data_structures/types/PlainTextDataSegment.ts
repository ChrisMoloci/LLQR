import { DataEncodingMode } from "../enums/DATA_ENCODING_MODES";

// Stores plain text
export interface PlainTextDataSegment {
    mode: DataEncodingMode;
    data: string;
}