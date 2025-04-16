import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

import { conversionUnits } from "./conversion-units";
import { convertValue } from "./convert-value";
import { useUnitConverterStore } from "./store";

import { Label } from "@/components/ui/label";

export const FromUnitInput = () => {
    const { isValidInput, inputValue, category, fromUnit, toUnit, setFromUnit, setResult } =
        useUnitConverterStore();

    const handleFromUnit = (value: string) => {
        setFromUnit(value);
        setResult(convertValue(isValidInput, inputValue, category, fromUnit, toUnit));
    };

    return (
        <div className="space-y-2">
            <Label htmlFor="from-unit">From</Label>
            <Select value={fromUnit} onValueChange={handleFromUnit}>
                <SelectTrigger id="from-unit">
                    <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                    {conversionUnits[category as keyof typeof conversionUnits]?.map((unit) => (
                        <SelectItem key={unit.value} value={unit.value}>
                            {unit.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};
