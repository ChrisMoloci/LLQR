import { QR_VERSION } from "../../constants";

export type QRVersion = typeof QR_VERSION[keyof typeof QR_VERSION];
export type QRVersionKey = keyof typeof QR_VERSION;