import { MODE_SWITCHING_STRATEGY } from "../../constants";

export type ModeSwitchingStrategy = typeof MODE_SWITCHING_STRATEGY[keyof typeof MODE_SWITCHING_STRATEGY];
export type ModeSwitchingStrategyKey = keyof typeof MODE_SWITCHING_STRATEGY;