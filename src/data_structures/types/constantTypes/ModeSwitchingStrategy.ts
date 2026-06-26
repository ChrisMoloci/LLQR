import { MODE_SWITCHING_STRATEGY } from "../../constants/MODE_SWITCHING_STRATEGY";

export type ModeSwitchingStrategy = typeof MODE_SWITCHING_STRATEGY[keyof typeof MODE_SWITCHING_STRATEGY];