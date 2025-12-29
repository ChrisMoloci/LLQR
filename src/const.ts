import { qrSpecs } from "./types";

// Used for default specs QR Specs
export const QR_DEFAULTS = {
    ECC_LEVEL: "M" as const,
    VERSION: null,
    MASK_PATTERN: null,
    PREFERR_ECI: false as const,
    PREFERR_BOM: false as const
} as const;

// A Preconfigured default QR Spec it the developer doesn't provide one
const DEFAULT_QR_SPECS: qrSpecs = {
    eccLevel: QR_DEFAULTS.ECC_LEVEL,
    version: QR_DEFAULTS.VERSION,
    maskPattern: QR_DEFAULTS.MASK_PATTERN,
    preferrECI: QR_DEFAULTS.PREFERR_ECI,
    preferrBOM: QR_DEFAULTS.PREFERR_BOM
};

export default DEFAULT_QR_SPECS;