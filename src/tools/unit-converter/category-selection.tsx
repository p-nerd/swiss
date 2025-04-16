import type { TCategory } from "./category-options";

import { categoryOptions } from "./category-options";
import { useUnitConverterStore } from "./store";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const CategorySelection = () => {
    const { category, setCategory } = useUnitConverterStore();

    return (
        <Tabs
            defaultValue="length"
            value={category}
            onValueChange={(value) => setCategory(value as TCategory)}
            className="w-full"
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
    );
};
