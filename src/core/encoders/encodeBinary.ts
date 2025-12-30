function encodeBinary(data: string): Array<string> {
    let dataChars: Array<string>;
    // TODO in future updates, add more encoding modes with manual encoding selection
    if (typeof data === 'string') {
        dataChars = data.split('');
    } else {
        throw new Error("Data must be a string for binary encoding."); 
    }
    if (dataChars.length === 0) {
        return []; // Return empty string for empty input
    }

    let isLatin1 = true; // Bool to track if all characters are Latin-1
    dataChars.forEach(element => {
        // Get the code point of the character (hex)
        const cp = element.codePointAt(0);

        // Check if the codepoint is greater than the Latin-1 range (0xFF or 256)
        if (cp > 0xFF) {
            isLatin1 = false;
        }
    });

    console.log(`Encoding binary data: ${dataChars}`);

    let binaryEncoding: Array<string> = [];


    if (isLatin1) {
        // Use latin-1 encoding
        // for (let i = 0; i < data.length; i++) {
        //     let charCode = data.charCodeAt(i);
        //     binaryEncoding.push(charCode.toString(2).padStart(8, '0')); // Convert to binary and pad to 8 bits
        // } // Iterate through the data and convert each character to its binary representation
        dataChars.forEach(element => {
            const charCode = element.codePointAt(0);
            if (charCode === undefined) {
                throw new Error("Invalid character in data for binary encoding.");
            }
            binaryEncoding.push(charCode.toString(2).padStart(8, '0')); // Convert to binary and pad to 8 bits
        });
    } else {
        // Use UTF-8 encoding
        if (typeof TextEncoder !== "undefined") {
            // Use TextEncoder if possible
            const encoder = new TextEncoder(); // Create a new TextEncoder instance
            const encodedData = encoder.encode(dataChars.join('')); // Encode the data to a Uint8Array
            encodedData.forEach(byte => {
                binaryEncoding.push(byte.toString(2).padStart(8, '0')); // Convert each byte to binary and pad to 8 bits
            });
        } else {
            // Manually encode if using a browser that doesn't support TextEncoder() interface
            const bytes: number[] = [];
            dataChars.forEach(element => {
                const cp = element.codePointAt(0);
                if (cp === undefined) {
                    throw new Error("Invalid character in data for binary encoding.");
                }
                if (cp <= 0x7F) {
                    bytes.push(cp);
                } else if (cp <= 0x7FF) {
                    bytes.push(0xC0 | (cp >> 6));
                    bytes.push(0x80 | (cp & 0x3F));
                } else if (cp <= 0xFFFF) {
                    bytes.push(0xE0 | (cp >> 12));
                    bytes.push(0x80 | ((cp >> 6) & 0x3F));
                    bytes.push(0x80 | (cp & 0x3F));
                } else {
                    bytes.push(0xF0 | (cp >> 18));
                    bytes.push(0x80 | ((cp >> 12) & 0x3F));
                    bytes.push(0x80 | ((cp >> 6) & 0x3F));
                    bytes.push(0x80 | (cp & 0x3F));
                }
                // binaryEncoding = new Uint8Array(bytes);
                for (const b of bytes) binaryEncoding.push(b.toString(2).padStart(8, '0'))
            });
        }
    }

    console.log("binary encoding final data:", binaryEncoding);

    return binaryEncoding;
}

export default encodeBinary;