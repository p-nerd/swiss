import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

// Error correction levels
const ERROR_CORRECTION_LEVELS = [
    { value: "L", label: "Low (7%)" },
    { value: "M", label: "Medium (15%)" },
    { value: "Q", label: "Quartile (25%)" },
    { value: "H", label: "High (30%)" }
];

export const CustomizeQRCode = () => {
    const [size, setSize] = useState<number>(200);
    const [errorCorrection, setErrorCorrection] = useState<"L" | "M" | "Q" | "H">("M");
    const [bgColor, setBgColor] = useState<string>("#FFFFFF");
    const [fgColor, setFgColor] = useState<string>("#000000");
    const [includeMargin, setIncludeMargin] = useState<boolean>(true);
    const [logoUrl, setLogoUrl] = useState<string>("");
    const [logoSize, setLogoSize] = useState<number>(50);

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium">Customize QR Code</h3>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label htmlFor="qr-size">Size</Label>
                    <span className="text-xs text-muted-foreground">{size}px</span>
                </div>
                <Slider
                    id="qr-size"
                    min={100}
                    max={400}
                    step={10}
                    value={[size]}
                    onValueChange={(value) => setSize(value[0])}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="error-correction">Error Correction</Label>
                <Select
                    value={errorCorrection}
                    onValueChange={(value) => setErrorCorrection(value as "L" | "M" | "Q" | "H")}
                >
                    <SelectTrigger id="error-correction">
                        <SelectValue placeholder="Select error correction level" />
                    </SelectTrigger>
                    <SelectContent>
                        {ERROR_CORRECTION_LEVELS.map((level) => (
                            <SelectItem key={level.value} value={level.value}>
                                {level.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                    Higher levels allow QR codes to remain readable even when partially damaged or
                    obscured
                </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                    <Label htmlFor="bg-color">Background Color</Label>
                    <div className="flex items-center gap-2">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-8 h-8 p-0"
                                    style={{ backgroundColor: bgColor }}
                                    aria-label="Pick background color"
                                >
                                    <span className="sr-only">Pick background color</span>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-2">
                                <input
                                    type="color"
                                    value={bgColor}
                                    onChange={(e) => setBgColor(e.target.value)}
                                    className="w-32 h-32 cursor-pointer"
                                />
                            </PopoverContent>
                        </Popover>
                        <Input
                            id="bg-color"
                            value={bgColor}
                            onChange={(e) => setBgColor(e.target.value)}
                            className="font-mono"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="fg-color">Foreground Color</Label>
                    <div className="flex items-center gap-2">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-8 h-8 p-0"
                                    style={{ backgroundColor: fgColor }}
                                    aria-label="Pick foreground color"
                                >
                                    <span className="sr-only">Pick foreground color</span>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-2">
                                <input
                                    type="color"
                                    value={fgColor}
                                    onChange={(e) => setFgColor(e.target.value)}
                                    className="w-32 h-32 cursor-pointer"
                                />
                            </PopoverContent>
                        </Popover>
                        <Input
                            id="fg-color"
                            value={fgColor}
                            onChange={(e) => setFgColor(e.target.value)}
                            className="font-mono"
                        />
                    </div>
                </div>
            </div>

            <div className="flex items-center space-x-2">
                <Switch
                    id="include-margin"
                    checked={includeMargin}
                    onCheckedChange={setIncludeMargin}
                />
                <Label htmlFor="include-margin">Include Margin</Label>
            </div>

            <div className="space-y-2">
                <Label htmlFor="logo-url">Logo URL (Optional)</Label>
                <Input
                    id="logo-url"
                    placeholder="https://example.com/logo.png"
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                />
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
        </div>
    );
};
