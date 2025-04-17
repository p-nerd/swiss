import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type TGender = "male" | "female";

const defaultHeightMeters: number = 1.7;
const defaultWeightKilograms: number = 70;
const defaultGender: TGender = "male";
const defaultAge: number = 30;
const defaultBMI: number = 0;
const defaultShowResults: boolean = false;
const defaultErrorMessage: string | null = null;

export const useBMICalculatorStore = create<{
    heightMeters: number;
    setHeightMeter: (heightMeters: number) => void;

    weightKilograms: number;
    setWeightKilograms: (weightKilograms: number) => void;

    gender: TGender;
    setGender: (gender: TGender) => void;

    age: number;
    setAge: (age: number) => void;

    showResults: boolean;
    setShowResults: (showResults: boolean) => void;

    bmi: number;
    setBMI: (bmi: number) => void;

    errorMessage: string | null;
    setErrorMessage: (errorMessage: string | null) => void;

    reset: () => void;
}>()(
    immer((set) => ({
        heightMeters: defaultHeightMeters,
        setHeightMeter: (heightMeters) => set({ heightMeters }),

        weightKilograms: defaultWeightKilograms,
        setWeightKilograms: (weightKilograms) => set({ weightKilograms }),

        gender: defaultGender,
        setGender: (gender) => set({ gender }),

        age: defaultAge,
        setAge: (age) => set({ age }),

        showResults: defaultShowResults,
        setShowResults: (showResults) => set({ showResults }),

        bmi: defaultBMI,
        setBMI: (bmi) => set({ bmi }),

        errorMessage: defaultErrorMessage,
        setErrorMessage: (errorMessage) => set({ errorMessage }),

        reset: () => {
            return set({
                heightMeters: defaultHeightMeters,
                weightKilograms: defaultWeightKilograms,
                gender: defaultGender,
                age: defaultAge,
                showResults: defaultShowResults,
                bmi: defaultBMI
            });
        }
    }))
);
