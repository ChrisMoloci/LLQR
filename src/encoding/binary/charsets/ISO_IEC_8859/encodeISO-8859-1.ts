export function encodeISO_8859_1(plainDataChars: Array<string>): Array<string> {
    return plainDataChars.map(char => {
        // Get the character code
        const charCode = char.charCodeAt(0);
        if (charCode === undefined || charCode < 0 || charCode > 0xFF) {
            // Make sure the character can be encoded in ISO-8859-1
            throw new Error(`Character "${char}" cannot be encoded in ISO-8859-1.`);
        }
        return charCode.toString(2).padStart(8, '0'); // Convert to binary and pad to 8 bits
    });
}

export default encodeISO_8859_1;