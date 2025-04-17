import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

import type { TUnitType } from "./options";

import { useState } from "react";
import { unitOptions } from "./options";
import { useBMICalculatorStore } from "./store";
import { kilogramsToPounds, poundsToKilograms } from "./utils";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const WeightInput = () => {
    const [weightUnit, setWeightUnit] = useState<TUnitType>("imperial");

    const { weightKilograms, setWeightKilograms } = useBMICalculatorStore();

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="weight-unit">Weight Unit</Label>
                <Select value={weightUnit} onValueChange={setWeightUnit}>
                    <SelectTrigger id="weight-unit">
                        <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                        {unitOptions.map((o) => (
                            <SelectItem key={o.value} value={o.value}>
                                {o.weightLabel}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            {weightUnit === "metric" ? (
                <>
                    <div className="space-y-2">
                        <Label htmlFor="weight-kg">Weight (kg)</Label>
                        <Input
                            id="weight-kg"
                            type="number"
                            min="20"
                            max="300"
                            value={weightKilograms}
                            onChange={(e) => setWeightKilograms(Number(e.target.value))}
                            placeholder="Weight in kilograms"
                        />
                    </div>
                </>
            ) : (
                <>
                    <div className="space-y-2">
                        <Label htmlFor="weight-lbs">Weight (lb)</Label>
                        <Input
                            id="weight-lbs"
                            type="number"
                            min="40"
                            max="700"
                            value={kilogramsToPounds(weightKilograms)}
                            onChange={(e) =>
                                setWeightKilograms(poundsToKilograms(Number(e.target.value)))
                            }
                            placeholder="Weight in pounds"
                        />
                    </div>
                </>
            )}
        </div>
    );
};
