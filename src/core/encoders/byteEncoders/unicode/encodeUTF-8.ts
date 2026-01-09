function encodeUTF8(plainDataChars: Array<string>): Array<string> {
    if (typeof TextEncoder !== "undefined") {
        // Use TextEncoder if possible
        const textEncoder = new TextEncoder();
        // Text encoder returns a Uint8Array, so we have to convert it into a normal array, then convert the numbers to binary strings
        return Array.from(textEncoder.encode(plainDataChars.join(""))).map(byte => byte.toString(2).padStart(8, '0'));
    } else {
        // For older browser, manually encode to UTF-8
        return plainDataChars.map(char => {
            const charCode = char.codePointAt(0);
            if (charCode === undefined || charCode < 0 || charCode > 0x10FFFF) {
                throw new Error(`Character "${char}" cannot be encoded in UTF-8.`);
            }

            if (charCode <= 0x7F) {
                // 1 Byte char
                return charCode.toString(2).padStart(8, '0'); // 1-byte sequence
            } else if (charCode <= 0x7FF) {
                // 2-byte char
                return (
                    (0xC0 | (charCode >> 6)).toString(2).padStart(8, '0') + // First byte
                    (0x80 | (charCode & 0x3F)).toString(2).padStart(8, '0')   // Second byte
                );
            } else if (charCode <= 0xFFFF) {
                // 3-byte char
                return (
                    (0xE0 | (charCode >> 12)).toString(2).padStart(8, '0') + // First byte
                    (0x80 | ((charCode >> 6) & 0x3F)).toString(2).padStart(8, '0') + // Second byte
                    (0x80 | (charCode & 0x3F)).toString(2).padStart(8, '0')   // Third byte
                );
            } else {
                // 4-byte char
                return (
                    (0xF0 | (charCode >> 18)).toString(2).padStart(8, '0') + // First byte
                    (0x80 | ((charCode >> 12) & 0x3F)).toString(2).padStart(8, '0') + // Second byte
                    (0x80 | ((charCode >> 6) & 0x3F)).toString(2).padStart(8, '0') + // Third byte
                    (0x80 | (charCode & 0x3F)).toString(2).padStart(8, '0')   // Fourth byte
                );
            }
        });
    }
}

export default encodeUTF8;