import { ECI_SWITCHING_STRATEGY } from "../../constants";

export type ECISwitchingStrategy = typeof ECI_SWITCHING_STRATEGY[keyof typeof ECI_SWITCHING_STRATEGY];
export type ECISwitchingStrategyKey = keyof typeof ECI_SWITCHING_STRATEGY