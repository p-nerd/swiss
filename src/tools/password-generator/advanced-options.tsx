import { usePasswordGeneratorStore } from "./store";

import { Label } from "@/components/ui/label";
import { CheckboxInput } from "./checkbox-input";

export const AdvancedOptions = () => {
    const { excludeSimilar, setExcludeSimilar, excludeAmbiguous, setExcludeAmbiguous } =
        usePasswordGeneratorStore();

    return (
        <div className="space-y-3">
            <Label>Advanced Options</Label>
            <div className="grid grid-cols-1 gap-2">
                <CheckboxInput
                    id="excludeSimilar"
                    value={excludeSimilar}
                    onValue={setExcludeSimilar}
                    label="Exclude Similar (i, l, 1, L, o, 0, O)"
                />
                <CheckboxInput
                    id="excludeAmbiguous"
                    value={excludeAmbiguous}
                    onValue={setExcludeAmbiguous}
                    label="Exclude Similar (i, l, 1, L, o, 0, O)"
                />
            </div>
        </div>
    );
};
