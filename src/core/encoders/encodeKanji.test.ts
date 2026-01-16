import { describe, it, expect } from "vitest";
import unicodeToShiftJIS from "../../datasets/unicode_to_shiftjis";
import encodeKanji from "./encodeKanji";

const unicodeKanjiValues = Object.keys(unicodeToShiftJIS).map((key) => String.fromCharCode(parseInt(key)));

describe("Encode Kanji", () => {
    it("Attempt to encode data from 1 to 6879 kanji characters (all kanji encodable chars)", () => {
        let testChars: string = "";
        for (let i = 1 ; i <= unicodeKanjiValues.length; i += 100) {
            testChars += unicodeKanjiValues.slice(0, i).join('');
            expect(encodeKanji(testChars)?.charCount).toBe(i);
        }
    })
});