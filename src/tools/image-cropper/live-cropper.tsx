import "react-advanced-cropper/dist/style.css";

import type { CropperRef } from "react-advanced-cropper";

import { useEffect, useRef } from "react";
import { getPreviewImageUrl } from "./images";
import { useImageCropperStore } from "./store";

import { Cropper } from "react-advanced-cropper";

export const LiveCropper = () => {
    const { originalImageUrl, fileType, fileQuality, scale, rotate, setPreviewImageUrl } =
        useImageCropperStore();

    const cropperRef = useRef<CropperRef>(null);

    useEffect(() => {
        updatePreviewImageUrl(cropperRef.current);
    }, [originalImageUrl]);

    const updatePreviewImageUrl = (cropper: CropperRef | null) => {
        const canvas = cropper?.getCanvas();
        if (!canvas) return;
        getPreviewImageUrl(canvas, fileType, fileQuality, setPreviewImageUrl);
    };

    return (
        <div className="border rounded-lg p-2 bg-background">
            <div className="overflow-auto h-125">
                <Cropper
                    className="cropper w-full max-w-full h-full max-h-full"
                    stencilProps={{ grid: true }}
                    src={originalImageUrl}
                    ref={cropperRef}
                    onChange={updatePreviewImageUrl}
                />
            </div>
        </div>
    );
};
