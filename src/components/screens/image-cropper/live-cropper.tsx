import ReactCrop from "react-image-crop";

import "react-image-crop/dist/ReactCrop.css";

import type { RefObject, SyntheticEvent } from "react";

import { aspectRatios, getCompletedCrop, getCrop } from "@/lib/image";
import { useImageCropperStore } from "@/states/use-image-cropper-store";
import { useCallback } from "react";

export const LiveCropper = ({ imgRef }: { imgRef: RefObject<HTMLImageElement | null> }) => {
    const { crop, setCrop, setCompletedCrop, imgSrc, aspectRatio, scale, rotate } =
        useImageCropperStore();

    const onImageLoad = useCallback(
        (e: SyntheticEvent<HTMLImageElement>) => {
            const image = e.currentTarget;

            const crop = getCrop(image, aspectRatio);
            const completedCrop = getCompletedCrop(crop, image);

            setCrop(crop);
            setCompletedCrop(completedCrop);
        },
        [aspectRatio]
    );

    return (
        <div className="border rounded-lg p-2 bg-background">
            <div className="overflow-auto">
                <ReactCrop
                    crop={crop}
                    onChange={(c) => setCrop(c)}
                    onComplete={(c) => setCompletedCrop(c)}
                    aspect={aspectRatios[aspectRatio]}
                    className="max-w-full"
                >
                    <img
                        ref={imgRef}
                        src={imgSrc || "/placeholder.svg"}
                        alt="Crop me"
                        style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                        onLoad={onImageLoad}
                        className="max-w-full transition-all"
                    />
                </ReactCrop>
            </div>
        </div>
    );
};
