import {gf256AntilogTable, gf256LogTable} from "../../datasets";

// Multiply two numbers in GF(256)
export function gfMultiply(a: number, b: number): number {
    if (!Number.isInteger(a) || !Number.isInteger(b) || a < 0 || a > 255 || b < 0 || b > 255) {
        throw Error("GF Multiplication error");
    }

    if (a === 0 || b === 0) return 0; // If either number is zero, the product is zero

    const aLog = gf256LogTable[a];
    const bLog = gf256LogTable[b];

    if (aLog === undefined || bLog === undefined) {
        throw Error("GF Multiplication error");
    }

    const logSum = (aLog + bLog) % 255; // Add the logarithms and wrap around at 255
    const antilog = gf256AntilogTable[logSum];

    if (antilog === undefined) throw Error("GF Multiplication error");

    return antilog;
}