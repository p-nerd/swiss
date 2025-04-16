import type { TCategory, TConversionUnitKey } from "./convert-value";

import { categoryOptions, conversionUnits, convertValue } from "./convert-value";
import { useUnitConverterStore } from "./store";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const CategorySelection = () => {
    const { isValidInput, inputValue, category, setCategory, setFromUnit, setToUnit, setResult } =
        useUnitConverterStore();

    const handleUpdateCategory = (category: TCategory) => {
        setCategory(category);

        const conversionUnit = conversionUnits[category as TConversionUnitKey];

        if (conversionUnit) {
            setFromUnit(conversionUnit[0].value);
            setToUnit(conversionUnit[1].value);
        }

        setResult(
            convertValue(
                isValidInput,
                inputValue,
                category,
                conversionUnit[0].value,
                conversionUnit[1].value
            )
        );
    };

    return (
        <div className="flex flex-col items-center w-full">
            <Tabs
                defaultValue="length"
                value={category}
                onValueChange={(value) => handleUpdateCategory(value as TCategory)}
            >
                <TabsList className="grid grid-cols-4 md:grid-cols-8 h-auto">
                    {categoryOptions.map((option) => (
                        <TabsTrigger
                            key={option.value}
                            value={option.value}
                            className="text-xs sm:text-sm"
                        >
                            {option.label}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>
        </div>
    );
};
