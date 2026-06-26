import { QR_ELEMENT_SHAPE } from "../../constants/QR_ELEMENT_SHAPE";

export type QRElementShape = typeof QR_ELEMENT_SHAPE[keyof typeof QR_ELEMENT_SHAPE];
export type QRElementShapeKey = keyof typeof QR_ELEMENT_SHAPE;