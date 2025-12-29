type qrVersions = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40;
type qrMasks = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type qrSpecs = {
    eccLevel: 'L' | 'M' | 'Q' | 'H',
    version: qrVersions | null, // Null means auto
    maskPattern: qrMasks | null, // Null means auto
    preferrECI: boolean,
    preferrBOM: boolean
}