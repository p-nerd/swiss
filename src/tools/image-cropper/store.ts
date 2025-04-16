import type { TAspectRatioKey } from "./images";
import type { TFileType } from "./types";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const url = "https://images.unsplash.com/photo-1599140849279-1014532882fe?fit=crop&w=1300&q=80";
// const url = null;

const defaultOriginalImageUrl = url;
const defaultAspectRatio = "free";
const defaultFileName = "cropped-image.png";
const defaultFileType = "image/png";
const defaultFileQuality = 0.92;

export const useImageCropperStore = create<{
    originalImageUrl: string | null;
    setOriginalImageUrl: (originalImageUrl: string | null) => void;

    aspectRatio: TAspectRatioKey;
    setAspectRatio: (aspectRatio: TAspectRatioKey) => void;

    zoom: number;
    setZoom: (zoom: number) => void;

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

        zoom: 0,
        setZoom: (zoom) => set({ zoom }),

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
                fileName: defaultFileName,
                fileType: defaultFileType,
                fileQuality: defaultFileQuality
            });
        }
    }))
);
