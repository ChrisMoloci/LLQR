import { ECC_LEVEL_CODE } from "../../enums/ECC_LEVEL_CODE";

export type ECCLevelCode = typeof ECC_LEVEL_CODE[keyof typeof ECC_LEVEL_CODE];
export type ECCLevelKey = keyof typeof ECC_LEVEL_CODE;