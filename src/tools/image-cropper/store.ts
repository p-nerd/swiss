import type { TFileType } from "./types";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const url = "https://images.unsplash.com/photo-1599140849279-1014532882fe?fit=crop&w=1300&q=80";

const defaultOriginalImageUrl = url;
const defaultPreviewImageUrl = null;
const defaultFileName = "cropped-image.png";
const defaultFileType = "image/png";

export const useImageCropperStore = create<{
    originalImageUrl: string | null;
    setOriginalImageUrl: (originalImageUrl: string | null) => void;

    previewImageUrl: string | null;
    setPreviewImageUrl: (previewImageUrl: string | null) => void;

    fileName: string;
    setFileName: (fileName: string) => void;

    fileType: TFileType;
    setFileType: (fileType: TFileType) => void;

    clear: () => void;
}>()(
    immer((set) => ({
        originalImageUrl: defaultOriginalImageUrl,
        setOriginalImageUrl: (originalImageUrl) => set({ originalImageUrl }),

        previewImageUrl: defaultPreviewImageUrl,
        setPreviewImageUrl: (previewImageUrl) => set({ previewImageUrl }),

        fileName: defaultFileName,
        setFileName: (fileName) => set({ fileName }),

        fileType: defaultFileType,
        setFileType: (fileType) => set({ fileType }),

        clear: () => {
            return set({
                originalImageUrl: defaultOriginalImageUrl,
                previewImageUrl: defaultPreviewImageUrl,
                fileName: defaultFileName,
                fileType: defaultFileType
            });
        }
    }))
);
