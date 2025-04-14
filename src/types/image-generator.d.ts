import type { aspectRatios } from "@/lib/image";

export type TFileType = "image/png" | "image/jpeg" | "image/webp";
export type TAspectRatioKey = keyof typeof aspectRatios;
