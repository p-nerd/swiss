import type { TCropperRef } from "./types";

import { useImageCropperStore } from "./store";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RotateCwIcon } from "lucide-react";

export const RotationControl = ({ cropperRef }: { cropperRef: TCropperRef }) => {
    const { rotate } = useImageCropperStore();

    const handleRotate = (newRotate: number) => {
        const cropper = cropperRef.current;
        if (!cropper) return;
        const diff = newRotate - rotate;
        cropper.rotateImage(diff);
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <Label htmlFor="rotation">Rotation</Label>
                <span className="text-xs text-muted-foreground">{rotate}°</span>
            </div>
            <div className="flex items-center gap-2">
                <RotateCwIcon className="h-4 w-4 text-muted-foreground" />
                <Slider
                    id="rotation"
                    min={0}
                    max={360}
                    step={1}
                    value={[rotate]}
                    onValueChange={(value) => handleRotate(value[0])}
                />
            </div>
        </div>
    );
};
