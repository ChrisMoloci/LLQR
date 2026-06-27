import {QRDataCapacityBitsTableBlocks} from ".";

export type QRDataCapacityBitsTableEntry = {
    total: number;
    data: number;
    ecc: number;
    generator: Array<number>;
    blocks: QRDataCapacityBitsTableBlocks;
};