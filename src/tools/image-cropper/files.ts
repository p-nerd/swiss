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

export const getFileTypeByExtension = (extension: string): TFileType => {
    const fileTypes: Record<string, TFileType> = {
        png: "image/png",
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        webp: "image/webp"
    };

    const normalizedExtension = extension.startsWith(".")
        ? extension.substring(1).toLowerCase()
        : extension.toLowerCase();

    return fileTypes[normalizedExtension] || "image/png";
};

export const isValidExtension = (extension: string): boolean => {
    const validExtensions = ["png", "jpg", "jpeg", "webp"];

    const normalizedExtension = extension.startsWith(".")
        ? extension.substring(1).toLowerCase()
        : extension.toLowerCase();

    return validExtensions.includes(normalizedExtension);
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
