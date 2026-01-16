import { describe, it, expect, test } from "vitest";
import encodeAlphanumeric from "./encodeAlphanumeric";

const alphanumericValues = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";

describe("Alphanumeric Encoder", () => {
    it("Should be able to encode all possible alphanumeric characters in the range of 1 to 4300 (max codeword QTY for 40-L QR Code)", () => {
        for (let i = 1; i <= 4300; i++) {
            let testChars: string = "";
            for (let j = 0; j < i; j++) {
                testChars += alphanumericValues[j % alphanumericValues.length];
            }
            expect(encodeAlphanumeric(testChars).charCount).toBe(i);
        }
    });
});