import { useEffect } from "react";
import { usePasswordGeneratorStore } from "./store";

import { AdvancedOptions } from "./advanced-options";
import { CharacterTypes } from "./character-types";
import { GeneratedPassword } from "./geneated-password";
import { PasswordLength } from "./password-length";
import { PasswordStrenght } from "./password-strength";

export const PasswordGeneratorComponent = () => {
    const { password, generatePassword } = usePasswordGeneratorStore();

    useEffect(() => {
        generatePassword();
    }, []);

    return (
        <div className="space-y-6">
            <GeneratedPassword />
            {password && <PasswordStrenght />}
            <div className="space-y-4">
                <PasswordLength />
                <CharacterTypes />
                <AdvancedOptions />
            </div>
        </div>
    );
};
