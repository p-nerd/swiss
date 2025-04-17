import { useBMICalculatorStore } from "./store";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const AgeInput = () => {
    const { age, setAge } = useBMICalculatorStore();

    return (
        <div className="space-y-2">
            <Label htmlFor="age">Age (optional)</Label>
            <Input
                id="age"
                type="number"
                min="2"
                max="120"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                placeholder="Your age"
            />
        </div>
    );
};
