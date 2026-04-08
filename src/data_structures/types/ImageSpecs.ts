import { QRElementShape } from "../enums/QR_ELEMENT_SHAPES";

// Defines the rules for generating an image from a QR matrix
export type ImageSpecs = {
    // Colors
    backgroundColor: string,
    moduleColor: string,
    finderPatternOutlineColor: [string, string, string],
    finderPatternInnerBackgroundColor: [string, string, string],
    finderPatternInnerColor: [string, string, string],
    alignmentPatternOutlineColor: string, // Maybe
    alignmentPatternInnerBackgroundColor: string, // Maybe
    alignmentPatternInnerColor: string, // Maybe
    gridStrokeColor: string,

    // Shapes
    moduleShape: QRElementShape,
    finderPatternOutlineShapes: [QRElementShape, QRElementShape, QRElementShape],
    finderPatternInnerBackgroundShapes: [QRElementShape, QRElementShape, QRElementShape],
    finderPatternInnerShapes: [QRElementShape, QRElementShape, QRElementShape],
    alignmentPatternOutlineShapes: QRElementShape, // Maybe
    alignmentPatternInnerBackgroundShapes: QRElementShape, // Maybe
    alignmentPatternInnerShapes: QRElementShape, // Maybe

    // General
    roundness: number, // 0-1 for rounded shapes
    gridStrokeWidth: number, // 0-1 for percent
}

export type PublicImageSpecs = Partial<ImageSpecs>; // For user input, all fields are optional since we have defaults