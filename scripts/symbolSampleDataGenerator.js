import { writeFileSync, createWriteStream } from "fs";

// Create numeric data set
const numericValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const allnumericData = {};

for (let i = 1; i <= 7094; i += 1) {
    let testChars = "";
    for (let j = 0; j < i; j++) {
        testChars += numericValues[j % numericValues.length];
    }
    allnumericData[parseInt(testChars.length)] = {
        data: testChars
    }
}

const numericFileName = "./../tests_sample_data/symbol_data_sets/numeric_sample_data.json";
const numericJsonString = JSON.stringify(allnumericData, null, 2) + "\n";
writeFileSync(numericFileName, numericJsonString, "utf8");
console.log(`Wrote ${numericFileName}`);

// Create alphanumeric data set
const alphanumericValues = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";
const allAlphanumericData = {};

for (let i = 1; i <= 4300; i++) {
    let testChars = "";
    for (let j = 0; j < i; j++) {
        testChars += alphanumericValues[j % alphanumericValues.length];
    }

    allAlphanumericData[parseInt(testChars.length)] = {
        data: testChars
    }
}

const alphanumericFileName = "./../tests_sample_data/symbol_data_sets/alphanumeric_sample_data.json";
const alphanumericJsonString = JSON.stringify(allAlphanumericData, null, 2) + "\n";
writeFileSync(alphanumericFileName, alphanumericJsonString, "utf8");
console.log(`Wrote ${alphanumericFileName}`);

// // Create Latin-1 data set
// // Latin-1 characters from U+0000 to U+00FF (Stored as ASCII strings so we can store non-printable characters)
// const latin1Chars = [
//   "\u0000", "\u0001", "\u0002", "\u0003", "\u0004", "\u0005", "\u0006", "\u0007",
//   "\u0008", "\u0009", "\u000A", "\u000B", "\u000C", "\u000D", "\u000E", "\u000F",
//   "\u0010", "\u0011", "\u0012", "\u0013", "\u0014", "\u0015", "\u0016", "\u0017",
//   "\u0018", "\u0019", "\u001A", "\u001B", "\u001C", "\u001D", "\u001E", "\u001F",

//   "\u0020", "\u0021", "\u0022", "\u0023", "\u0024", "\u0025", "\u0026", "\u0027",
//   "\u0028", "\u0029", "\u002A", "\u002B", "\u002C", "\u002D", "\u002E", "\u002F",
//   "\u0030", "\u0031", "\u0032", "\u0033", "\u0034", "\u0035", "\u0036", "\u0037",
//   "\u0038", "\u0039", "\u003A", "\u003B", "\u003C", "\u003D", "\u003E", "\u003F",
//   "\u0040", "\u0041", "\u0042", "\u0043", "\u0044", "\u0045", "\u0046", "\u0047",
//   "\u0048", "\u0049", "\u004A", "\u004B", "\u004C", "\u004D", "\u004E", "\u004F",
//   "\u0050", "\u0051", "\u0052", "\u0053", "\u0054", "\u0055", "\u0056", "\u0057",
//   "\u0058", "\u0059", "\u005A", "\u005B", "\u005C", "\u005D", "\u005E", "\u005F",
//   "\u0060", "\u0061", "\u0062", "\u0063", "\u0064", "\u0065", "\u0066", "\u0067",
//   "\u0068", "\u0069", "\u006A", "\u006B", "\u006C", "\u006D", "\u006E", "\u006F",
//   "\u0070", "\u0071", "\u0072", "\u0073", "\u0074", "\u0075", "\u0076", "\u0077",
//   "\u0078", "\u0079", "\u007A", "\u007B", "\u007C", "\u007D", "\u007E", "\u007F",

//   "\u0080", "\u0081", "\u0082", "\u0083", "\u0084", "\u0085", "\u0086", "\u0087",
//   "\u0088", "\u0089", "\u008A", "\u008B", "\u008C", "\u008D", "\u008E", "\u008F",
//   "\u0090", "\u0091", "\u0092", "\u0093", "\u0094", "\u0095", "\u0096", "\u0097",
//   "\u0098", "\u0099", "\u009A", "\u009B", "\u009C", "\u009D", "\u009E", "\u009F",

//   "\u00A0", "\u00A1", "\u00A2", "\u00A3", "\u00A4", "\u00A5", "\u00A6", "\u00A7",
//   "\u00A8", "\u00A9", "\u00AA", "\u00AB", "\u00AC", "\u00AD", "\u00AE", "\u00AF",
//   "\u00B0", "\u00B1", "\u00B2", "\u00B3", "\u00B4", "\u00B5", "\u00B6", "\u00B7",
//   "\u00B8", "\u00B9", "\u00BA", "\u00BB", "\u00BC", "\u00BD", "\u00BE", "\u00BF",

//   "\u00C0", "\u00C1", "\u00C2", "\u00C3", "\u00C4", "\u00C5", "\u00C6", "\u00C7",
//   "\u00C8", "\u00C9", "\u00CA", "\u00CB", "\u00CC", "\u00CD", "\u00CE", "\u00CF",
//   "\u00D0", "\u00D1", "\u00D2", "\u00D3", "\u00D4", "\u00D5", "\u00D6", "\u00D7",
//   "\u00D8", "\u00D9", "\u00DA", "\u00DB", "\u00DC", "\u00DD", "\u00DE", "\u00DF",

//   "\u00E0", "\u00E1", "\u00E2", "\u00E3", "\u00E4", "\u00E5", "\u00E6", "\u00E7",
//   "\u00E8", "\u00E9", "\u00EA", "\u00EB", "\u00EC", "\u00ED", "\u00EE", "\u00EF",
//   "\u00F0", "\u00F1", "\u00F2", "\u00F3", "\u00F4", "\u00F5", "\u00F6", "\u00F7",
//   "\u00F8", "\u00F9", "\u00FA", "\u00FB", "\u00FC", "\u00FD", "\u00FE", "\u00FF"
// ];

// const allLatin1Data = {};

// for (let i = 1; i <= 2956; i += 1) {
//     let testString = [];
//     for (let j = 0; j < i; j++) {
//         testString.push(latin1Chars[j % latin1Chars.length]);
//     }
//     testString = testString.join("");
//     allLatin1Data[parseInt(testString.length)] = {
//         data: testString
//     }
// }

// const latin1FileName = "./../tests_sample_data/symbol_data_sets/ISO_8859_1_sample_data.json";
// const latin1JsonString = JSON.stringify(allLatin1Data, null, 2) + "\n";
// writeFileSync(latin1FileName, latin1JsonString, "utf8");
// console.log(`Wrote ${latin1FileName}`);

// Create UTF-8 data set (covering all valid code points except surrogate pairs)
// const allUTF8Data = {};

const ws = createWriteStream("./../tests_sample_data/symbol_data_sets/binary_sample_data.ndjson");

// Test points: Start/End of every byte-length range
const ranges = [
    [0x00, 0x7F],             // 1-byte boundaries
    [0x80, 0x7FF],            // 2-byte boundaries
    [0x0800, 0xD7FF],         // Valid 3-byte Part 1
    // Skip surrogate pair range (0xD800 - 0xDFFF)
    [0xE000, 0xFFFF],         // Valid 3-byte Part 2
    [0x10000, 0x10FFFF]       // 4-byte boundaries
];

let buffer = [];

const flush = async () => {
  if (!buffer.length) return;
  if (!ws.write(buffer.join(""))) await new Promise(r => ws.once("drain", r));
  buffer = [];
};

for (const [start, end] of ranges) {
  let len = 0;
  for (let cp = start; cp <= end; cp++) {
    const char = String.fromCodePoint(cp);
    len += 1;
    buffer.push(JSON.stringify({ [len]: { data: char } }) + "\n"); // or your preferred shape
    if (buffer.length >= 2956) await flush();
  }
}
await flush();
ws.end();