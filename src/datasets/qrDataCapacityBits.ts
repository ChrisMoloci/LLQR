import {QRDataCapacityBitsTable} from "../types";

export const qrDataCapacityBits: QRDataCapacityBitsTable = {
  "1": {
    "L": {
      "total": 26,
      "data": 19,
      "ecc": 7,
      "generator": [
        1,
        127,
        122,
        154,
        164,
        11,
        68,
        117
      ],
        "blocks": {
            "g1": {
            "numBlocks": 1,
            "dataCodewordsPerBlock": 19
            },
            "g2": {
            "numBlocks": 0,
            "dataCodewordsPerBlock": 0
            }
        }
    },
    "M": {
      "total": 26,
      "data": 16,
      "ecc": 10,
      "generator": [
        1,
        216,
        194,
        159,
        111,
        199,
        94,
        95,
        113,
        157,
        193
      ],
      "blocks": {
        "g1": {
          "numBlocks": 1,
          "dataCodewordsPerBlock": 16
        },
        "g2": {
          "numBlocks": 0,
          "dataCodewordsPerBlock": 0
        }
      }
    },
    "Q": {
      "total": 26,
      "data": 13,
      "ecc": 13,
      "generator": [
        1,
        137,
        73,
        227,
        17,
        177,
        17,
        52,
        13,
        46,
        43,
        83,
        132,
        120
      ],
    "blocks": {
        "g1": {
          "numBlocks": 1,
          "dataCodewordsPerBlock": 13
        },
        "g2": {
          "numBlocks": 0,
          "dataCodewordsPerBlock": 0
        }
      }
    },
    "H": {
      "total": 26,
      "data": 9,
      "ecc": 17,
      "generator": [
        1,
        119,
        66,
        83,
        120,
        119,
        22,
        197,
        83,
        249,
        41,
        143,
        134,
        85,
        53,
        125,
        99,
        79
      ],
        "blocks": {
            "g1": {
            "numBlocks": 1,
            "dataCodewordsPerBlock": 9
            },
            "g2": {
            "numBlocks": 0,
            "dataCodewordsPerBlock": 0
            }
        }
        }
  },
  "2": {
    "L": {
      "total": 44,
      "data": 34,
      "ecc": 10,
      "generator": [
        1,
        216,
        194,
        159,
        111,
        199,
        94,
        95,
        113,
        157,
        193
      ],
      "blocks": {
        "g1": {
          "numBlocks": 1,
          "dataCodewordsPerBlock": 34
        },
        "g2": {
          "numBlocks": 0,
          "dataCodewordsPerBlock": 0
        }
      }
    },
    "M": {
      "total": 44,
      "data": 28,
      "ecc": 16,
      "generator": [
        1,
        59,
        13,
        104,
        189,
        68,
        209,
        30,
        8,
        163,
        65,
        41,
        229,
        98,
        50,
        36,
        59
      ],
            "blocks": {
        "g1": {
          "numBlocks": 1,
          "dataCodewordsPerBlock": 28
        },
        "g2": {
          "numBlocks": 0,
          "dataCodewordsPerBlock": 0
        }
      }
    },
    "Q": {
      "total": 44,
      "data": 22,
      "ecc": 22,
      "generator": [
        1,
        89,
        179,
        131,
        176,
        182,
        244,
        19,
        189,
        69,
        40,
        28,
        137,
        29,
        123,
        67,
        253,
        86,
        218,
        230,
        26,
        145,
        245
      ],
      "blocks": {
        "g1": {
          "numBlocks": 1,
          "dataCodewordsPerBlock": 22
        },
        "g2": {
          "numBlocks": 0,
          "dataCodewordsPerBlock": 0
        }
      }
    },
    "H": {
      "total": 44,
      "data": 16,
      "ecc": 28,
      "generator": [
        1,
        252,
        9,
        28,
        13,
        18,
        251,
        208,
        150,
        103,
        174,
        100,
        41,
        167,
        12,
        247,
        56,
        117,
        119,
        233,
        127,
        181,
        100,
        121,
        147,
        176,
        74,
        58,
        197
      ],
        "blocks": {
            "g1": {
            "numBlocks": 1,
            "dataCodewordsPerBlock": 16
            },
            "g2": {
            "numBlocks": 0,
            "dataCodewordsPerBlock": 0
            }
        }
    }
  },
  "3": {
    "L": {
      "total": 70,
      "data": 55,
      "ecc": 15,
      "generator": [
        1,
        29,
        196,
        111,
        163,
        112,
        74,
        10,
        105,
        105,
        139,
        132,
        151,
        32,
        134,
        26
      ],
      "blocks": {
        "g1": {
          "numBlocks": 1,
          "dataCodewordsPerBlock": 55
        },
        "g2": {
          "numBlocks": 0,
          "dataCodewordsPerBlock": 0
        }
      }
    },
    "M": {
      "total": 70,
      "data": 44,
      "ecc": 26,
      "generator": [
        1,
        246,
        51,
        183,
        4,
        136,
        98,
        199,
        152,
        77,
        56,
        206,
        24,
        145,
        40,
        209,
        117,
        233,
        42,
        135,
        68,
        70,
        144,
        146,
        77,
        43,
        94
      ],
      "blocks": {
        "g1": {
          "numBlocks": 1,
          "dataCodewordsPerBlock": 44
        },
        "g2": {
          "numBlocks": 0,
          "dataCodewordsPerBlock": 0
        }
      }
    },
    "Q": {
      "total": 70,
      "data": 34,
      "ecc": 18,
      "generator": [
        1,
        239,
        251,
        183,
        113,
        149,
        175,
        199,
        215,
        240,
        220,
        73,
        82,
        173,
        75,
        32,
        67,
        217,
        146
      ],
      "blocks": {
        "g1": {
          "numBlocks": 2,
          "dataCodewordsPerBlock": 17
        },
        "g2": {
          "numBlocks": 0,
          "dataCodewordsPerBlock": 0
        }
      }
    },
    "H": {
      "total": 70,
      "data": 26,
      "ecc": 22,
      "generator": [
        1,
        89,
        179,
        131,
        176,
        182,
        244,
        19,
        189,
        69,
        40,
        28,
        137,
        29,
        123,
        67,
        253,
        86,
        218,
        230,
        26,
        145,
        245
      ],
      "blocks": {
        "g1": {
          "numBlocks": 2,
          "dataCodewordsPerBlock": 13
        },
        "g2": {
          "numBlocks": 0,
          "dataCodewordsPerBlock": 0
        }
      }
    },
  },
  "4": {
    "L": {
      "total": 100,
      "data": 80,
      "ecc": 20,
      "generator": [
        1,
        152,
        185,
        240,
        5,
        111,
        99,
        6,
        220,
        112,
        150,
        69,
        36,
        187,
        22,
        228,
        198,
        121,
        121,
        165,
        174
      ],
      "blocks": {
        "g1": {
          "numBlocks": 1,
          "dataCodewordsPerBlock": 80
        },
        "g2": {
          "numBlocks": 0,
          "dataCodewordsPerBlock": 0
        }
      }
    },
    "M": {
      "total": 100,
      "data": 64,
      "ecc": 18,
      "generator": [
        1,
        239,
        251,
        183,
        113,
        149,
        175,
        199,
        215,
        240,
        220,
        73,
        82,
        173,
        75,
        32,
        67,
        217,
        146
      ],
      "blocks": {
        "g1": {
          "numBlocks": 2,
          "dataCodewordsPerBlock": 32
        },
        "g2": {
          "numBlocks": 0,
          "dataCodewordsPerBlock": 0
        }
      }
    },
    "Q": {
      "total": 100,
      "data": 48,
      "ecc": 26,
      "generator": [
        1,
        246,
        51,
        183,
        4,
        136,
        98,
        199,
        152,
        77,
        56,
        206,
        24,
        145,
        40,
        209,
        117,
        233,
        42,
        135,
        68,
        70,
        144,
        146,
        77,
        43,
        94
      ],
      "blocks": {
        "g1": {
          "numBlocks": 2,
          "dataCodewordsPerBlock": 24
        },
        "g2": {
          "numBlocks": 0,
          "dataCodewordsPerBlock": 0
        }
      }
    },
    "H": {
      "total": 100,
      "data": 36,
      "ecc": 16,
      "generator": [
        1,
        59,
        13,
        104,
        189,
        68,
        209,
        30,
        8,
        163,
        65,
        41,
        229,
        98,
        50,
        36,
        59
      ],
      "blocks": {
        "g1": {
          "numBlocks": 4,
          "dataCodewordsPerBlock": 9
        },
        "g2": {
          "numBlocks": 0,
          "dataCodewordsPerBlock": 0
        }
      }
    }
  },
  "5": {
    "L": {
      "total": 134,
      "data": 108,
      "ecc": 26,
      "generator": [
        1,
        246,
        51,
        183,
        4,
        136,
        98,
        199,
        152,
        77,
        56,
        206,
        24,
        145,
        40,
        209,
        117,
        233,
        42,
        135,
        68,
        70,
        144,
        146,
        77,
        43,
        94
      ],
      "blocks": {
        "g1": {
          "numBlocks": 1,
          "dataCodewordsPerBlock": 108
        },
        "g2": {
          "numBlocks": 0,
          "dataCodewordsPerBlock": 0
        }
      }
    },
    "M": {
      "total": 134,
      "data": 86,
      "ecc": 24,
      "generator": [
        1,
        122,
        118,
        169,
        70,
        178,
        237,
        216,
        102,
        115,
        150,
        229,
        73,
        130,
        72,
        61,
        43,
        206,
        1,
        237,
        247,
        127,
        217,
        144,
        117
      ],
      "blocks": {
        "g1": {
          "numBlocks": 2,
          "dataCodewordsPerBlock": 43
        },
        "g2": {
          "numBlocks": 0,
          "dataCodewordsPerBlock": 0
        }
      }
    },
    "Q": {
      "total": 134,
      "data": 62,
      "ecc": 18,
      "generator": [
        1,
        239,
        251,
        183,
        113,
        149,
        175,
        199,
        215,
        240,
        220,
        73,
        82,
        173,
        75,
        32,
        67,
        217,
        146
      ],
      "blocks": {
        "g1": {
          "numBlocks": 2,
          "dataCodewordsPerBlock": 15
        },
        "g2": {
          "numBlocks": 2,
          "dataCodewordsPerBlock": 16
        }
      }
    },
    "H": {
      "total": 134,
      "data": 46,
      "ecc": 22,
      "generator": [
        1,
        89,
        179,
        131,
        176,
        182,
        244,
        19,
        189,
        69,
        40,
        28,
        137,
        29,
        123,
        67,
        253,
        86,
        218,
        230,
        26,
        145,
        245
      ],
      "blocks": {
        "g1": {
          "numBlocks": 2,
          "dataCodewordsPerBlock": 11
        },
        "g2": {
          "numBlocks": 2,
          "dataCodewordsPerBlock": 12
        }
      }
    }
  },
  "6": {
    "L": {
      "total": 172,
      "data": 136,
      "ecc": 18,
      "generator": [
        1,
        239,
        251,
        183,
        113,
        149,
        175,
        199,
        215,
        240,
        220,
        73,
        82,
        173,
        75,
        32,
        67,
        217,
        146
      ],
      "blocks": {
        "g1": {
          "numBlocks": 2,
          "dataCodewordsPerBlock": 68
        },
        "g2": {
          "numBlocks": 0,
          "dataCodewordsPerBlock": 0
        }
      }
    },
    "M": {
      "total": 172,
      "data": 108,
      "ecc": 16,
      "generator": [
        1,
        59,
        13,
        104,
        189,
        68,
        209,
        30,
        8,
        163,
        65,
        41,
        229,
        98,
        50,
        36,
        59
      ],
      "blocks": {
        "g1": {
          "numBlocks": 4,
          "dataCodewordsPerBlock": 27
        },
        "g2": {
          "numBlocks": 0,
          "dataCodewordsPerBlock": 0
        }
      }
    },
    "Q": {
      "total": 172,
      "data": 76,
      "ecc": 24,
      "generator": [
        1,
        122,
        118,
        169,
        70,
        178,
        237,
        216,
        102,
        115,
        150,
        229,
        73,
        130,
        72,
        61,
        43,
        206,
        1,
        237,
        247,
        127,
        217,
        144,
        117
      ],
      "blocks": {
        "g1": {
          "numBlocks": 4,
          "dataCodewordsPerBlock": 19
        },
        "g2": {
          "numBlocks": 0,
          "dataCodewordsPerBlock": 0
        }
      }
    },
    "H": {
      "total": 172,
      "data": 60,
      "ecc": 28,
      "generator": [
        1,
        252,
        9,
        28,
        13,
        18,
        251,
        208,
        150,
        103,
        174,
        100,
        41,
        167,
        12,
        247,
        56,
        117,
        119,
        233,
        127,
        181,
        100,
        121,
        147,
        176,
        74,
        58,
        197
      ],
      "blocks": {
        "g1": {
          "numBlocks": 4,
          "dataCodewordsPerBlock": 15
        },
        "g2": {
          "numBlocks": 0,
          "dataCodewordsPerBlock": 0
        }
      }
    }
  },
  "7": {
    "L": {
      "total": 196,
      "data": 156,
      "ecc": 20,
      "generator": [
        1,
        152,
        185,
        240,
        5,
        111,
        99,
        6,
        220,
        112,
        150,
        69,
        36,
        187,
        22,
        228,
        198,
        121,
        121,
        165,
        174
      ],
      "blocks": {
        "g1": {
          "numBlocks": 2,
          "dataCodewordsPerBlock": 78
        },
        "g2": {
          "numBlocks": 0,
          "dataCodewordsPerBlock": 0
        }
      }
    },
    "M": {
      "total": 196,
      "data": 124,
      "ecc": 18,
      "generator": [
        1,
        239,
        251,
        183,
        113,
        149,
        175,
        199,
        215,
        240,
        220,
        73,
        82,
        173,
        75,
        32,
        67,
        217,
        146
      ],
      "blocks": {
        "g1": {
          "numBlocks": 4,
          "dataCodewordsPerBlock": 31
        },
        "g2": {
          "numBlocks": 0,
          "dataCodewordsPerBlock": 0
        }
      }
    },
    "Q": {
      "total": 196,
      "data": 88,
      "ecc": 18,
      "generator": [
        1,
        239,
        251,
        183,
        113,
        149,
        175,
        199,
        215,
        240,
        220,
        73,
        82,
        173,
        75,
        32,
        67,
        217,
        146
      ],
      "blocks": {
        "g1": {
          "numBlocks": 2,
          "dataCodewordsPerBlock": 14
        },
        "g2": {
          "numBlocks": 4,
          "dataCodewordsPerBlock": 15
        }
      }
    },
    "H": {
      "total": 196,
      "data": 66,
      "ecc": 26,
      "generator": [
        1,
        246,
        51,
        183,
        4,
        136,
        98,
        199,
        152,
        77,
        56,
        206,
        24,
        145,
        40,
        209,
        117,
        233,
        42,
        135,
        68,
        70,
        144,
        146,
        77,
        43,
        94
      ],
      "blocks": {
        "g1": {
          "numBlocks": 4,
          "dataCodewordsPerBlock": 13
        },
        "g2": {
          "numBlocks": 1,
          "dataCodewordsPerBlock": 14
        }
      }
    },
  },
  "8": {
    "L": {
      "total": 242,
      "data": 194,
      "ecc": 24,
      "generator": [
        1,
        122,
        118,
        169,
        70,
        178,
        237,
        216,
        102,
        115,
        150,
        229,
        73,
        130,
        72,
        61,
        43,
        206,
        1,
        237,
        247,
        127,
        217,
        144,
        117
      ],
      "blocks": {
        "g1": {
          "numBlocks": 2,
          "dataCodewordsPerBlock": 97
        },
        "g2": {
          "numBlocks": 0,
          "dataCodewordsPerBlock": 0
        }
      }
    },
    "M": {
      "total": 242,
      "data": 154,
      "ecc": 22,
      "generator": [
        1,
        89,
        179,
        131,
        176,
        182,
        244,
        19,
        189,
        69,
        40,
        28,
        137,
        29,
        123,
        67,
        253,
        86,
        218,
        230,
        26,
        145,
        245
      ],
      "blocks": {
        "g1": {
          "numBlocks": 2,
          "dataCodewordsPerBlock": 38
        },
        "g2": {
          "numBlocks": 2,
          "dataCodewordsPerBlock": 39
        }
      }
    },
    "Q": {
      "total": 242,
      "data": 110,
      "ecc": 22,
      "generator": [
        1,
        89,
        179,
        131,
        176,
        182,
        244,
        19,
        189,
        69,
        40,
        28,
        137,
        29,
        123,
        67,
        253,
        86,
        218,
        230,
        26,
        145,
        245
      ],
      "blocks": {
        "g1": {
          "numBlocks": 4,
          "dataCodewordsPerBlock": 18
        },
        "g2": {
          "numBlocks": 2,
          "dataCodewordsPerBlock": 19
        }
      }
    },
    "H": {
      "total": 242,
      "data": 86,
      "ecc": 26,
      "generator": [
        1,
        246,
        51,
        183,
        4,
        136,
        98,
        199,
        152,
        77,
        56,
        206,
        24,
        145,
        40,
        209,
        117,
        233,
        42,
        135,
        68,
        70,
        144,
        146,
        77,
        43,
        94
      ],
      "blocks": {
        "g1": {
          "numBlocks": 4,
          "dataCodewordsPerBlock": 14
        },
        "g2": {
          "numBlocks": 2,
          "dataCodewordsPerBlock": 15
        }
      }
    }
  },
  "9": {
    "L": {
      "total": 292,
      "data": 232,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 2,
          "dataCodewordsPerBlock": 116
        },
        "g2": {
          "numBlocks": 0,
          "dataCodewordsPerBlock": 0
        }
      }
    },
    "M": {
      "total": 292,
      "data": 182,
      "ecc": 22,
      "generator": [
        1,
        89,
        179,
        131,
        176,
        182,
        244,
        19,
        189,
        69,
        40,
        28,
        137,
        29,
        123,
        67,
        253,
        86,
        218,
        230,
        26,
        145,
        245
      ],
      "blocks": {
        "g1": {
          "numBlocks": 3,
          "dataCodewordsPerBlock": 36
        },
        "g2": {
          "numBlocks": 2,
          "dataCodewordsPerBlock": 37
        }
      }
    },
    "Q": {
      "total": 292,
      "data": 132,
      "ecc": 20,
      "generator": [
        1,
        152,
        185,
        240,
        5,
        111,
        99,
        6,
        220,
        112,
        150,
        69,
        36,
        187,
        22,
        228,
        198,
        121,
        121,
        165,
        174
      ],
      "blocks": {
        "g1": {
          "numBlocks": 4,
          "dataCodewordsPerBlock": 16
        },
        "g2": {
          "numBlocks": 4,
          "dataCodewordsPerBlock": 17
        }
      }
    },
    "H": {
      "total": 292,
      "data": 100,
      "ecc": 24,
      "generator": [
        1,
        122,
        118,
        169,
        70,
        178,
        237,
        216,
        102,
        115,
        150,
        229,
        73,
        130,
        72,
        61,
        43,
        206,
        1,
        237,
        247,
        127,
        217,
        144,
        117
      ],
      "blocks": {
        "g1": {
          "numBlocks": 4,
          "dataCodewordsPerBlock": 12
        },
        "g2": {
          "numBlocks": 4,
          "dataCodewordsPerBlock": 13
        }
      }
    }
  },
  "10": {
    "L": {
      "total": 346,
      "data": 274,
      "ecc": 18,
      "generator": [
        1,
        239,
        251,
        183,
        113,
        149,
        175,
        199,
        215,
        240,
        220,
        73,
        82,
        173,
        75,
        32,
        67,
        217,
        146
      ],
      "blocks": {
        "g1": {
          "numBlocks": 2,
          "dataCodewordsPerBlock": 68
        },
        "g2": {
          "numBlocks": 2,
          "dataCodewordsPerBlock": 69
        }
      }
    },
    "M": {
      "total": 346,
      "data": 216,
      "ecc": 26,
      "generator": [
        1,
        246,
        51,
        183,
        4,
        136,
        98,
        199,
        152,
        77,
        56,
        206,
        24,
        145,
        40,
        209,
        117,
        233,
        42,
        135,
        68,
        70,
        144,
        146,
        77,
        43,
        94
      ],
      "blocks": {
        "g1": {
          "numBlocks": 4,
          "dataCodewordsPerBlock": 43
        },
        "g2": {
          "numBlocks": 1,
          "dataCodewordsPerBlock": 44
        }
      }
    },
    "Q": {
      "total": 346,
      "data": 154,
      "ecc": 24,
      "generator": [
        1,
        122,
        118,
        169,
        70,
        178,
        237,
        216,
        102,
        115,
        150,
        229,
        73,
        130,
        72,
        61,
        43,
        206,
        1,
        237,
        247,
        127,
        217,
        144,
        117
      ],
      "blocks": {
        "g1": {
          "numBlocks": 6,
          "dataCodewordsPerBlock": 19
        },
        "g2": {
          "numBlocks": 2,
          "dataCodewordsPerBlock": 20
        }
      }
    },
    "H": {
      "total": 346,
      "data": 122,
      "ecc": 28,
      "generator": [
        1,
        252,
        9,
        28,
        13,
        18,
        251,
        208,
        150,
        103,
        174,
        100,
        41,
        167,
        12,
        247,
        56,
        117,
        119,
        233,
        127,
        181,
        100,
        121,
        147,
        176,
        74,
        58,
        197
      ],
      "blocks": {
        "g1": {
          "numBlocks": 6,
          "dataCodewordsPerBlock": 15
        },
        "g2": {
          "numBlocks": 2,
          "dataCodewordsPerBlock": 16
        }
      }
    },
  },
  "11": {
    "L": {
      "total": 404,
      "data": 324,
      "ecc": 20,
      "generator": [
        1,
        152,
        185,
        240,
        5,
        111,
        99,
        6,
        220,
        112,
        150,
        69,
        36,
        187,
        22,
        228,
        198,
        121,
        121,
        165,
        174
      ],
      "blocks": {
        "g1": {
          "numBlocks": 4,
          "dataCodewordsPerBlock": 81
        },
        "g2": {
          "numBlocks": 0,
          "dataCodewordsPerBlock": 0
        }
      }
    },
    "M": {
      "total": 404,
      "data": 254,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 1,
          "dataCodewordsPerBlock": 50
        },
        "g2": {
          "numBlocks": 4,
          "dataCodewordsPerBlock": 51
        }
      }
    },
    "Q": {
      "total": 404,
      "data": 180,
      "ecc": 28,
      "generator": [
        1,
        252,
        9,
        28,
        13,
        18,
        251,
        208,
        150,
        103,
        174,
        100,
        41,
        167,
        12,
        247,
        56,
        117,
        119,
        233,
        127,
        181,
        100,
        121,
        147,
        176,
        74,
        58,
        197
      ],
      "blocks": {
        "g1": {
          "numBlocks": 4,
          "dataCodewordsPerBlock": 22
        },
        "g2": {
          "numBlocks": 4,
          "dataCodewordsPerBlock": 23
        }
      }
    },
    "H": {
      "total": 404,
      "data": 140,
      "ecc": 24,
      "generator": [
        1,
        122,
        118,
        169,
        70,
        178,
        237,
        216,
        102,
        115,
        150,
        229,
        73,
        130,
        72,
        61,
        43,
        206,
        1,
        237,
        247,
        127,
        217,
        144,
        117
      ],
      "blocks": {
        "g1": {
          "numBlocks": 3,
          "dataCodewordsPerBlock": 12
        },
        "g2": {
          "numBlocks": 8,
          "dataCodewordsPerBlock": 13
        }
      }
    },
  },
  "12": {
    "L": {
      "total": 466,
      "data": 370,
      "ecc": 24,
      "generator": [
        1,
        122,
        118,
        169,
        70,
        178,
        237,
        216,
        102,
        115,
        150,
        229,
        73,
        130,
        72,
        61,
        43,
        206,
        1,
        237,
        247,
        127,
        217,
        144,
        117
      ],
      "blocks": {
        "g1": {
          "numBlocks": 2,
          "dataCodewordsPerBlock": 92
        },
        "g2": {
          "numBlocks": 2,
          "dataCodewordsPerBlock": 93
        }
      }
    },
    "M": {
      "total": 466,
      "data": 290,
      "ecc": 22,
      "generator": [
        1,
        89,
        179,
        131,
        176,
        182,
        244,
        19,
        189,
        69,
        40,
        28,
        137,
        29,
        123,
        67,
        253,
        86,
        218,
        230,
        26,
        145,
        245
      ],
      "blocks": {
        "g1": {
          "numBlocks": 6,
          "dataCodewordsPerBlock": 36
        },
        "g2": {
          "numBlocks": 2,
          "dataCodewordsPerBlock": 37
        }
      }
    },
    "Q": {
      "total": 466,
      "data": 206,
      "ecc": 26,
      "generator": [
        1,
        246,
        51,
        183,
        4,
        136,
        98,
        199,
        152,
        77,
        56,
        206,
        24,
        145,
        40,
        209,
        117,
        233,
        42,
        135,
        68,
        70,
        144,
        146,
        77,
        43,
        94
      ],
      "blocks": {
        "g1": {
          "numBlocks": 4,
          "dataCodewordsPerBlock": 20
        },
        "g2": {
          "numBlocks": 6,
          "dataCodewordsPerBlock": 21
        }
      }
    },
    "H": {
      "total": 466,
      "data": 158,
      "ecc": 28,
      "generator": [
        1,
        252,
        9,
        28,
        13,
        18,
        251,
        208,
        150,
        103,
        174,
        100,
        41,
        167,
        12,
        247,
        56,
        117,
        119,
        233,
        127,
        181,
        100,
        121,
        147,
        176,
        74,
        58,
        197
      ],
      "blocks": {
        "g1": {
          "numBlocks": 7,
          "dataCodewordsPerBlock": 14
        },
        "g2": {
          "numBlocks": 4,
          "dataCodewordsPerBlock": 15
        }
      }
    }
  },
  "13": {
    "L": {
      "total": 532,
      "data": 428,
      "ecc": 26,
      "generator": [
        1,
        246,
        51,
        183,
        4,
        136,
        98,
        199,
        152,
        77,
        56,
        206,
        24,
        145,
        40,
        209,
        117,
        233,
        42,
        135,
        68,
        70,
        144,
        146,
        77,
        43,
        94
      ],
      "blocks": {
        "g1": {
          "numBlocks": 4,
          "dataCodewordsPerBlock": 107
        },
        "g2": {
          "numBlocks": 0,
          "dataCodewordsPerBlock": 0
        }
      }
    },
    "M": {
      "total": 532,
      "data": 334,
      "ecc": 22,
      "generator": [
        1,
        89,
        179,
        131,
        176,
        182,
        244,
        19,
        189,
        69,
        40,
        28,
        137,
        29,
        123,
        67,
        253,
        86,
        218,
        230,
        26,
        145,
        245
      ],
      "blocks": {
        "g1": {
          "numBlocks": 8,
          "dataCodewordsPerBlock": 37
        },
        "g2": {
          "numBlocks": 1,
          "dataCodewordsPerBlock": 38
        }
      }
    },
    "Q": {
      "total": 532,
      "data": 244,
      "ecc": 24,
      "generator": [
        1,
        122,
        118,
        169,
        70,
        178,
        237,
        216,
        102,
        115,
        150,
        229,
        73,
        130,
        72,
        61,
        43,
        206,
        1,
        237,
        247,
        127,
        217,
        144,
        117
      ],
      "blocks": {
        "g1": {
          "numBlocks": 8,
          "dataCodewordsPerBlock": 20
        },
        "g2": {
          "numBlocks": 4,
          "dataCodewordsPerBlock": 21
        }
      }
    },
    "H": {
      "total": 532,
      "data": 180,
      "ecc": 22,
      "generator": [
        1,
        89,
        179,
        131,
        176,
        182,
        244,
        19,
        189,
        69,
        40,
        28,
        137,
        29,
        123,
        67,
        253,
        86,
        218,
        230,
        26,
        145,
        245
      ],
      "blocks": {
        "g1": {
          "numBlocks": 12,
          "dataCodewordsPerBlock": 11
        },
        "g2": {
          "numBlocks": 4,
          "dataCodewordsPerBlock": 12
        }
      }
    }
  },
  "14": {
    "L": {
      "total": 581,
      "data": 461,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 3,
          "dataCodewordsPerBlock": 115
        },
        "g2": {
          "numBlocks": 1,
          "dataCodewordsPerBlock": 116
        }
      }
    },
    "M": {
      "total": 581,
      "data": 365,
      "ecc": 24,
      "generator": [
        1,
        122,
        118,
        169,
        70,
        178,
        237,
        216,
        102,
        115,
        150,
        229,
        73,
        130,
        72,
        61,
        43,
        206,
        1,
        237,
        247,
        127,
        217,
        144,
        117
      ],
      "blocks": {
        "g1": {
          "numBlocks": 4,
          "dataCodewordsPerBlock": 40
        },
        "g2": {
          "numBlocks": 5,
          "dataCodewordsPerBlock": 41
        }
      }
    },
    "Q": {
      "total": 581,
      "data": 261,
      "ecc": 20,
      "generator": [
        1,
        152,
        185,
        240,
        5,
        111,
        99,
        6,
        220,
        112,
        150,
        69,
        36,
        187,
        22,
        228,
        198,
        121,
        121,
        165,
        174
      ],
      "blocks": {
        "g1": {
          "numBlocks": 11,
          "dataCodewordsPerBlock": 16
        },
        "g2": {
          "numBlocks": 5,
          "dataCodewordsPerBlock": 17
        }
      }
    },
    "H": {
      "total": 581,
      "data": 197,
      "ecc": 24,
      "generator": [
        1,
        122,
        118,
        169,
        70,
        178,
        237,
        216,
        102,
        115,
        150,
        229,
        73,
        130,
        72,
        61,
        43,
        206,
        1,
        237,
        247,
        127,
        217,
        144,
        117
      ],
      "blocks": {
        "g1": {
          "numBlocks": 11,
          "dataCodewordsPerBlock": 12
        },
        "g2": {
          "numBlocks": 5,
          "dataCodewordsPerBlock": 13
        }
      }
    }
  },
  "15": {
    "L": {
      "total": 655,
      "data": 523,
      "ecc": 22,
      "generator": [
        1,
        89,
        179,
        131,
        176,
        182,
        244,
        19,
        189,
        69,
        40,
        28,
        137,
        29,
        123,
        67,
        253,
        86,
        218,
        230,
        26,
        145,
        245
      ],
      "blocks": {
        "g1": {
          "numBlocks": 5,
          "dataCodewordsPerBlock": 87
        },
        "g2": {
          "numBlocks": 1,
          "dataCodewordsPerBlock": 88
        }
      }
    },
    "M": {
      "total": 655,
      "data": 415,
      "ecc": 24,
      "generator": [
        1,
        122,
        118,
        169,
        70,
        178,
        237,
        216,
        102,
        115,
        150,
        229,
        73,
        130,
        72,
        61,
        43,
        206,
        1,
        237,
        247,
        127,
        217,
        144,
        117
      ],
      "blocks": {
        "g1": {
          "numBlocks": 5,
          "dataCodewordsPerBlock": 41
        },
        "g2": {
          "numBlocks": 5,
          "dataCodewordsPerBlock": 42
        }
      }
    },
    "Q": {
      "total": 655,
      "data": 295,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 5,
          "dataCodewordsPerBlock": 24
        },
        "g2": {
          "numBlocks": 7,
          "dataCodewordsPerBlock": 25
        }
      }
    },
    "H": {
      "total": 655,
      "data": 223,
      "ecc": 24,
      "generator": [
        1,
        122,
        118,
        169,
        70,
        178,
        237,
        216,
        102,
        115,
        150,
        229,
        73,
        130,
        72,
        61,
        43,
        206,
        1,
        237,
        247,
        127,
        217,
        144,
        117
      ],
      "blocks": {
        "g1": {
          "numBlocks": 11,
          "dataCodewordsPerBlock": 12
        },
        "g2": {
          "numBlocks": 7,
          "dataCodewordsPerBlock": 13
        }
      }
    }
  },
  "16": {
    "L": {
      "total": 733,
      "data": 589,
      "ecc": 24,
      "generator": [
        1,
        122,
        118,
        169,
        70,
        178,
        237,
        216,
        102,
        115,
        150,
        229,
        73,
        130,
        72,
        61,
        43,
        206,
        1,
        237,
        247,
        127,
        217,
        144,
        117
      ],
      "blocks": {
        "g1": {
          "numBlocks": 5,
          "dataCodewordsPerBlock": 98
        },
        "g2": {
          "numBlocks": 1,
          "dataCodewordsPerBlock": 99
        }
      }
    },
    "M": {
      "total": 733,
      "data": 453,
      "ecc": 28,
      "generator": [
        1,
        252,
        9,
        28,
        13,
        18,
        251,
        208,
        150,
        103,
        174,
        100,
        41,
        167,
        12,
        247,
        56,
        117,
        119,
        233,
        127,
        181,
        100,
        121,
        147,
        176,
        74,
        58,
        197
      ],
      "blocks": {
        "g1": {
          "numBlocks": 7,
          "dataCodewordsPerBlock": 45
        },
        "g2": {
          "numBlocks": 3,
          "dataCodewordsPerBlock": 46
        }
      }
    },
    "Q": {
      "total": 733,
      "data": 325,
      "ecc": 24,
      "generator": [
        1,
        122,
        118,
        169,
        70,
        178,
        237,
        216,
        102,
        115,
        150,
        229,
        73,
        130,
        72,
        61,
        43,
        206,
        1,
        237,
        247,
        127,
        217,
        144,
        117
      ],
      "blocks": {
        "g1": {
          "numBlocks": 15,
          "dataCodewordsPerBlock": 19
        },
        "g2": {
          "numBlocks": 2,
          "dataCodewordsPerBlock": 20
        }
      }
    },
    "H": {
      "total": 733,
      "data": 253,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 3,
          "dataCodewordsPerBlock": 15
        },
        "g2": {
          "numBlocks": 13,
          "dataCodewordsPerBlock": 16
        }
      }
    }
  },
  "17": {
    "L": {
      "total": 815,
      "data": 647,
      "ecc": 28,
      "generator": [
        1,
        252,
        9,
        28,
        13,
        18,
        251,
        208,
        150,
        103,
        174,
        100,
        41,
        167,
        12,
        247,
        56,
        117,
        119,
        233,
        127,
        181,
        100,
        121,
        147,
        176,
        74,
        58,
        197
      ],
      "blocks": {
        "g1": {
          "numBlocks": 1,
          "dataCodewordsPerBlock": 107
        },
        "g2": {
          "numBlocks": 5,
          "dataCodewordsPerBlock": 108
        }
      }
    },
    "M": {
      "total": 815,
      "data": 507,
      "ecc": 28,
      "generator": [
        1,
        252,
        9,
        28,
        13,
        18,
        251,
        208,
        150,
        103,
        174,
        100,
        41,
        167,
        12,
        247,
        56,
        117,
        119,
        233,
        127,
        181,
        100,
        121,
        147,
        176,
        74,
        58,
        197
      ],
      "blocks": {
        "g1": {
          "numBlocks": 10,
          "dataCodewordsPerBlock": 46
        },
        "g2": {
          "numBlocks": 1,
          "dataCodewordsPerBlock": 47
        }
      }
    },
    "Q": {
      "total": 815,
      "data": 367,
      "ecc": 28,
      "generator": [
        1,
        252,
        9,
        28,
        13,
        18,
        251,
        208,
        150,
        103,
        174,
        100,
        41,
        167,
        12,
        247,
        56,
        117,
        119,
        233,
        127,
        181,
        100,
        121,
        147,
        176,
        74,
        58,
        197
      ],
      "blocks": {
        "g1": {
          "numBlocks": 1,
          "dataCodewordsPerBlock": 22
        },
        "g2": {
          "numBlocks": 15,
          "dataCodewordsPerBlock": 23
        }
      }
    },
    "H": {
      "total": 815,
      "data": 283,
      "ecc": 28,
      "generator": [
        1,
        252,
        9,
        28,
        13,
        18,
        251,
        208,
        150,
        103,
        174,
        100,
        41,
        167,
        12,
        247,
        56,
        117,
        119,
        233,
        127,
        181,
        100,
        121,
        147,
        176,
        74,
        58,
        197
      ],
      "blocks": {
        "g1": {
          "numBlocks": 2,
          "dataCodewordsPerBlock": 14
        },
        "g2": {
          "numBlocks": 17,
          "dataCodewordsPerBlock": 15
        }
      }
    },
  },
  "18": {
    "L": {
      "total": 901,
      "data": 721,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 5,
          "dataCodewordsPerBlock": 120
        },
        "g2": {
          "numBlocks": 1,
          "dataCodewordsPerBlock": 121
        }
      }
    },
    "M": {
      "total": 901,
      "data": 563,
      "ecc": 26,
      "generator": [
        1,
        246,
        51,
        183,
        4,
        136,
        98,
        199,
        152,
        77,
        56,
        206,
        24,
        145,
        40,
        209,
        117,
        233,
        42,
        135,
        68,
        70,
        144,
        146,
        77,
        43,
        94
      ],
      "blocks": {
        "g1": {
          "numBlocks": 9,
          "dataCodewordsPerBlock": 43
        },
        "g2": {
          "numBlocks": 4,
          "dataCodewordsPerBlock": 44
        }
      }
    },
    "Q": {
      "total": 901,
      "data": 397,
      "ecc": 28,
      "generator": [
        1,
        252,
        9,
        28,
        13,
        18,
        251,
        208,
        150,
        103,
        174,
        100,
        41,
        167,
        12,
        247,
        56,
        117,
        119,
        233,
        127,
        181,
        100,
        121,
        147,
        176,
        74,
        58,
        197
      ],
      "blocks": {
        "g1": {
          "numBlocks": 17,
          "dataCodewordsPerBlock": 22
        },
        "g2": {
          "numBlocks": 1,
          "dataCodewordsPerBlock": 23
        }
      }
    },
    "H": {
      "total": 901,
      "data": 313,
      "ecc": 28,
      "generator": [
        1,
        252,
        9,
        28,
        13,
        18,
        251,
        208,
        150,
        103,
        174,
        100,
        41,
        167,
        12,
        247,
        56,
        117,
        119,
        233,
        127,
        181,
        100,
        121,
        147,
        176,
        74,
        58,
        197
      ],
      "blocks": {
        "g1": {
          "numBlocks": 2,
          "dataCodewordsPerBlock": 14
        },
        "g2": {
          "numBlocks": 19,
          "dataCodewordsPerBlock": 15
        }
      }
    }
  },
  "19": {
    "L": {
      "total": 991,
      "data": 795,
      "ecc": 28,
      "generator": [
        1,
        252,
        9,
        28,
        13,
        18,
        251,
        208,
        150,
        103,
        174,
        100,
        41,
        167,
        12,
        247,
        56,
        117,
        119,
        233,
        127,
        181,
        100,
        121,
        147,
        176,
        74,
        58,
        197
      ],
      "blocks": {
        "g1": {
          "numBlocks": 3,
          "dataCodewordsPerBlock": 113
        },
        "g2": {
          "numBlocks": 4,
          "dataCodewordsPerBlock": 114
        }
      }
    },
    "M": {
      "total": 991,
      "data": 627,
      "ecc": 26,
      "generator": [
        1,
        246,
        51,
        183,
        4,
        136,
        98,
        199,
        152,
        77,
        56,
        206,
        24,
        145,
        40,
        209,
        117,
        233,
        42,
        135,
        68,
        70,
        144,
        146,
        77,
        43,
        94
      ],
      "blocks": {
        "g1": {
          "numBlocks": 3,
          "dataCodewordsPerBlock": 44
        },
        "g2": {
          "numBlocks": 11,
          "dataCodewordsPerBlock": 45
        }
      }
    },
    "Q": {
      "total": 991,
      "data": 445,
      "ecc": 26,
      "generator": [
        1,
        246,
        51,
        183,
        4,
        136,
        98,
        199,
        152,
        77,
        56,
        206,
        24,
        145,
        40,
        209,
        117,
        233,
        42,
        135,
        68,
        70,
        144,
        146,
        77,
        43,
        94
      ],
      "blocks": {
        "g1": {
          "numBlocks": 17,
          "dataCodewordsPerBlock": 21
        },
        "g2": {
          "numBlocks": 4,
          "dataCodewordsPerBlock": 22
        }
      }
    },
    "H": {
      "total": 991,
      "data": 341,
      "ecc": 26,
      "generator": [
        1,
        246,
        51,
        183,
        4,
        136,
        98,
        199,
        152,
        77,
        56,
        206,
        24,
        145,
        40,
        209,
        117,
        233,
        42,
        135,
        68,
        70,
        144,
        146,
        77,
        43,
        94
      ],
      "blocks": {
        "g1": {
          "numBlocks": 9,
          "dataCodewordsPerBlock": 13
        },
        "g2": {
          "numBlocks": 16,
          "dataCodewordsPerBlock": 14
        }
      }
    }
  },
  "20": {
    "L": {
      "total": 1085,
      "data": 861,
      "ecc": 28,
      "generator": [
        1,
        252,
        9,
        28,
        13,
        18,
        251,
        208,
        150,
        103,
        174,
        100,
        41,
        167,
        12,
        247,
        56,
        117,
        119,
        233,
        127,
        181,
        100,
        121,
        147,
        176,
        74,
        58,
        197
      ],
      "blocks": {
        "g1": {
          "numBlocks": 3,
          "dataCodewordsPerBlock": 107
        },
        "g2": {
          "numBlocks": 5,
          "dataCodewordsPerBlock": 108
        }
      }
    },
    "M": {
      "total": 1085,
      "data": 669,
      "ecc": 26,
      "generator": [
        1,
        246,
        51,
        183,
        4,
        136,
        98,
        199,
        152,
        77,
        56,
        206,
        24,
        145,
        40,
        209,
        117,
        233,
        42,
        135,
        68,
        70,
        144,
        146,
        77,
        43,
        94
      ],
      "blocks": {
        "g1": {
          "numBlocks": 3,
          "dataCodewordsPerBlock": 41
        },
        "g2": {
          "numBlocks": 13,
          "dataCodewordsPerBlock": 42
        }
      }
    },
    "Q": {
      "total": 1085,
      "data": 485,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 15,
          "dataCodewordsPerBlock": 24
        },
        "g2": {
          "numBlocks": 5,
          "dataCodewordsPerBlock": 25
        }
      }
    },
    "H": {
      "total": 1085,
      "data": 385,
      "ecc": 28,
      "generator": [
        1,
        252,
        9,
        28,
        13,
        18,
        251,
        208,
        150,
        103,
        174,
        100,
        41,
        167,
        12,
        247,
        56,
        117,
        119,
        233,
        127,
        181,
        100,
        121,
        147,
        176,
        74,
        58,
        197
      ],
      "blocks": {
        "g1": {
          "numBlocks": 15,
          "dataCodewordsPerBlock": 15
        },
        "g2": {
          "numBlocks": 10,
          "dataCodewordsPerBlock": 16
        }
      }
    }
  },
  "21": {
    "L": {
      "total": 1156,
      "data": 932,
      "ecc": 28,
      "generator": [
        1,
        252,
        9,
        28,
        13,
        18,
        251,
        208,
        150,
        103,
        174,
        100,
        41,
        167,
        12,
        247,
        56,
        117,
        119,
        233,
        127,
        181,
        100,
        121,
        147,
        176,
        74,
        58,
        197
      ],
      "blocks": {
        "g1": {
          "numBlocks": 4,
          "dataCodewordsPerBlock": 116
        },
        "g2": {
          "numBlocks": 4,
          "dataCodewordsPerBlock": 117
        }
      }
    },
    "M": {
      "total": 1156,
      "data": 714,
      "ecc": 26,
      "generator": [
        1,
        246,
        51,
        183,
        4,
        136,
        98,
        199,
        152,
        77,
        56,
        206,
        24,
        145,
        40,
        209,
        117,
        233,
        42,
        135,
        68,
        70,
        144,
        146,
        77,
        43,
        94
      ],
      "blocks": {
        "g1": {
          "numBlocks": 17,
          "dataCodewordsPerBlock": 42
        },
        "g2": {
          "numBlocks": 0,
          "dataCodewordsPerBlock": 0
        }
      }
    },
    "Q": {
      "total": 1156,
      "data": 512,
      "ecc": 28,
      "generator": [
        1,
        252,
        9,
        28,
        13,
        18,
        251,
        208,
        150,
        103,
        174,
        100,
        41,
        167,
        12,
        247,
        56,
        117,
        119,
        233,
        127,
        181,
        100,
        121,
        147,
        176,
        74,
        58,
        197
      ],
      "blocks": {
        "g1": {
          "numBlocks": 17,
          "dataCodewordsPerBlock": 22
        },
        "g2": {
          "numBlocks": 6,
          "dataCodewordsPerBlock": 23
        }
      }
    },
    "H": {
      "total": 1156,
      "data": 406,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 19,
          "dataCodewordsPerBlock": 16
        },
        "g2": {
          "numBlocks": 6,
          "dataCodewordsPerBlock": 17
        }
      }
    }
  },
  "22": {
    "L": {
      "total": 1258,
      "data": 1006,
      "ecc": 28,
      "generator": [
        1,
        252,
        9,
        28,
        13,
        18,
        251,
        208,
        150,
        103,
        174,
        100,
        41,
        167,
        12,
        247,
        56,
        117,
        119,
        233,
        127,
        181,
        100,
        121,
        147,
        176,
        74,
        58,
        197
      ],
      "blocks": {
        "g1": {
          "numBlocks": 2,
          "dataCodewordsPerBlock": 111
        },
        "g2": {
          "numBlocks": 7,
          "dataCodewordsPerBlock": 112
        }
      }
    },
    "M": {
      "total": 1258,
      "data": 782,
      "ecc": 28,
      "generator": [
        1,
        252,
        9,
        28,
        13,
        18,
        251,
        208,
        150,
        103,
        174,
        100,
        41,
        167,
        12,
        247,
        56,
        117,
        119,
        233,
        127,
        181,
        100,
        121,
        147,
        176,
        74,
        58,
        197
      ],
      "blocks": {
        "g1": {
          "numBlocks": 17,
          "dataCodewordsPerBlock": 46
        },
        "g2": {
          "numBlocks": 0,
          "dataCodewordsPerBlock": 0
        }
      }
    },
    "Q": {
      "total": 1258,
      "data": 568,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 7,
          "dataCodewordsPerBlock": 24
        },
        "g2": {
          "numBlocks": 16,
          "dataCodewordsPerBlock": 25
        }
      }
    },
    "H": {
      "total": 1258,
      "data": 442,
      "ecc": 24,
      "generator": [
        1,
        122,
        118,
        169,
        70,
        178,
        237,
        216,
        102,
        115,
        150,
        229,
        73,
        130,
        72,
        61,
        43,
        206,
        1,
        237,
        247,
        127,
        217,
        144,
        117
      ],
      "blocks": {
        "g1": {
          "numBlocks": 34,
          "dataCodewordsPerBlock": 13
        },
        "g2": {
          "numBlocks": 0,
          "dataCodewordsPerBlock": 0
        }
      }
    }
  },
  "23": {
    "L": {
      "total": 1364,
      "data": 1094,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 4,
          "dataCodewordsPerBlock": 121
        },
        "g2": {
          "numBlocks": 5,
          "dataCodewordsPerBlock": 122
        }
      }
    },
    "M": {
      "total": 1364,
      "data": 860,
      "ecc": 28,
      "generator": [
        1,
        252,
        9,
        28,
        13,
        18,
        251,
        208,
        150,
        103,
        174,
        100,
        41,
        167,
        12,
        247,
        56,
        117,
        119,
        233,
        127,
        181,
        100,
        121,
        147,
        176,
        74,
        58,
        197
      ],
      "blocks": {
        "g1": {
          "numBlocks": 4,
          "dataCodewordsPerBlock": 47
        },
        "g2": {
          "numBlocks": 14,
          "dataCodewordsPerBlock": 48
        }
      }
    },
    "Q": {
      "total": 1364,
      "data": 614,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 11,
          "dataCodewordsPerBlock": 24
        },
        "g2": {
          "numBlocks": 14,
          "dataCodewordsPerBlock": 25
        }
      }
    },
    "H": {
      "total": 1364,
      "data": 464,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 16,
          "dataCodewordsPerBlock": 15
        },
        "g2": {
          "numBlocks": 14,
          "dataCodewordsPerBlock": 16
        }
      }
    }
  },
  "24": {
    "L": {
      "total": 1474,
      "data": 1174,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 6,
          "dataCodewordsPerBlock": 117
        },
        "g2": {
          "numBlocks": 4,
          "dataCodewordsPerBlock": 118
        }
      }
    },
    "M": {
      "total": 1474,
      "data": 914,
      "ecc": 28,
      "generator": [
        1,
        252,
        9,
        28,
        13,
        18,
        251,
        208,
        150,
        103,
        174,
        100,
        41,
        167,
        12,
        247,
        56,
        117,
        119,
        233,
        127,
        181,
        100,
        121,
        147,
        176,
        74,
        58,
        197
      ],
      "blocks": {
        "g1": {
          "numBlocks": 6,
          "dataCodewordsPerBlock": 45
        },
        "g2": {
          "numBlocks": 14,
          "dataCodewordsPerBlock": 46
        }
      }
    },
    "Q": {
      "total": 1474,
      "data": 664,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 11,
          "dataCodewordsPerBlock": 24
        },
        "g2": {
          "numBlocks": 16,
          "dataCodewordsPerBlock": 25
        }
      }
    },
    "H": {
      "total": 1474,
      "data": 514,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 30,
          "dataCodewordsPerBlock": 16
        },
        "g2": {
          "numBlocks": 2,
          "dataCodewordsPerBlock": 17
        }
      }
    }
  },
  "25": {
    "L": {
      "total": 1588,
      "data": 1276,
      "ecc": 26,
      "generator": [
        1,
        246,
        51,
        183,
        4,
        136,
        98,
        199,
        152,
        77,
        56,
        206,
        24,
        145,
        40,
        209,
        117,
        233,
        42,
        135,
        68,
        70,
        144,
        146,
        77,
        43,
        94
      ],
      "blocks": {
        "g1": {
          "numBlocks": 8,
          "dataCodewordsPerBlock": 106
        },
        "g2": {
          "numBlocks": 4,
          "dataCodewordsPerBlock": 107
        }
      }
    },
    "M": {
      "total": 1588,
      "data": 1000,
      "ecc": 28,
      "generator": [
        1,
        252,
        9,
        28,
        13,
        18,
        251,
        208,
        150,
        103,
        174,
        100,
        41,
        167,
        12,
        247,
        56,
        117,
        119,
        233,
        127,
        181,
        100,
        121,
        147,
        176,
        74,
        58,
        197
      ],
      "blocks": {
        "g1": {
          "numBlocks": 8,
          "dataCodewordsPerBlock": 47
        },
        "g2": {
          "numBlocks": 13,
          "dataCodewordsPerBlock": 48
        }
      }
    },
    "Q": {
      "total": 1588,
      "data": 718,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 7,
          "dataCodewordsPerBlock": 24
        },
        "g2": {
          "numBlocks": 22,
          "dataCodewordsPerBlock": 25
        }
      }
    },
    "H": {
      "total": 1588,
      "data": 538,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 22,
          "dataCodewordsPerBlock": 15
        },
        "g2": {
          "numBlocks": 13,
          "dataCodewordsPerBlock": 16
        }
      }
    },
  },
  "26": {
    "L": {
      "total": 1706,
      "data": 1370,
      "ecc": 28,
      "generator": [
        1,
        252,
        9,
        28,
        13,
        18,
        251,
        208,
        150,
        103,
        174,
        100,
        41,
        167,
        12,
        247,
        56,
        117,
        119,
        233,
        127,
        181,
        100,
        121,
        147,
        176,
        74,
        58,
        197
      ],
      "blocks": {
        "g1": {
          "numBlocks": 10,
          "dataCodewordsPerBlock": 114
        },
        "g2": {
          "numBlocks": 2,
          "dataCodewordsPerBlock": 115
        }
      }
    },
    "M": {
      "total": 1706,
      "data": 1062,
      "ecc": 28,
      "generator": [
        1,
        252,
        9,
        28,
        13,
        18,
        251,
        208,
        150,
        103,
        174,
        100,
        41,
        167,
        12,
        247,
        56,
        117,
        119,
        233,
        127,
        181,
        100,
        121,
        147,
        176,
        74,
        58,
        197
      ],
      "blocks": {
        "g1": {
          "numBlocks": 19,
          "dataCodewordsPerBlock": 46
        },
        "g2": {
          "numBlocks": 4,
          "dataCodewordsPerBlock": 47
        }
      }
    },
    "Q": {
      "total": 1706,
      "data": 754,
      "ecc": 28,
      "generator": [
        1,
        252,
        9,
        28,
        13,
        18,
        251,
        208,
        150,
        103,
        174,
        100,
        41,
        167,
        12,
        247,
        56,
        117,
        119,
        233,
        127,
        181,
        100,
        121,
        147,
        176,
        74,
        58,
        197
      ],
      "blocks": {
        "g1": {
          "numBlocks": 28,
          "dataCodewordsPerBlock": 22
        },
        "g2": {
          "numBlocks": 6,
          "dataCodewordsPerBlock": 23
        }
      }
    },
    "H": {
      "total": 1706,
      "data": 596,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 33,
          "dataCodewordsPerBlock": 16
        },
        "g2": {
          "numBlocks": 4,
          "dataCodewordsPerBlock": 17
        }
      }
    }
  },
  "27": {
    "L": {
      "total": 1828,
      "data": 1468,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 8,
          "dataCodewordsPerBlock": 122
        },
        "g2": {
          "numBlocks": 4,
          "dataCodewordsPerBlock": 123
        }
      }
    },
    "M": {
      "total": 1828,
      "data": 1128,
      "ecc": 28,
      "generator": [
        1,
        252,
        9,
        28,
        13,
        18,
        251,
        208,
        150,
        103,
        174,
        100,
        41,
        167,
        12,
        247,
        56,
        117,
        119,
        233,
        127,
        181,
        100,
        121,
        147,
        176,
        74,
        58,
        197
      ],
      "blocks": {
        "g1": {
          "numBlocks": 22,
          "dataCodewordsPerBlock": 45
        },
        "g2": {
          "numBlocks": 3,
          "dataCodewordsPerBlock": 46
        }
      }
    },
    "Q": {
      "total": 1828,
      "data": 808,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 8,
          "dataCodewordsPerBlock": 23
        },
        "g2": {
          "numBlocks": 26,
          "dataCodewordsPerBlock": 24
        }
      }
    },
    "H": {
      "total": 1828,
      "data": 628,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 12,
          "dataCodewordsPerBlock": 15
        },
        "g2": {
          "numBlocks": 28,
          "dataCodewordsPerBlock": 16
        }
      }
    }
  },
  "28": {
    "L": {
      "total": 1921,
      "data": 1531,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 3,
          "dataCodewordsPerBlock": 117
        },
        "g2": {
          "numBlocks": 10,
          "dataCodewordsPerBlock": 118
        }
      }
    },
    "M": {
      "total": 1921,
      "data": 1193,
      "ecc": 28,
      "generator": [
        1,
        252,
        9,
        28,
        13,
        18,
        251,
        208,
        150,
        103,
        174,
        100,
        41,
        167,
        12,
        247,
        56,
        117,
        119,
        233,
        127,
        181,
        100,
        121,
        147,
        176,
        74,
        58,
        197
      ],
      "blocks": {
        "g1": {
          "numBlocks": 3,
          "dataCodewordsPerBlock": 45
        },
        "g2": {
          "numBlocks": 23,
          "dataCodewordsPerBlock": 46
        }
      }
    },
    "Q": {
      "total": 1921,
      "data": 871,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 4,
          "dataCodewordsPerBlock": 24
        },
        "g2": {
          "numBlocks": 31,
          "dataCodewordsPerBlock": 25
        }
      }
    },
    "H": {
      "total": 1921,
      "data": 661,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 11,
          "dataCodewordsPerBlock": 15
        },
        "g2": {
          "numBlocks": 31,
          "dataCodewordsPerBlock": 16
        }
      }
    }
  },
  "29": {
    "L": {
      "total": 2051,
      "data": 1631,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 7,
          "dataCodewordsPerBlock": 116
        },
        "g2": {
          "numBlocks": 7,
          "dataCodewordsPerBlock": 117
        }
      }
    },
    "M": {
      "total": 2051,
      "data": 1267,
      "ecc": 28,
      "generator": [
        1,
        252,
        9,
        28,
        13,
        18,
        251,
        208,
        150,
        103,
        174,
        100,
        41,
        167,
        12,
        247,
        56,
        117,
        119,
        233,
        127,
        181,
        100,
        121,
        147,
        176,
        74,
        58,
        197
      ],
      "blocks": {
        "g1": {
          "numBlocks": 21,
          "dataCodewordsPerBlock": 45
        },
        "g2": {
          "numBlocks": 7,
          "dataCodewordsPerBlock": 46
        }
      }
    },
    "Q": {
      "total": 2051,
      "data": 911,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 1,
          "dataCodewordsPerBlock": 23
        },
        "g2": {
          "numBlocks": 37,
          "dataCodewordsPerBlock": 24
        }
      }
    },
    "H": {
      "total": 2051,
      "data": 701,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 19,
          "dataCodewordsPerBlock": 15
        },
        "g2": {
          "numBlocks": 26,
          "dataCodewordsPerBlock": 16
        }
      }
    }
  },
  "30": {
    "L": {
      "total": 2185,
      "data": 1735,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 5,
          "dataCodewordsPerBlock": 115
        },
        "g2": {
          "numBlocks": 10,
          "dataCodewordsPerBlock": 116
        }
      }
    },
    "M": {
      "total": 2185,
      "data": 1373,
      "ecc": 28,
      "generator": [
        1,
        252,
        9,
        28,
        13,
        18,
        251,
        208,
        150,
        103,
        174,
        100,
        41,
        167,
        12,
        247,
        56,
        117,
        119,
        233,
        127,
        181,
        100,
        121,
        147,
        176,
        74,
        58,
        197
      ],
      "blocks": {
        "g1": {
          "numBlocks": 19,
          "dataCodewordsPerBlock": 47
        },
        "g2": {
          "numBlocks": 10,
          "dataCodewordsPerBlock": 48
        }
      }
    },
    "Q": {
      "total": 2185,
      "data": 985,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 15,
          "dataCodewordsPerBlock": 24
        },
        "g2": {
          "numBlocks": 25,
          "dataCodewordsPerBlock": 25
        }
      }
    },
    "H": {
      "total": 2185,
      "data": 745,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 23,
          "dataCodewordsPerBlock": 15
        },
        "g2": {
          "numBlocks": 25,
          "dataCodewordsPerBlock": 16
        }
      }
    }
  },
  "31": {
    "L": {
      "total": 2323,
      "data": 1843,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 13,
          "dataCodewordsPerBlock": 115
        },
        "g2": {
          "numBlocks": 3,
          "dataCodewordsPerBlock": 116
        }
      }
    },
    "M": {
      "total": 2323,
      "data": 1455,
      "ecc": 28,
      "generator": [
        1,
        252,
        9,
        28,
        13,
        18,
        251,
        208,
        150,
        103,
        174,
        100,
        41,
        167,
        12,
        247,
        56,
        117,
        119,
        233,
        127,
        181,
        100,
        121,
        147,
        176,
        74,
        58,
        197
      ],
      "blocks": {
        "g1": {
          "numBlocks": 2,
          "dataCodewordsPerBlock": 46
        },
        "g2": {
          "numBlocks": 29,
          "dataCodewordsPerBlock": 47
        }
      }
    },
    "Q": {
      "total": 2323,
      "data": 1033,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 42,
          "dataCodewordsPerBlock": 24
        },
        "g2": {
          "numBlocks": 1,
          "dataCodewordsPerBlock": 25
        }
      }
    },
    "H": {
      "total": 2323,
      "data": 793,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 23,
          "dataCodewordsPerBlock": 15
        },
        "g2": {
          "numBlocks": 28,
          "dataCodewordsPerBlock": 16
        }
      }
    },
  },
  "32": {
    "L": {
      "total": 2465,
      "data": 1955,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 17,
          "dataCodewordsPerBlock": 115
        },
        "g2": {
          "numBlocks": 0,
          "dataCodewordsPerBlock": 0
        }
      }
    },
    "M": {
      "total": 2465,
      "data": 1541,
      "ecc": 28,
      "generator": [
        1,
        252,
        9,
        28,
        13,
        18,
        251,
        208,
        150,
        103,
        174,
        100,
        41,
        167,
        12,
        247,
        56,
        117,
        119,
        233,
        127,
        181,
        100,
        121,
        147,
        176,
        74,
        58,
        197
      ],
      "blocks": {
        "g1": {
          "numBlocks": 10,
          "dataCodewordsPerBlock": 46
        },
        "g2": {
          "numBlocks": 23,
          "dataCodewordsPerBlock": 47
        }
      }
    },
    "Q": {
      "total": 2465,
      "data": 1115,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 10,
          "dataCodewordsPerBlock": 24
        },
        "g2": {
          "numBlocks": 35,
          "dataCodewordsPerBlock": 25
        }
      }
    },
    "H": {
      "total": 2465,
      "data": 845,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 19,
          "dataCodewordsPerBlock": 15
        },
        "g2": {
          "numBlocks": 35,
          "dataCodewordsPerBlock": 16
        }
      }
    }
  },
  "33": {
    "L": {
      "total": 2611,
      "data": 2071,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 17,
          "dataCodewordsPerBlock": 115
        },
        "g2": {
          "numBlocks": 1,
          "dataCodewordsPerBlock": 116
        }
      }
    },
    "M": {
      "total": 2611,
      "data": 1631,
      "ecc": 28,
      "generator": [
        1,
        252,
        9,
        28,
        13,
        18,
        251,
        208,
        150,
        103,
        174,
        100,
        41,
        167,
        12,
        247,
        56,
        117,
        119,
        233,
        127,
        181,
        100,
        121,
        147,
        176,
        74,
        58,
        197
      ],
      "blocks": {
        "g1": {
          "numBlocks": 14,
          "dataCodewordsPerBlock": 46
        },
        "g2": {
          "numBlocks": 21,
          "dataCodewordsPerBlock": 47
        }
      }
    },
    "Q": {
      "total": 2611,
      "data": 1171,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 29,
          "dataCodewordsPerBlock": 24
        },
        "g2": {
          "numBlocks": 19,
          "dataCodewordsPerBlock": 25
        }
      }
    },
    "H": {
      "total": 2611,
      "data": 901,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 11,
          "dataCodewordsPerBlock": 15
        },
        "g2": {
          "numBlocks": 46,
          "dataCodewordsPerBlock": 16
        }
      }
    }
  },
  "34": {
    "L": {
      "total": 2761,
      "data": 2191,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 13,
          "dataCodewordsPerBlock": 115
        },
        "g2": {
          "numBlocks": 6,
          "dataCodewordsPerBlock": 116
        }
      }
    },
    "M": {
      "total": 2761,
      "data": 1725,
      "ecc": 28,
      "generator": [
        1,
        252,
        9,
        28,
        13,
        18,
        251,
        208,
        150,
        103,
        174,
        100,
        41,
        167,
        12,
        247,
        56,
        117,
        119,
        233,
        127,
        181,
        100,
        121,
        147,
        176,
        74,
        58,
        197
      ],
      "blocks": {
        "g1": {
          "numBlocks": 14,
          "dataCodewordsPerBlock": 46
        },
        "g2": {
          "numBlocks": 23,
          "dataCodewordsPerBlock": 47
        }
      }
    },
    "Q": {
      "total": 2761,
      "data": 1231,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 44,
          "dataCodewordsPerBlock": 24
        },
        "g2": {
          "numBlocks": 7,
          "dataCodewordsPerBlock": 25
        }
      }
    },
    "H": {
      "total": 2761,
      "data": 961,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 59,
          "dataCodewordsPerBlock": 16
        },
        "g2": {
          "numBlocks": 1,
          "dataCodewordsPerBlock": 17
        }
      }
    }
  },
  "35": {
    "L": {
      "total": 2876,
      "data": 2306,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 12,
          "dataCodewordsPerBlock": 121
        },
        "g2": {
          "numBlocks": 7,
          "dataCodewordsPerBlock": 122
        }
      }
    },
    "M": {
      "total": 2876,
      "data": 1812,
      "ecc": 28,
      "generator": [
        1,
        252,
        9,
        28,
        13,
        18,
        251,
        208,
        150,
        103,
        174,
        100,
        41,
        167,
        12,
        247,
        56,
        117,
        119,
        233,
        127,
        181,
        100,
        121,
        147,
        176,
        74,
        58,
        197
      ],
      "blocks": {
        "g1": {
          "numBlocks": 12,
          "dataCodewordsPerBlock": 47
        },
        "g2": {
          "numBlocks": 26,
          "dataCodewordsPerBlock": 48
        }
      }
    },
    "Q": {
      "total": 2876,
      "data": 1286,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 39,
          "dataCodewordsPerBlock": 24
        },
        "g2": {
          "numBlocks": 14,
          "dataCodewordsPerBlock": 25
        }
      }
    },
    "H": {
      "total": 2876,
      "data": 986,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 22,
          "dataCodewordsPerBlock": 15
        },
        "g2": {
          "numBlocks": 41,
          "dataCodewordsPerBlock": 16
        }
      }
    }
  },
  "36": {
    "L": {
      "total": 3034,
      "data": 2434,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 6,
          "dataCodewordsPerBlock": 121
        },
        "g2": {
          "numBlocks": 14,
          "dataCodewordsPerBlock": 122
        }
      }
    },
    "M": {
      "total": 3034,
      "data": 1914,
      "ecc": 28,
      "generator": [
        1,
        252,
        9,
        28,
        13,
        18,
        251,
        208,
        150,
        103,
        174,
        100,
        41,
        167,
        12,
        247,
        56,
        117,
        119,
        233,
        127,
        181,
        100,
        121,
        147,
        176,
        74,
        58,
        197
      ],
      "blocks": {
        "g1": {
          "numBlocks": 6,
          "dataCodewordsPerBlock": 47
        },
        "g2": {
          "numBlocks": 34,
          "dataCodewordsPerBlock": 48
        }
      }
    },
    "Q": {
      "total": 3034,
      "data": 1354,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 46,
          "dataCodewordsPerBlock": 24
        },
        "g2": {
          "numBlocks": 10,
          "dataCodewordsPerBlock": 25
        }
      }
    },
    "H": {
      "total": 3034,
      "data": 1054,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 2,
          "dataCodewordsPerBlock": 15
        },
        "g2": {
          "numBlocks": 64,
          "dataCodewordsPerBlock": 16
        }
      }
    }
  },
  "37": {
    "L": {
      "total": 3196,
      "data": 2566,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 17,
          "dataCodewordsPerBlock": 122
        },
        "g2": {
          "numBlocks": 4,
          "dataCodewordsPerBlock": 123
        }
      }
    },
    "M": {
      "total": 3196,
      "data": 1992,
      "ecc": 28,
      "generator": [
        1,
        252,
        9,
        28,
        13,
        18,
        251,
        208,
        150,
        103,
        174,
        100,
        41,
        167,
        12,
        247,
        56,
        117,
        119,
        233,
        127,
        181,
        100,
        121,
        147,
        176,
        74,
        58,
        197
      ],
      "blocks": {
        "g1": {
          "numBlocks": 29,
          "dataCodewordsPerBlock": 46
        },
        "g2": {
          "numBlocks": 14,
          "dataCodewordsPerBlock": 47
        }
      }
    },
    "Q": {
      "total": 3196,
      "data": 1426,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 49,
          "dataCodewordsPerBlock": 24
        },
        "g2": {
          "numBlocks": 10,
          "dataCodewordsPerBlock": 25
        }
      }
    },
    "H": {
      "total": 3196,
      "data": 1096,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 24,
          "dataCodewordsPerBlock": 15
        },
        "g2": {
          "numBlocks": 46,
          "dataCodewordsPerBlock": 16
        }
      }
    }
  },
  "38": {
    "L": {
      "total": 3362,
      "data": 2702,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 4,
          "dataCodewordsPerBlock": 122
        },
        "g2": {
          "numBlocks": 18,
          "dataCodewordsPerBlock": 123
        }
      }
    },
    "M": {
      "total": 3362,
      "data": 2102,
      "ecc": 28,
      "generator": [
        1,
        252,
        9,
        28,
        13,
        18,
        251,
        208,
        150,
        103,
        174,
        100,
        41,
        167,
        12,
        247,
        56,
        117,
        119,
        233,
        127,
        181,
        100,
        121,
        147,
        176,
        74,
        58,
        197
      ],
      "blocks": {
        "g1": {
          "numBlocks": 13,
          "dataCodewordsPerBlock": 46
        },
        "g2": {
          "numBlocks": 32,
          "dataCodewordsPerBlock": 47
        }
      }
    },
    "Q": {
      "total": 3362,
      "data": 1502,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 48,
          "dataCodewordsPerBlock": 24
        },
        "g2": {
          "numBlocks": 14,
          "dataCodewordsPerBlock": 25
        }
      }
    },
    "H": {
      "total": 3362,
      "data": 1142,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 42,
          "dataCodewordsPerBlock": 15
        },
        "g2": {
          "numBlocks": 32,
          "dataCodewordsPerBlock": 16
        }
      }
    }
  },
  "39": {
    "L": {
      "total": 3532,
      "data": 2812,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 20,
          "dataCodewordsPerBlock": 117
        },
        "g2": {
          "numBlocks": 4,
          "dataCodewordsPerBlock": 118
        }
      }
    },
    "M": {
      "total": 3532,
      "data": 2216,
      "ecc": 28,
      "generator": [
        1,
        252,
        9,
        28,
        13,
        18,
        251,
        208,
        150,
        103,
        174,
        100,
        41,
        167,
        12,
        247,
        56,
        117,
        119,
        233,
        127,
        181,
        100,
        121,
        147,
        176,
        74,
        58,
        197
      ],
      "blocks": {
        "g1": {
          "numBlocks": 40,
          "dataCodewordsPerBlock": 47
        },
        "g2": {
          "numBlocks": 7,
          "dataCodewordsPerBlock": 48
        }
      }
    },
    "Q": {
      "total": 3532,
      "data": 1582,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 43,
          "dataCodewordsPerBlock": 24
        },
        "g2": {
          "numBlocks": 22,
          "dataCodewordsPerBlock": 25
        }
      }
    },
    "H": {
      "total": 3532,
      "data": 1222,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
       "blocks": {
        "g1": {
          "numBlocks": 10,
          "dataCodewordsPerBlock": 15
        },
        "g2": {
          "numBlocks": 67,
          "dataCodewordsPerBlock": 16
        }
      }
    }
  },
  "40": {
    "L": {
      "total": 3706,
      "data": 2956,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 19,
          "dataCodewordsPerBlock": 118
        },
        "g2": {
          "numBlocks": 6,
          "dataCodewordsPerBlock": 119
        }
      }
    },
    "M": {
      "total": 3706,
      "data": 2334,
      "ecc": 28,
      "generator": [
        1,
        252,
        9,
        28,
        13,
        18,
        251,
        208,
        150,
        103,
        174,
        100,
        41,
        167,
        12,
        247,
        56,
        117,
        119,
        233,
        127,
        181,
        100,
        121,
        147,
        176,
        74,
        58,
        197
      ],
      "blocks": {
        "g1": {
          "numBlocks": 18,
          "dataCodewordsPerBlock": 47
        },
        "g2": {
          "numBlocks": 31,
          "dataCodewordsPerBlock": 48
        }
      }
    },
    "Q": {
      "total": 3706,
      "data": 1666,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 34,
          "dataCodewordsPerBlock": 24
        },
        "g2": {
          "numBlocks": 34,
          "dataCodewordsPerBlock": 25
        }
      }
    },
    "H": {
      "total": 3706,
      "data": 1276,
      "ecc": 30,
      "generator": [
        1,
        212,
        246,
        77,
        73,
        195,
        192,
        75,
        98,
        5,
        70,
        103,
        177,
        22,
        217,
        138,
        51,
        181,
        246,
        72,
        25,
        18,
        46,
        228,
        74,
        216,
        195,
        11,
        106,
        130,
        150
      ],
      "blocks": {
        "g1": {
          "numBlocks": 20,
          "dataCodewordsPerBlock": 15
        },
        "g2": {
          "numBlocks": 61,
          "dataCodewordsPerBlock": 16
        }
      }
    }
  }
};

export const remainderBitsByVersion = {
  "1":	0,
  "2":	7,
  "3":	7,
  "4":	7,
  "5":	7,
  "6":	7,
  "7":	0,
  "8":	0,
  "9":	0,
  "10":	0,
  "11":	0,
  "12":	0,
  "13":	0,
  "14":	3,
  "15":	3,
  "16":	3,
  "17":	3,
  "18":	3,
  "19":	3,
  "20":	3,
  "21":	4,
  "22":	4,
  "23":	4,
  "24":	4,
  "25":	4,
  "26":	4,
  "27":	4,
  "28":	3,
  "29":	3,
  "30":	3,
  "31":	3,
  "32":	3,
  "33":	3,
  "34":	3,
  "35":	0,
  "36":	0,
  "37":	0,
  "38":	0,
  "39":	0,
  "40":	0,
}