import { useEffect } from "react";
import { conversionFactors } from "./conversion-factors";
import { conversionUnits } from "./conversion-units";
import { convertTemperature } from "./convert-temperature";
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
        setInputValue,
        setFromUnit,
        setToUnit
    } = useUnitConverterStore();

    // Set default units when category changes
    useEffect(() => {
        if (conversionUnits[category as keyof typeof conversionUnits]) {
            const units = conversionUnits[category as keyof typeof conversionUnits];
            setFromUnit(units[0].value);
            setToUnit(units[1].value);
        }
    }, [category]);

    // Perform conversion when inputs change
    useEffect(() => {
        if (fromUnit && toUnit && isValidInput && inputValue !== "") {
            convertValue();
        }
    }, [inputValue, fromUnit, toUnit, category]);

    const convertValue = () => {
        if (!isValidInput || inputValue === "") {
            setResult("Invalid input");
            return;
        }

        const value = Number(inputValue);

        // Special case for temperature
        if (category === "temperature") {
            const convertedValue = convertTemperature(value, fromUnit, toUnit);
            setResult(Number(convertedValue.toFixed(8)));
            return;
        }

        // For other units, use conversion factors
        const factors = conversionFactors[category as keyof typeof conversionFactors];
        if (!factors) return;

        // Convert to base unit, then to target unit
        const baseValue = value * factors[fromUnit as keyof typeof factors];
        const convertedValue = baseValue / factors[toUnit as keyof typeof factors];

        // Format the result to avoid floating point issues
        // Show fewer decimal places for larger numbers
        let formattedResult: number;
        if (Math.abs(convertedValue) >= 1000) {
            formattedResult = Number(convertedValue.toFixed(2));
        } else if (Math.abs(convertedValue) >= 10) {
            formattedResult = Number(convertedValue.toFixed(4));
        } else {
            formattedResult = Number(convertedValue.toFixed(8));
        }

        // Remove trailing zeros
        setResult(formattedResult);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        // Allow empty input or valid numbers (including decimals and negative)
        if (value === "" || /^-?\d*\.?\d*$/.test(value)) {
            setInputValue(value);
            setIsValidInput(true);
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
                onChange={handleInputChange}
                className={`font-mono ${!isValidInput ? "border-red-500" : ""}`}
            />
            {!isValidInput && <p className="text-red-500 text-xs">Please enter a valid number</p>}
        </div>
    );
};
