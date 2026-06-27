import {ImageSpecs, QRConfigs, QRSpecs} from "../types";
import {DEFAULT_IMAGE_SPECS, DEFAULT_QR_SPECS} from "../const";

// Stores the current global configuration for QR code generation
let qrConfigs: QRConfigs = {
    qrConfig: structuredClone(DEFAULT_QR_SPECS),
    imageConfig: structuredClone(DEFAULT_IMAGE_SPECS)
}

// Allows the developer to define global configuration for QR code generation
export function defineConfig(qrConfig: Partial<QRSpecs> | null, imageConfig: Partial<ImageSpecs> | null) {
    if (qrConfig) qrConfigs.qrConfig = mergeConfig(qrConfig, qrConfigs.qrConfig);
    if (imageConfig) qrConfigs.imageConfig = mergeConfig(imageConfig, qrConfigs.imageConfig);

    console.log("Defined new QR Configs:", qrConfigs);
}

export function resetConfigToDefaults() {
    qrConfigs.qrConfig = structuredClone(DEFAULT_QR_SPECS);
    qrConfigs.imageConfig = structuredClone(DEFAULT_IMAGE_SPECS);

    console.log("Reset QR Configs to defaults:", qrConfigs);
}

// Merges new configuration with old configuration
function mergeConfig<T extends QRSpecs | ImageSpecs>(newConfig: Partial<T>, oldConfig: T): T {
    return {...oldConfig, ...newConfig};
}

// Returns the current global configuration for QR code generation
export function getCurrentConfig() {
    return qrConfigs
}