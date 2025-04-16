import { usePasswordGeneratorStore } from "./store";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckIcon, CopyIcon, RefreshCwIcon } from "lucide-react";

export const GeneratedPassword = () => {
    const { password, copied, setCopied, generatePassword } = usePasswordGeneratorStore();

    const copyToClipboard = () => {
        if (!password) return;

        navigator.clipboard.writeText(password);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <Label htmlFor="password">Generated Password</Label>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                    disabled={!password}
                    className="h-8 gap-1"
                >
                    {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
                    {copied ? "Copied" : "Copy"}
                </Button>
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
