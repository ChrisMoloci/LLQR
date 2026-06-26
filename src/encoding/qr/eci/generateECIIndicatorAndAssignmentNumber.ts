// Generates the ECI Mode Indicator and Assignment Number binary strings to be added to the data stream
function generateECIIndicatorAndAssignmentNumber(assignmentNumber: number): Array<string> {
    // ECI Mode Indicator is always '0111'
    const eciModeIndicator = '0111';

    // Convert assignment number to binary (8 bits for 0-127, 16 bits for 128-16383)
    let assignmentNumberBinary: string;
    if (assignmentNumber >= 0 && assignmentNumber <= 127) {
        assignmentNumberBinary = assignmentNumber.toString(2).padStart(8, '0');
    } else if (assignmentNumber >= 128 && assignmentNumber <= 16383) {
        assignmentNumberBinary = assignmentNumber.toString(2).padStart(16, '0');
    } else if (assignmentNumber >= 16384 && assignmentNumber <= 999999) {
        assignmentNumberBinary = assignmentNumber.toString(2).padStart(24, '0');
    } else {
        throw new Error("ECI Assignment Number out of range (0-999999).");
    }

    return [eciModeIndicator, assignmentNumberBinary];
}

export default generateECIIndicatorAndAssignmentNumber;