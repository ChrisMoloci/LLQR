import { describe, it, expect } from "vitest";
import encodeNumeric from "./encodeNumeric";

const numericValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

describe("Numeric Encoder", () => {
    it("Should be able to encode data in the range of 1...7094 digits (max codeword QTY for 40-L QR Code)", () => {
        for (let i = 1; i <= 7094; i += 1) {
            let testChars: string = "";
            for (let j = 0; j < i; j++) {
                testChars += numericValues[j % numericValues.length]!;
            }
            expect(encodeNumeric(testChars).charCount).toBe(i);
        }
    });
});