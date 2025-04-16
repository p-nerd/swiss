import {
    calculateCharacters,
    calculateCharactersWithSpaces,
    calculateLines,
    calculateWords
} from "./utils";

import { convertText } from "./convert-text";
import { useTextCaseConverterStore } from "./store";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const EnteredTextArea = () => {
    const { enteredText, caseType, setEnteredText, setConvertedText } = useTextCaseConverterStore();

    return (
        <div className="space-y-2 flex-1">
            <div className="flex items-center justify-between">
                <label htmlFor="input-text" className="text-sm font-medium">
                    Enter your text
                </label>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            setEnteredText("");
                            setConvertedText("");
                        }}
                        disabled={!enteredText}
                        className="h-8"
                    >
                        Clear
                    </Button>
                </div>
            </div>
            <Textarea
                id="input-text"
                placeholder="Type or paste your text here..."
                className="min-h-50 font-mono"
                value={enteredText}
                onChange={(e) => {
                    const text = e.target.value;
                    setEnteredText(text);
                    setConvertedText(convertText(text, caseType));
                }}
            />
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <div>Characters: {calculateCharacters(enteredText)}</div>
                <div>Characters (no spaces): {calculateCharactersWithSpaces(enteredText)}</div>
                <div>Words: {calculateWords(enteredText)}</div>
                <div>Lines: {calculateLines(enteredText)}</div>
            </div>
        </div>
    );
};
