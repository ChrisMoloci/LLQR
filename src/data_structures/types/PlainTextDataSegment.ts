import { DataEncodingMode } from "./constantTypes/DataEncodingMode";

// Stores plain text
export interface PlainTextDataSegment {
    mode: DataEncodingMode;
    data: string;
}