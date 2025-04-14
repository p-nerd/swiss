import type { Crop, PixelCrop } from "react-image-crop";

// Function to create a centered crop with a specific aspect ratio

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

// --------------- + ----------------

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

export const calculatePixelCrop = (crop: Crop, image: HTMLImageElement): PixelCrop => {
    const { width, height } = image;

    return {
        unit: "px" as const,
        x: Math.round((crop.x * width) / 100),
        y: Math.round((crop.y * height) / 100),
        width: Math.round((crop.width * width) / 100),
        height: Math.round((crop.height * height) / 100)
    };
};

export function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number | undefined
): Crop {
    if (!aspect) {
        return {
            unit: "%",
            width: 90,
            height: 90,
            x: 5,
            y: 5
        };
    }

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
}
