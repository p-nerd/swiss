import { useRef } from "react";
import { useImageCropperStore } from "./store";

import { ClearButton } from "./clear-button";
import { DownloadButton } from "./download-button";
import { LiveCropper } from "./live-cropper";
import { PreviewImage } from "./preview-image";
import { UploadImageArea } from "./upload-image-area";
import { UploadImageButton } from "./upload-image-button";

import { AspectRatioSelection } from "./old/aspect-ratio-selection";
import { FilenameInput } from "./old/filename-input";
import { OuputputSettings } from "./old/output-settings";
import { RotationControl } from "./old/rotation-control";
import { ZoomControl } from "./old/zoom-control";

export const ImageCropperComponent = () => {
    const { originalImageUrl } = useImageCropperStore();

    const imgRef = useRef<HTMLImageElement>(null);

    return (
        <div className="space-y-6">
            {!originalImageUrl && <UploadImageArea />}
            {originalImageUrl && (
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
                        <LiveCropper />
                        <PreviewImage />
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
