import { DEFAULT_IMAGE_SPECS, DEFAULT_QR_SPECS } from "../const"
import { ImageSpecs, QRConfigs } from "../types";
import { QRSpecs } from "../enums";

// Stores the current global configuration for QR code generation
let qrConfigs: QRConfigs = {
    qrConfig: DEFAULT_QR_SPECS,
    imageConfig: DEFAULT_IMAGE_SPECS
}

// Allows the developer to define global configuration for QR code generation
export default function defineConfig(qrConfig: Partial<QRSpecs> | null, imageConfig: Partial<ImageSpecs> | null) {
    if (qrConfig) qrConfigs.qrConfig = mergeConfig(qrConfig, qrConfigs.qrConfig);
    if (imageConfig) qrConfigs.imageConfig = mergeConfig(imageConfig, qrConfigs.imageConfig);

    console.log("Defined new QR Configs:", qrConfigs);
}

// Merges new configuration with old configuration
function mergeConfig<T extends QRSpecs | ImageSpecs>(newConfig: Partial<T>, oldConfig: T): T {
    return {...oldConfig, ...newConfig};
}

// Returns the current global configuration for QR code generation
export function getCurrentConfigs() {
    return qrConfigs
}