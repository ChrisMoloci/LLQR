// ECC Level Codes
export const ECC_LEVEL_CODES = {
    "L": "01",
    "M": "00",
    "Q": "11",
    "H": "10"
} as const;

export type ECCLevelCode = typeof ECC_LEVEL_CODES[keyof typeof ECC_LEVEL_CODES];
export type ECCLevelKey = keyof typeof ECC_LEVEL_CODES;