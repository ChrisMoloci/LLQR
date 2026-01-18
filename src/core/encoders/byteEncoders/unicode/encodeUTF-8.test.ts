import { describe, it, expect, beforeAll, afterAll } from "vitest";
import encodeUTF8 from "./encodeUTF-8";

// TODO: Vibe coded this, make sure it actually tests all valid UTF-8 characters properly

describe("Custom UTF-8 Encoder", () => {
    // Store the original TextEncoder so we can delete it for testing
    const OriginalTextEncoder = global.TextEncoder;
    
    // By default our custom encoder uses the native TextEncoder so we need to remove it first
    beforeAll(() => {
        // delete global.TextEncoder;
    });

    afterAll(() => {
        global.TextEncoder = OriginalTextEncoder;
    })

    // Use the built in TextEncoder to compare results to our custom implementation
    it("Should be able to produce the same output as the native TextEncoder for various character ranges", () => {
        const native = new OriginalTextEncoder(); // Create an instance of the built-in TextEncoder
        
        // Test points: Start/End of every byte-length range
        const testPoints = [
            [0x00, 0x7F],             // 1-byte boundaries
            [0x80, 0x7FF],            // 2-byte boundaries
            [0x0800, 0xD7FF],         // Valid 3-byte Part 1
            // Skip surrogate pair range (0xD800 - 0xDFFF)
            [0xE000, 0xFFFF],         // Valid 3-byte Part 2
            [0x10000, 0x10FFFF]       // 4-byte boundaries
        ];

        // Test all code points in the defined ranges (not surrogate pairs)
        testPoints.forEach(range => {
            // console.log(`Testing range: U+${range[0]!.toString(16).toUpperCase()} to U+${range[1]!.toString(16).toUpperCase()}`);
            for (let i = range[0]!; i <= range[1]!; i++) {
                const char = String.fromCodePoint(i); // Convert int to char

                // Encode using native TextEncoder (Proven UTF-8 encoder)
                const nativeResult = Array.from(native.encode(char)).map(b => b.toString(2).padStart(8, '0'));
                
                // Encode using custom UTF-8 encoder
                const manualResult = encodeUTF8([char]);
                
                // Compare the TextEncoder result with our custom encoder
                expect(manualResult).toEqual(nativeResult);
            }
        });     
    }, 15000);

    it("Should return replacement character for invalid surrogate pair", () => {
        const invalidSurrogateValues = [
            0xD800, // High surrogate - min
            0xDBFF, // High surrogate - max
            0xDC00, // Low surrogate - min
            0xDFFF  // Low surrogate - max
        ]
        invalidSurrogateValues.forEach(value => {
            const invalidSurrogateChar = String.fromCharCode(value);
            expect(encodeUTF8([invalidSurrogateChar]).join("")).toBe("111011111011111110111101"); // Returns replacement character
        });
    });

    // TODO: Fix test to check for invalid chars
    // it("Should throw error for code points above U+10FFFF", () => {
    //     // const invalidChar = String.fromCodePoint(0x110000); // Invalid code point
    //     expect(encodeUTF8([ { codePointAt: () => 0x110000 } as any ])).toBe("111011111011111110111101"); // Returns replacement character
    // });
});