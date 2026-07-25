import {ImageSpecs, QRConfigs, QRElementShape, QRSpecs} from "../types";
import {DEFAULT_IMAGE_SPECS, DEFAULT_QR_SPECS} from "../const";
import imageSpecs from "../types/ImageSpecs";

// Stores the current global configuration for QR code generation
let qrConfigs: QRConfigs = {
    qrConfig: structuredClone(DEFAULT_QR_SPECS),
    imageConfig: structuredClone(DEFAULT_IMAGE_SPECS)
}

// Allows the developer to define global configuration for QR code generation
export function defineConfig(
    // qrConfig: Partial<QRSpecs> = qrConfigs.qrConfig,
    // imageConfig: Partial<ImageSpecs> = qrConfigs.imageConfig
    ...args: Array<Partial<QRSpecs> | Partial<ImageSpecs>>
) {
    if (args.length === 0) return; // Don't do anything if no args have been passed

    // Used to check the types in args
    function isQRSpecs(config: unknown): config is Partial<QRSpecs> {
        if (!config || typeof config !== "object") {
            return false;
        }

        return (
            "eccLevel" in config ||
            "minPreferredVersion" in config ||
            "forceByteEncoding" in config ||
            "maskPattern" in config ||
            "useModeSwitching" in config ||
            "useECISwitching" in config
        );
    }

    function isImageSpecs(config: unknown): config is Partial<ImageSpecs> {
        if (!config || typeof config !== "object") {
            return false;
        }

        return (
            "backgroundColor" in config ||
            "moduleColor" in config ||
            "finderPatternOutlineColor" in config ||
            "finderPatternInnerBackgroundColor" in config ||
            "finderPatternInnerColor" in config ||
            "alignmentPatternOutlineColor" in config ||
            "alignmentPatternInnerBackgroundColor" in config ||
            "alignmentPatternInnerColor" in config ||
            "gridStrokeColor" in config ||
            "moduleShape" in config ||
            "finderPatternOutlineShapes" in config ||
            "finderPatternInnerBackgroundShapes" in config ||
            "finderPatternInnerShapes" in config ||
            "alignmentPatternOutlineShapes" in config ||
            "alignmentPatternInnerBackgroundShapes" in config ||
            "alignmentPatternInnerShapes" in config ||
            "roundness" in config ||
            "gridStrokeWidth" in config
        );
    }

    let qrConfig: Partial<QRSpecs> | null = null;
    let imageConfig: Partial<ImageSpecs> | null = null;

    // Assign args[0] to its respective variable
    if (args[0] && isQRSpecs(args[0])) {
        console.log("arg0 is a qr spec")
        qrConfig = args[0] as Partial<QRSpecs>;
    } else if (args[0] && isImageSpecs(args[0])) {
        console.log("arg0 is a image spec")
        imageConfig = args[0] as Partial<ImageSpecs>;
    } else return;

    // Assign args[1] to its respective variable
    if (args[1] && isQRSpecs(args[1])) {
        console.log("arg1 is an qr spec")
        qrConfig = args[1] as Partial<QRSpecs>;
    } else if (args[1] && isImageSpecs(args[1])) {
        console.log("arg1 is a image spec")
        imageConfig = args[1] as Partial<ImageSpecs>;
    }

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