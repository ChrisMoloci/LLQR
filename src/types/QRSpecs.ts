import { ECCLevel } from "./constantTypes";
import { ECISwitchingStrategy } from "./constantTypes";
import { MaskPattern } from "./constantTypes";
import { ModeSwitchingStrategy } from "./constantTypes";
import { QRVersion } from "./constantTypes";

// Defines the rules for generating a QR code
export type QRSpecs = {
    eccLevel: ECCLevel, // ENUM type
    minPreferredVersion: QRVersion,
    forceByteEncoding: boolean,
    maskPattern: MaskPattern,
    useModeSwitching: ModeSwitchingStrategy,
    useECISwitching: ECISwitchingStrategy,
}

export default QRSpecs;

// export type PublicQRSpecs = Partial<QRSpecs>; // For user input, all fields are optional since we have defaults