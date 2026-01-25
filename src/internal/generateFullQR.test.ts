import { test, expect } from "vitest";
import { BrowserMultiFormatReader } from "@zxing/library";
import generateFullQR from "./generateFullQR";

test("Sample Test", async () => {
    const reader = new BrowserMultiFormatReader();
    const image = generateFullQR("Sample Test");
    const result = await reader.decodeFromImageElement(image).then(val => val.getText());
    expect(result).toBe("Sample Test");
});