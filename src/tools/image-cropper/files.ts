import type { TFileType } from "./types";

export const getExtensionByFileType = (fileType: TFileType, defaultValue?: string): string => {
    const extensions: Record<TFileType, string> = {
        "image/png": "png",
        "image/jpeg": "jpeg",
        "image/webp": "webp"
    };

    return extensions[fileType] || defaultValue || "";
};

export const getFileNameWithoutExtension = (fileName: string): string => {
    const lastDotIndex = fileName.lastIndexOf(".");
    if (lastDotIndex === -1) {
        return fileName;
    }
    return fileName.substring(0, lastDotIndex);
};
