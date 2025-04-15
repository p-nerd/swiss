import { useRef } from "react";
import { useImageCropperStore } from "./store";

import { ClearButton } from "./clear-button";
import { DownloadButton } from "./download-button";
import { FilenameInput } from "./filename-input";
import { LiveCropper } from "./live-cropper";
import { OuputputFormat } from "./output-format";
import { PreviewImage } from "./preview-image";
import { UploadImageArea } from "./upload-image-area";
import { UploadImageButton } from "./upload-image-button";

import { AspectRatioSelection } from "./old/aspect-ratio-selection";
import { RotationControl } from "./old/rotation-control";
import { ZoomControl } from "./old/zoom-control";

export const ImageCropperComponent = () => {
    const { originalImageUrl } = useImageCropperStore();

    const imgRef = useRef<HTMLImageElement>(null);

    return (
        <div className="space-y-6">
            {!originalImageUrl ? (
                <UploadImageArea />
            ) : (
                <div className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-full space-y-4">
                            <AspectRatioSelection imgRef={imgRef} />
                            <ZoomControl />
                            <RotationControl />
                        </div>
                        <div className="w-full space-y-4">
                            <OuputputFormat />
                            <FilenameInput />
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="flex-1">
                            <LiveCropper />
                        </div>
                        <div className="flex-1">
                            <PreviewImage />
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3 justify-center">
                        <DownloadButton />
                        <UploadImageButton />
                        <ClearButton />
                    </div>
                </div>
            )}
        </div>
    );
};
