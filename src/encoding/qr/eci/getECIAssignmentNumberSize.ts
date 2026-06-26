// Helper function to get ECI assignment number size in bits
export function getECIAssignmentNumberSize(assignmentNumber: number): number {
    switch(true) {
        case assignmentNumber >= 0 && assignmentNumber <= 127:
            return 8; // assignment number size
        case assignmentNumber >= 128 && assignmentNumber <= 16383:
            return 16; // assignment number size
        case assignmentNumber >= 16384 && assignmentNumber <= 999999:
            return 24; // assignment number size
        default:
            throw new Error("ECI Assignment Number too large in determine min version.");
    }
}