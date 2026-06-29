import {gf256AntilogTable, gf256LogTable} from "../../datasets";

// Divide two numbers in GF(256)
export function gfDivide(a: number, b: number): number {
    /**
     * Formula:
     * A * B = antilog[(log[A] - log[B] + 255) % 255]
     */

    // Input validation
    if (!Number.isInteger(a) || !Number.isInteger(b) || a < 0 || a > 255 || b <= 0 || b > 255) {
        throw Error("GF Division error");
    }

    if (a === 0 || b === 0) return 0; // If either number is zero, the product is zero

    const aLog = gf256LogTable[a];
    const bLog = gf256LogTable[b];

    if (aLog === undefined || bLog === undefined) {
        throw Error("GF Division error");
    }

    // Get the log sum
    const logSum = (aLog - bLog + 255) % 255; // Subtract the logarithms and wrap around at 255
    const antilog = gf256AntilogTable[logSum]; // Get the antilog of the log sum

    if (antilog === undefined) throw Error("GF Division error")

    return antilog; // Antilog is the final result
}