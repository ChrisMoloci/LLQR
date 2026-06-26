import { ECC_LEVEL_CODE } from "../../constants/ECC_LEVEL_CODE";

export type ECCLevel = typeof ECC_LEVEL_CODE[keyof typeof ECC_LEVEL_CODE];
export type ECCLevelKey = keyof typeof ECC_LEVEL_CODE;