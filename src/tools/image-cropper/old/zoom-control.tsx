import { useImageCropperStore } from "@/states/use-image-cropper-store";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ZoomInIcon } from "lucide-react";

export const ZoomControl = () => {
    const { scale, setScale } = useImageCropperStore();

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <Label htmlFor="zoom">Zoom</Label>
                <span className="text-xs text-muted-foreground">{Math.round(scale * 100)}%</span>
            </div>
            <div className="flex items-center gap-2">
                <ZoomInIcon className="h-4 w-4 text-muted-foreground" />
                <Slider
                    id="zoom"
                    min={0.5}
                    max={3}
                    step={0.01}
                    value={[scale]}
                    onValueChange={(value) => setScale(value[0])}
                />
            </div>
        </div>
    );
};
