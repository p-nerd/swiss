import type { TFileType } from "./types";

export const getFileName = (fileName: string): string => {
    const lastDotIndex = fileName.lastIndexOf(".");
    if (lastDotIndex === -1) {
        return fileName;
    }
    return fileName.substring(0, lastDotIndex);
};

export const getExtension = (fileName: string): string | null => {
    const lastDotIndex = fileName.lastIndexOf(".");
    if (lastDotIndex === -1) {
        return null;
    }
    return fileName.substring(lastDotIndex + 1).toLowerCase();
};

export const getExtensionByFileType = (fileType: TFileType): string => {
    const extensions: Record<TFileType, string> = {
        "image/png": "png",
        "image/jpeg": "jpeg",
        "image/webp": "webp"
    };
    return extensions[fileType] || "png";
};

export const changeExtension = (fileName: string, extension: string): string => {
    if (!extension.startsWith(".")) {
        extension = "." + extension;
    }

    const lastDotIndex = fileName.lastIndexOf(".");
    if (lastDotIndex === -1) {
        return fileName + extension;
    }

    return fileName.substring(0, lastDotIndex) + extension;
};
