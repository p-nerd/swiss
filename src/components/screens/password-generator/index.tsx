import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { CheckIcon, CopyIcon, RefreshCwIcon } from "lucide-react";

export const PasswordGeneratorComponent = () => {
    const [password, setPassword] = useState("");
    const [length, setLength] = useState(12);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [excludeSimilar, setExcludeSimilar] = useState(false);
    const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
    const [strength, setStrength] = useState(0);
    const [copied, setCopied] = useState(false);

    // Character sets
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    const similarChars = "il1Lo0O";
    const ambiguousChars = "{}[]()/\\'\"`~,;:.<>";

    // Generate password on mount and when options change
    useEffect(() => {
        generatePassword();
    }, [
        length,
        includeUppercase,
        includeLowercase,
        includeNumbers,
        includeSymbols,
        excludeSimilar,
        excludeAmbiguous
    ]);

    // Calculate password strength
    useEffect(() => {
        calculateStrength();
    }, [password]);

    const generatePassword = () => {
        // Ensure at least one character type is selected
        if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
            setPassword("");
            return;
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
            setPassword("");
            return;
        }

        for (let i = 0; i < length; i++) {
            newPassword += chars.charAt(Math.floor(Math.random() * charsLength));
        }

        setPassword(newPassword);
    };

    const calculateStrength = () => {
        if (!password) {
            setStrength(0);
            return;
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

        setStrength(score);
    };

    const copyToClipboard = () => {
        if (!password) return;

        navigator.clipboard.writeText(password);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    const getStrengthLabel = () => {
        if (strength < 30) return "Weak";
        if (strength < 60) return "Medium";
        if (strength < 80) return "Strong";
        return "Very Strong";
    };

    const getStrengthColor = () => {
        if (strength < 30) return "bg-red-500";
        if (strength < 60) return "bg-yellow-500";
        if (strength < 80) return "bg-green-500";
        return "bg-emerald-500";
    };

    return (
        <div className="space-y-6">
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
                        {copied ? (
                            <CheckIcon className="h-4 w-4" />
                        ) : (
                            <CopyIcon className="h-4 w-4" />
                        )}
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

            {password && (
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <Label>Password Strength</Label>
                        <span className="text-sm font-medium">{getStrengthLabel()}</span>
                    </div>
                    <Progress value={strength} className={getStrengthColor()} />
                </div>
            )}

            <div className="space-y-4">
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <Label htmlFor="length">Password Length: {length}</Label>
                    </div>
                    <Slider
                        id="length"
                        min={4}
                        max={64}
                        step={1}
                        value={[length]}
                        onValueChange={(value) => setLength(value[0])}
                    />
                </div>

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

                <div className="space-y-3">
                    <Label>Advanced Options</Label>
                    <div className="grid grid-cols-1  gap-2">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="excludeSimilar"
                                checked={excludeSimilar}
                                onCheckedChange={(v) => setExcludeSimilar(!!v)}
                            />
                            <Label htmlFor="excludeSimilar" className="cursor-pointer">
                                Exclude Similar (i, l, 1, L, o, 0, O)
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="excludeAmbiguous"
                                checked={excludeAmbiguous}
                                onCheckedChange={(v) => setExcludeAmbiguous(!!v)}
                            />
                            <Label htmlFor="excludeAmbiguous" className="cursor-pointer">
                                Exclude Ambiguous ({"{}[]()/'\"~,.;:<>"})
                            </Label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
