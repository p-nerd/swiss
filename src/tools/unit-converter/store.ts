import type { TCategory } from "./category-options";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const defaultCategory: TCategory = "length";

export const useUnitConverterStore = create<{
    category: TCategory;
    setCategory: (category: TCategory) => void;
}>()(
    immer((set) => ({
        category: defaultCategory,
        setCategory: (category) => set({ category })
    }))
);
