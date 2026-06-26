function drawSquareModule(ctx: CanvasRenderingContext2D, x: number, y: number, size: number): HTMLCanvasElement {
    ctx.fillRect(x, y, size, size);

    return ctx.canvas;
}

export default drawSquareModule;