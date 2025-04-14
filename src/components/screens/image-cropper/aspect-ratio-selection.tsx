import type { TAspectRatioKey } from "@/types/image-generator";
import type { RefObject } from "react";

import { aspectRatios, centerAspectCrop } from "@/lib/image";
import { useImageCropperStore } from "@/states/use-image-cropper-store";

import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const AspectRatioSelection = ({
    imgRef
}: {
    imgRef: RefObject<HTMLImageElement | null>;
}) => {
    const { aspectRatio, setAspectRatio, setCrop } = useImageCropperStore();

    const handleAspectRatio = (aspectRatio: TAspectRatioKey) => {
        setAspectRatio(aspectRatio);

        if (imgRef.current && aspectRatio !== "free") {
            const { width, height } = imgRef.current;
            const newCrop = centerAspectCrop(width, height, aspectRatios[aspectRatio]);
            setCrop(newCrop);
        }
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
                        <TabsTrigger value={aspectRatio} className="text-xs">
                            {aspectRatio}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>
        </div>
    );
};
