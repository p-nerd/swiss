import type { TCropperRef } from "./types";

import { getZoomFactor } from "advanced-cropper/extensions/absolute-zoom";
import { useImageCropperStore } from "./store";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ZoomInIcon } from "lucide-react";

export const ZoomControl = ({ cropperRef }: { cropperRef: TCropperRef }) => {
    const { zoom } = useImageCropperStore();

    const handleZoom = (value: number) => {
        const cropper = cropperRef.current;
        if (cropper) {
            const factor = getZoomFactor(cropper.getState(), cropper.getSettings(), value);
            cropper.zoomImage(factor, { transitions: false });
        }
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <Label htmlFor="zoom">Zoom</Label>
                <span className="text-xs text-muted-foreground">
                    {Math.round(zoom * 100) + 100}%
                </span>
            </div>
            <div className="flex items-center gap-2">
                <ZoomInIcon className="h-4 w-4 text-muted-foreground" />
                <Slider
                    id="zoom"
                    min={0}
                    max={1}
                    step={0.01}
                    value={[zoom]}
                    onValueChange={(value) => handleZoom(value[0])}
                />
            </div>
        </div>
    );
};
