import { DataEncodingMode } from "./constantTypes";

// Stores plain text
export interface PlainTextDataSegment {
    mode: DataEncodingMode;
    data: string;
}

export default PlainTextDataSegment;