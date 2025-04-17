export const unitOptions = [
    {
        value: "metric",
        heightLabel: "Metric (cm)"
    },
    {
        value: "imperial",
        heightLabel: "Imperial (ft, in)"
    }
];

export type TUnitType = (typeof unitOptions)[number]["value"];
