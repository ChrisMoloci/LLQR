// Add or subtract two numbers in GF(256)
export function gfXor(a: number, b: number): number {
    if (!Number.isInteger(a) || !Number.isInteger(b) || a < 0 || a > 255 || b < 0 || b > 255) {
        throw new Error("GF(256) values must be integers between 0 and 255");
    }

    return a ^ b;
}
