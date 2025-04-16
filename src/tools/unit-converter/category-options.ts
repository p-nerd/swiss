export const categoryOptions = [
    {
        value: "length",
        label: "Length"
    },
    {
        value: "area",
        label: "Area"
    },
    {
        value: "volume",
        label: "Volume"
    },
    {
        value: "weight",
        label: "Weight"
    },
    {
        value: "temperature",
        label: "Temperature"
    },
    {
        value: "time",
        label: "Time"
    },
    {
        value: "speed",
        label: "Speed"
    },
    {
        value: "data",
        label: "Data"
    }
] as const;

export type TCategory = (typeof categoryOptions)[number]["value"];

export type TCategoryOption = {
    value: TCategory;
    label: string;
};
