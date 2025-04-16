import type { TCaseType } from "./case-options";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const defaultCaseType: TCaseType = "uppercase";
const defaultEnterText: string = "";
const defaultConvertedText: string = "";

export const useTextCaseConverterStore = create<{
    caseType: TCaseType;
    setCaseType: (caseType: TCaseType) => void;

    enteredText: string;
    setEnteredText: (enteredText: string) => void;

    convertedText: string;
    setConvertedText: (convertedText: string) => void;
}>()(
    immer((set) => ({
        caseType: defaultCaseType,
        setCaseType: (caseType) => set({ caseType }),

        enteredText: defaultEnterText,
        setEnteredText: (enteredText) => set({ enteredText }),

        convertedText: defaultConvertedText,
        setConvertedText: (convertedText) => set({ convertedText })
    }))
);
