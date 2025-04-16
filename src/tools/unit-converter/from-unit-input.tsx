import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

import { conversionUnits } from "./conversion-units";
import { useUnitConverterStore } from "./store";

import { Label } from "@/components/ui/label";

export const FromUnitInput = () => {
    const { category, fromUnit, setFromUnit } = useUnitConverterStore();

    return (
        <div className="space-y-2">
            <Label htmlFor="from-unit">From</Label>
            <Select value={fromUnit} onValueChange={setFromUnit}>
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
