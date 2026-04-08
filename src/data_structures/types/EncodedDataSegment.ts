import { DATA_ENCODING_MODES } from "../enums/DATA_ENCODING_MODES";
import { DataEncodingCharacterSet } from "../enums/DATA_ENCODING_CHARACTER_SETS";

export type EncodedDataSegment = 
    // Segment type used for Numeric
    | {encodingMode: typeof DATA_ENCODING_MODES.NUMERIC, charCount: number, plainTextData: string, encodedData: Array<string> }
    // Segment type used for Alphanumeric
    | {encodingMode: typeof DATA_ENCODING_MODES.ALPHANUMERIC, charCount: number, plainTextData: string, encodedData: Array<string> }
    // Segment type used for Kanji
    | {encodingMode: typeof DATA_ENCODING_MODES.KANJI, charCount: number, plainTextData: string, encodedData: Array<string> }
    // Segment type used for Byte which includes character set info
    | {encodingMode: typeof DATA_ENCODING_MODES.BYTE, charSetAssignmentNumber: DataEncodingCharacterSet, charCount: number, plainTextData: string, encodedData: Array<string> };