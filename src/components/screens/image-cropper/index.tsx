import { useImageCropperStore } from "@/states/use-image-cropper-store";

import { CropperSection } from "./cropper-section";
import { UploadImage } from "./upload-image";

export const ImageCropperComponent = () => {
    const { imgSrc } = useImageCropperStore();

    return (
        <div className="space-y-6">
            {!imgSrc && <UploadImage />}
            {imgSrc && <CropperSection />}
        </div>
    );
};
