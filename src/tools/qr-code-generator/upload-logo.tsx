import type { ChangeEvent } from "react";

import { useRef, useState } from "react";
import { useQrCodeGeneratorStore } from "./store";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export const UploadLogo = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [fileName, setFileName] = useState<string>("");

    const { logoUrl, setLogoUrl, logoSize, setLogoSize } = useQrCodeGeneratorStore();

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            const objectUrl = URL.createObjectURL(file);
            setLogoUrl(objectUrl);
        }
    };

    const handleClearLogo = () => {
        setLogoUrl("");
        setFileName("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="logo-upload">Upload Logo (Optional)</Label>
                <div className="flex gap-2">
                    <Input
                        id="logo-upload"
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="flex-1"
                    />
                    {logoUrl && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleClearLogo}
                            className="whitespace-nowrap"
                        >
                            Clear
                        </Button>
                    )}
                </div>
                {fileName && (
                    <p className="text-xs text-muted-foreground mt-1">Uploaded: {fileName}</p>
                )}
            </div>
            {logoUrl && (
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="logo-size">Logo Size</Label>
                        <span className="text-xs text-muted-foreground">{logoSize}px</span>
                    </div>
                    <Slider
                        id="logo-size"
                        min={20}
                        max={100}
                        step={5}
                        value={[logoSize]}
                        onValueChange={(value) => setLogoSize(value[0])}
                    />
                </div>
            )}
        </div>
    );
};
