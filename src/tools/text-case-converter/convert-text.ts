import type { TCaseType } from "./case-options";

export const convertText = (enteredText: string, caseType: TCaseType): string => {
    if (!enteredText) {
        return "";
    }

    let result = "";

    switch (caseType) {
        case "uppercase":
            result = enteredText.toUpperCase();
            break;
        case "lowercase":
            result = enteredText.toLowerCase();
            break;
        case "titlecase":
            result = enteredText
                .toLowerCase()
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
            break;
        case "sentencecase":
            result = enteredText
                .toLowerCase()
                .replace(/(^\s*\w|[.!?]\s*\w)/g, (match) => match.toUpperCase());
            break;
        case "camelcase":
            result = enteredText
                .toLowerCase()
                .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
                .replace(/^[A-Z]/, (match) => match.toLowerCase());
            break;
        case "pascalcase":
            result = enteredText
                .toLowerCase()
                .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
                .replace(/^[a-z]/, (match) => match.toUpperCase());
            break;
        case "snakecase":
            result = enteredText
                .toLowerCase()
                .replace(/\s+/g, "_")
                .replace(/[^a-zA-Z0-9_]/g, "");
            break;
        case "kebabcase":
            result = enteredText
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^a-zA-Z0-9-]/g, "");
            break;
        case "alternatingcase":
            result = enteredText
                .split("")
                .map((char, index) => (index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()))
                .join("");
            break;
        default:
            result = enteredText;
    }

    return result;
};
