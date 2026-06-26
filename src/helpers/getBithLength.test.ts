import { describe, it, expect } from "vitest";
import { getBitLength } from "./getBitLength";

// Test getBitLength function
describe("Get Bit Length", () => {
    it("Should return how many significant bits are used by a 32-bit integer", () => {
        expect(getBitLength(100)).toBe(7);
    });
});