import { ECI_SWITCHING_STRATEGY } from "../../constants/ECI_SWITCHING_STRATEGY";

export type ECISwitchingStrategy = typeof ECI_SWITCHING_STRATEGY[keyof typeof ECI_SWITCHING_STRATEGY];