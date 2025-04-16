import type { CropperPreviewRef, CropperRef } from "react-advanced-cropper";

import { useRef } from "react";
import { useImageCropperStore } from "./store";

import { AspectRatioSelection } from "./aspect-ratio-selection";
import { ClearButton } from "./clear-button";
import { DownloadButton } from "./download-button";
import { FilenameInput } from "./filename-input";
import { LiveCropper } from "./live-cropper";
import { OuputputFormat } from "./output-format";
import { PreviewImage } from "./preview-image";
import { RotationControl } from "./rotation-control";
import { UploadImageArea } from "./upload-image-area";
import { UploadImageButton } from "./upload-image-button";
import { ZoomControl } from "./zoom-control";

export const ImageCropperComponent = () => {
    const { originalImageUrl } = useImageCropperStore();

    const cropperRef = useRef<CropperRef>(null);
    const previewRef = useRef<CropperPreviewRef>(null);

    return (
        <div className="space-y-6">
            {!originalImageUrl ? (
                <UploadImageArea />
            ) : (
                <div className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-full space-y-4">
                            <AspectRatioSelection />
                            <ZoomControl cropperRef={cropperRef} />
                            <RotationControl cropperRef={cropperRef} />
                        </div>
                        <div className="w-full space-y-4">
                            <OuputputFormat />
                            <FilenameInput />
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="w-full md:w-1/2">
                            <LiveCropper cropperRef={cropperRef} previewRef={previewRef} />
                        </div>
                        <div className="w-full md:w-1/2">
                            <PreviewImage previewRef={previewRef} />
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3 justify-center">
                        <DownloadButton cropperRef={cropperRef} />
                        <UploadImageButton />
                        <ClearButton />
                    </div>
                </div>
            )}
        </div>
    );
};
