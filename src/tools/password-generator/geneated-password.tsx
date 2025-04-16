import { usePasswordGeneratorStore } from "./store";

import { CopyButton } from "@/components/elements/copy-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RefreshCwIcon } from "lucide-react";

export const GeneratedPassword = () => {
    const { password, generatePassword } = usePasswordGeneratorStore();

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <Label htmlFor="password">Generated Password</Label>
                <CopyButton text={password} />
            </div>
            <div className="flex gap-2">
                <Input id="password" value={password} readOnly className="font-mono" />
                <Button
                    size="icon"
                    onClick={generatePassword}
                    className="shrink-0"
                    variant="outline"
                >
                    <RefreshCwIcon className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};
