import {gf256AntilogTable, gf256LogTable} from "../../datasets";

// Divide two numbers in GF(256)
export function gfDivide(a: number, b: number): number {
    if (a === 0) return 0; // If the numerator is zero, the result is zero
    if (b === 0) throw new Error("Division by zero is not allowed in GF(256)");

    a = gf256LogTable[a] ?? -1;
    b = gf256LogTable[b] ?? -1;

    const logSum = (a - b + 255) % 255; // Subtract the logarithms and wrap around at 255

    const antilog = gf256AntilogTable[logSum];
    if (!antilog) throw Error("GF Multiplication error")

    return antilog; // Return the antilog of the result
}