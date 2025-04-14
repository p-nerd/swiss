import type { TAspectRatioKey, TFileType } from "@/types/image-generator";
import type { Crop, PixelCrop } from "react-image-crop";

import { changeExtension, getExtensionByFileType } from "@/lib/file";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useImageCropperStore = create<{
    imgSrc: string;
    setImgSrc: (imgSrc: string) => void;

    crop: Crop | undefined;
    setCrop: (crop: Crop | undefined) => void;

    completedCrop: PixelCrop | undefined;
    setCompletedCrop: (completedCrop: PixelCrop | undefined) => void;

    aspectRatio: TAspectRatioKey;
    setAspectRatio: (aspectRatio: TAspectRatioKey) => void;

    scale: number;
    setScale: (scale: number) => void;

    rotate: number;
    setRotate: (rotate: number) => void;

    fileName: string;
    setFileName: (fileName: string) => void;

    maintainQuality: boolean;
    setMaintainQuality: (maintainQuality: boolean) => void;

    fileType: TFileType;
    setFileType: (fileType: TFileType) => void;

    fileQuality: number;
    setFileQuality: (fileQuality: number) => void;

    previewUrl: string;
    setPreviewUrl: (previewUrl: string) => void;

    resetCropper: () => void;
}>()(
    immer((set) => ({
        imgSrc: "",
        setImgSrc: (imgSrc) => set({ imgSrc }),

        crop: undefined,
        setCrop: (crop) => set({ crop }),

        completedCrop: undefined,
        setCompletedCrop: (completedCrop) => set({ completedCrop }),

        aspectRatio: "free",
        setAspectRatio: (aspectRatio) => set({ aspectRatio }),

        scale: 1,
        setScale: (scale) => set({ scale }),

        rotate: 0,
        setRotate: (rotate) => set({ rotate }),

        fileName: "cropped-image.png",
        setFileName: (fileName) => set({ fileName }),

        maintainQuality: true,
        setMaintainQuality: (maintainQuality) => set({ maintainQuality }),

        fileType: "image/png",
        setFileType: (fileType) => {
            set((state) => {
                state.fileType = fileType;
                state.fileName = changeExtension(state.fileName, getExtensionByFileType(fileType));
            });
        },

        fileQuality: 0.92,
        setFileQuality: (fileQuality) => set({ fileQuality }),

        previewUrl: "",
        setPreviewUrl: (previewUrl) => set({ previewUrl }),

        resetCropper: () =>
            set((state) => {
                state.imgSrc = "";
                state.crop = undefined;
                state.completedCrop = undefined;
                state.scale = 1;
                state.rotate = 0;
                state.previewUrl = "";
            })
    }))
);
