import { QRElementShape } from "./constantTypes/QRElementShape";

// Defines the rules for generating an image from a QR matrix
type ImageSpecs = {
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

export default ImageSpecs;

// export type PublicImageSpecs = Partial<ImageSpecs>; // For user input, all fields are optional since we have defaults