import { qrSpecs } from "./types";

// Used for default specs QR Specs
export const QR_DEFAULTS = {
    ECC_LEVEL: "M" as const,
    VERSION: null,
    FORCE_BYTE_ENCODING: false as const,
    MASK_PATTERN: null,
    PREFERR_ECI: false as const,
    PREFERR_BOM: false as const
} as const;

export type QRDefault = typeof QR_DEFAULTS[keyof typeof QR_DEFAULTS];

// A Preconfigured default QR Spec it the developer doesn't provide one
export const DEFAULT_QR_SPECS: qrSpecs = {
    eccLevel: QR_DEFAULTS.ECC_LEVEL,
    version: QR_DEFAULTS.VERSION,
    forceByteEncoding: QR_DEFAULTS.FORCE_BYTE_ENCODING,
    maskPattern: QR_DEFAULTS.MASK_PATTERN,
    preferrECI: QR_DEFAULTS.PREFERR_ECI,
    preferrBOM: QR_DEFAULTS.PREFERR_BOM
};

// Encoding Mode Indicators
export const DATA_ENCODING_MODES = {
    NUMERIC: "0001",
    ALPHANUMERIC: "0010",
    BYTE: "0100",
    KANJI: "1000" // Not yet implemented
} as const;

export type DataEncodingMode = typeof DATA_ENCODING_MODES[keyof typeof DATA_ENCODING_MODES];