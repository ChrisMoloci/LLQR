export function getBitLength(x: number): number {
    return (32 - Math.clz32(Math.abs(x)));
}

export default getBitLength;