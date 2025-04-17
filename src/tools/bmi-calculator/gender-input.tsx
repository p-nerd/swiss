import { useBMICalculatorStore } from "./store";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const GenderInput = () => {
    const { gender, setGender } = useBMICalculatorStore();

    return (
        <div className="space-y-2">
            <Label>Gender (optional)</Label>
            <RadioGroup value={gender} onValueChange={setGender} className="flex gap-4">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male" className="cursor-pointer">
                        Male
                    </Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female" className="cursor-pointer">
                        Female
                    </Label>
                </div>
            </RadioGroup>
        </div>
    );
};
