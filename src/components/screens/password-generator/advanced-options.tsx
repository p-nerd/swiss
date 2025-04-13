import { usePasswordGeneratorStore } from "@/states/use-password-generator-store";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export const AdvancedOptions = () => {
    const { excludeSimilar, setExcludeSimilar, excludeAmbiguous, setExcludeAmbiguous } =
        usePasswordGeneratorStore();

    return (
        <div className="space-y-3">
            <Label>Advanced Options</Label>
            <div className="grid grid-cols-1 gap-2">
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="excludeSimilar"
                        checked={excludeSimilar}
                        onCheckedChange={(v) => setExcludeSimilar(!!v)}
                    />
                    <Label htmlFor="excludeSimilar" className="cursor-pointer">
                        Exclude Similar (i, l, 1, L, o, 0, O)
                    </Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="excludeAmbiguous"
                        checked={excludeAmbiguous}
                        onCheckedChange={(v) => setExcludeAmbiguous(!!v)}
                    />
                    <Label htmlFor="excludeAmbiguous" className="cursor-pointer">
                        Exclude Ambiguous ({"{}[]()/'\"~,.;:<>"})
                    </Label>
                </div>
            </div>
        </div>
    );
};
