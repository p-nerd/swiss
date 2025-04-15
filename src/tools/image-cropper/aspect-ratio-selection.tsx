import type { TAspectRatioKey } from "@/types/image-generator";
import type { RefObject } from "react";

import { aspectRatios, getCompletedCrop, getCrop } from "@/lib/image";
import { useImageCropperStore } from "@/states/use-image-cropper-store";

import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const AspectRatioSelection = ({
    imgRef
}: {
    imgRef: RefObject<HTMLImageElement | null>;
}) => {
    const { aspectRatio, setAspectRatio, setCrop, setCompletedCrop } = useImageCropperStore();

    const handleAspectRatio = (aspectRatio: TAspectRatioKey) => {
        setAspectRatio(aspectRatio);

        if (!imgRef.current) {
            return;
        }

        const image = imgRef.current;

        const crop = getCrop(image, aspectRatio);
        const completedCrop = getCompletedCrop(crop, image);

        setCrop(crop);
        setCompletedCrop(completedCrop);
    };

    return (
        <div className="space-y-2">
            <Label>Aspect Ratio</Label>
            <Tabs
                defaultValue={aspectRatio}
                value={aspectRatio}
                onValueChange={(value: string) => handleAspectRatio(value as TAspectRatioKey)}
                className="w-full"
            >
                <TabsList className="grid grid-cols-3 md:grid-cols-6 h-auto">
                    {Object.keys(aspectRatios).map((aspectRatio) => (
                        <TabsTrigger
                            key={aspectRatio}
                            value={aspectRatio}
                            className="capitalize text-xs"
                        >
                            {aspectRatio}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>
        </div>
    );
};
