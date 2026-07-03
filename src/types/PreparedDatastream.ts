import {QRVersion} from "./constantTypes";

export type PreparedDatastream = {
    dataStream: Array<string>,
    version: QRVersion
}

export default PreparedDatastream;