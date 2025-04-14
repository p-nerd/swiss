import { useImageCropperStore } from "@/states/use-image-cropper-store";
import { useEffect, useRef } from "react";

import { AspectRatioSelection } from "./aspect-ratio-selection";
import { ChangeImageButton } from "./change-image-button";
import { ClearButton } from "./clear-button";
import { DownloadButton } from "./download-button";
import { FilenameInput } from "./filename-input";
import { LiveCropper } from "./live-cropper";
import { OuputputSettings } from "./output-settings";
import { PreviewImage } from "./preview-image";
import { RotationControl } from "./rotation-control";
import { ZoomControl } from "./zoom-control";

export const CropperSection = () => {
    const { imgSrc, previewUrl } = useImageCropperStore();

    const imgRef = useRef<HTMLImageElement>(null);

    // Clean up object URLs when component unmounts
    useEffect(() => {
        return () => {
            if (imgSrc.startsWith("blob:")) {
                URL.revokeObjectURL(imgSrc);
            }
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [imgSrc, previewUrl]);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <AspectRatioSelection imgRef={imgRef} />
                    <ZoomControl />
                    <RotationControl />
                </div>
                <div className="space-y-4">
                    <OuputputSettings />
                    <FilenameInput />
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <LiveCropper imgRef={imgRef} />
                <PreviewImage />
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
                <DownloadButton imgRef={imgRef} />
                <ClearButton />
                <ChangeImageButton />
            </div>
        </div>
    );
};
