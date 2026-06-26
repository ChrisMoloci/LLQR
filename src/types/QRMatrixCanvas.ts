interface QRMatrixCanvas {
    matrix: Array<Array<number>>,
    reservedMatrix: Array<Array<boolean>>
} // Stores the QR matrix and reserved areas that data should not be placed into in matrix

export default QRMatrixCanvas;