import { useEffect, type RefObject } from "react";
import { centerAspectCrop } from "./manipulation-utils";
import { aspectRatios, useImageCropperStore } from "./use-image-cropper-store";

import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const AspectRatioSelection = ({
    imgRef
}: {
    imgRef: RefObject<HTMLImageElement | null>;
}) => {
    const { imgSrc, aspectRatio, setAspectRatio, setCrop } = useImageCropperStore();

    // Reset crop when aspect ratio changes
    useEffect(() => {
        if (imgRef.current && aspectRatio !== "free") {
            const { width, height } = imgRef.current;
            const newCrop = centerAspectCrop(width, height, aspectRatios[aspectRatio]);
            setCrop(newCrop);
        }
    }, [aspectRatio, imgSrc, setCrop]);

    return (
        <div className="space-y-2">
            <Label>Aspect Ratio</Label>
            <Tabs
                defaultValue={aspectRatio}
                value={aspectRatio}
                onValueChange={(value) => setAspectRatio(value as keyof typeof aspectRatios)}
                className="w-full"
            >
                <TabsList className="grid grid-cols-3 md:grid-cols-6 h-auto">
                    <TabsTrigger value="free" className="text-xs">
                        Free
                    </TabsTrigger>
                    <TabsTrigger value="1:1" className="text-xs">
                        1:1
                    </TabsTrigger>
                    <TabsTrigger value="4:3" className="text-xs">
                        4:3
                    </TabsTrigger>
                    <TabsTrigger value="16:9" className="text-xs">
                        16:9
                    </TabsTrigger>
                    <TabsTrigger value="3:4" className="text-xs">
                        3:4
                    </TabsTrigger>
                    <TabsTrigger value="9:16" className="text-xs">
                        9:16
                    </TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
    );
};
