import type { TFileType } from "@/types/image-generator";

import { fileTypeOptions, getFileName } from "./files";
import { useImageCropperStore } from "./store";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const OuputputFormat = () => {
    const { fileName, fileType, setFileType, fileQuality, setFileQuality, setFileName } =
        useImageCropperStore();

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label>Output Format</Label>
                <Tabs
                    defaultValue={fileType}
                    value={fileType}
                    onValueChange={(value) => {
                        const fileType = value as TFileType;

                        setFileType(fileType);
                        setFileName(getFileName(fileName, fileType));
                    }}
                    className="w-full"
                >
                    <TabsList className="grid grid-cols-3 h-auto">
                        {fileTypeOptions.map((fileTypeOption) => (
                            <TabsTrigger
                                key={fileTypeOption.value}
                                value={fileTypeOption.value}
                                className="text-xs"
                            >
                                {fileTypeOption.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
            </div>
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
        </div>
    );
};
