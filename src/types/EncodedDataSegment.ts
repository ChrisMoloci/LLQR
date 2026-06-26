import { DATA_ENCODING_MODE } from "../constants/DATA_ENCODING_MODE";
import { DataEncodingCharacterSet } from "./constantTypes/DataEncodingCharacterSet";

type EncodedDataSegment =
    // Segment type used for Numeric
    | {encodingMode: typeof DATA_ENCODING_MODE.NUMERIC, charCount: number, plainTextData: string, encodedData: Array<string> }
    // Segment type used for Alphanumeric
    | {encodingMode: typeof DATA_ENCODING_MODE.ALPHANUMERIC, charCount: number, plainTextData: string, encodedData: Array<string> }
    // Segment type used for Kanji
    | {encodingMode: typeof DATA_ENCODING_MODE.KANJI, charCount: number, plainTextData: string, encodedData: Array<string> }
    // Segment type used for Byte which includes character set info
    | {encodingMode: typeof DATA_ENCODING_MODE.BYTE, charSetAssignmentNumber: DataEncodingCharacterSet, charCount: number, plainTextData: string, encodedData: Array<string> };

export default EncodedDataSegment;