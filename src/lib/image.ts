import type { TAspectRatioKey, TFileType } from "@/types/image-generator";
import type { Crop, PixelCrop } from "react-image-crop";

export const defaultCrop: Crop = {
    unit: "%" as const,
    x: 10,
    y: 10,
    width: 80,
    height: 80
};

export const aspectRatios = {
    free: undefined,
    "1:1": 1,
    "4:3": 4 / 3,
    "16:9": 16 / 9,
    "3:4": 3 / 4,
    "9:16": 9 / 16
};

export const centerAspectCrop = (image: HTMLImageElement, aspectRatio: TAspectRatioKey): Crop => {
    const aspect = aspectRatios[aspectRatio];

    const mediaWidth = image.width;
    const mediaHeight = image.height;

    if (!aspect) return defaultCrop;

    let width = 90;
    let height;

    const imageAspect = mediaWidth / mediaHeight;

    if (aspect > imageAspect) {
        width = 90;
        height = (width / aspect) * imageAspect;
    } else {
        height = 90;
        width = (height * aspect) / imageAspect;
    }

    const x = (100 - width) / 2;
    const y = (100 - height) / 2;

    return {
        unit: "%",
        width,
        height,
        x,
        y
    };
};

export const getCrop = (image: HTMLImageElement, aspectRatio: TAspectRatioKey): Crop => {
    return aspectRatio === "free" ? defaultCrop : centerAspectCrop(image, aspectRatio);
};

export const getCompletedCrop = (crop: Crop, image: HTMLImageElement): PixelCrop => {
    if (crop.unit === "px") {
        return crop as PixelCrop;
    }

    const { width, height } = image;

    // Calculate the raw pixel values for all four edges
    const rawX = (crop.x * width) / 100;
    const rawY = (crop.y * height) / 100;
    const rawRight = ((crop.x + crop.width) * width) / 100;
    const rawBottom = ((crop.y + crop.height) * height) / 100;

    // Round the edges
    const x = Math.round(rawX);
    const y = Math.round(rawY);
    const right = Math.round(rawRight);
    const bottom = Math.round(rawBottom);

    // Calculate width and height from the rounded edges
    const calcWidth = right - x;
    const calcHeight = bottom - y;

    return {
        unit: "px" as const,
        x,
        y,
        width: calcWidth,
        height: calcHeight
    };
};

export const getImageData = (image: HTMLImageElement, crop: PixelCrop, scale = 1, rotate = 0) => {
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
};

export const getPreviewUrl = (
    image: HTMLImageElement,
    previewUrl: string,
    completedCrop: PixelCrop,
    scale: number,
    rotate: number,
    fileType: TFileType,
    fileQuality: number
): Promise<string | undefined> => {
    return new Promise<string | undefined>((resolve) => {
        if (!image || !completedCrop) {
            resolve(undefined);
            return;
        }

        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }

        const canvas = getImageData(image, completedCrop, scale, rotate);

        canvas.toBlob(
            (blob) => {
                if (!blob) {
                    resolve(undefined);
                    return;
                }
                const url = URL.createObjectURL(blob);
                resolve(url);
            },
            fileType,
            fileQuality
        );
    });
};
