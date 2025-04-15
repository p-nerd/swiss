import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const defaultOriginalImageUrl =
    "https://images.unsplash.com/photo-1599140849279-1014532882fe?fit=crop&w=1300&q=80";
const defaultPreviewImageUrl = null;

export const useImageCropperStore = create<{
    originalImageUrl: string | null;
    setOriginalImageUrl: (originalImageUrl: string | null) => void;

    previewImageUrl: string | null;
    setPreviewImageUrl: (previewImageUrl: string | null) => void;

    clear: () => void;
}>()(
    immer((set) => ({
        originalImageUrl: defaultOriginalImageUrl,
        setOriginalImageUrl: (originalImageUrl) => set({ originalImageUrl }),

        previewImageUrl: defaultPreviewImageUrl,
        setPreviewImageUrl: (previewImageUrl) => set({ previewImageUrl }),

        clear: () => {
            return set({
                originalImageUrl: defaultOriginalImageUrl,
                previewImageUrl: defaultPreviewImageUrl
            });
        }
    }))
);
