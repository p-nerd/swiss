import type { RefObject } from "react";
import type { CropperPreviewRef, CropperRef } from "react-advanced-cropper";

export type TFileType = "image/png" | "image/jpeg" | "image/webp";

export type TFileTypeOption = { label: string; extension: string; value: TFileType };

export type TCropperRef = RefObject<CropperRef | null>;
export type TPreviewRef = RefObject<CropperPreviewRef | null>;
