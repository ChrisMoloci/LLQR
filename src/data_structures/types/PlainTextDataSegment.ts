import { DataEncodingMode } from "./ConstantTypes/DataEncodingMode";

// Stores plain text
export interface PlainTextDataSegment {
    mode: DataEncodingMode;
    data: string;
}