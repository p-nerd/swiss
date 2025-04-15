import type { TAspectRatioKey, TFileType } from "./types";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const url = "https://images.unsplash.com/photo-1599140849279-1014532882fe?fit=crop&w=1300&q=80";

const defaultOriginalImageUrl = url;
const defaultAspectRatio = "free";
const defaultScale = 1;
const defaultRotate = 0;
const defaultPreviewImageUrl = null;
const defaultFileName = "cropped-image.png";
const defaultFileType = "image/png";
const defaultFileQuality = 0.92;

export const useImageCropperStore = create<{
    originalImageUrl: string | null;
    setOriginalImageUrl: (originalImageUrl: string | null) => void;

    aspectRatio: TAspectRatioKey;
    setAspectRatio: (aspectRatio: TAspectRatioKey) => void;

    scale: number;
    setScale: (scale: number) => void;

    rotate: number;
    setRotate: (rotate: number) => void;

    previewImageUrl: string | null;
    setPreviewImageUrl: (previewImageUrl: string | null) => void;

    fileName: string;
    setFileName: (fileName: string) => void;

    fileType: TFileType;
    setFileType: (fileType: TFileType) => void;

    fileQuality: number;
    setFileQuality: (fileQuality: number) => void;

    clear: () => void;
}>()(
    immer((set) => ({
        originalImageUrl: defaultOriginalImageUrl,
        setOriginalImageUrl: (originalImageUrl) => set({ originalImageUrl }),

        aspectRatio: defaultAspectRatio,
        setAspectRatio: (aspectRatio) => set({ aspectRatio }),

        scale: defaultScale,
        setScale: (scale) => set({ scale }),

        rotate: defaultRotate,
        setRotate: (rotate) => set({ rotate }),

        previewImageUrl: defaultPreviewImageUrl,
        setPreviewImageUrl: (previewImageUrl) => set({ previewImageUrl }),

        fileName: defaultFileName,
        setFileName: (fileName) => set({ fileName }),

        fileType: defaultFileType,
        setFileType: (fileType) => set({ fileType }),

        fileQuality: defaultFileQuality,
        setFileQuality: (fileQuality) => set({ fileQuality }),

        clear: () => {
            return set({
                originalImageUrl: defaultOriginalImageUrl,
                aspectRatio: defaultAspectRatio,
                scale: defaultScale,
                rotate: defaultRotate,
                previewImageUrl: defaultPreviewImageUrl,
                fileName: defaultFileName,
                fileType: defaultFileType,
                fileQuality: defaultFileQuality
            });
        }
    }))
);
