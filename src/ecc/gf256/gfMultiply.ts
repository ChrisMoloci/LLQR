import {gf256AntilogTable, gf256LogTable} from "../../datasets";

// Multiply two numbers in GF(256)
export function gfMultiply(a: number, b: number): number {
    if (a === 0 || b === 0) return 0; // If either number is zero, the product is zero

    a = gf256LogTable[a] ?? -1;
    b = gf256LogTable[b] ?? -1;
    const logSum = (a + b) % 255; // Add the logarithms and wrap around at 255

    const antilog = gf256AntilogTable[logSum];

    if (!antilog) throw Error("GF Multiplication error")

    return antilog;
}