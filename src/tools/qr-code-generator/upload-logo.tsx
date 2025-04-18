import { useQrCodeGeneratorStore } from "./store";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export const UploadLogo = () => {
    const { logoUrl, setLogoUrl, logoSize, setLogoSize } = useQrCodeGeneratorStore();
    return (
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
    );
};
