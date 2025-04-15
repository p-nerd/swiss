import "react-advanced-cropper/dist/style.css";

import { Cropper, type CropperRef } from "react-advanced-cropper";

import { getPreviewImageUrl } from "./images";
import { useImageCropperStore } from "./store";

export const LiveCropper = () => {
    const { originalImageUrl, setPreviewImageUrl } = useImageCropperStore();

    const onChange = (cropper: CropperRef) => {
        const coordinates = cropper.getCoordinates();
        const canvas = cropper.getCanvas();
        console.log(coordinates, canvas);

        if (!canvas) return;

        getPreviewImageUrl(canvas, "image/png", 0.92, setPreviewImageUrl);
    };

    return (
        <div className="border rounded-lg p-2 bg-background">
            <div className="overflow-auto">
                <Cropper src={originalImageUrl} onChange={onChange} className="cropper" />
            </div>
        </div>
    );
};
