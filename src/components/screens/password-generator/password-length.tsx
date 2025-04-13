import { usePasswordGeneratorStore } from "@/states/use-password-generator-store";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export const PasswordLength = () => {
    const { length, setLength } = usePasswordGeneratorStore();

    return (
        <div className="space-y-2">
            <div className="flex justify-between">
                <Label htmlFor="length">Password Length: {length}</Label>
            </div>
            <Slider
                id="length"
                min={4}
                max={64}
                step={1}
                value={[length]}
                onValueChange={(value) => setLength(value[0])}
            />
        </div>
    );
};
