import { describe, it, expect } from 'vitest';
import { encodeWithModeSwitching } from './encodeWithModeSwitching';
import { DATA_ENCODING_MODES, DataEncodingMode } from '../enums';
import { EncodedDataSegment } from '../types';

const forcedModeTestData: Record<string, Array<EncodedDataSegment>> = {
    // Numeric
    "1234567890": [
        {
            "encodingMode": "0001",
            "charCount": 10,
            "plainTextData": "1234567890",
            "encodedData": [
                "0001111011",
                "0111001000",
                "1100010101",
                "0000"
            ]
        }
    ],

    // Alphanumeric
    "HELLOWORLD": [
        {
            "encodingMode": "0010",
            "charCount": 10,
            "plainTextData": "HELLOWORLD",
            "encodedData": [
                "01100001011",
                "01111000110",
                "10001011000",
                "10001010011",
                "01110111110"
            ]
        }
    ],

    // Kanji
    "漢字テスト": [
        {
            "encodingMode": "1000",
            "charCount": 5,
            "plainTextData": "漢字テスト",
            "encodedData": [
                "0011100111111",
                "0101000011010",
                "0000110100101",
                "0000110011000",
                "0000110100111"
            ]
        }
    ],
    "テスト漢字": [
        {
            "encodingMode": "1000",
            "charCount": 5,
            "plainTextData": "テスト漢字",
            "encodedData": [
                "0000110100101",
                "0000110011000",
                "0000110100111",
                "0011100111111",
                "0101000011010"
            ]
        }
    ],

    // // Mixed
    "HELLO WORLD": [
        {
            "encodingMode": "0010",
            "charCount": 5,
            "plainTextData": "HELLO",
            "encodedData": [
                "01100001011",
                "01111000110",
                "011000"
            ]
        },
        {
            "encodingMode": "0100",
            "charSetAssignmentNumber": 3,
            "charCount": 1,
            "plainTextData": " ",
            "encodedData": [
                "00100000"
            ]
        },
        {
            "encodingMode": "0010",
            "charCount": 5,
            "plainTextData": "WORLD",
            "encodedData": [
                "10110111000",
                "10011010100",
                "001101"
            ]
        }
    ],
    "HELLO1234": [
        {
            "encodingMode": "0010",
            "charCount": 5,
            "plainTextData": "HELLO",
            "encodedData": [
                "01100001011",
                "01111000110",
                "011000"
            ]
        },
        {
            "encodingMode": "0001",
            "charCount": 4,
            "plainTextData": "1234",
            "encodedData": [
                "0001111011",
                "0100"
            ]
        }
    ],
    "1234HELLO": [
        {
            "encodingMode": "0001",
            "charCount": 4,
            "plainTextData": "1234",
            "encodedData": [
                "0001111011",
                "0100"
            ]
        },
        {
            "encodingMode": "0010",
            "charCount": 5,
            "plainTextData": "HELLO",
            "encodedData": [
                "01100001011",
                "01111000110",
                "011000"
            ]
        }
    ],
    "HELLO 1234": [
        {
            "encodingMode": "0010",
            "charCount": 5,
            "plainTextData": "HELLO",
            "encodedData": [
                "01100001011",
                "01111000110",
                "011000"
            ]
        },
        {
            "encodingMode": "0100",
            "charSetAssignmentNumber": 3,
            "charCount": 1,
            "plainTextData": " ",
            "encodedData": [
                "00100000"
            ]
        },
        {
            "encodingMode": "0001",
            "charCount": 4,
            "plainTextData": "1234",
            "encodedData": [
                "0001111011",
                "0100"
            ]
        }
    ],
    "1234 HELLO WORLD": [
        {
            "encodingMode": "0001",
            "charCount": 4,
            "plainTextData": "1234",
            "encodedData": [
                "0001111011",
                "0100"
            ]
        },
        {
            "encodingMode": "0100",
            "charSetAssignmentNumber": 3,
            "charCount": 1,
            "plainTextData": " ",
            "encodedData": [
                "00100000"
            ]
        },
        {
            "encodingMode": "0010",
            "charCount": 5,
            "plainTextData": "HELLO",
            "encodedData": [
                "01100001011",
                "01111000110",
                "011000"
            ]
        },
        {
            "encodingMode": "0100",
            "charSetAssignmentNumber": 3,
            "charCount": 1,
            "plainTextData": " ",
            "encodedData": [
                "00100000"
            ]
        },
        {
            "encodingMode": "0010",
            "charCount": 5,
            "plainTextData": "WORLD",
            "encodedData": [
                "10110111000",
                "10011010100",
                "001101"
            ]
        }
    ],
    "1234 HELLO WORLD 1234": [
        {
            "encodingMode": "0001",
            "charCount": 4,
            "plainTextData": "1234",
            "encodedData": [
                "0001111011",
                "0100"
            ]
        },
        {
            "encodingMode": "0100",
            "charSetAssignmentNumber": 3,
            "charCount": 1,
            "plainTextData": " ",
            "encodedData": [
                "00100000"
            ]
        },
        {
            "encodingMode": "0010",
            "charCount": 5,
            "plainTextData": "HELLO",
            "encodedData": [
                "01100001011",
                "01111000110",
                "011000"
            ]
        },
        {
            "encodingMode": "0100",
            "charSetAssignmentNumber": 3,
            "charCount": 1,
            "plainTextData": " ",
            "encodedData": [
                "00100000"
            ]
        },
        {
            "encodingMode": "0010",
            "charCount": 5,
            "plainTextData": "WORLD",
            "encodedData": [
                "10110111000",
                "10011010100",
                "001101"
            ]
        },
        {
            "encodingMode": "0100",
            "charSetAssignmentNumber": 3,
            "charCount": 1,
            "plainTextData": " ",
            "encodedData": [
                "00100000"
            ]
        },
        {
            "encodingMode": "0001",
            "charCount": 4,
            "plainTextData": "1234",
            "encodedData": [
                "0001111011",
                "0100"
            ]
        }
    ],
    "HELLO world": [
        {
            "encodingMode": "0010",
            "charCount": 5,
            "plainTextData": "HELLO",
            "encodedData": [
                "01100001011",
                "01111000110",
                "011000"
            ]
        },
        {
            "encodingMode": "0100",
            "charSetAssignmentNumber": 3,
            "charCount": 6,
            "plainTextData": " world",
            "encodedData": [
                "00100000",
                "01110111",
                "01101111",
                "01110010",
                "01101100",
                "01100100"
            ]
        }
    ],
    "hello WORLD": [
        {
            "encodingMode": "0100",
            "charSetAssignmentNumber": 3,
            "charCount": 6,
            "plainTextData": "hello ",
            "encodedData": [
                "01101000",
                "01100101",
                "01101100",
                "01101100",
                "01101111",
                "00100000"
            ]
        },
        {
            "encodingMode": "0010",
            "charCount": 5,
            "plainTextData": "WORLD",
            "encodedData": [
                "10110111000",
                "10011010100",
                "001101"
            ]
        }
    ],
    "1234 hello world": [
        {
            "encodingMode": "0001",
            "charCount": 4,
            "plainTextData": "1234",
            "encodedData": [
                "0001111011",
                "0100"
            ]
        },
        {
            "encodingMode": "0100",
            "charSetAssignmentNumber": 3,
            "charCount": 12,
            "plainTextData": " hello world",
            "encodedData": [
                "00100000",
                "01101000",
                "01100101",
                "01101100",
                "01101100",
                "01101111",
                "00100000",
                "01110111",
                "01101111",
                "01110010",
                "01101100",
                "01100100"
            ]
        }
    ],
    "hello world 1234": [
        {
            "encodingMode": "0100",
            "charSetAssignmentNumber": 3,
            "charCount": 12,
            "plainTextData": "hello world ",
            "encodedData": [
                "01101000",
                "01100101",
                "01101100",
                "01101100",
                "01101111",
                "00100000",
                "01110111",
                "01101111",
                "01110010",
                "01101100",
                "01100100",
                "00100000"
            ]
        },
        {
            "encodingMode": "0001",
            "charCount": 4,
            "plainTextData": "1234",
            "encodedData": [
                "0001111011",
                "0100"
            ]
        }
    ],
    "hello 1234 world": [
        {
            "encodingMode": "0100",
            "charSetAssignmentNumber": 3,
            "charCount": 6,
            "plainTextData": "hello ",
            "encodedData": [
                "01101000",
                "01100101",
                "01101100",
                "01101100",
                "01101111",
                "00100000"
            ]
        },
        {
            "encodingMode": "0001",
            "charCount": 4,
            "plainTextData": "1234",
            "encodedData": [
                "0001111011",
                "0100"
            ]
        },
        {
            "encodingMode": "0100",
            "charSetAssignmentNumber": 3,
            "charCount": 6,
            "plainTextData": " world",
            "encodedData": [
                "00100000",
                "01110111",
                "01101111",
                "01110010",
                "01101100",
                "01100100"
            ]
        }
    ],
    "HELLO 1234 world": [
        {
            "encodingMode": "0010",
            "charCount": 5,
            "plainTextData": "HELLO",
            "encodedData": [
                "01100001011",
                "01111000110",
                "011000"
            ]
        },
        {
            "encodingMode": "0100",
            "charSetAssignmentNumber": 3,
            "charCount": 1,
            "plainTextData": " ",
            "encodedData": [
                "00100000"
            ]
        },
        {
            "encodingMode": "0001",
            "charCount": 4,
            "plainTextData": "1234",
            "encodedData": [
                "0001111011",
                "0100"
            ]
        },
        {
            "encodingMode": "0100",
            "charSetAssignmentNumber": 3,
            "charCount": 6,
            "plainTextData": " world",
            "encodedData": [
                "00100000",
                "01110111",
                "01101111",
                "01110010",
                "01101100",
                "01100100"
            ]
        }
    ],
    "hello 1234 WORLD": [
        {
            "encodingMode": "0100",
            "charSetAssignmentNumber": 3,
            "charCount": 6,
            "plainTextData": "hello ",
            "encodedData": [
                "01101000",
                "01100101",
                "01101100",
                "01101100",
                "01101111",
                "00100000"
            ]
        },
        {
            "encodingMode": "0001",
            "charCount": 4,
            "plainTextData": "1234",
            "encodedData": [
                "0001111011",
                "0100"
            ]
        },
        {
            "encodingMode": "0100",
            "charSetAssignmentNumber": 3,
            "charCount": 1,
            "plainTextData": " ",
            "encodedData": [
                "00100000"
            ]
        },
        {
            "encodingMode": "0010",
            "charCount": 5,
            "plainTextData": "WORLD",
            "encodedData": [
                "10110111000",
                "10011010100",
                "001101"
            ]
        }
    ],
    "1234 hello world 1234": [
        {
            "encodingMode": "0001",
            "charCount": 4,
            "plainTextData": "1234",
            "encodedData": [
                "0001111011",
                "0100"
            ]
        },
        {
            "encodingMode": "0100",
            "charSetAssignmentNumber": 3,
            "charCount": 13,
            "plainTextData": " hello world ",
            "encodedData": [
                "00100000",
                "01101000",
                "01100101",
                "01101100",
                "01101100",
                "01101111",
                "00100000",
                "01110111",
                "01101111",
                "01110010",
                "01101100",
                "01100100",
                "00100000"
            ]
        },
        {
            "encodingMode": "0001",
            "charCount": 4,
            "plainTextData": "1234",
            "encodedData": [
                "0001111011",
                "0100"
            ]
        }
    ],
    "1234 HELLO world 5678": [
        {
            "encodingMode": "0001",
            "charCount": 4,
            "plainTextData": "1234",
            "encodedData": [
                "0001111011",
                "0100"
            ]
        },
        {
            "encodingMode": "0100",
            "charSetAssignmentNumber": 3,
            "charCount": 1,
            "plainTextData": " ",
            "encodedData": [
                "00100000"
            ]
        },
        {
            "encodingMode": "0010",
            "charCount": 5,
            "plainTextData": "HELLO",
            "encodedData": [
                "01100001011",
                "01111000110",
                "011000"
            ]
        },
        {
            "encodingMode": "0100",
            "charSetAssignmentNumber": 3,
            "charCount": 7,
            "plainTextData": " world ",
            "encodedData": [
                "00100000",
                "01110111",
                "01101111",
                "01110010",
                "01101100",
                "01100100",
                "00100000"
            ]
        },
        {
            "encodingMode": "0001",
            "charCount": 4,
            "plainTextData": "5678",
            "encodedData": [
                "1000110111",
                "1000"
            ]
        }
    ],
    "漢字 HELLO 1234 テスト": [
        {
            "encodingMode": "1000",
            "charCount": 2,
            "plainTextData": "漢字",
            "encodedData": [
                "0011100111111",
                "0101000011010"
            ]
        },
        {
            "encodingMode": "0100",
            "charSetAssignmentNumber": 3,
            "charCount": 1,
            "plainTextData": " ",
            "encodedData": [
                "00100000"
            ]
        },
        {
            "encodingMode": "0010",
            "charCount": 5,
            "plainTextData": "HELLO",
            "encodedData": [
                "01100001011",
                "01111000110",
                "011000"
            ]
        },
        {
            "encodingMode": "0100",
            "charSetAssignmentNumber": 3,
            "charCount": 1,
            "plainTextData": " ",
            "encodedData": [
                "00100000"
            ]
        },
        {
            "encodingMode": "0001",
            "charCount": 4,
            "plainTextData": "1234",
            "encodedData": [
                "0001111011",
                "0100"
            ]
        },
        {
            "encodingMode": "0100",
            "charSetAssignmentNumber": 26,
            "charCount": 4,
            "plainTextData": " テスト",
            "encodedData": [
                "00100000",
                "11100011",
                "10000011",
                "10000110",
                "11100011",
                "10000010",
                "10111001",
                "11100011",
                "10000011",
                "10001000"
            ]
        }
    ],
    "テスト 1234 world 漢字": [
        {
            "encodingMode": "1000",
            "charCount": 3,
            "plainTextData": "テスト",
            "encodedData": [
                "0000110100101",
                "0000110011000",
                "0000110100111"
            ]
        },
        {
            "encodingMode": "0100",
            "charSetAssignmentNumber": 3,
            "charCount": 1,
            "plainTextData": " ",
            "encodedData": [
                "00100000"
            ]
        },
        {
            "encodingMode": "0001",
            "charCount": 4,
            "plainTextData": "1234",
            "encodedData": [
                "0001111011",
                "0100"
            ]
        },
        {
            "encodingMode": "0100",
            "charSetAssignmentNumber": 26,
            "charCount": 9,
            "plainTextData": " world 漢字",
            "encodedData": [
                "00100000",
                "01110111",
                "01101111",
                "01110010",
                "01101100",
                "01100100",
                "00100000",
                "11100110",
                "10111100",
                "10100010",
                "11100101",
                "10101101",
                "10010111"
            ]
        }
    ],
    "1234 漢字 HELLO テスト 5678": [
        {
            "encodingMode": "0001",
            "charCount": 4,
            "plainTextData": "1234",
            "encodedData": [
                "0001111011",
                "0100"
            ]
        },
        {
            "encodingMode": "0100",
            "charSetAssignmentNumber": 26,
            "charCount": 4,
            "plainTextData": " 漢字 ",
            "encodedData": [
                "00100000",
                "11100110",
                "10111100",
                "10100010",
                "11100101",
                "10101101",
                "10010111",
                "00100000"
            ]
        },
        {
            "encodingMode": "0010",
            "charCount": 5,
            "plainTextData": "HELLO",
            "encodedData": [
                "01100001011",
                "01111000110",
                "011000"
            ]
        },
        {
            "encodingMode": "0100",
            "charSetAssignmentNumber": 26,
            "charCount": 5,
            "plainTextData": " テスト ",
            "encodedData": [
                "00100000",
                "11100011",
                "10000011",
                "10000110",
                "11100011",
                "10000010",
                "10111001",
                "11100011",
                "10000011",
                "10001000",
                "00100000"
            ]
        },
        {
            "encodingMode": "0001",
            "charCount": 4,
            "plainTextData": "5678",
            "encodedData": [
                "1000110111",
                "1000"
            ]
        }
    ],
    "テスト HELLO 1234 漢字": [
        {
            "encodingMode": "1000",
            "charCount": 3,
            "plainTextData": "テスト",
            "encodedData": [
                "0000110100101",
                "0000110011000",
                "0000110100111"
            ]
        },
        {
            "encodingMode": "0100",
            "charSetAssignmentNumber": 3,
            "charCount": 1,
            "plainTextData": " ",
            "encodedData": [
                "00100000"
            ]
        },
        {
            "encodingMode": "0010",
            "charCount": 5,
            "plainTextData": "HELLO",
            "encodedData": [
                "01100001011",
                "01111000110",
                "011000"
            ]
        },
        {
            "encodingMode": "0100",
            "charSetAssignmentNumber": 3,
            "charCount": 1,
            "plainTextData": " ",
            "encodedData": [
                "00100000"
            ]
        },
        {
            "encodingMode": "0001",
            "charCount": 4,
            "plainTextData": "1234",
            "encodedData": [
                "0001111011",
                "0100"
            ]
        },
        {
            "encodingMode": "0100",
            "charSetAssignmentNumber": 26,
            "charCount": 3,
            "plainTextData": " 漢字",
            "encodedData": [
                "00100000",
                "11100110",
                "10111100",
                "10100010",
                "11100101",
                "10101101",
                "10010111"
            ]
        }
    ],
    "שלום עולם1234": [
        {
            "encodingMode": "0100",
            "charSetAssignmentNumber": 26,
            "charCount": 9,
            "plainTextData": "שלום עולם",
            "encodedData": [
                "11010111",
                "10101001",
                "11010111",
                "10011100",
                "11010111",
                "10010101",
                "11010111",
                "10011101",
                "00100000",
                "11010111",
                "10100010",
                "11010111",
                "10010101",
                "11010111",
                "10011100",
                "11010111",
                "10011101"
            ]
        },
        {
            "encodingMode": "0001",
            "charCount": 4,
            "plainTextData": "1234",
            "encodedData": [
                "0001111011",
                "0100"
            ]
        }
    ],
    "שלום עולם HELLO 1234": [
        {
            "encodingMode": "0100",
            "charSetAssignmentNumber": 26,
            "charCount": 10,
            "plainTextData": "שלום עולם ",
            "encodedData": [
                "11010111",
                "10101001",
                "11010111",
                "10011100",
                "11010111",
                "10010101",
                "11010111",
                "10011101",
                "00100000",
                "11010111",
                "10100010",
                "11010111",
                "10010101",
                "11010111",
                "10011100",
                "11010111",
                "10011101",
                "00100000"
            ]
        },
        {
            "encodingMode": "0010",
            "charCount": 5,
            "plainTextData": "HELLO",
            "encodedData": [
                "01100001011",
                "01111000110",
                "011000"
            ]
        },
        {
            "encodingMode": "0100",
            "charSetAssignmentNumber": 3,
            "charCount": 1,
            "plainTextData": " ",
            "encodedData": [
                "00100000"
            ]
        },
        {
            "encodingMode": "0001",
            "charCount": 4,
            "plainTextData": "1234",
            "encodedData": [
                "0001111011",
                "0100"
            ]
        }
    ],
    "1234 שלום עולם HELLO": [
        {
            "encodingMode": "0001",
            "charCount": 4,
            "plainTextData": "1234",
            "encodedData": [
                "0001111011",
                "0100"
            ]
        },
        {
            "encodingMode": "0100",
            "charSetAssignmentNumber": 26,
            "charCount": 11,
            "plainTextData": " שלום עולם ",
            "encodedData": [
                "00100000",
                "11010111",
                "10101001",
                "11010111",
                "10011100",
                "11010111",
                "10010101",
                "11010111",
                "10011101",
                "00100000",
                "11010111",
                "10100010",
                "11010111",
                "10010101",
                "11010111",
                "10011100",
                "11010111",
                "10011101",
                "00100000"
            ]
        },
        {
            "encodingMode": "0010",
            "charCount": 5,
            "plainTextData": "HELLO",
            "encodedData": [
                "01100001011",
                "01111000110",
                "011000"
            ]
        }
    ],
    "1234 שלום עולם HELLO 5678": [
        {
            "encodingMode": "0001",
            "charCount": 4,
            "plainTextData": "1234",
            "encodedData": [
                "0001111011",
                "0100"
            ]
        },
        {
            "encodingMode": "0100",
            "charSetAssignmentNumber": 26,
            "charCount": 11,
            "plainTextData": " שלום עולם ",
            "encodedData": [
                "00100000",
                "11010111",
                "10101001",
                "11010111",
                "10011100",
                "11010111",
                "10010101",
                "11010111",
                "10011101",
                "00100000",
                "11010111",
                "10100010",
                "11010111",
                "10010101",
                "11010111",
                "10011100",
                "11010111",
                "10011101",
                "00100000"
            ]
        },
        {
            "encodingMode": "0010",
            "charCount": 5,
            "plainTextData": "HELLO",
            "encodedData": [
                "01100001011",
                "01111000110",
                "011000"
            ]
        },
        {
            "encodingMode": "0100",
            "charSetAssignmentNumber": 3,
            "charCount": 1,
            "plainTextData": " ",
            "encodedData": [
                "00100000"
            ]
        },
        {
            "encodingMode": "0001",
            "charCount": 4,
            "plainTextData": "5678",
            "encodedData": [
                "1000110111",
                "1000"
            ]
        }
    ],
    "1234שלום עולםhello world": [
        {
            "encodingMode": "0001",
            "charCount": 4,
            "plainTextData": "1234",
            "encodedData": [
                "0001111011",
                "0100"
            ]
        },
        {
            "encodingMode": "0100",
            "charSetAssignmentNumber": 26,
            "charCount": 20,
            "plainTextData": "שלום עולםhello world",
            "encodedData": [
                "11010111",
                "10101001",
                "11010111",
                "10011100",
                "11010111",
                "10010101",
                "11010111",
                "10011101",
                "00100000",
                "11010111",
                "10100010",
                "11010111",
                "10010101",
                "11010111",
                "10011100",
                "11010111",
                "10011101",
                "01101000",
                "01100101",
                "01101100",
                "01101100",
                "01101111",
                "00100000",
                "01110111",
                "01101111",
                "01110010",
                "01101100",
                "01100100"
            ]
        }
    ],
    "1234שלום עולםhello WORLD": [
        {
            "encodingMode": "0001",
            "charCount": 4,
            "plainTextData": "1234",
            "encodedData": [
                "0001111011",
                "0100"
            ]
        },
        {
            "encodingMode": "0100",
            "charSetAssignmentNumber": 26,
            "charCount": 15,
            "plainTextData": "שלום עולםhello ",
            "encodedData": [
                "11010111",
                "10101001",
                "11010111",
                "10011100",
                "11010111",
                "10010101",
                "11010111",
                "10011101",
                "00100000",
                "11010111",
                "10100010",
                "11010111",
                "10010101",
                "11010111",
                "10011100",
                "11010111",
                "10011101",
                "01101000",
                "01100101",
                "01101100",
                "01101100",
                "01101111",
                "00100000"
            ]
        },
        {
            "encodingMode": "0010",
            "charCount": 5,
            "plainTextData": "WORLD",
            "encodedData": [
                "10110111000",
                "10011010100",
                "001101"
            ]
        }
    ],
    "1234שלום עולם HELLO world": [
        {
            "encodingMode": "0001",
            "charCount": 4,
            "plainTextData": "1234",
            "encodedData": [
                "0001111011",
                "0100"
            ]
        },
        {
            "encodingMode": "0100",
            "charSetAssignmentNumber": 26,
            "charCount": 10,
            "plainTextData": "שלום עולם ",
            "encodedData": [
                "11010111",
                "10101001",
                "11010111",
                "10011100",
                "11010111",
                "10010101",
                "11010111",
                "10011101",
                "00100000",
                "11010111",
                "10100010",
                "11010111",
                "10010101",
                "11010111",
                "10011100",
                "11010111",
                "10011101",
                "00100000"
            ]
        },
        {
            "encodingMode": "0010",
            "charCount": 5,
            "plainTextData": "HELLO",
            "encodedData": [
                "01100001011",
                "01111000110",
                "011000"
            ]
        },
        {
            "encodingMode": "0100",
            "charSetAssignmentNumber": 3,
            "charCount": 6,
            "plainTextData": " world",
            "encodedData": [
                "00100000",
                "01110111",
                "01101111",
                "01110010",
                "01101100",
                "01100100"
            ]
        }
    ],
    "1234 שלום עולם hello WORLD1234": [
        {
            "encodingMode": "0001",
            "charCount": 4,
            "plainTextData": "1234",
            "encodedData": [
                "0001111011",
                "0100"
            ]
        },
        {
            "encodingMode": "0100",
            "charSetAssignmentNumber": 26,
            "charCount": 17,
            "plainTextData": " שלום עולם hello ",
            "encodedData": [
                "00100000",
                "11010111",
                "10101001",
                "11010111",
                "10011100",
                "11010111",
                "10010101",
                "11010111",
                "10011101",
                "00100000",
                "11010111",
                "10100010",
                "11010111",
                "10010101",
                "11010111",
                "10011100",
                "11010111",
                "10011101",
                "00100000",
                "01101000",
                "01100101",
                "01101100",
                "01101100",
                "01101111",
                "00100000"
            ]
        },
        {
            "encodingMode": "0010",
            "charCount": 5,
            "plainTextData": "WORLD",
            "encodedData": [
                "10110111000",
                "10011010100",
                "001101"
            ]
        },
        {
            "encodingMode": "0001",
            "charCount": 4,
            "plainTextData": "1234",
            "encodedData": [
                "0001111011",
                "0100"
            ]
        }
    ],
    "1Abcדשלום2": [
        {
            "encodingMode": "0001",
            "charCount": 1,
            "plainTextData": "1",
            "encodedData": [
                "0001"
            ]
        },
        {
            "encodingMode": "0010",
            "charCount": 1,
            "plainTextData": "A",
            "encodedData": [
                "001010"
            ]
        },
        {
            "encodingMode": "0100",
            "charSetAssignmentNumber": 26,
            "charCount": 7,
            "plainTextData": "bcדשלום",
            "encodedData": [
                "01100010",
                "01100011",
                "11010111",
                "10010011",
                "11010111",
                "10101001",
                "11010111",
                "10011100",
                "11010111",
                "10010101",
                "11010111",
                "10011101"
            ]
        },
        {
            "encodingMode": "0001",
            "charCount": 1,
            "plainTextData": "2",
            "encodedData": [
                "0010"
            ]
        }
    ],
}

// Test cases for forced mode switching
describe("Auto encode data with forced mode switching", () => {
    for (const [key, value] of Object.entries(forcedModeTestData)) {
        it(`Should correctly encode data: "${key}" using forced mode switching`, () => {
            const encodedSegments: Array<EncodedDataSegment> = encodeWithModeSwitching(key, "forced");
            expect(encodedSegments).toEqual(value);
        });
    }
});