import { describe, it, expect } from "vitest";
import { DATA_ENCODING_MODES, DataEncodingMode, ECC_LEVEL_CODES } from "../enums";
import { ECCLevelCode } from "../../dist";
import { ECISwitchingModes, EncodedDataSegment, ModeSwitchingModes, QRVersions } from "../types";
import unicodeToShiftJIS from "../datasets/unicode_to_shiftjis";
import determineMinQRVersion, { getCharCountIndicatorLength } from "./determineMinQRVersion";
import { qrDataCapacityBits } from "../datasets/qrDataCapacityBits";
import { encodeWithModeSwitching } from "./encodeWithModeSwitching";
import prepareDatastream from "./prepareDatastream";
import { encodeWithSingleMode } from "./encodeWithSingleMode";
import { skip } from "node:test";

const dataCapacities: Record<DataEncodingMode, Record<ECCLevelCode, Record<QRVersions, number>>> = {
    // Max char capacity for numeric encoding
    [DATA_ENCODING_MODES.NUMERIC as DataEncodingMode]: {
        [ECC_LEVEL_CODES.L as ECCLevelCode]: {
            "1": 41, "2": 77, "3": 127, "4": 187, "5": 255, "6": 322, "7": 370, "8": 461, "9": 552, "10": 652,
            "11": 772, "12": 883, "13": 1022, "14": 1101, "15": 1250, "16": 1408, "17": 1548, "18": 1725, "19": 1903, "20": 2061,
            "21": 2232, "22": 2409, "23": 2620, "24": 2812, "25": 3057, "26": 3283, "27": 3517, "28": 3669, "29": 3909, "30": 4158,
            "31": 4417, "32": 4686, "33": 4965, "34": 5253, "35": 5529, "36": 5836, "37": 6153, "38": 6479, "39": 6743, "40": 7089
        },
        [ECC_LEVEL_CODES.M as ECCLevelCode]: {
            "1": 34,
      "2": 63,
      "3": 101,
      "4": 149,
      "5": 202,
      "6": 255,
      "7": 293,
      "8": 365,
      "9": 432,
      "10": 513,
      "11": 604,
      "12": 691,
      "13": 796,
      "14": 871,
      "15": 991,
      "16": 1082,
      "17": 1212,
      "18": 1346,
      "19": 1500,
      "20": 1600,
      "21": 1708,
      "22": 1872,
      "23": 2059,
      "24": 2188,
      "25": 2395,
      "26": 2544,
      "27": 2701,
      "28": 2857,
      "29": 3035,
      "30": 3289,
      "31": 3486,
      "32": 3693,
      "33": 3909,
      "34": 4134,
      "35": 4343,
      "36": 4588,
      "37": 4775,
      "38": 5039,
      "39": 5313,
      "40": 5596
        },
        [ECC_LEVEL_CODES.Q as ECCLevelCode]: {
            "1": 27,
      "2": 48,
      "3": 77,
      "4": 111,
      "5": 144,
      "6": 178,
      "7": 207,
      "8": 259,
      "9": 312,
      "10": 364,
      "11": 427,
      "12": 489,
      "13": 580,
      "14": 621,
      "15": 703,
      "16": 775,
      "17": 876,
      "18": 948,
      "19": 1063,
      "20": 1159,
      "21": 1224,
      "22": 1358,
      "23": 1468,
      "24": 1588,
      "25": 1718,
      "26": 1804,
      "27": 1933,
      "28": 2085,
      "29": 2181,
      "30": 2358,
      "31": 2473,
      "32": 2670,
      "33": 2805,
      "34": 2949,
      "35": 3081,
      "36": 3244,
      "37": 3417,
      "38": 3599,
      "39": 3791,
      "40": 3993
        },
        [ECC_LEVEL_CODES.H as ECCLevelCode]: {
            "1": 17,
      "2": 34,
      "3": 58,
      "4": 82,
      "5": 106,
      "6": 139,
      "7": 154,
      "8": 202,
      "9": 235,
      "10": 288,
      "11": 331,
      "12": 374,
      "13": 427,
      "14": 468,
      "15": 530,
      "16": 602,
      "17": 674,
      "18": 746,
      "19": 813,
      "20": 919,
      "21": 969,
      "22": 1056,
      "23": 1108,
      "24": 1228,
      "25": 1286,
      "26": 1425,
      "27": 1501,
      "28": 1581,
      "29": 1677,
      "30": 1782,
      "31": 1897,
      "32": 2022,
      "33": 2157,
      "34": 2301,
      "35": 2361,
      "36": 2524,
      "37": 2625,
      "38": 2735,
      "39": 2927,
      "40": 3057
        }
    },

    // Max char capacity for alphanumeric encoding
    [DATA_ENCODING_MODES.ALPHANUMERIC as DataEncodingMode]: {
        [ECC_LEVEL_CODES.L as ECCLevelCode]: {
            "1": 25,
      "2": 47,
      "3": 77,
      "4": 114,
      "5": 154,
      "6": 195,
      "7": 224,
      "8": 279,
      "9": 335,
      "10": 395,
      "11": 468,
      "12": 535,
      "13": 619,
      "14": 667,
      "15": 758,
      "16": 854,
      "17": 938,
      "18": 1046,
      "19": 1153,
      "20": 1249,
      "21": 1352,
      "22": 1460,
      "23": 1588,
      "24": 1704,
      "25": 1853,
      "26": 1990,
      "27": 2132,
      "28": 2223,
      "29": 2369,
      "30": 2520,
      "31": 2677,
      "32": 2840,
      "33": 3009,
      "34": 3183,
      "35": 3351,
      "36": 3537,
      "37": 3729,
      "38": 3927,
      "39": 4087,
      "40": 4296
        },
        [ECC_LEVEL_CODES.M as ECCLevelCode]: {
            "1": 20,
      "2": 38,
      "3": 61,
      "4": 90,
      "5": 122,
      "6": 154,
      "7": 178,
      "8": 221,
      "9": 262,
      "10": 311,
      "11": 366,
      "12": 419,
      "13": 483,
      "14": 528,
      "15": 600,
      "16": 656,
      "17": 734,
      "18": 816,
      "19": 909,
      "20": 970,
      "21": 1035,
      "22": 1134,
      "23": 1248,
      "24": 1326,
      "25": 1451,
      "26": 1542,
      "27": 1637,
      "28": 1732,
      "29": 1839,
      "30": 1994,
      "31": 2113,
      "32": 2238,
      "33": 2369,
      "34": 2506,
      "35": 2632,
      "36": 2780,
      "37": 2894,
      "38": 3054,
      "39": 3220,
      "40": 3391
        },
        [ECC_LEVEL_CODES.Q as ECCLevelCode]: {
            "1": 16,
      "2": 29,
      "3": 47,
      "4": 67,
      "5": 87,
      "6": 108,
      "7": 125,
      "8": 157,
      "9": 189,
      "10": 221,
      "11": 259,
      "12": 296,
      "13": 352,
      "14": 376,
      "15": 426,
      "16": 470,
      "17": 531,
      "18": 574,
      "19": 644,
      "20": 702,
      "21": 742,
      "22": 823,
      "23": 890,
      "24": 963,
      "25": 1041,
      "26": 1094,
      "27": 1172,
      "28": 1263,
      "29": 1322,
      "30": 1429,
      "31": 1499,
      "32": 1618,
      "33": 1700,
      "34": 1787,
      "35": 1867,
      "36": 1966,
      "37": 2071,
      "38": 2181,
      "39": 2298,
      "40": 2420
        },
        [ECC_LEVEL_CODES.H as ECCLevelCode]: {
            "1": 10,
      "2": 20,
      "3": 35,
      "4": 50,
      "5": 64,
      "6": 84,
      "7": 93,
      "8": 122,
      "9": 143,
      "10": 174,
      "11": 200,
      "12": 227,
      "13": 259,
      "14": 283,
      "15": 321,
      "16": 365,
      "17": 408,
      "18": 452,
      "19": 493,
      "20": 557,
      "21": 587,
      "22": 640,
      "23": 672,
      "24": 744,
      "25": 779,
      "26": 864,
      "27": 910,
      "28": 958,
      "29": 1016,
      "30": 1080,
      "31": 1150,
      "32": 1226,
      "33": 1307,
      "34": 1394,
      "35": 1431,
      "36": 1530,
      "37": 1591,
      "38": 1658,
      "39": 1774,
      "40": 1852
        },
    },

    // Max char capacity for byte encoding
    [DATA_ENCODING_MODES.BYTE as DataEncodingMode]: {
        [ECC_LEVEL_CODES.L as ECCLevelCode]: {
            "1": 17,
      "2": 32,
      "3": 53,
      "4": 78,
      "5": 106,
      "6": 134,
      "7": 154,
      "8": 192,
      "9": 230,
      "10": 271,
      "11": 321,
      "12": 367,
      "13": 425,
      "14": 458,
      "15": 520,
      "16": 586,
      "17": 644,
      "18": 718,
      "19": 792,
      "20": 858,
      "21": 929,
      "22": 1003,
      "23": 1091,
      "24": 1171,
      "25": 1273,
      "26": 1367,
      "27": 1465,
      "28": 1528,
      "29": 1628,
      "30": 1732,
      "31": 1840,
      "32": 1952,
      "33": 2068,
      "34": 2188,
      "35": 2303,
      "36": 2431,
      "37": 2563,
      "38": 2699,
      "39": 2809,
      "40": 2953
        },
        [ECC_LEVEL_CODES.M as ECCLevelCode]: {
            "1": 14,
      "2": 26,
      "3": 42,
      "4": 62,
      "5": 84,
      "6": 106,
      "7": 122,
      "8": 152,
      "9": 180,
      "10": 213,
      "11": 251,
      "12": 287,
      "13": 331,
      "14": 362,
      "15": 412,
      "16": 450,
      "17": 504,
      "18": 560,
      "19": 624,
      "20": 666,
      "21": 711,
      "22": 779,
      "23": 857,
      "24": 911,
      "25": 997,
      "26": 1059,
      "27": 1125,
      "28": 1190,
      "29": 1264,
      "30": 1370,
      "31": 1452,
      "32": 1538,
      "33": 1628,
      "34": 1722,
      "35": 1809,
      "36": 1911,
      "37": 1989,
      "38": 2099,
      "39": 2213,
      "40": 2331
        },
        [ECC_LEVEL_CODES.Q as ECCLevelCode]: {
            "1": 11,
      "2": 20,
      "3": 32,
      "4": 46,
      "5": 60,
      "6": 74,
      "7": 86,
      "8": 108,
      "9": 130,
      "10": 151,
      "11": 177,
      "12": 203,
      "13": 241,
      "14": 258,
      "15": 292,
      "16": 322,
      "17": 364,
      "18": 394,
      "19": 442,
      "20": 482,
      "21": 509,
      "22": 565,
      "23": 611,
      "24": 661,
      "25": 715,
      "26": 751,
      "27": 805,
      "28": 868,
      "29": 908,
      "30": 982,
      "31": 1030,
      "32": 1112,
      "33": 1168,
      "34": 1228,
      "35": 1283,
      "36": 1351,
      "37": 1423,
      "38": 1499,
      "39": 1579,
      "40": 1663
        },
        [ECC_LEVEL_CODES.H as ECCLevelCode]: {
            "1": 7,
      "2": 14,
      "3": 24,
      "4": 34,
      "5": 44,
      "6": 58,
      "7": 64,
      "8": 84,
      "9": 98,
      "10": 119,
      "11": 137,
      "12": 155,
      "13": 177,
      "14": 194,
      "15": 220,
      "16": 250,
      "17": 280,
      "18": 310,
      "19": 338,
      "20": 382,
      "21": 403,
      "22": 439,
      "23": 461,
      "24": 511,
      "25": 535,
      "26": 593,
      "27": 625,
      "28": 658,
      "29": 698,
      "30": 742,
      "31": 790,
      "32": 842,
      "33": 898,
      "34": 958,
      "35": 983,
      "36": 1051,
      "37": 1093,
      "38": 1139,
      "39": 1219,
      "40": 1273
        }
    },

    // Max char capacity for kanji encoding
    [DATA_ENCODING_MODES.KANJI as DataEncodingMode]: {
        [ECC_LEVEL_CODES.L as ECCLevelCode]: {
            "1": 10,
      "2": 20,
      "3": 32,
      "4": 48,
      "5": 65,
      "6": 82,
      "7": 95,
      "8": 118,
      "9": 141,
      "10": 167,
      "11": 198,
      "12": 226,
      "13": 262,
      "14": 282,
      "15": 320,
      "16": 361,
      "17": 397,
      "18": 442,
      "19": 488,
      "20": 528,
      "21": 572,
      "22": 618,
      "23": 672,
      "24": 721,
      "25": 784,
      "26": 842,
      "27": 902,
      "28": 940,
      "29": 1002,
      "30": 1066,
      "31": 1132,
      "32": 1201,
      "33": 1273,
      "34": 1347,
      "35": 1417,
      "36": 1496,
      "37": 1577,
      "38": 1661,
      "39": 1729,
      "40": 1817
        },
        [ECC_LEVEL_CODES.M as ECCLevelCode]: {
            "1": 8,
      "2": 16,
      "3": 26,
      "4": 38,
      "5": 52,
      "6": 65,
      "7": 75,
      "8": 93,
      "9": 111,
      "10": 131,
      "11": 155,
      "12": 177,
      "13": 204,
      "14": 223,
      "15": 254,
      "16": 277,
      "17": 310,
      "18": 345,
      "19": 384,
      "20": 410,
      "21": 438,
      "22": 480,
      "23": 528,
      "24": 561,
      "25": 614,
      "26": 652,
      "27": 692,
      "28": 732,
      "29": 778,
      "30": 843,
      "31": 894,
      "32": 947,
      "33": 1002,
      "34": 1060,
      "35": 1113,
      "36": 1176,
      "37": 1224,
      "38": 1292,
      "39": 1362,
      "40": 1435
        },
        [ECC_LEVEL_CODES.Q as ECCLevelCode]: {
            "1": 7,
      "2": 12,
      "3": 20,
      "4": 28,
      "5": 37,
      "6": 45,
      "7": 53,
      "8": 66,
      "9": 80,
      "10": 93,
      "11": 109,
      "12": 125,
      "13": 149,
      "14": 159,
      "15": 180,
      "16": 198,
      "17": 224,
      "18": 243,
      "19": 272,
      "20": 297,
      "21": 314,
      "22": 348,
      "23": 376,
      "24": 407,
      "25": 440,
      "26": 462,
      "27": 496,
      "28": 534,
      "29": 559,
      "30": 604,
      "31": 634,
      "32": 684,
      "33": 719,
      "34": 756,
      "35": 790,
      "36": 832,
      "37": 876,
      "38": 923,
      "39": 972,
      "40": 1024
        },
        [ECC_LEVEL_CODES.H as ECCLevelCode]: {
            "1": 4,
      "2": 8,
      "3": 15,
      "4": 21,
      "5": 27,
      "6": 36,
      "7": 39,
      "8": 52,
      "9": 60,
      "10": 74,
      "11": 85,
      "12": 96,
      "13": 109,
      "14": 120,
      "15": 136,
      "16": 154,
      "17": 173,
      "18": 191,
      "19": 208,
      "20": 235,
      "21": 248,
      "22": 270,
      "23": 284,
      "24": 315,
      "25": 330,
      "26": 365,
      "27": 385,
      "28": 405,
      "29": 430,
      "30": 457,
      "31": 486,
      "32": 518,
      "33": 553,
      "34": 590,
      "35": 605,
      "36": 647,
      "37": 673,
      "38": 701,
      "39": 750,
      "40": 784
        }
    },
}

const segmentedSampleData: Record<string, Record<string, Record<string, number>>> = {
    // Single numeric
    "0123456789": {
        noECI: {
            forcedModeSwitchingVersion: 0,
            autoModeSwitchingVersion: 0,
            noModeSwitchingVersion: 0,
        },
        autoECI: {
            forcedModeSwitchingVersion: 0,
            autoModeSwitchingVersion: 0,
            noModeSwitchingVersion: 0,
        },
        forcedECI: {
            forcedModeSwitchingVersion: 0,
            autoModeSwitchingVersion: 0,
            noModeSwitchingVersion: 0,
        }
    },

    // Single Alphanumeric
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:": {
        noECI: {
            forcedModeSwitchingVersion: 0,
            autoModeSwitchingVersion: 0,
            noModeSwitchingVersion: 0,
        },
        autoECI: {
            forcedModeSwitchingVersion: 0,
            autoModeSwitchingVersion: 0,
            noModeSwitchingVersion: 0,
        },
        forcedECI: {
            forcedModeSwitchingVersion: 0,
            autoModeSwitchingVersion: 0,
            noModeSwitchingVersion: 0,
        }
    },

    // Single Kanji
    "漢字テスト": {
        noECI: {
            forcedModeSwitchingVersion: 0,
            autoModeSwitchingVersion: 0,
            noModeSwitchingVersion: 0,
        },
        autoECI: {
            forcedModeSwitchingVersion: 0,
            autoModeSwitchingVersion: 0,
            noModeSwitchingVersion: 0,
        },
        forcedECI: {
            forcedModeSwitchingVersion: 0,
            autoModeSwitchingVersion: 0,
            noModeSwitchingVersion: 0,
        }
    },

    // Single Byte
    "helloworld": {
        noECI: {
            forcedModeSwitchingVersion: 0,
            autoModeSwitchingVersion: 0,
            noModeSwitchingVersion: 0,
        },
        autoECI: {
            forcedModeSwitchingVersion: 0,
            autoModeSwitchingVersion: 0,
            noModeSwitchingVersion: 0,
        },
        forcedECI: {
            forcedModeSwitchingVersion: 0,
            autoModeSwitchingVersion: 0,
            noModeSwitchingVersion: 0,
        }
    },

    // Numeric + alphanumeric
    "0123456789 ABCDEFGHIJKLMNOPQRSTUVWXYZ$%*+-./:": {
        noECI: {
            forcedModeSwitchingVersion: 0,
            autoModeSwitchingVersion: 0,
            noModeSwitchingVersion: 0,
        },
        autoECI: {
            forcedModeSwitchingVersion: 0,
            autoModeSwitchingVersion: 0,
            noModeSwitchingVersion: 0,
        },
        forcedECI: {
            forcedModeSwitchingVersion: 0,
            autoModeSwitchingVersion: 0,
            noModeSwitchingVersion: 0,
        }
    },

    // Numeric + kanji
    "0123456789漢字テスト": {
        noECI: {
            forcedModeSwitchingVersion: 0,
            autoModeSwitchingVersion: 0,
            noModeSwitchingVersion: 0,
        },
        autoECI: {
            forcedModeSwitchingVersion: 0,
            autoModeSwitchingVersion: 0,
            noModeSwitchingVersion: 0,
        },
        forcedECI: {
            forcedModeSwitchingVersion: 0,
            autoModeSwitchingVersion: 0,
            noModeSwitchingVersion: 0,
        }
    },
    
    // Numeric + byte
    "0123456789helloworld": {
        noECI: {
            forcedModeSwitchingVersion: 0,
            autoModeSwitchingVersion: 0,
            noModeSwitchingVersion: 0,
        },
        autoECI: {
            forcedModeSwitchingVersion: 0,
            autoModeSwitchingVersion: 0,
            noModeSwitchingVersion: 0,
        },
        forcedECI: {
            forcedModeSwitchingVersion: 0,
            autoModeSwitchingVersion: 0,
            noModeSwitchingVersion: 0,
        }
    },

    // Alphanumeric + kanji
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:漢字テスト": {
        noECI: {
            forcedModeSwitchingVersion: 0,
            autoModeSwitchingVersion: 0,
            noModeSwitchingVersion: 0,
        },
        autoECI: {
            forcedModeSwitchingVersion: 0,
            autoModeSwitchingVersion: 0,
            noModeSwitchingVersion: 0,
        },
        forcedECI: {
            forcedModeSwitchingVersion: 0,
            autoModeSwitchingVersion: 0,
            noModeSwitchingVersion: 0,
        }
    },

    // Alphanumeric + byte
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:helloworld": {
        noECI: {
            forcedModeSwitchingVersion: 0,
            autoModeSwitchingVersion: 0,
            noModeSwitchingVersion: 0,
        },
        autoECI: {
            forcedModeSwitchingVersion: 0,
            autoModeSwitchingVersion: 0,
            noModeSwitchingVersion: 0,
        },
        forcedECI: {
            forcedModeSwitchingVersion: 0,
            autoModeSwitchingVersion: 0,
            noModeSwitchingVersion: 0,
        }
    },

    // Kanji + byte
    "漢字テストhelloworld": {
        noECI: {
            forcedModeSwitchingVersion: 0,
            autoModeSwitchingVersion: 0,
            noModeSwitchingVersion: 0,
        },
        autoECI: {
            forcedModeSwitchingVersion: 0,
            autoModeSwitchingVersion: 0,
            noModeSwitchingVersion: 0,
        },
        forcedECI: {
            forcedModeSwitchingVersion: 0,
            autoModeSwitchingVersion: 0,
            noModeSwitchingVersion: 0,
        }
    },

    // Numeric + alphanumeric + kanji
    "0123456789 ABCDEFGHIJKLMNOPQRSTUVWXYZ$%*+-./:漢字テスト": {
        noECI: {
            forcedModeSwitchingVersion: 0,
            autoModeSwitchingVersion: 0,
            noModeSwitchingVersion: 0,
        },
        autoECI: {
            forcedModeSwitchingVersion: 0,
            autoModeSwitchingVersion: 0,
            noModeSwitchingVersion: 0,
        },
        forcedECI: {
            forcedModeSwitchingVersion: 0,
            autoModeSwitchingVersion: 0,
            noModeSwitchingVersion: 0,
        }
    },

    // Numeric + alphanumeric + byte
    "0123456789 ABCDEFGHIJKLMNOPQRSTUVWXYZ$%*+-./:helloworld": {
        noECI: {
            forcedModeSwitchingVersion: 0,
            autoModeSwitchingVersion: 0,
            noModeSwitchingVersion: 0,
        },
        autoECI: {
            forcedModeSwitchingVersion: 0,
            autoModeSwitchingVersion: 0,
            noModeSwitchingVersion: 0,
        },
        forcedECI: {
            forcedModeSwitchingVersion: 0,
            autoModeSwitchingVersion: 0,
            noModeSwitchingVersion: 0,
        }
    },

    // Numeric + kanji + byte
    "0123456789漢字テストhelloworld": {
        noECI: {
            forcedModeSwitchingVersion: 0,
            autoModeSwitchingVersion: 0,
            noModeSwitchingVersion: 0,
        },
        autoECI: {
            forcedModeSwitchingVersion: 0,
            autoModeSwitchingVersion: 0,
            noModeSwitchingVersion: 0,
        },
        forcedECI: {
            forcedModeSwitchingVersion: 0,
            autoModeSwitchingVersion: 0,
            noModeSwitchingVersion: 0,
        }
    },

    // Alphanumeric + kanji + byte
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:漢字テストhelloworld": {
        noECI: {
            forcedModeSwitchingVersion: 0,
            autoModeSwitchingVersion: 0,
            noModeSwitchingVersion: 0,
        },
        autoECI: {
            forcedModeSwitchingVersion: 0,
            autoModeSwitchingVersion: 0,
            noModeSwitchingVersion: 0,
        },
        forcedECI: {
            forcedModeSwitchingVersion: 0,
            autoModeSwitchingVersion: 0,
            noModeSwitchingVersion: 0,
        }
    },

    // Numeric + alphanumeric + kanji + byte (all modes)
    "0123456789 ABCDEFGHIJKLMNOPQRSTUVWXYZ$%*+-./:漢字テストhelloworld": {
        noECI: {
            forcedModeSwitchingVersion: 0,
            autoModeSwitchingVersion: 0,
            noModeSwitchingVersion: 0,
        },
        autoECI: {
            forcedModeSwitchingVersion: 0,
            autoModeSwitchingVersion: 0,
            noModeSwitchingVersion: 0,
        },
        forcedECI: {
            forcedModeSwitchingVersion: 0,
            autoModeSwitchingVersion: 0,
            noModeSwitchingVersion: 0,
        }
    },
};

describe("Determine the minimum version for a QR Code with single mode", () => {
    for (const [mode, modeStruc] of Object.entries(dataCapacities)) {
        for (const [eccLevel, eccStruc] of Object.entries(modeStruc)) {
            for (const [versionStr, capacity] of Object.entries(eccStruc)) {
                const version = parseInt(versionStr) as QRVersions;
                const prevVersion = version > 1 ? (version - 1) as QRVersions : null;
                const prevCapacity = prevVersion ? eccStruc[prevVersion] : 0; 

                for (let i = prevCapacity + 1; i <= capacity + 10; i++) {
                    it(`should determine version ${version} is required for charCount: ${i} with mode: ${mode} chars at ECC level ${eccLevel}`, () => {
                        const data = generateDataForLength(i, mode as DataEncodingMode, version);
    
                        const encodedData = encodeWithSingleMode(data, mode as DataEncodingMode);
                        
                        if (version === 40 && i > capacity) return; // Skip test if exceeding max capacity

                        const determinedVersion = determineMinQRVersion(encodedData, eccLevel as ECCLevelCode, "disabled", "disabled", null);

                        if (i <= capacity) {
                            // If within capacity, expect the determined version to be the current version
                            
                            // Test with min possible version
                            expect(determinedVersion).toBe(version);

                            // Test with a preferred version
                            if (version < 40) {
                                // Test with a higher preferred version
                                const preferredVersion = version + 1 as QRVersions;
                                const determinedVersionWithPref = determineMinQRVersion(encodedData, eccLevel as ECCLevelCode, "disabled", "disabled", preferredVersion);
                                expect(determinedVersionWithPref).toBe(preferredVersion); // Test with version +1 higher
                                
                                const determineVersionWithHighestPref = determineMinQRVersion(encodedData, eccLevel as ECCLevelCode, "disabled", "disabled", 40);
                                expect(determineVersionWithHighestPref).toBe(40); // Test with version max version as preferred
                            } 

                            if (version > 1) {
                                // Test with a lower preferred version
                                const preferredVersion = version - 1 as QRVersions;
                                const determinedVersionWithLowerPref = determineMinQRVersion(encodedData, eccLevel as ECCLevelCode, "disabled", "disabled", preferredVersion);
                                expect(determinedVersionWithLowerPref).toBe(version); // Should be the version we are checking for
                                expect(determinedVersionWithLowerPref).not.toBe(preferredVersion); // Should not be the lower preferred version
                            }

                        } else if (i > capacity && version < 39) {
                            // If exceeding capacity, expect the determined version to be false (cannot be encoded)
                            expect(determinedVersion).not.toEqual(version);
                        }
                    });
                }
            }
        }
    }
});

// describe("Determine the minimum version for a QR Code with segmented data", () => {
//     const encodingModes: DataEncodingMode[] = [
//         DATA_ENCODING_MODES.NUMERIC,
//         DATA_ENCODING_MODES.ALPHANUMERIC,
//         DATA_ENCODING_MODES.KANJI,
//         DATA_ENCODING_MODES.BYTE,
//     ]; // Will cycle through all modes when constructing the plain text data for testing

//     for (let size = 1; size <= 501; size++) {
//         // Test between 1..2596 bits (approx 324 bytes)

//         // Create test data with various segment counts and sizes
//         for (let segCount = 2; segCount <= 6; segCount++) {
//             // Test between 2..6 segments

//             // Create segment sizes that fit within the version capacity
//             const segmentSizes = splitInt(size, segCount); // Split i into segCount parts (of whole numbers)

//             // Create data for each segment based on its assgined segment size
//             const segments = new Array(segCount).fill("").map(() => {
//                 for (let segSize of segmentSizes) {
//                     const mode = encodingModes[(segCount - 2) % 4] as DataEncodingMode;
//                     let charCount: number;

//                     // Calculate the char count based on encoding mode (since different modes have different bits per codeword)
//                     switch (mode) {
//                         case DATA_ENCODING_MODES.NUMERIC:
//                             // Numeric: 3 digits = 10 bits ≈ 1.25 bytes
//                             switch (segSize % 3) {
//                                 case 0:
//                                     charCount = Math.floor(segSize * 8 / 10);
//                                     break;
//                                 case 2:
//                                     charCount = Math.floor(((segSize - 1) * 8 / 10) + 7);
//                                     break;
//                                 case 1:
//                                     charCount = Math.floor(((segSize - 1) * 8 / 10) + 4);
//                                     break;
//                                 default:
//                                     charCount = 0; // Should not happen
//                             }
//                             break;
//                         case DATA_ENCODING_MODES.ALPHANUMERIC:
//                             // Alphanumeric: 2 chars = 11 bits ≈ 1.375 bytes
//                             switch (segSize % 2) {
//                                 case 0:
//                                     charCount = Math.floor(segSize * 8 / 11);
//                                     break;
//                                 case 1:
//                                     charCount = Math.floor(((segSize - 1) * 8 / 11)) + 6;
//                                     break;
//                                 default:
//                                     charCount = 0; // Should not happen
//                             }
//                             break;
//                         case DATA_ENCODING_MODES.KANJI:
//                             // Kanji: 1 char = 13 bits ≈ 1.625 bytes
//                             charCount = Math.floor(segSize * 8 / 13); // 13 bits per char
//                             break;
//                         case DATA_ENCODING_MODES.BYTE:
//                             // Byte: 1 char = 8 bits = 1 byte
//                             charCount = segSize;
//                             break;
//                         default:
//                             throw new Error("Unsupported encoding mode");
//                     }

//                     return generateDataForLength(charCount, mode);
//                 }
//             }).join("");

//             const encodedData: Record<string, Array<EncodedDataSegment>> = {
//                 "auto": encodeWithModeSwitching(segments, "auto"), // auto mode switching
//                 "forced": encodeWithModeSwitching(segments, "forced"), // forced mode switching
//                 // encodeWithModeSwitching(segments, "disabled"), // no mode switching
//             }

//             for (const [modeSwitchingMode, data] of Object.entries(encodedData)) {
//                 for (const eccLevel of Object.values(ECC_LEVEL_CODES)) {
//                     for (let eciMode of ["disabled", "auto", "forced"]) {
//                         // if (size <= 324) {
//                             it(`Should determine the correct version for a string of mixed data of`, () => {
//                                 const determinedVersion = determineMinQRVersion(data, eccLevel as ECCLevelCode, eciMode as ECISwitchingModes, null);

//                                 // Gotta sum the individual strings in the array since not all codewords will by bytes (such as for numeric, alphanumeric, or kanji)
//                                 const preparedDataSize = Math.ceil(prepareDatastream(data, determinedVersion, eciMode as ECISwitchingModes).reduce((sum, seg) => sum + seg.length, 0) / 8);
//                                 const maxDataSize = getDataSizeForVersion(determinedVersion, eccLevel as ECCLevelCode); // Get the max allowed data size for the determined version (in bytes)

//                                 expect(preparedDataSize).toBeLessThanOrEqual(maxDataSize); // Check if prepared data size fits within the max data size (valid version)
//                                 // expect(1).toBe(1); // Placeholder to avoid empty test suite error
//                             });
//                         // } 
//                         // else if (size > 324) {
//                         //     it("It should yield an exception when exceeding max capacity", () => {
//                         //         expect(determineMinQRVersion(data, eccLevel as ECCLevelCode, eciMode as ECISwitchingModes, null)).toThrow();
//                         //     });
//                         // }
//                     }
//                 }
//             }
//         }
//     }
// });

const numericChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
const alphanumericChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", " ", "$", "%", "*", "+", "-", ".", "/", ":"];
// const kanjiChars = Object.keys(unicodeToShiftJIS).map((key) => String.fromCharCode(parseInt(key)));
const kanjiChars = [
    "　",
    "、",
    "。",
    "・",
    "゛",
    "゜",
    "ヽ",
    "ヽ",
    "゙",
    "ゝ",
    "ゝ",
    "゙",
    "〃",
    "仝",
    "々",
    "〆",
    "〇",
    "ー",
    "―",
    "‐",
    "〜",
    "‖",
    "…",
    "‥",
    "‘",
    "’",
    "“",
    "”",
    "〔",
    "〕",
    "〈",
    "〉",
    "《",
    "》",
    "「",
    "」",
    "『",
    "』",
    "【",
    "】",
    "−",
    "≠",
    "≦",
    "≧",
    "∞",
    "∴",
    "♂",
    "♀",
    "′",
    "″",
    "℃",
    "☆",
    "★",
    "○",
    "●",
    "◎",
    "◇",
    "◆",
    "□",
    "■",
    "△",
    "▲",
    "▽",
    "▼",
    "※",
    "〒",
    "→",
    "←",
    "↑",
    "↓",
    "〓",
    "∈",
    "∋",
    "⊆",
    "⊇",
    "⊂",
    "⊃",
    "∪",
    "∩",
    "∧",
    "∨",
    "⇒",
    "⇔",
    "∀",
    "∃",
    "∠",
    "⊥",
    "⌒",
    "∂",
    "∇",
    "≡",
    "≒",
    "≪",
    "≫",
    "√",
    "∽",
    "∝",
    "∵",
    "∫",
    "∬",
    "Å",
    "‰",
    "♯",
    "♭",
    "♪",
    "†",
    "‡",
    "◯",
    "　",
    "、",
    "。",
    "・",
    "゛",
    "゜",
    "ヽ",
    "ヽ",
    "゙",
    "ゝ",
    "ゝ",
    "゙",
    "〃",
    "仝",
    "々",
    "〆",
    "〇",
    "ー",
    "―",
    "‐",
    "〜",
    "‖",
    "…",
    "‥",
    "‘",
    "’",
    "“",
    "”",
    "〔",
    "〕",
    "〈",
    "〉",
    "《",
    "》",
    "「",
    "」",
    "『",
    "』",
    "【",
    "】",
    "−",
    "≠",
    "≦",
    "≧",
    "∞",
    "∴",
    "♂",
    "♀",
    "′",
    "″",
    "℃",
    "☆",
    "★",
    "○",
    "●",
    "◎",
    "◇",
    "◆",
    "□",
    "■",
    "△",
    "▲",
    "▽",
    "▼",
    "※",
    "〒",
    "→",
    "←",
    "↑",
    "↓",
    "〓",
    "∈",
    "∋",
    "⊆",
    "⊇",
    "⊂",
    "⊃",
    "∪",
    "∩",
    "∧",
    "∨",
    "⇒",
    "⇔",
    "∀",
    "∃",
    "∠",
    "⊥",
    "⌒",
    "∂",
    "∇",
    "≡",
    "≒",
    "≪",
    "≫",
    "√",
    "∽",
    "∝",
    "∵",
    "∫",
    "∬",
    "Å",
    "‰",
    "♯",
    "♭",
    "♪",
    "†",
    "‡",
    "◯",
    "　",
    "、",
    "。",
    "・",
    "゛",
    "゜",
    "ヽ",
    "ヽ",
    "゙",
    "ゝ",
    "ゝ",
    "゙",
    "〃",
    "仝",
    "々",
    "〆",
    "〇",
    "ー",
    "―",
    "‐",
    "〜",
    "‖",
    "…",
    "‥",
    "‘",
    "’",
    "“",
    "”",
    "〔",
    "〕",
    "〈",
    "〉",
    "《",
    "》",
    "「",
    "」",
    "『",
    "』",
    "【",
    "】",
    "−",
    "≠",
    "≦",
    "≧",
    "∞",
    "∴",
    "♂",
    "♀",
    "′",
    "″",
    "℃",
    "☆",
    "★",
    "○",
    "●",
    "◎",
    "◇",
    "◆",
    "□",
    "■",
    "△",
    "▲",
    "▽",
    "▼",
    "※",
    "〒",
    "→",
    "←",
    "↑",
    "↓",
    "〓",
    "∈",
    "∋",
    "⊆",
    "⊇",
    "⊂",
    "⊃",
    "∪",
    "∩",
    "∧",
    "∨",
    "⇒",
    "⇔",
    "∀",
    "∃",
    "∠",
    "⊥",
    "⌒",
    "∂",
    "∇",
    "≡",
    "≒",
    "≪",
    "≫",
    "√",
    "∽",
    "∝",
    "∵",
    "∫",
    "∬",
    "Å",
    "‰",
    "♯",
    "♭",
    "♪",
    "†",
    "‡",
    "◯",
    "　",
    "、",
    "。",
    "・",
    "゛",
    "゜",
    "ヽ",
    "ヽ",
    "゙",
    "ゝ",
    "ゝ",
    "゙",
    "〃",
    "仝",
    "々",
    "〆",
    "〇",
    "ー",
    "―",
    "‐",
    "〜",
    "‖",
    "…",
    "‥",
    "‘",
    "’",
    "“",
    "”",
    "〔",
    "〕",
    "〈",
    "〉",
    "《",
    "》",
    "「",
    "」",
    "『",
    "』",
    "【",
    "】",
    "−",
    "≠",
    "≦",
    "≧",
    "∞",
    "∴",
    "♂",
    "♀",
    "′",
    "″",
    "℃",
    "☆",
    "★",
    "○",
    "●",
    "◎",
    "◇",
    "◆",
    "□",
    "■",
    "△",
    "▲",
    "▽",
    "▼",
    "※",
    "〒",
    "→",
    "←",
    "↑",
    "↓",
    "〓",
    "∈",
    "∋",
    "⊆",
    "⊇",
    "⊂",
    "⊃",
    "∪",
    "∩",
    "∧",
    "∨",
    "⇒",
    "⇔",
    "∀",
    "∃",
    "∠",
    "⊥",
    "⌒",
    "∂",
    "∇",
    "≡",
    "≒",
    "≪",
    "≫",
    "√",
    "∽",
    "∝",
    "∵",
    "∫",
    "∬",
    "Å",
    "‰",
    "♯",
    "♭",
    "♪",
    "†",
    "‡",
    "◯"
]; // these are specifically chars that won't be picked up by Number or Alphanumeric modes int auto or forced mode switching (varaiety doesn't matter here since we're not testing data integrity and all kanji chars take same space)
// const byteChars = [
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
const byteChars = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z"
]
// TODO: Add another set of chars for ECI data (e.g UTF-8)

function generateDataForLength(length: number, mode: DataEncodingMode, version: QRVersions): string {
    let chars = "";

    length = getSizeForModeAndVersion(length, version, mode); // Get the size in chars needed to reach the desired byte length for the highest version (since it has the largest char count indicator and thus largest header size)

    switch (mode) {
        case DATA_ENCODING_MODES.NUMERIC:
            for (let i = 0; i < length; i++) {
                chars += numericChars[i % numericChars.length];
            }
            break;
        case DATA_ENCODING_MODES.ALPHANUMERIC:
            for (let i = 0; i < length; i++) {
                chars += alphanumericChars[i % alphanumericChars.length];
            }
            break;
        case DATA_ENCODING_MODES.KANJI:
            for (let i = 0; i < length; i++) {
                chars += kanjiChars[i % kanjiChars.length];
            }
            break;
        case DATA_ENCODING_MODES.BYTE:
            for (let i = 0; i < length; i++) {
                chars += byteChars[i % byteChars.length];
            }
            break;
        default:
            throw new Error("Unsupported data encoding mode: " + mode);
    }

    return chars;
}

function getSizeForModeAndVersion(byteSize: number, version: QRVersions, mode: DataEncodingMode): number {
    let headerSize = 4 + getCharCountIndicatorLength(mode, version)
    let availableBits = (byteSize * 8) - headerSize;

    switch (mode) {
        case DATA_ENCODING_MODES.ALPHANUMERIC:
            // 2 chars = 11 bits, 1 char = 6 bits
            const alphaPairs = Math.floor(availableBits / 11);
            const alphaRemainder = availableBits - alphaPairs * 11;
            return alphaPairs * 2 + (alphaRemainder >= 6 ? 1 : 0);
        case DATA_ENCODING_MODES.NUMERIC:
            // 3 digits = 10 bits, 2 digits = 7 bits, 1 digit = 4 bits
            const numericTriples = Math.floor(availableBits / 10);
            const numericRemainder = availableBits - numericTriples * 10;
            return numericTriples * 3 + (numericRemainder >= 7 ? 2 : numericRemainder >= 4 ? 1 : 0);
        case DATA_ENCODING_MODES.KANJI:
            // 1 char = 13 bits
            return Math.floor(availableBits / 13);
        case DATA_ENCODING_MODES.BYTE:
            // 1 byte = 8 bits
            return Math.floor(availableBits / 8);
    }
}

function splitInt(num: number, divisor: number) {
    const quotient = Math.floor(num / divisor);
    const remainder = num % divisor;

    const groups: Array<number> = new Array(remainder).fill(quotient + 1);
    groups.push(...new Array(divisor - remainder).fill(quotient));
    
    return groups;
}

function getDataSizeForVersion(version: QRVersions, eccLevel: ECCLevelCode): number {
    const eccLevelKey = Object.entries(ECC_LEVEL_CODES).find(([key, value]) => value === eccLevel)?.[0];
    return qrDataCapacityBits[version][eccLevelKey!].data;
}