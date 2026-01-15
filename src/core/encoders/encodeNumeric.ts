function encodeNumeric(data: string): Array<string> {
    if (!/^\d+$/.test(data)) {
        throw new Error("Data is not numeric.");
    }
    if (data.length === 0) {
        console.warn("Provided data was empty.")
        return []; // Return empty array for empty input
    }

    console.log(`Encoding numeric data: ${data}`);

    let numericEncoding = [];

    // Iterate through the data in chunks of 3 digits
    let i = 0; // Start from the first character
    while (i < data.length) {
        let chunk = data.slice(i, i + 3); // Get the next 3 or less digits

        // Convert the chunk to binary with appropriate padding
        if (chunk.length >= 3) {
            chunk = parseInt(chunk, 10).toString(2).padStart(10, '0');
            i += 3; // Move to the next chunk
        } else if (chunk.length === 2) {
            chunk = parseInt(chunk, 10).toString(2).padStart(7, '0');
            i += 2; // Move to the next chunk
        } else if (chunk.length === 1) {
            chunk = parseInt(chunk, 10).toString(2).padStart(4, '0');
            i += 1; // Move to the next chunk
        }
        numericEncoding.push(chunk); // Concatenate the binary string
    }
    return numericEncoding; // Return the encoded numeric data
}

export default encodeNumeric;