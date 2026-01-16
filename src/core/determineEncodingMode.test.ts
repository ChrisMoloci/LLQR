import { describe, it, expect } from "vitest";
import { DATA_ENCODING_MODES } from "../enums";
import determineMode from "./determineEncodingMode";

const numericData = "0123456789";
const alphanumericData = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";
const kanjiData = "漢字テスト";
const byteData = "Hello, World! This should encode as byte. 1234 $1000.00 漢字テスト";

describe("Determine Encoding Mode", () => {
    // Assert alphanumeric data as alphanumeric mode
    it(`Should determine data: ${numericData} to be: ${DATA_ENCODING_MODES.NUMERIC} encoding mode`, () => {
        expect(determineMode(numericData)).toBe(DATA_ENCODING_MODES.NUMERIC);
    });

    // Assert alphanumeric data as alphanumeric mode
    it (`Should determine data: ${alphanumericData} to be: ${DATA_ENCODING_MODES.ALPHANUMERIC} encoding mode`, () => {
        expect(determineMode(alphanumericData)).toBe(DATA_ENCODING_MODES.ALPHANUMERIC);
    });

    // Assert kanji data as kanji mode
    it (`Should determine data: ${kanjiData} to be: ${DATA_ENCODING_MODES.KANJI} encoding mode`, () => {
        expect(determineMode(kanjiData)).toBe(DATA_ENCODING_MODES.KANJI);
    });

    // Assert byte data as byte mode
    it (`Should determine data: ${byteData} to be: ${DATA_ENCODING_MODES.BYTE} encoding mode`, () => {
        expect(determineMode(byteData)).toBe(DATA_ENCODING_MODES.BYTE);
    });

    // Edge cases
    it("Should determine empty string as byte mode", () => {
        expect(determineMode("")).toBe(DATA_ENCODING_MODES.BYTE);
    });

    it("Should determine single digit as numeric mode", () => {
        expect(determineMode("5")).toBe(DATA_ENCODING_MODES.NUMERIC);
    });

    it("Should determine lowercase letter as byte mode", () => {
        expect(determineMode("abc")).toBe(DATA_ENCODING_MODES.BYTE);
    });

    it("Should determine mixed case as byte mode", () => {
        expect(determineMode("AbC")).toBe(DATA_ENCODING_MODES.BYTE);
    });

    it("Should determine numeric with space as alphanumeric mode", () => {
        expect(determineMode("123 456")).toBe(DATA_ENCODING_MODES.ALPHANUMERIC);
    });

    it("Should determine data with special characters not in alphanumeric set as byte mode", () => {
        expect(determineMode("hello@world")).toBe(DATA_ENCODING_MODES.BYTE);
    });

    it("Should prioritize numeric over other modes", () => {
        expect(determineMode("9876543210")).toBe(DATA_ENCODING_MODES.NUMERIC);
    });

    it("Should prioritize alphanumeric over byte when possible", () => {
        expect(determineMode("ABC123")).toBe(DATA_ENCODING_MODES.ALPHANUMERIC);
    });

    it("Should detect kanji with hiragana", () => {
        expect(determineMode("日本")).toBe(DATA_ENCODING_MODES.KANJI);
    });
});