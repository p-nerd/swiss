import type { TAspectRatioKey } from "./images";
import type { TCropperRef } from "./types";

import { aspectRatios } from "./images";
import { useImageCropperStore } from "./store";

import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const AspectRatioSelection = ({ cropperRef }: { cropperRef: TCropperRef }) => {
    const { aspectRatio, setAspectRatio } = useImageCropperStore();

    return (
        <div className="space-y-2">
            <Label>Aspect Ratio</Label>
            <Tabs
                defaultValue={aspectRatio}
                value={aspectRatio}
                onValueChange={(value: string) => {
                    cropperRef.current?.reset();
                    setAspectRatio(value as TAspectRatioKey);
                }}
                className="w-full"
            >
                <TabsList className="">
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
