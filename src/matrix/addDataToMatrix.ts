import {QRMatrixCanvas} from "../types";

export function addDataToMatrix(qrMatrixCanvas: QRMatrixCanvas, dataStream: Array<string>, size: number): QRMatrixCanvas {
    let bitIndex = 0; // Current bit index in the data stream
    let directionUp = true; // Direction of traversal (upwards or downwards)
    // let done = false; // Flag to indicate if all data bits have been placed

    const flatDataStream: string = dataStream.join('');

    for (let col = size - 1; col > 0; col -= 2) {
        if (col === 6) col--; // Skip the vertical timing pattern column
        console.log("Working from column:", col, " to ", col - 1);
        // Move left two columns at a time
        for (let row = directionUp ? size - 1 : 0; 
            directionUp ? row >= 0 : row < size; 
            directionUp ? row-- : row++) {
                // console.log("Working on row:", row);
                for (let i = 0; i < 2; i++) {
                    // Alternate between the two columns
                    if (!qrMatrixCanvas.reservedMatrix[row]![col - i]!) {
                        // If the position is not reserved, place the data bit
                        // console.log(`Placing data bit at (${row}, ${col - i})`);
                        if (bitIndex < flatDataStream.length) {
                            qrMatrixCanvas.matrix[row]![col - i]! = parseInt(flatDataStream[bitIndex]!);
                            bitIndex++;
                        } else {
                            // If no more data bits, pad with 0s until complete
                            qrMatrixCanvas.matrix[row]![col - i]! = 0; // Pad with 0s if no more data
                            // done = true; // All data bits have been placed
                            // break;
                        }
                    }
                }
                // if (done) break; // Exit if done
        }
        directionUp = !directionUp; // Change direction after each column pair
    }

    // Return the updated QR matrix canvas
    return qrMatrixCanvas;
}

export default addDataToMatrix;