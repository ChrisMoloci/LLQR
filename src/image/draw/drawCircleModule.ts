export function drawCircleModule(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number): HTMLCanvasElement {
    ctx.beginPath();
    ctx.arc(x + radius, y + radius, radius, 0, Math.PI * 2);
    ctx.closePath();

    ctx.fill();

    return ctx.canvas;
}

export default drawCircleModule;