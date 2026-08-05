import {ECCLevel, EncodedDataSegment, PreparedDatastream, QRDataCapacityBitsTableEntry} from "../../../types";
import {
    ECISwitchingStrategy,
    ModeSwitchingStrategy,
    QRVersion
} from "../../../types";
import {
    ECC_LEVEL_CODE,
    ECI_SWITCHING_STRATEGY,
    QR_VERSION
} from "../../../constants";
import {generateDatastream} from "../.";
import {qrDataCapacities} from "../../../datasets";

export function prepareDatastream(
    encodedData: Array<EncodedDataSegment>,
    eccLevel: ECCLevel,
    eciSwitchingMode: ECISwitchingStrategy = ECI_SWITCHING_STRATEGY.DISABLED,
    modeSwitchingMode: ModeSwitchingStrategy,
    preferredVersion?: QRVersion
): PreparedDatastream {
    let bestVersion: QRVersion | null = null; // Stores best version found through iterations (eventuall the best version)
    let datastream: Array<string> = []; // Initial datastream

    // Get the ECC level key from the value
    const eccLevelKey = Object.entries(ECC_LEVEL_CODE).find(([key, value]) => value === eccLevel)?.[0];
    if (!eccLevelKey) throw Error("Invalid ECC LEVEL_CODE");

    // Loop through all QR versions from 1 to 40
    for (let version: QRVersion = QR_VERSION.V1; version <= QR_VERSION.V40; version++) {
        // Create a copy of encodedData so it can be mutated without affecting the original data        // const workingEncodedData = [...encodedData];
        const workingEncodedData = structuredClone(encodedData);

        // -- 1. Create a datastream for this version --
        datastream = generateDatastream(workingEncodedData, version as QRVersion, eciSwitchingMode, modeSwitchingMode);

        // -- 2. Take the datastream for this version and check if it fits in the QR Code --

        // Get the capacity information for this version
        const dataCapacitiesTableVersion: Record<string, QRDataCapacityBitsTableEntry> | undefined = qrDataCapacities[version];
        if (!dataCapacitiesTableVersion) throw Error("Invalid ECC LEVEL_CODE");

        // Get the data capacity for the version
        const versionCapacityBytes = dataCapacitiesTableVersion[eccLevelKey]!.data; // Get info about a particullar QR Code version

        // Calculate the datastream size for this version
        let datastreamSize = datastream.reduce((acc, current) => acc + current.length, 0);

        // Calculate for terminator and byte alignment
        datastreamSize += Math.min(4, Math.max(0, (versionCapacityBytes * 8) - datastreamSize)); // Terminator (up to 4 bits)
        datastreamSize += (8 - (datastreamSize % 8)) % 8; // Byte alignment

        // When we find a version that can hold the data, return it
        if (versionCapacityBytes >= Math.ceil(datastreamSize / 8)) {
            bestVersion = version as QRVersion;
            break; // Found a suitable version
        }
    }

    // If best version is still null, a version could not be determined
    if (bestVersion === null) throw new Error(`No suitable QR code version found for the provided data and ECC level.`);

    if (preferredVersion != null && bestVersion < preferredVersion) {
        // If best version is less than the preferred version, use preferred version

        // Re-encode the data for the preferred version
        const workingEncodedData = structuredClone(encodedData);
        datastream = generateDatastream(workingEncodedData, preferredVersion as QRVersion, eciSwitchingMode, modeSwitchingMode);

        return {
            version: preferredVersion,
            datastream: datastream,
        };
    } else {
        // If best version is >= preferred version just use best version
        return {
            version: bestVersion,
            datastream: datastream,
        }
    }
}

export default prepareDatastream;