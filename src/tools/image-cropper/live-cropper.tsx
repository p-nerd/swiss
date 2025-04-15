import "react-advanced-cropper/dist/style.css";

import type { CropperRef } from "react-advanced-cropper";

import { Cropper } from "react-advanced-cropper";

import { getPreviewImageUrl } from "./images";
import { useImageCropperStore } from "./store";

export const LiveCropper = () => {
    const { originalImageUrl, fileType, fileQuality, setPreviewImageUrl } = useImageCropperStore();

    const onChange = (cropper: CropperRef) => {
        const canvas = cropper.getCanvas();

        if (!canvas) return;

        // setPreviewImageUrl(null);
        getPreviewImageUrl(canvas, fileType, fileQuality, setPreviewImageUrl);
    };

    return (
        <div className="border rounded-lg p-2 bg-background">
            <div className="overflow-auto h-125">
                <Cropper
                    src={originalImageUrl}
                    onChange={onChange}
                    className="cropper w-full max-w-full h-full max-h-full"
                />
            </div>
        </div>
    );
};
