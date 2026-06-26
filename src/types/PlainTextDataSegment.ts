import { DataEncodingMode } from "./constantTypes/DataEncodingMode";

// Stores plain text
interface PlainTextDataSegment {
    mode: DataEncodingMode;
    data: string;
}

export default PlainTextDataSegment;