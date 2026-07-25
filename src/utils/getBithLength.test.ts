/**
 * @Date: June 27, 2026
 * @Author: Christian Moloci
 */
import {describe, expect, it} from "vitest";
import getBitLength from "./getBitLength";

describe("getBitLength", () => {
    it('should return 0 for 0', () => {
        expect(getBitLength(0)).toBe(0);
    });

    // Positive Numbers
    it('should return the bit position of the greatest non-zero bit', () => {
        // 1 bit
        expect(getBitLength(1)).toBe(1); // 1

        // 2 Bits + boundary check
        expect(getBitLength(2)).toBe(2); // 10
        expect(getBitLength(3)).toBe(2); // 11

        // 7 Bits + boundary check
        expect(getBitLength(64)).toBe(7); // 1000000
        expect(getBitLength(127)).toBe(7); // 1111111

        // 8 Bits
        expect(getBitLength(128)).toBe(8); // 10000000
        expect(getBitLength(255)).toBe(8); // 11111111

        // 31 Bits + boundary check
        expect(getBitLength(1_073_741_824)).toBe(31); // 0100 0000 0000 0000 0000 0000 0000 0000
        expect(getBitLength(2_147_483_647)).toBe(31) // 0111 1111 1111 1111 1111 1111 1111 1111

        // 32 Bits + boundary check
        expect(getBitLength(2_147_483_648)).toBe(32); // 1000 0000 0000 0000 0000 0000 0000 0000
        expect(getBitLength(4_294_967_295)).toBe(32); // 1111 1111 1111 1111 1111 1111 1111 1111
    });

    // Negative numbers
    it('should return the bit position of the greatest non-zero bit for negative number as if it were a positive number', () => {
        // 1 bit
        expect(getBitLength(-1)).toBe(1); // 1

        // 2 Bits + boundary check
        expect(getBitLength(-2)).toBe(2); // 10
        expect(getBitLength(-3)).toBe(2); // 11

        // 7 Bits + boundary check
        expect(getBitLength(-64)).toBe(7); // 1000000
        expect(getBitLength(-127)).toBe(7); // 1111111

        // 8 Bits
        expect(getBitLength(-128)).toBe(8); // 10000000
        expect(getBitLength(-255)).toBe(8); // 11111111

        // 31 Bits + boundary check
        expect(getBitLength(-1_073_741_824)).toBe(31); // 0100 0000 0000 0000 0000 0000 0000 0000
        expect(getBitLength(-2_147_483_647)).toBe(31) // 0111 1111 1111 1111 1111 1111 1111 1111

        // 32 Bits + boundary check
        expect(getBitLength(-2_147_483_648)).toBe(32); // 1000 0000 0000 0000 0000 0000 0000 0000
        expect(getBitLength(-4_294_967_295)).toBe(32); // 1111 1111 1111 1111 1111 1111 1111 1111
    });
});