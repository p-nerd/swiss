import type { TFileType } from "@/types/image-generator";
import type { Crop, PixelCrop } from "react-image-crop";

import { changeExtension, getExtensionByFileType } from "@/lib/file";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const aspectRatios = {
    free: undefined,
    "1:1": 1,
    "4:3": 4 / 3,
    "16:9": 16 / 9,
    "3:4": 3 / 4,
    "9:16": 9 / 16
};

// Function to create a centered crop with a specific aspect ratio
export function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number | undefined
) {
    const centerCrop = (crop: Crop, width: number, height: number) => {
        return {
            ...crop,
            x: width / 2 - (width * crop.width) / 200,
            y: height / 2 - (height * crop.height) / 200
        };
    };

    const makeAspectCrop = (
        crop: { unit: "px" | "%"; width: number },
        aspect: number,
        width: number,
        height: number
    ): Crop => {
        const cropWidth = crop.width;
        const cropHeight = (cropWidth / aspect) * (height / width);
        return {
            unit: crop.unit,
            width: cropWidth,
            height: cropHeight,
            x: 0,
            y: 0
        };
    };

    return centerCrop(
        makeAspectCrop(
            {
                unit: "%",
                width: 90
            },
            aspect || 1,
            mediaWidth,
            mediaHeight
        ),
        mediaWidth,
        mediaHeight
    );
}

// Function to get image data from a canvas
export function getImageData(image: HTMLImageElement, crop: PixelCrop, scale = 1, rotate = 0) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
        throw new Error("No 2d context");
    }

    // Calculate the size of the cropped image
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    // Set canvas size to the cropped image size
    const canvasWidth = Math.floor(crop.width * scaleX);
    const canvasHeight = Math.floor(crop.height * scaleY);

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Apply high quality settings
    ctx.imageSmoothingQuality = "high";

    // Clear the canvas with white background
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Save the current context state
    ctx.save();

    // Apply transformations in the correct order:
    // First translate to center, then rotate, then scale, then translate back
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotate * Math.PI) / 180);
    ctx.scale(scale, scale);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);

    // Draw the cropped image
    ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        canvasWidth,
        canvasHeight
    );

    // Restore the context state
    ctx.restore();

    return canvas;
}

export const useImageCropperStore = create<{
    imgSrc: string;
    setImgSrc: (imgSrc: string) => void;

    crop: Crop | undefined;
    setCrop: (crop: Crop | undefined) => void;

    completedCrop: PixelCrop | undefined;
    setCompletedCrop: (completedCrop: PixelCrop | undefined) => void;

    aspectRatio: keyof typeof aspectRatios;
    setAspectRatio: (aspectRatio: keyof typeof aspectRatios) => void;

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
