export const caseOptions = [
    {
        value: "uppercase",
        label: "UPPERCASE"
    },
    {
        value: "lowercase",
        label: "lowercase"
    },
    {
        value: "titlecase",
        label: "Title Case"
    },
    {
        value: "sentencecase",
        label: "Sentence case"
    },
    {
        value: "camelcase",
        label: "camelCase"
    },
    {
        value: "pascalcase",
        label: "PascalCase"
    },
    {
        value: "snakecase",
        label: "snake_case"
    },
    {
        value: "kebabcase",
        label: "kebab-case"
    },
    {
        value: "alternatingcase",
        label: "aLtErNaTiNg"
    }
] as const;

export type TCaseType = (typeof caseOptions)[number]["value"];

export type TCaseOption = {
    value: TCaseType;
    label: string;
};
