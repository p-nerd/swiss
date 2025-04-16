import { usePasswordGeneratorStore } from "./store";

import { Label } from "@/components/ui/label";
import { CheckboxInput } from "./checkbox-input";

export const CharacterTypes = () => {
    const {
        includeUppercase,
        setIncludeUppercase,
        includeLowercase,
        setIncludeLowercase,
        includeNumbers,
        setIncludeNumbers,
        includeSymbols,
        setIncludeSymbols
    } = usePasswordGeneratorStore();

    return (
        <div className="space-y-3">
            <Label>Character Types</Label>
            <div className="grid grid-cols-1 gap-2">
                <CheckboxInput
                    id="uppercase"
                    value={includeUppercase}
                    onValue={setIncludeUppercase}
                    label="Uppercase (A-Z)"
                />
                <CheckboxInput
                    id="lowercase"
                    value={includeLowercase}
                    onValue={setIncludeLowercase}
                    label="Lowercase (a-z)"
                />
                <CheckboxInput
                    id="numbers"
                    value={includeNumbers}
                    onValue={setIncludeNumbers}
                    label="Numbers (0-9)"
                />
                <CheckboxInput
                    id="symbols"
                    value={includeSymbols}
                    onValue={setIncludeSymbols}
                    label="Symbols (!@#$%^&*)"
                />
            </div>
        </div>
    );
};
