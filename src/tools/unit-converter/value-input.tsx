import { convertValue } from "./convert-value";
import { useUnitConverterStore } from "./store";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const ValueInput = () => {
    const {
        category,
        isValidInput,
        inputValue,
        fromUnit,
        toUnit,
        setIsValidInput,
        setResult,
        setInputValue
    } = useUnitConverterStore();

    const handleInputChange = (value: string) => {
        if (value === "" || /^-?\d*\.?\d*$/.test(value)) {
            setInputValue(value);
            setIsValidInput(true);
            setResult(convertValue(true, value, category, fromUnit, toUnit));
        } else {
            setIsValidInput(false);
        }
    };

    return (
        <div className="space-y-2">
            <Label htmlFor="input-value">Value</Label>
            <Input
                id="input-value"
                type="text"
                value={inputValue}
                onChange={(e) => handleInputChange(e.target.value)}
                className={`font-mono ${!isValidInput ? "border-red-500" : ""}`}
            />
            {!isValidInput && <p className="text-red-500 text-xs">Please enter a valid number</p>}
        </div>
    );
};
