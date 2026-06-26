import { DataEncodingMode } from "../../../types/constantTypes/DataEncodingMode";
import { qrEncodingCharCounts } from "../../../datasets/qrEncodingCharCounts";
import { QR_VERSION } from "../../../api/exports/constants";
import { QRVersion } from "../../../api/exports/types";

function getCharCountIndicatorLength(mode: DataEncodingMode, version: QRVersion): number {
    // ternary is used to convert ECI to Byte mode for lookup table
    // While encoding for the two work a little different, char count remains the same 
    // since it's still binary mode (even data will be the same in constraints of Latin-1 in UTF-8 encoding)
    // console.log(`Getting Character Count Indicator Length for mode ${mode} and version ${version}`);

    if (version === null) {
        throw new Error("Version cannot be null when getting character count indicator length.");
    }

    let length;
    if (version >= QR_VERSION.V1 && version <= QR_VERSION.V9) {
        length = qrEncodingCharCounts.v1_9[mode]; // Use "0100" for Byte mode in v1_9
    }
    else if (version >= QR_VERSION.V10 && version <= QR_VERSION.V26) {
        length = qrEncodingCharCounts.v10_26[mode];
    }
    else if (version >= QR_VERSION.V27 && version <= QR_VERSION.V40) {
        length = qrEncodingCharCounts.v27_40[mode];
    }
    else {
        throw new Error("Invalid QR code version " + version);
    }
    return length;
}

export default getCharCountIndicatorLength;