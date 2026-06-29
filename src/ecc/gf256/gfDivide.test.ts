import {describe, expect, it} from "vitest";
import {gfDivide} from "./..";

describe("gfDivide", () => {
    // Positive tests
    it.each([
        [1, 1, 1],
        [1, 2, 142],
        [2, 2, 1],
        [2, 128, 54],
        [5, 20, 71],
        [25, 7, 108],
        [32, 91, 252],
        [87, 131, 141],
        [123, 45, 57],
        [200, 199, 120],
        [255, 255, 1],
    ])("should divide %i and %i in GF(256)", (a, b, expected) => {
        expect(gfDivide(a, b)).toBe(expected);
    });

    // 0 Tests
    it.each([
        [0, 1],
        [0, 255],
    ])("should return 0 when dividing %i and %i", (a, b) => {
        expect(gfDivide(a, b)).toBe(0);
    });

    // 1 Tests
    it.each([1, 2, 7, 25, 64, 128, 255])("should return the same value when dividing %i by 1", value => {
        expect(gfDivide(value, 1)).toBe(value);
    });

    // Edge cases (below or above GF256 Range, invalid chars)
    it.each([
        [0, 0],
        [1, 0],
        [255, 0],
        [-1, 5],
        [5, -1],
        [256, 5],
        [5, 256],
        [Number.NaN, 5],
        [5, Number.NaN],
    ])("should throw when given invalid GF(256) values %s and %s", (a, b) => {
        expect(() => gfDivide(a, b)).toThrow("GF Division error");
    });
});