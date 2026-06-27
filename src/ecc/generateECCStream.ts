import {ECCLevel, QRVersion} from "../types";
import type {QRDataCapacityBitsTableEntry} from "../types";
import {ECC_LEVEL_CODE} from "../constants";
import {qrDataCapacityBits} from "../datasets";
import normalizeDataStream from "./normalizeDataStream";
import groupDataAndBlocks from "./groupDataAndBlocks";
import padECCZeroBytesToBlocks from "./padECCZeroBytesToBlocks";
import computeECC from "./computeECC";
import interleaveData from "./interleaveData";

export function generateECCStream(encodedData: Array<string>, qrVersion: QRVersion, eccLevelCode: ECCLevel): Array<string> {
    if (qrVersion == null) {
        throw new Error("Version cannot be null when generating ECC stream.");
    }
    if (eccLevelCode == undefined) {
        throw new Error("ECC Level Code cannot be null when generating ECC stream.");
    }

    // Get the error correction level key from the ECC_LEVEL_CODE mapping
    const eccLevelKey = Object.entries(ECC_LEVEL_CODE).find(([key, value]) => value === eccLevelCode)?.[0];
    if (eccLevelKey === undefined) {
        throw new Error("Invalid ECC Level Code provided for ECC stream generation.");
    }

    // Get the capacity information for the specified QR version
    const versionTableVersion: Record<string, QRDataCapacityBitsTableEntry> | undefined = qrDataCapacityBits[qrVersion];
    if (versionTableVersion === undefined) {
        throw new Error("Invalid QR Version provided for ECC stream generation.");
    }

    // Get the capacity information for the particular version
    const versionTableEntry: QRDataCapacityBitsTableEntry | undefined = versionTableVersion[eccLevelKey];
    if (versionTableEntry === undefined) {
        throw new Error("Invalid grouping object for ECC stream generation.");
    }

    const groupingObj = versionTableEntry.blocks;
    const dataCodewordBufferSize: number = versionTableEntry.data * 8;
    const eccCodewordBufferSize: number = versionTableEntry.ecc * 8;
    const generatorPolynomial: Array<number> = versionTableEntry.generator;

    // -- 1. Restructure data stream with padding, and empty ECC bytes as an array --
    const normalizedDataStream = normalizeDataStream(encodedData, dataCodewordBufferSize);
    console.log("Normalized Data Stream for ECC Generation:", normalizedDataStream);

    // -- 2. Convert data stream to integers --
    const dataStreamIntegers: Array<number> = normalizedDataStream.map(byte => parseInt(byte, 2));
    console.log("Data Stream as Integers for ECC Generation:", dataStreamIntegers);

    // -- 3. Split data into blocks and groups if applicable --
    const groupedData: Array<Array<Array<number>>> = groupDataAndBlocks(dataStreamIntegers, groupingObj);
    console.log("Grouped Data for ECC Generation:", groupedData);

    // -- 4. Pad ECC 0 bytes for each block --
    const paddedGroupedData = padECCZeroBytesToBlocks(groupedData, groupingObj, eccCodewordBufferSize);
    console.log("Padded Grouped Data for ECC Generation:", paddedGroupedData);

    // -- 5. Compute ECC for each block in each group --
    const eccGroupedData = computeECC(paddedGroupedData, groupingObj, generatorPolynomial);
    console.log("Computed ECC Grouped Data:", eccGroupedData);

    // -- 6. Interleave Stream
    const interleavedDataStream = interleaveData(eccGroupedData, versionTableEntry);
    console.log("Final Interleaved Data and ECC Stream:", interleavedDataStream);

    // -- 7. Convert interleaved number array to array of binary values --
    const finalDataStream: Array<string> = interleavedDataStream.map(byte => byte.toString(2).padStart(8, '0'));
    console.log("Final Data and ECC Stream as binary strings:", finalDataStream);

    // -- 7. Return ECC Stream as array of strings --
    return finalDataStream;
}

export default generateECCStream;