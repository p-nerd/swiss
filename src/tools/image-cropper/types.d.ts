import type { aspectRatios } from "./images";

export type TFileType = "image/png" | "image/jpeg" | "image/webp";

export type TFileTypeOption = { label: string; extension: string; value: TFileType };

export type TAspectRatioKey = keyof typeof aspectRatios;
