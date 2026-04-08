import { ECCLevelCode } from "./QRSpecTypes/ECCLevelCode";
import { ECISwitchingStrategy } from "./QRSpecTypes/ECISwitchingStrategy";
import { MaskPatternCode } from "./QRSpecTypes/MaskPatternCode";
import { ModeSwitchingStrategy } from "./QRSpecTypes/ModeSwitchingStrategy";
import { QRVersion } from "./QRSpecTypes/QRVersion";

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