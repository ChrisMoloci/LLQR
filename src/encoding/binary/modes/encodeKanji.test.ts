import {describe} from "vitest";

describe.todo("encodeKanji", () => {})

// import { describe, it, expect, onTestFailed } from "vitest";
// import unicodeToShiftJIS from "../../../datasets/unicode_to_shiftjis";
// import encodeKanji from "./encodeKanji";
//
// const unicodeKanjiValues = Object.keys(unicodeToShiftJIS).map((key) => String.fromCharCode(parseInt(key)));
//
// describe("Encode Kanji", () => {
//     it("Attempt to encode data from 1 to 6879 kanji characters (all kanji encodable chars)", () => {
//         for (let i = 1; i <= unicodeKanjiValues.length; i += 1) {
//             const testChars = unicodeKanjiValues.slice(0, i).join('');
//
//             onTestFailed(() => {
//                 console.log("Failed Kanji Test Data: ", testChars, " On iteration: ", i);
//             });
//
//             expect(encodeKanji(testChars)?.encodedData.length).toBe(i);
//         }
//     })
// });