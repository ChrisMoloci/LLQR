export const QR_ELEMENT_SHAPES = {
    SQUARE: "SQUARE",
    CIRCLE: "CIRCLE",
    ROUNDED: "ROUNDED",
} as const;

export type QRElementShape = typeof QR_ELEMENT_SHAPES[keyof typeof QR_ELEMENT_SHAPES];