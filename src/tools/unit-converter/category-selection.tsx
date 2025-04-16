import type { TCategory } from "./category-options";

import { categoryOptions } from "./category-options";
import { conversionUnits } from "./conversion-units";
import { convertValue } from "./convert-value";
import { useUnitConverterStore } from "./store";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const CategorySelection = () => {
    const {
        isValidInput,
        inputValue,
        category,
        fromUnit,
        toUnit,
        setCategory,
        setFromUnit,
        setToUnit,
        setResult
    } = useUnitConverterStore();

    const handleUpdateCategory = (category: TCategory) => {
        setCategory(category);

        const conversionUnit = conversionUnits[category as keyof typeof conversionUnits];

        if (conversionUnit) {
            setFromUnit(conversionUnit[0].value);
            setToUnit(conversionUnit[1].value);
        }

        setResult(convertValue(isValidInput, inputValue, category, fromUnit, toUnit));
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
