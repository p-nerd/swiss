import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Check, Copy } from "lucide-react";

export const TextCaseConverterComponent = () => {
    const [text, setText] = useState("");
    const [convertedText, setConvertedText] = useState("");
    const [activeTab, setActiveTab] = useState("uppercase");
    const [copied, setCopied] = useState(false);
    const [stats, setStats] = useState({
        characters: 0,
        words: 0,
        lines: 0,
        charactersNoSpaces: 0
    });

    // Update stats when text changes
    useEffect(() => {
        updateStats(text);
    }, [text]);

    // Convert text when input or active tab changes
    useEffect(() => {
        convertText(text, activeTab);
    }, [text, activeTab]);

    const updateStats = (input: string) => {
        const characters = input.length;
        const words = input.trim() === "" ? 0 : input.trim().split(/\s+/).length;
        const lines = input === "" ? 0 : input.split(/\r\n|\r|\n/).length;
        const charactersNoSpaces = input.replace(/\s+/g, "").length;

        setStats({
            characters,
            words,
            lines,
            charactersNoSpaces
        });
    };

    const convertText = (input: string, type: string) => {
        if (!input) {
            setConvertedText("");
            return;
        }

        let result = "";

        switch (type) {
            case "uppercase":
                result = input.toUpperCase();
                break;
            case "lowercase":
                result = input.toLowerCase();
                break;
            case "titlecase":
                result = input
                    .toLowerCase()
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ");
                break;
            case "sentencecase":
                result = input
                    .toLowerCase()
                    .replace(/(^\s*\w|[.!?]\s*\w)/g, (match) => match.toUpperCase());
                break;
            case "camelcase":
                result = input
                    .toLowerCase()
                    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
                    .replace(/^[A-Z]/, (match) => match.toLowerCase());
                break;
            case "pascalcase":
                result = input
                    .toLowerCase()
                    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
                    .replace(/^[a-z]/, (match) => match.toUpperCase());
                break;
            case "snakecase":
                result = input
                    .toLowerCase()
                    .replace(/\s+/g, "_")
                    .replace(/[^a-zA-Z0-9_]/g, "");
                break;
            case "kebabcase":
                result = input
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^a-zA-Z0-9-]/g, "");
                break;
            case "alternatingcase":
                result = input
                    .split("")
                    .map((char, index) =>
                        index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
                    )
                    .join("");
                break;
            default:
                result = input;
        }

        setConvertedText(result);
    };

    const copyToClipboard = () => {
        if (!convertedText) return;

        navigator.clipboard.writeText(convertedText);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    const handleTabChange = (value: string) => {
        setActiveTab(value);
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const clearText = () => {
        setText("");
        setConvertedText("");
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col items-center w-full">
                <Tabs
                    defaultValue="uppercase"
                    value={activeTab}
                    onValueChange={handleTabChange}
                    className="w-auto"
                >
                    <TabsList>
                        <TabsTrigger value="uppercase" className="text-xs sm:text-sm">
                            UPPERCASE
                        </TabsTrigger>
                        <TabsTrigger value="lowercase" className="text-xs sm:text-sm">
                            lowercase
                        </TabsTrigger>
                        <TabsTrigger value="titlecase" className="text-xs sm:text-sm">
                            Title Case
                        </TabsTrigger>
                        <TabsTrigger value="sentencecase" className="text-xs sm:text-sm">
                            Sentence case
                        </TabsTrigger>
                        <TabsTrigger value="camelcase" className="text-xs sm:text-sm">
                            camelCase
                        </TabsTrigger>
                        <TabsTrigger value="pascalcase" className="text-xs sm:text-sm">
                            PascalCase
                        </TabsTrigger>
                        <TabsTrigger value="snakecase" className="text-xs sm:text-sm">
                            snake_case
                        </TabsTrigger>
                        <TabsTrigger value="kebabcase" className="text-xs sm:text-sm">
                            kebab-case
                        </TabsTrigger>
                        <TabsTrigger value="alternatingcase" className="text-xs sm:text-sm">
                            aLtErNaTiNg
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
            <div className="flex flex-row w-full gap-4">
                <div className="space-y-2 flex-1">
                    <div className="flex items-center justify-between">
                        <label htmlFor="input-text" className="text-sm font-medium">
                            Enter your text
                        </label>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={clearText}
                                disabled={!text}
                                className="h-8"
                            >
                                Clear
                            </Button>
                        </div>
                    </div>
                    <Textarea
                        id="input-text"
                        placeholder="Type or paste your text here..."
                        className="min-h-[120px] font-mono"
                        value={text}
                        onChange={handleTextChange}
                    />
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <div>Characters: {stats.characters}</div>
                        <div>Characters (no spaces): {stats.charactersNoSpaces}</div>
                        <div>Words: {stats.words}</div>
                        <div>Lines: {stats.lines}</div>
                    </div>
                </div>

                <div className="space-y-2 flex-1">
                    <div className="flex items-center justify-between">
                        <label htmlFor="output-text" className="text-sm font-medium">
                            Converted text
                        </label>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={copyToClipboard}
                            disabled={!convertedText}
                            className="h-8 gap-1"
                        >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            {copied ? "Copied" : "Copy"}
                        </Button>
                    </div>
                    <Textarea
                        id="output-text"
                        className="min-h-[120px] font-mono"
                        value={convertedText}
                        readOnly
                        placeholder="Converted text will appear here..."
                    />
                </div>
            </div>
            <div className="text-sm flex flex-col items-center text-muted-foreground">
                <h3 className="font-medium mb-1">About Text Case Converter</h3>
                <p className="max-w-xl">
                    This tool allows you to convert text between different case formats. It's useful
                    for coding, writing, and formatting text for various purposes. Simply enter your
                    text above and select the desired case format.
                </p>
            </div>
        </div>
    );
};
