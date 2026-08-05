# LLQR

Welcome to LLQR, a work in progress QR Code generator. LLQR is a highly customizable and easy to use QR Code
Generator available via npm.

To begin, start by installing LLQR into you're project:
~~~
npm i @chrismoloci/llqr
~~~

## 1. Configuration
~~~ ts
import type { QRSpecs, ImageSpecs} from "@chrismoloci/qr-lib/types";
import { ECC_LEVEL_CODE, QR_DEFAULTS, IMAGE_DEFAULTS, MODE_SWITCHING_STRATEGY, ECI_SWITCHING_STRATEGY } from "@chrismoloci/qr-lib/constants";
import { defineConfig } from "@chrismoloci/qr-lib";

// A custom QRSpec configuration
const qrConfig: Partial<QRSpecs> = {
    eccLevel: ECC_LEVEL_CODE.M, // default is "00" (M)
    forceByteEncoding: QR_DEFAULTS.FORCE_BYTE_ENCODING, // Set a reccomended default using QR_DEFAULTS
    useModeSwitching: MODE_SWITCHING_STRATEGY.DISABLED,
    useECISwitching: ECI_SWITCHING_STRATEGY.DISABLED,
}

// Specifies the background color of the image
const imageConfig: Partial<ImageSpecs> = {
    backgroundColor: "#FFFFFF",
    moduleColor: IMAGE_DEFAULTS.MODULE_COLOR, // Set a reccomended default using IMAGE_DEFAULTS
}

// Set the generator to use our configs
defineConfig(qrConfig, imageConfig);
~~~

#### You can also just set one config and leave the other in its default state:
~~~ ts
defineConfig(qrConfig); // only QR config
defineConfig(imageConfig); // only image config
~~~

#### You can reset your config to the preset defaults using:
~~~ ts
import { resetConfigToDefaults } from "@chrismoloci/qr-lib";

resetConfigToDefaults(); // resets the config to the default values
~~~

### QR Spec Type
This is what can be customized in the QR Config.

~~~ ts
type QRSpecs = {
    eccLevel: ECCLevel, // ENUM type
    minPreferredVersion: QRVersion,
    forceByteEncoding: boolean,
    maskPattern: MaskPattern,
    useModeSwitching: ModeSwitchingStrategy,
    useECISwitching: ECISwitchingStrategy,
}
~~~

### Image Specs Type
This is what can be customized in the Image Config.

~~~
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
~~~

## 2. Generation
There are multiple ways of generating QR Codes, for this pre-release version, these 2 are the most stable and are 
recommended for use.

### One-Liner
The first option generates an \<img> element that contains the image src for the generated image in it, this is an easy
way of generating an image for those using this in a website.
~~~ ts
// Create an IMG DOM element
const image: HTMLImageElement = generateFullQR("Hello World!", 512);
~~~

### Generating Matrix and Image Separately
If you need a raw QR Matrix, you can alternativly just generate the matrix and save generating the image for later or
somewhere else (e.g. generate the matrix server side and generate the image client side)
~~~ ts
const matrix = generateQRMatrix("Bye World!");
const image: HTMLImageElement = generateImageFromQRMatrix(matrix, 512);
~~~
**Note:** ```generateFullQR()``` just uses these methods internally

## 3. Current State of LLQR
LLQR is still in development. There is still a lot of work to do to clean up the codebase, make it more stable, write 
unit tests, and overall cleanup the architecture so that it's easier to understand.

While the Low-Level API is technically exposed, there won't be any documentation on how to use is written until everything
is more stable.

So is LLQR usable, yes and no. This library is here for developers to be able to prepare their apps to adapt it in the
future but as it stands, it is not extensively tested meaning that there are potential for bugs or unexpected results.
While to exaggerate and say that it's unusable would also be an overstatement, use this at you're own cause.

To test LLQR yourself without writing code and see its capabilities, you can use the official LLQR front-end at:
[INSERT LINK HERE]

### What Works (as of 0.1)
* Generating QR Matrices
* Generating QR Images
* Many Helper Functions
* QR Configuration
* Generating QR Codes for all error correction levels (L, M, Q, H)
* Generating QR Codes for all versions
  * A preferred min version can be specified but note that if the data can't fit in it, a higher version will 
  be selected
  * This setting is intended for those that want to generate data in QR codes that are bigger that what is required,
  not smaller but is **NOT RECOMMENDED** as bigger QR codes only become harder to read as they pack more data into 
  the same area.
* Generating QR Codes for all supported encoding modes
  * Numeric (just numbers, smallest codeword size per character)
  * Alphanumeric (slightly larger codewords that numeric but can encode capital letters, numbers, and a few symbols)
  * Kanji (small subset of the SHITF-JIS character set including only characters stored as two-byte sequences)
  * Byte (Default Latin-1)
    * ISO8859-1 also known as Latin-1 is natively supported by the QR spec
    * UTF-8 is supported but is more fragmented. Officially UTF-8 is only supported using ECI indicators however many QR
    readers can decode data in UTF-8 without needing ECI indicators. It's very weired since some readers only can read
    codes with ECI and some can only read without. The official spec recommends using ECI indicators for UTF-8.
* Encoding Mode Switching
  * Mostly operational with aggressive optimizations (excluding some minor edge cases which we are aware of but have not 
  been addressed yet)
  * Supports three modes: disabled, auto, and forced
    * Disabled forces all date to be encoded into a single encoding mode
    * Auto encodes all data applying our data optimization algorithms to produce the smallest possible datastream
    * Forced behaves oppositely of auto and encodes all data based on this hierarchy:
      * Numeric (any numbers)
      * Alphanumeric (excludes numbers since they have been consumed by the higher numeric priority)
      * Kanji
      * Byte (anything else)
      * ***Forced essentially acts as the "this breaks all the rules in a way that might technically work" Mode.***
* Forced Byte Encoding
  * This setting is different that mode switching. While mode switching has a disabled setting, if the generator deems
  that the data can be encoded in a more efficient mode rather than byte, it will use the most efficient mode, with this
  setting, you can completely bypass the mode switching login entirely and just encode the data as one byte segment
  every time
    * **To reiterate, this setting completely bypasses mode switching so if you want mode switching, LEAVE THIS OFF**
* ECI Indicators with ECI Switching
  * ECI indicators allow readers to extend support for more character set when encoding in byte mode. The default 
  character set used to encode QR data is Latin-1 but with ECI indicators, you can also support character sets such as
  UTF-8. Latin-1 segments do not and generally should not have ECI indicators but also technically can. Just be aware
  that using ECI indicators in ways they were not intended can cause some readers to fail to decode a QR Code.
  * Similar to mode switching, three modes are also supported for ECI indicators
    * Disabled excludes ECI indicators. Some readers can decode QR Codes without these
    * Auto only uses ECI indicators statefully. When ECI indicators are paired with mode switching, if 2 segments of
    data exist in the reader with the same character set (e.g. UTF-8), the reader will remember the indicator from the 
    first byte segment when decoding the second (or third, or fourth...). An ECI indicator is required if character 
    set changes.
    * Forced ignores ECI state and places a new ECI indicator whenever a new byte segment happens, and yes forced also
    applies ECI indicators to Latin-1 segments. The reason forced more was chosen to allow ECI segments on Latin-1 
    segments is because forced mode is not recommended. ***Forced essentially acts as the "this breaks all the rules in a
    way that might technically work" Mode.***
* Image customization
  * LLQR also has an API for converting a QR matrix into an image using the JavaScript canvas API. It first renders the
  QR matrix into a canvas using an image configuration and then converts that image into a blob which is then used to
  create an \<img> DOM element. See [Configuration](#1-configuration) above for what can be customized.

### Planned For 1.0
* Low-Level API which will allow devs to build QR Code Generators with custom code
* Fully written unit tests
* Code cleanup
* More extensive documentation on a separate website
* Data input serializers to support encoding QR codes for:
  * Wi-Fi
  * Bluetooth
  * Contact Cards
  * etc
* Implement support for optional grids in QR Images
* Even more aggressive data optimization algorithms for encoding mode switching
  * optimizByteSegment() method could be further improved with dynamic programming

### Planned For Future Releases
* Micro QRs
* More powerful image customization
  * Potentially move the image generator into a separate codebase & package if image generator gets too big