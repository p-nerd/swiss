import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

import { useEffect } from "react";
import { conversionFactors } from "./conversion-factors";
import { conversionUnits } from "./conversion-units";
import { convertTemperature } from "./convert-temperature";
import { useUnitConverterStore } from "./store";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRightLeftIcon } from "lucide-react";

import { AboutSection } from "./about-section";
import { CategorySelection } from "./category-selection";

export const UnitConverterComponent = () => {
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

    const swapUnits = () => {
        const temp = fromUnit;
        setFromUnit(toUnit);
        setToUnit(temp);
    };

    return (
        <div className="space-y-6">
            <CategorySelection />

            {/* Converter Interface */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Input Section */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="input-value">Value</Label>
                        <Input
                            id="input-value"
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            className={`font-mono ${!isValidInput ? "border-red-500" : ""}`}
                        />
                        {!isValidInput && (
                            <p className="text-red-500 text-xs">Please enter a valid number</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="from-unit">From</Label>
                        <Select value={fromUnit} onValueChange={setFromUnit}>
                            <SelectTrigger id="from-unit">
                                <SelectValue placeholder="Select unit" />
                            </SelectTrigger>
                            <SelectContent>
                                {conversionUnits[category as keyof typeof conversionUnits]?.map(
                                    (unit) => (
                                        <SelectItem key={unit.value} value={unit.value}>
                                            {unit.label}
                                        </SelectItem>
                                    )
                                )}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={swapUnits}
                            className="rounded-full h-10 w-10"
                        >
                            <ArrowRightLeftIcon className="h-4 w-4" />
                            <span className="sr-only">Swap units</span>
                        </Button>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="to-unit">To</Label>
                        <Select value={toUnit} onValueChange={setToUnit}>
                            <SelectTrigger id="to-unit">
                                <SelectValue placeholder="Select unit" />
                            </SelectTrigger>
                            <SelectContent>
                                {conversionUnits[category as keyof typeof conversionUnits]?.map(
                                    (unit) => (
                                        <SelectItem key={unit.value} value={unit.value}>
                                            {unit.label}
                                        </SelectItem>
                                    )
                                )}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Result Section */}
                <div className="flex flex-col justify-center space-y-4">
                    <AboutSection />
                </div>
            </div>
        </div>
    );
};
