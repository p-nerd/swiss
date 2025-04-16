import { conversionUnits } from "./conversion-units";
import { useUnitConverterStore } from "./store";

import { CalculatorIcon } from "lucide-react";

export const ResultSection = () => {
    const { isValidInput, result, category, inputValue, fromUnit, toUnit } =
        useUnitConverterStore();

    return (
        <div className="text-center">
            <CalculatorIcon className="h-12 w-12 mx-auto text-green-500 dark:text-green-400 mb-2" />
            <h3 className="text-lg font-medium mb-2">Conversion Result</h3>
            <div className="text-3xl font-bold font-mono">
                {isValidInput ? result : "Invalid input"}
            </div>
            {isValidInput && inputValue !== "" && (
                <p className="text-sm text-muted-foreground mt-2">
                    {inputValue}{" "}
                    {
                        conversionUnits[category as keyof typeof conversionUnits]?.find(
                            (u) => u.value === fromUnit
                        )?.label
                    }{" "}
                    = {result}{" "}
                    {
                        conversionUnits[category as keyof typeof conversionUnits]?.find(
                            (u) => u.value === toUnit
                        )?.label
                    }
                </p>
            )}
        </div>
    );
};
