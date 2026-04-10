import { Radiuses } from "../../data_structures/types/Radiuses";

function drawRoundedModule(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, radiuses: Radiuses | number): HTMLCanvasElement {
    if (typeof radiuses === "number") {
        radiuses = {
            topLeft: radiuses,
            topRight: radiuses,
            bottomRight: radiuses,
            bottomLeft: radiuses
        };
    }

    ctx.beginPath();

    ctx.moveTo(x + radiuses.topLeft, y);
    ctx.lineTo(x - radiuses.topRight + size, y);

    ctx.quadraticCurveTo(x + size, y, x + size, y + radiuses.topRight);
    ctx.lineTo(x + size, y + size - radiuses.bottomRight);

    ctx.quadraticCurveTo(x + size, y + size, x + size - radiuses.bottomRight, y + size);
    ctx.lineTo(x + radiuses.bottomLeft, y + size);

    ctx.quadraticCurveTo(x, y + size, x, y + size - radiuses.bottomLeft);
    ctx.lineTo(x, y + radiuses.topLeft);

    ctx.quadraticCurveTo(x, y, x + radiuses.topLeft, y);
    ctx.closePath();   

    ctx.fill();

    return ctx.canvas;
}

export default drawRoundedModule;