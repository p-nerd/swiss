import { usePasswordGeneratorStore } from "@/states/use-password-generator-store";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

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
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="uppercase"
                        checked={includeUppercase}
                        onCheckedChange={(v) => setIncludeUppercase(!!v)}
                    />
                    <Label htmlFor="uppercase" className="cursor-pointer">
                        Uppercase (A-Z)
                    </Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="lowercase"
                        checked={includeLowercase}
                        onCheckedChange={(v) => setIncludeLowercase(!!v)}
                    />
                    <Label htmlFor="lowercase" className="cursor-pointer">
                        Lowercase (a-z)
                    </Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="numbers"
                        checked={includeNumbers}
                        onCheckedChange={(v) => setIncludeNumbers(!!v)}
                    />
                    <Label htmlFor="numbers" className="cursor-pointer">
                        Numbers (0-9)
                    </Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="symbols"
                        checked={includeSymbols}
                        onCheckedChange={(v) => setIncludeSymbols(!!v)}
                    />
                    <Label htmlFor="symbols" className="cursor-pointer">
                        Symbols (!@#$%^&*)
                    </Label>
                </div>
            </div>
        </div>
    );
};
