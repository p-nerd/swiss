import { useImageCropperStore } from "./use-image-cropper-store";

import { Card, CardContent } from "@/components/ui/card";
import { CropperSection } from "./cropper-section";
import { UploadImage } from "./upload-image";

export const ImageCropperComponent = () => {
    const { imgSrc } = useImageCropperStore();

    return (
        <Card className="w-full">
            <CardContent className="p-6">
                <div className="space-y-6">
                    {!imgSrc && <UploadImage />}
                    {imgSrc && <CropperSection />}
                </div>
            </CardContent>
        </Card>
    );
};
