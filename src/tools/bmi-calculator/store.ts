import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const defaultHeightMeter: number = 1.7;

export const useBMICalculatorStore = create<{
    heightMeter: number;
    setHeightMeter: (heightMeter: number) => void;
}>()(
    immer((set) => ({
        heightMeter: defaultHeightMeter,
        setHeightMeter: (heightMeter) => set({ heightMeter })
    }))
);
