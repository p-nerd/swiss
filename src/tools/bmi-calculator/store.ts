import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const defaultHeightMeter: number = 1.7;
const defaultWeightKilograms: number = 70;

export const useBMICalculatorStore = create<{
    heightMeter: number;
    setHeightMeter: (heightMeter: number) => void;

    weightKilograms: number;
    setWeightKilograms: (weightKilograms: number) => void;
}>()(
    immer((set) => ({
        heightMeter: defaultHeightMeter,
        setHeightMeter: (heightMeter) => set({ heightMeter }),

        weightKilograms: defaultWeightKilograms,
        setWeightKilograms: (weightKilograms) => set({ weightKilograms })
    }))
);
