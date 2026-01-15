function encodeAlphanumeric(data: string): Array<string> {
    if (!/^[0-9A-Z $%*+\-./:]+$/.test(data)) {
        throw new Error("Data must be alphanumeric for alphanumeric encoding.");
    }
    if (data.length === 0 || !data) {
        console.warn("Provided data was empty.")
        return []; // Return empty string for empty input
    }

    console.log(`Encoding alphanumeric data: ${data}`);

    const alphanumericChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";
    let alphanumericEncoding = [];

    let i = 0; // Start from the first character
    while (i < data.length) {
        if (data.length - i >= 2) {
            let value1 = alphanumericChars.indexOf(data[i]);
            let value2 = alphanumericChars.indexOf(data[i + 1]);
            let combinedValue = (value1 * 45) + value2; // Combine two characters into a single value
            // alphanumericEncoding += combinedValue.toString(2).padStart(11, '0'); // Convert to binary and pad to 11 bits
            alphanumericEncoding.push(combinedValue.toString(2).padStart(11, '0')); // Convert to binary and pad to 11 bits
            // console.log(`Encoding pair: ${data[i]}${data[i + 1]} as ${combinedValue} -> ${combinedValue.toString(2).padStart(11, '0')}`);
            i += 2
        } else if (data.length - i === 1) {
            let value1 = alphanumericChars.indexOf(data[i]);
            if (value1 === -1) {
                throw new Error("Invalid character in alphanumeric data.");
            }
            // alphanumericEncoding += value1.toString(2).padStart(6, '0'); // Convert to binary and pad to 6 bits
            alphanumericEncoding.push(value1.toString(2).padStart(6, '0')); // Convert to binary and pad to 6 bits
            // console.log(`Encoding single: ${data[i]} as ${value1} -> ${value1.toString(2).padStart(6, '0')}`);
            i += 1;
        }
    }
    return alphanumericEncoding;
}

export default encodeAlphanumeric;