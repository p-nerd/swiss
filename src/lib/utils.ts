import type { TFileType } from "@/types/image-generator";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const changeExtension = (filename: string, newExtension: string): string => {
    if (!newExtension.startsWith(".")) {
        newExtension = "." + newExtension;
    }

    const lastDotIndex = filename.lastIndexOf(".");
    if (lastDotIndex === -1) {
        return filename + newExtension;
    }

    return filename.substring(0, lastDotIndex) + newExtension;
};

export const getExtension = (fileType: TFileType) => {
    const extensions: Record<TFileType, string> = {
        "image/png": "png",
        "image/jpeg": "jpeg",
        "image/webp": "webp"
    };

    return extensions[fileType];
};
