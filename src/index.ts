import generateFullQR from "./internal/generateFullQR";
import generateQRMatrix from "./internal/generateQRMatrix";
import generateImageFromQRMatrix from "./internal/generateImageFromQRMatrix";
import defineConfig, { resetConfigToDefaults } from "./core/helpers/defineConfig";
import { QR_DEFAULTS, IMAGE_DEFAULTS, QRDefault, ImageDefault, DEFAULT_IMAGE_SPECS, DEFAULT_QR_SPECS } from "./const";
import { ECC_LEVEL_CODES } from "./data_structures/enums/ECC_LEVEL_CODES";
import { MASK_PATTERN_CODES } from "./data_structures/enums/MASK_PATTERN_CODES";
import { ECCLevelCode, ECCLevelKey } from "./data_structures/enums/ECC_LEVEL_CODES";
import { PublicQRSpecs as QRSpecs} from "./data_structures/types/QRSpecs";
import { PublicImageSpecs as ImageSpecs} from "./data_structures/types/ImageSpecs";

// Export modules
export { generateFullQR, generateQRMatrix, generateImageFromQRMatrix, defineConfig, resetConfigToDefaults, QR_DEFAULTS, IMAGE_DEFAULTS, DEFAULT_QR_SPECS, DEFAULT_IMAGE_SPECS, ECC_LEVEL_CODES, MASK_PATTERN_CODES };

// Export types
export type { QRDefault, ImageDefault, ECCLevelCode, ECCLevelKey, QRSpecs, ImageSpecs };