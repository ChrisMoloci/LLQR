import { ECCLevel } from "./constantTypes/ECCLevel";
import { ECISwitchingStrategy } from "./constantTypes/ECISwitchingStrategy";
import { MaskPattern } from "./constantTypes/MaskPattern";
import { ModeSwitchingStrategy } from "./constantTypes/ModeSwitchingStrategy";
import { QRVersion } from "./constantTypes/QRVersion";

// Defines the rules for generating a QR code
type QRSpecs = {
    eccLevel: ECCLevel, // ENUM type
    minPreferredVersion: QRVersion,
    forceByteEncoding: boolean,
    maskPattern: MaskPattern,
    useModeSwitching: ModeSwitchingStrategy,
    useECISwitching: ECISwitchingStrategy,
}

export default QRSpecs;

// export type PublicQRSpecs = Partial<QRSpecs>; // For user input, all fields are optional since we have defaults