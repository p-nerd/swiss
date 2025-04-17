export const unitOptions = [
    {
        value: "metric",
        heightLabel: "Metric (cm)",
        weightLabel: "Metric (kg)"
    },
    {
        value: "imperial",
        heightLabel: "Imperial (ft, in)",
        weightLabel: "Metric (lb)"
    }
];

export type TUnitType = (typeof unitOptions)[number]["value"];
