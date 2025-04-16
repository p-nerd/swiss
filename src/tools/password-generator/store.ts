import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { calculateStrength, generatePassword } from "./utils";

export const usePasswordGeneratorStore = create<{
    password: string;
    setPassword: (password: string) => void;

    length: number;
    setLength: (length: number) => void;

    includeUppercase: boolean;
    setIncludeUppercase: (includeUppercase: boolean) => void;

    includeLowercase: boolean;
    setIncludeLowercase: (includeLowercase: boolean) => void;

    includeNumbers: boolean;
    setIncludeNumbers: (includeNumbers: boolean) => void;

    includeSymbols: boolean;
    setIncludeSymbols: (includeSymbols: boolean) => void;

    excludeSimilar: boolean;
    setExcludeSimilar: (excludeSimilar: boolean) => void;

    excludeAmbiguous: boolean;
    setExcludeAmbiguous: (excludeAmbiguous: boolean) => void;

    strength: number;
    setStrength: (strength: number) => void;

    generatePassword: () => void;
}>()(
    immer((set, get) => ({
        password: "",
        setPassword: (password) => {
            set({ password });
        },

        length: 12,
        setLength: (length) => {
            set({ length });
            get().generatePassword();
        },

        includeUppercase: true,
        setIncludeUppercase: (includeUppercase) => {
            set({ includeUppercase });
            get().generatePassword();
        },

        includeLowercase: true,
        setIncludeLowercase: (includeLowercase) => {
            set({ includeLowercase });
            get().generatePassword();
        },

        includeNumbers: true,
        setIncludeNumbers: (includeNumbers) => {
            set({ includeNumbers });
            get().generatePassword();
        },

        includeSymbols: true,
        setIncludeSymbols: (includeSymbols) => {
            set({ includeSymbols });
            get().generatePassword();
        },

        excludeSimilar: false,
        setExcludeSimilar: (excludeSimilar) => {
            set({ excludeSimilar });
            get().generatePassword();
        },

        excludeAmbiguous: false,
        setExcludeAmbiguous: (excludeAmbiguous) => {
            set({ excludeAmbiguous });
            get().generatePassword();
        },

        strength: 0,
        setStrength: (strength) => {
            set({ strength });
        },

        generatePassword: () => {
            set((state) => {
                const password = generatePassword(
                    state.length,
                    state.includeUppercase,
                    state.includeLowercase,
                    state.includeNumbers,
                    state.includeSymbols,
                    state.excludeSimilar,
                    state.excludeAmbiguous
                );

                state.strength = calculateStrength(password);
                state.password = password;
            });
        }
    }))
);
