import type { TCategory } from "./category-options";

import { conversionFactors } from "./conversion-factors";
import { convertTemperature } from "./convert-temperature";

export const convertValue = (
    isValidInput: boolean,
    inputValue: string | number,
    category: TCategory,
    fromUnit: string,
    toUnit: string
): string | number => {
    if (!fromUnit || !toUnit || !isValidInput || inputValue === "") {
        return "Invalid input";
    }

    const value = Number(inputValue);

    // Special case for temperature
    if (category === "temperature") {
        const convertedValue = convertTemperature(value, fromUnit, toUnit);
        return Number(convertedValue.toFixed(8));
    }

    // For other units, use conversion factors
    const factors = conversionFactors[category as keyof typeof conversionFactors];
    if (!factors) return "";

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
    return formattedResult;
};
