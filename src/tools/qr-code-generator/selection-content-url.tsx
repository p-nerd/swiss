import { useQrCodeGeneratorStore } from "./store";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const SelectionContentURL = () => {
    const { url, setUrl } = useQrCodeGeneratorStore();

    return (
        <div className="space-y-2">
            <Label htmlFor="url-input">Website URL</Label>
            <Input
                id="url-input"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
        </div>
    );
};
