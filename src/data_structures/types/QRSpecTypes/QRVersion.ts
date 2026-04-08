import { QR_VERSION } from "../../enums/QR_VERSION";

export type QRVersion = typeof QR_VERSION[keyof typeof QR_VERSION];