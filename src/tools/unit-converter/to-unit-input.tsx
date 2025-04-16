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

export const ToUnitInput = () => {
    const { category, toUnit, setToUnit } = useUnitConverterStore();

    return (
        <div className="space-y-2">
            <Label htmlFor="to-unit">To</Label>
            <Select value={toUnit} onValueChange={setToUnit}>
                <SelectTrigger id="to-unit">
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
