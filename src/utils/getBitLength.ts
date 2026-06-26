function getBitLength(x: number): number {
    return (32 - Math.clz32(x));
}

export default getBitLength;