import ReactCrop from "react-image-crop";

import "react-image-crop/dist/ReactCrop.css";

import {
    aspectRatios,
    centerAspectCrop,
    getImageData,
    useImageCropperStore
} from "@/states/use-image-cropper-store";

import type { RefObject } from "react";

import { useCallback, useEffect } from "react";

export const LiveCropper = ({ imgRef }: { imgRef: RefObject<HTMLImageElement | null> }) => {
    const {
        crop,
        setCrop,

        completedCrop,
        setCompletedCrop,

        previewUrl,
        setPreviewUrl,

        imgSrc,
        aspectRatio,
        scale,
        rotate,
        fileType,
        fileQuality
    } = useImageCropperStore();

    // Update preview when crop changes
    useEffect(() => {
        if (completedCrop && imgRef.current) {
            updatePreview();
        }
    }, [completedCrop, scale, rotate, fileType, fileQuality]);

    // Update the preview image
    const updatePreview = () => {
        if (!imgRef.current || !completedCrop) return;

        // Revoke previous preview URL
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }

        // Create a canvas with the cropped image
        const canvas = getImageData(imgRef.current, completedCrop, scale, rotate);

        // Convert canvas to blob
        canvas.toBlob(
            (blob) => {
                if (!blob) return;
                const url = URL.createObjectURL(blob);
                setPreviewUrl(url);
            },
            fileType,
            fileQuality
        );
    };

    const onImageLoad = useCallback(
        (e: React.SyntheticEvent<HTMLImageElement>) => {
            const { width, height } = e.currentTarget;

            // If aspect ratio is set, create a centered crop
            if (aspectRatio !== "free") {
                const newCrop = centerAspectCrop(width, height, aspectRatios[aspectRatio]);
                setCrop(newCrop);
            } else {
                // For free aspect ratio, create a default crop
                setCrop({
                    unit: "%",
                    x: 10,
                    y: 10,
                    width: 80,
                    height: 80
                });
            }
        },
        [aspectRatio, setCrop]
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
                        style={{
                            transform: `scale(${scale}) rotate(${rotate}deg)`
                        }}
                        onLoad={onImageLoad}
                        className="max-w-full transition-all"
                    />
                </ReactCrop>
            </div>
        </div>
    );
};
