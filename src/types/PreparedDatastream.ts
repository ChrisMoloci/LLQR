import {QRVersion} from "./constantTypes";

export type PreparedDatastream = {
    datastream: Array<string>,
    version: QRVersion,
}

export default PreparedDatastream;