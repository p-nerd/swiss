import "react-advanced-cropper/dist/style.css";

import type { RefObject } from "react";
import type { CropperPreviewRef, CropperRef } from "react-advanced-cropper";

import { getAspectRatioValue } from "./images";
import { useImageCropperStore } from "./store";

import { Cropper } from "react-advanced-cropper";

export const LiveCropper = ({
    cropperRef,
    previewRef
}: {
    cropperRef: RefObject<CropperRef | null>;
    previewRef: RefObject<CropperPreviewRef | null>;
}) => {
    const { originalImageUrl, aspectRatio } = useImageCropperStore();

    return (
        <div className="border rounded-lg p-2 bg-background">
            <div className="overflow-auto h-125">
                <Cropper
                    className="cropper w-full max-w-full h-full max-h-full"
                    src={originalImageUrl}
                    ref={cropperRef}
                    onUpdate={(cropper) => previewRef.current?.update(cropper)}
                    stencilProps={{
                        aspectRatio: getAspectRatioValue(aspectRatio),
                        grid: true,
                        movable: true,
                        resizable: true
                    }}
                />
            </div>
        </div>
    );
};
