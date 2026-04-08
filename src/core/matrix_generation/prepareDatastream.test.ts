/**
 * What to test for
 * [] Does it work on singular segments
 * 
 * [] Does it work on the above with with no ECI:
 *      [] Does it work on multiple segments with single mode switching
 *      [] Does it work on multiple segments with auto mode switching
 *      [] Does it work on multiple segments with forced mode switching
 * 
 * [] Does it work on the above with with forced ECI:
 *      [] Does it work on multiple segments with single mode switching
 *      [] Does it work on multiple segments with auto mode switching
 *      [] Does it work on multiple segments with forced mode switching
 * 
 * [] Does it work on the above with with auto ECI:
 *      [] Does it work on multiple segments with single mode switching
 *      [] Does it work on multiple segments with auto mode switching
 *      [] Does it work on multiple segments with forced mode switching
 */

import { describe, it, expect } from 'vitest';
import { ECISwitchingModes } from '../../data_structures/types/QRSpecs';


/**
 * Data to generate variations for
 * "1234567890"
 * "HELLO WORLD"
 * "HELLOWORLD"
 * "HELLO WORLD 123"
 * "1234 HELLO WORLD"
 * "1234 HELLO WORLD 1234"
 * "HELLO 1234 WORLD"
 * "1234 HELLO WORLD 1234 HELLO WORLD"
 * "HELLO WORLD 1234 HELLO WORLD 1234"
 * "こんにちは世界"
 * "漢字テスト1234"
 * 1234漢字テスト
 * "漢字テストHELLO"
 * "HELLO漢字テスト"
 * "1234漢字テストHELLO5678"
 * "Hello, World!"
 * "Café Noël"
 * "¡Hola, señor!"
 * "Grüße aus München"
 * "Résumé for José"
 * "1234 Café Noël 5678"
 * "HELLO Café 1234"
 * "漢字テスト Café 1234 HELLO"
 * "Привет, мир!"
 * "مرحبا بالعالم"
 * "שלום עולם"
 * "नमस्ते दुनिया"
 * "1234 こんにちは 5678"
 * "HELLO こんにちは 1234"
 * "漢字テスト こんにちは HELLO 1234"
 * "😀🧐🎶🇨🇦"
 * "Hello World 😀🧐🎶🇨🇦"
 */

// TODO: To generate the correct data, we need to make sure determineMinQRVersion is fully tested

const singularModeData = {
    ["disabled" as ECISwitchingModes]: [],
    ["auto" as ECISwitchingModes]: [],
    ["forced" as ECISwitchingModes]: [] // Forced and auto should behave the same with no encoding mode switching
};

const modeSwitchingData = {
    ["disabled" as ECISwitchingModes]: [],
    ["auto" as ECISwitchingModes]: [],
    ["forced" as ECISwitchingModes]: []
};

describe("prepareDataStream", () => {
    // Testing singular segments with no ECI switching
    Object.entries(singularModeData).forEach(([key, testArray]) => {
        it(`Should generate the proper data stream for data encoded with no mode switching and ECI switching set to: ${key}`, () => {
            testArray.forEach((segment) => {

            })
        });
    })

    // 
});