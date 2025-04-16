import type { TCategory, TConversionUnitKey } from "./convert-value";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { conversionUnits } from "./convert-value";

const defaultCategory: TCategory = "length";
const defaultIsValidInput: boolean = true;
const defaultInputValue: number | string = 1;
const defaultResult: number | string = 0;

const conversionUnit = conversionUnits[defaultCategory as TConversionUnitKey];

const defaultFormUnit: string = conversionUnit[0].value;
const defaultToUnit: string = conversionUnit[1].value;

export const useUnitConverterStore = create<{
    category: TCategory;
    setCategory: (category: TCategory) => void;

    isValidInput: boolean;
    setIsValidInput: (isValidInput: boolean) => void;

    inputValue: number | string;
    setInputValue: (inputValue: number | string) => void;

    result: number | string;
    setResult: (result: number | string) => void;

    fromUnit: string;
    setFromUnit: (fromUnit: string) => void;

    toUnit: string;
    setToUnit: (toUnit: string) => void;
}>()(
    immer((set) => ({
        category: defaultCategory,
        setCategory: (category) => set({ category }),

        isValidInput: defaultIsValidInput,
        setIsValidInput: (isValidInput) => set({ isValidInput }),

        inputValue: defaultInputValue,
        setInputValue: (inputValue) => set({ inputValue }),

        result: defaultResult,
        setResult: (result) => set({ result }),

        fromUnit: defaultFormUnit,
        setFromUnit: (fromUnit) => set({ fromUnit }),

        toUnit: defaultToUnit,
        setToUnit: (toUnit) => set({ toUnit })
    }))
);
