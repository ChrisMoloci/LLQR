import { QR_VERSION } from "../../constants/QR_VERSION";

export type QRVersion = typeof QR_VERSION[keyof typeof QR_VERSION];