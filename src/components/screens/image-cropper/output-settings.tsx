import type { TFileType } from "@/types/image-generator";

import { useImageCropperStore } from "./use-image-cropper-store";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const OuputputSettings = () => {
    const {
        fileType,
        setFileType,
        fileQuality,
        setFileQuality,
        maintainQuality,
        setMaintainQuality
    } = useImageCropperStore();

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label>Output Format</Label>
                <Tabs
                    defaultValue={fileType}
                    value={fileType}
                    onValueChange={(v) => setFileType(v as TFileType)}
                    className="w-full"
                >
                    <TabsList className="grid grid-cols-3 h-auto">
                        <TabsTrigger value="image/png" className="text-xs">
                            PNG
                        </TabsTrigger>
                        <TabsTrigger value="image/jpeg" className="text-xs">
                            JPEG
                        </TabsTrigger>
                        <TabsTrigger value="image/webp" className="text-xs">
                            WebP
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            {/* Quality Control (only for JPEG and WebP) */}
            {fileType !== "image/png" && (
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="quality">Quality</Label>
                        <span className="text-xs text-muted-foreground">
                            {Math.round(fileQuality * 100)}%
                        </span>
                    </div>
                    <Slider
                        id="quality"
                        min={0.1}
                        max={1}
                        step={0.01}
                        value={[fileQuality]}
                        onValueChange={(value) => setFileQuality(value[0])}
                    />
                </div>
            )}

            {/* Maintain Original Quality Option */}
            {fileType === "image/png" && (
                <div className="flex items-center space-x-2 pt-2">
                    <Switch
                        id="maintain-quality"
                        checked={maintainQuality}
                        onCheckedChange={setMaintainQuality}
                    />
                    <Label htmlFor="maintain-quality" className="cursor-pointer">
                        Maintain original quality
                    </Label>
                </div>
            )}
        </div>
    );
};
