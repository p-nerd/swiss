import type { TFileType } from "./types";

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
