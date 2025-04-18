import { useQrCodeGeneratorStore } from "./store";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const SelectionContentText = () => {
    const { text, setText } = useQrCodeGeneratorStore();

    return (
        <div className="space-y-2">
            <Label htmlFor="text-input">Text Content</Label>
            <Textarea
                id="text-input"
                placeholder="Enter your text here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={5}
            />
        </div>
    );
};
