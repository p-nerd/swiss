import {
    centimetersToMeters,
    feetAndInchesToMeters,
    metersToCentimeters,
    metersToFeetAndInches
} from "./utils";

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

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const HeightInput = () => {
    const [heightUnit, setHeightUnit] = useState<TUnitType>("imperial");

    const { heightMeters: heightMeter, setHeightMeter } = useBMICalculatorStore();

    const { feet, inches } = metersToFeetAndInches(heightMeter);

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="height-unit">Height Unit</Label>
                <Select value={heightUnit} onValueChange={setHeightUnit}>
                    <SelectTrigger id="height-unit" className="w-full">
                        <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                        {unitOptions.map((o) => (
                            <SelectItem key={o.value} value={o.value}>
                                {o.heightLabel}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            {heightUnit === "metric" ? (
                <div className="space-y-2">
                    <Label htmlFor="height-cm">Height (cm)</Label>
                    <Input
                        id="height-cm"
                        type="number"
                        min="50"
                        max="250"
                        value={String(metersToCentimeters(heightMeter))}
                        onChange={(e) =>
                            setHeightMeter(centimetersToMeters(Number(e.target.value)))
                        }
                        placeholder="Height in centimeters"
                    />
                </div>
            ) : (
                <div className="space-y-2">
                    <Label>Height (ft, in)</Label>
                    <div className="flex gap-2">
                        <Input
                            type="number"
                            min="0"
                            max="8"
                            value={feet}
                            onChange={(e) =>
                                setHeightMeter(
                                    feetAndInchesToMeters(Number(e.target.value), inches)
                                )
                            }
                            placeholder="Feet"
                        />
                        <Input
                            type="number"
                            min="0"
                            max="11"
                            value={inches}
                            onChange={(e) =>
                                setHeightMeter(feetAndInchesToMeters(feet, Number(e.target.value)))
                            }
                            placeholder="Inches"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
