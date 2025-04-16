import "react-advanced-cropper/dist/style.css";

import type { TCropperRef, TPreviewRef } from "./types";

import { getAbsoluteZoom } from "advanced-cropper/extensions/absolute-zoom";
import { getAspectRatioValue } from "./images";
import { useImageCropperStore } from "./store";

import { Cropper } from "react-advanced-cropper";

export const LiveCropper = ({
    cropperRef,
    previewRef
}: {
    cropperRef: TCropperRef;
    previewRef: TPreviewRef;
}) => {
    const { originalImageUrl, aspectRatio, setZoom } = useImageCropperStore();

    return (
        <div className="border rounded-lg p-2 bg-background">
            <div className="overflow-auto h-125">
                <Cropper
                    className="cropper w-full max-w-full h-full max-h-full"
                    src={originalImageUrl}
                    ref={cropperRef}
                    onUpdate={(cropper) => {
                        previewRef.current?.update(cropper);
                        setZoom(getAbsoluteZoom(cropper.getState(), cropper.getSettings()));
                    }}
                    stencilProps={{
                        aspectRatio: getAspectRatioValue(aspectRatio),
                        grid: true,
                        movable: true,
                        resizable: true,
                        handlers: true,
                        lines: true
                    }}
                />
            </div>
        </div>
    );
};
