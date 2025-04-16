import { usePasswordGeneratorStore } from "./store";

import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

const getStrengthLabel = (strength: number) => {
    if (strength < 30) return "Weak";
    if (strength < 60) return "Medium";
    if (strength < 80) return "Strong";
    return "Very Strong";
};

const getStrengthColor = (strength: number) => {
    if (strength < 30) return "bg-destructive dark:bg-destructive";
    if (strength < 60) return "bg-yellow-500 dark:bg-yellow-500";
    if (strength < 80) return "bg-green-500 dark:bg-green-400";
    return "bg-emerald-500 dark:bg-emerald-400";
};

export const PasswordStrenght = () => {
    const { strength } = usePasswordGeneratorStore();

    return (
        <div className="space-y-2">
            <div className="flex justify-between">
                <Label>Password Strength</Label>
                <span className="text-sm font-medium">{getStrengthLabel(strength)}</span>
            </div>
            <Progress value={strength} className={getStrengthColor(strength)} />
        </div>
    );
};
