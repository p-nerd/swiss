import type { TFileType } from "./types";

export const aspectRatios = {
    free: undefined,
    "1:1": 1,
    "4:3": 4 / 3,
    "16:9": 16 / 9,
    "3:4": 3 / 4,
    "9:16": 9 / 16
};

export const getPreviewImageUrl = (
    canvas: HTMLCanvasElement,
    fileType: TFileType,
    fileQuality: number,
    callback: (url: string | null) => void
): void => {
    canvas.toBlob(
        (blob) => {
            if (!blob) {
                callback(null);
                return;
            }
            const url = URL.createObjectURL(blob);
            callback(url);
        },
        fileType,
        fileQuality
    );
};
