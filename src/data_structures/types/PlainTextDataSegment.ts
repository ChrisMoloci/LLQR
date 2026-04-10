import { DataEncodingMode } from "../types/EnumTypes/DataEncodingMode";

// Stores plain text
export interface PlainTextDataSegment {
    mode: DataEncodingMode;
    data: string;
}