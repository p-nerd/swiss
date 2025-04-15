import type { RefObject } from "react";

import { getPreviewUrl } from "@/lib/image";
import { useImageCropperStore } from "@/states/use-image-cropper-store";
import { useEffect } from "react";

export const PreviewImage = ({ imgRef }: { imgRef: RefObject<HTMLImageElement | null> }) => {
    const { completedCrop, previewUrl, setPreviewUrl, scale, rotate, fileType, fileQuality } =
        useImageCropperStore();

    useEffect(() => {
        if (completedCrop && imgRef.current) {
            updatePreview();
        }
    }, [completedCrop]);

    const updatePreview = async () => {
        if (!imgRef.current) {
            return;
        }
        if (!completedCrop) {
            return;
        }
        const url = await getPreviewUrl(
            imgRef.current,
            previewUrl,
            completedCrop,
            scale,
            rotate,
            fileType,
            fileQuality
        );
        if (!url) {
            return;
        }
        setPreviewUrl(url);
    };

    return (
        <div className="border rounded-lg p-2 bg-background flex flex-col">
            <div className="text-sm font-medium mb-2">Preview</div>
            <div className="flex-1 flex items-center justify-center overflow-hidden">
                {previewUrl ? (
                    <img
                        src={previewUrl || "/placeholder.svg"}
                        alt="Preview"
                        className="max-w-full max-h-full object-contain"
                    />
                ) : (
                    <div className="text-sm text-muted-foreground">Adjust crop to see preview</div>
                )}
            </div>
        </div>
    );
};
