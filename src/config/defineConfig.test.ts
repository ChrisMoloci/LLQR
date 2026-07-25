import {beforeEach, describe, expect, it} from "vitest";
import {ImageSpecs, QRSpecs} from "../types";
import {
    ECC_LEVEL_CODE,
    ECI_SWITCHING_STRATEGY,
    MASK_PATTERN_CODE,
    MODE_SWITCHING_STRATEGY, QR_ELEMENT_SHAPE,
    QR_VERSION
} from "../constants";
import {defineConfig, getCurrentConfig, resetConfigToDefaults} from "./defineConfig";
import {DEFAULT_IMAGE_SPECS, DEFAULT_QR_SPECS, QR_DEFAULTS} from "../const";

const qrConfig: QRSpecs = {
    eccLevel: ECC_LEVEL_CODE.M,
    minPreferredVersion: QR_VERSION.AUTO,
    forceByteEncoding: false,
    maskPattern: MASK_PATTERN_CODE.AUTO,
    useModeSwitching: MODE_SWITCHING_STRATEGY.AUTO,
    useECISwitching: ECI_SWITCHING_STRATEGY.AUTO,
};

const partialQRConfig: Partial<QRSpecs> = {
    eccLevel: ECC_LEVEL_CODE.H,
}

const imageConfig: ImageSpecs = {
    backgroundColor: "#000000",
    moduleColor: "#FFFFFF",
    finderPatternOutlineColor: ["#4dff00", "#4dff00", "#4dff00"],
    finderPatternInnerBackgroundColor: ["#000000", "#000000", "#000000"],
    finderPatternInnerColor: ["#4dff00", "#4dff00", "#4dff00"],
    alignmentPatternOutlineColor: "#4dff00",
    alignmentPatternInnerBackgroundColor: "#000000",
    alignmentPatternInnerColor: "#4dff00",
    gridStrokeColor: "#4dff00",

    moduleShape: QR_ELEMENT_SHAPE.CIRCLE,
    finderPatternOutlineShapes: [QR_ELEMENT_SHAPE.CIRCLE, QR_ELEMENT_SHAPE.CIRCLE, QR_ELEMENT_SHAPE.CIRCLE],
    finderPatternInnerBackgroundShapes: [QR_ELEMENT_SHAPE.CIRCLE, QR_ELEMENT_SHAPE.CIRCLE, QR_ELEMENT_SHAPE.CIRCLE],
    finderPatternInnerShapes: [QR_ELEMENT_SHAPE.CIRCLE, QR_ELEMENT_SHAPE.CIRCLE, QR_ELEMENT_SHAPE.CIRCLE],
    alignmentPatternOutlineShapes: QR_ELEMENT_SHAPE.CIRCLE,
    alignmentPatternInnerBackgroundShapes: QR_ELEMENT_SHAPE.CIRCLE,
    alignmentPatternInnerShapes: QR_ELEMENT_SHAPE.CIRCLE,

    roundness: 0.5,
    gridStrokeWidth: 1
}

const partialImageConfig: Partial<ImageSpecs> = {
    backgroundColor: "#ff0505"
}

describe("defineConfig", () => {
    // Resetting to default
    it('should reset config to default', () => {
        resetConfigToDefaults();

        expect(getCurrentConfig()).toEqual({
            qrConfig: DEFAULT_QR_SPECS,
            imageConfig: DEFAULT_IMAGE_SPECS,
        });
    });

    // Define config with both qr and image configs
    describe('defineConfig with qr and image config', () => {
        // Reset the config for each test
        beforeEach(() => {
            resetConfigToDefaults();
        });

        // Full qr and image config
        it('should define complete qr and image configs', () => {
            defineConfig(qrConfig, imageConfig)

            expect(getCurrentConfig()).toEqual({
                qrConfig: structuredClone(qrConfig),
                imageConfig: structuredClone(imageConfig)
            });
        });

        // Full qr and partial image config
        it('should define a full qr and partial image config', () => {
            defineConfig(qrConfig, partialImageConfig)

            expect(getCurrentConfig()).toEqual({
                qrConfig: structuredClone(qrConfig),
                imageConfig: {...structuredClone(DEFAULT_IMAGE_SPECS), ...structuredClone(partialImageConfig)}
            });
        });

        // Partial qr and full image config
        it('should define a partial qr and full image config', () => {
            defineConfig(partialQRConfig, imageConfig)

            expect(getCurrentConfig()).toEqual({
                qrConfig: {...structuredClone(DEFAULT_QR_SPECS), ...structuredClone(partialQRConfig)},
                imageConfig: structuredClone(imageConfig)
            });
        });

        // On the fly config update
        it("should merge new config into the current config", () => {
            defineConfig(partialQRConfig);
            defineConfig({ forceByteEncoding: true });
            expect(getCurrentConfig().qrConfig).toEqual({
                ...DEFAULT_QR_SPECS,
                ...partialQRConfig,
                forceByteEncoding: true,
            });
        });

    });

    // defineConfig with just qrConfig
    describe('defineConfig with just qr config', () => {
        // Reset the config for each test
        beforeEach(() => {
            resetConfigToDefaults();
        });

        // Full qr config with not image argument
        it('should define a full qr config and keep the default image config', () => {
            defineConfig(qrConfig)

            expect(getCurrentConfig()).toEqual({
                qrConfig: structuredClone(qrConfig),
                imageConfig: structuredClone(DEFAULT_IMAGE_SPECS)
            });
        });

        // Full qr config with null image argument
        it('should define a full qr config and keep the default image config', () => {
            defineConfig(qrConfig)

            expect(getCurrentConfig()).toEqual({
                qrConfig: structuredClone(qrConfig),
                imageConfig: structuredClone(DEFAULT_IMAGE_SPECS)
            });
        });

        // Partial qr config with null image argument
        it('should define a partial qr config and keep the default image config', () => {
            defineConfig(partialQRConfig)

            expect(getCurrentConfig()).toEqual({
                qrConfig: {...structuredClone(DEFAULT_QR_SPECS), ...structuredClone(partialQRConfig)},
                imageConfig: structuredClone(DEFAULT_IMAGE_SPECS)
            });
        });

        // Partial qr config with null image argument
        it('should define a partial qr config and keep the default image config', () => {
            defineConfig(partialQRConfig)

            expect(getCurrentConfig()).toEqual({
                qrConfig: {...structuredClone(DEFAULT_QR_SPECS), ...structuredClone(partialQRConfig)},
                imageConfig: structuredClone(DEFAULT_IMAGE_SPECS)
            });
        });
    })

    // defineConfig with just imageConfig
    describe('defineConfig with just image config', () => {
        beforeEach(() => {
            resetConfigToDefaults();
        });

        // Full image config with default image config
        it('should define a full image config and keep the default qr config', () => {
            defineConfig(imageConfig);

            expect(getCurrentConfig()).toEqual({
                qrConfig: {...structuredClone(DEFAULT_QR_SPECS)},
                imageConfig: {...structuredClone(imageConfig)}
            });
        });

        // Partial image config with default image config
        it('should define a partial image config and keep the default qr config', () => {
            defineConfig(partialImageConfig);

            expect(getCurrentConfig()).toEqual({
                qrConfig: {...structuredClone(DEFAULT_QR_SPECS)},
                imageConfig: {...structuredClone(DEFAULT_IMAGE_SPECS), ...structuredClone(partialImageConfig)},
            });
        });
    })
})