// Encoding Mode Indicators
export const DATA_ENCODING_MODES = {
    NUMERIC: "0001",
    ALPHANUMERIC: "0010",
    KANJI: "1000",
    BYTE: "0100"
} as const;

export type DataEncodingMode = typeof DATA_ENCODING_MODES[keyof typeof DATA_ENCODING_MODES];