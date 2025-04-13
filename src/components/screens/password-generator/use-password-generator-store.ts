import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
const similarChars = "il1Lo0O";
const ambiguousChars = "{}[]()/\\'\"`~,;:.<>";

const generatePassword = (
    length: number,
    includeUppercase: boolean,
    includeLowercase: boolean,
    includeNumbers: boolean,
    includeSymbols: boolean,
    excludeSimilar: boolean,
    excludeAmbiguous: boolean
): string => {
    // Ensure at least one character type is selected
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
        return "";
    }

    let chars = "";

    if (includeUppercase) chars += uppercaseChars;
    if (includeLowercase) chars += lowercaseChars;
    if (includeNumbers) chars += numberChars;
    if (includeSymbols) chars += symbolChars;

    // Remove similar characters if option is selected
    if (excludeSimilar) {
        for (const char of similarChars) {
            chars = chars.replace(new RegExp(char, "g"), "");
        }
    }

    // Remove ambiguous characters if option is selected
    if (excludeAmbiguous) {
        for (const char of ambiguousChars) {
            chars = chars.replace(new RegExp("\\" + char, "g"), "");
        }
    }

    // Generate password
    let newPassword = "";
    const charsLength = chars.length;

    if (charsLength === 0) {
        return "";
    }

    for (let i = 0; i < length; i++) {
        newPassword += chars.charAt(Math.floor(Math.random() * charsLength));
    }

    return newPassword;
};

const calculateStrength = (password: string): number => {
    if (!password) {
        return 0;
    }

    // Calculate password strength (0-100)
    let score = 0;

    // Length contribution (up to 40 points)
    score += Math.min(40, length * 2);

    // Character variety contribution (up to 60 points)
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^A-Za-z0-9]/.test(password);

    const varietyCount = [hasUpper, hasLower, hasNumber, hasSymbol].filter(Boolean).length;
    score += varietyCount * 15;

    return score;
};

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

    copied: boolean;
    setCopied: (copied: boolean) => void;

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

        copied: false,
        setCopied: (copied) => {
            set({ copied });
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
