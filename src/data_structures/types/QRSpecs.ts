import { ECCLevelCode } from "./constantTypes/ECCLevelCode";
import { ECISwitchingStrategy } from "./constantTypes/ECISwitchingStrategy";
import { MaskPatternCode } from "./constantTypes/MaskPatternCode";
import { ModeSwitchingStrategy } from "./constantTypes/ModeSwitchingStrategy";
import { QRVersion } from "./constantTypes/QRVersion";

// Defines the rules for generating a QR code
export type QRSpecs = {
    eccLevel: ECCLevelCode, // ENUM type
    minPreferredVersion: QRVersion,
    forceByteEncoding: boolean,
    maskPattern: MaskPatternCode,
    useModeSwitching: ModeSwitchingStrategy,
    useECISwitching: ECISwitchingStrategy,
}

export type PublicQRSpecs = Partial<QRSpecs>; // For user input, all fields are optional since we have defaults