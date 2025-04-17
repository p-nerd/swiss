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

const bmiCategories = [
    { range: [0, 16], name: "Severe Thinness", color: "bg-red-500", textColor: "text-red-500" },
    {
        range: [16, 17],
        name: "Moderate Thinness",
        color: "bg-orange-500",
        textColor: "text-orange-500"
    },
    {
        range: [17, 18.5],
        name: "Mild Thinness",
        color: "bg-yellow-500",
        textColor: "text-yellow-500"
    },
    { range: [18.5, 25], name: "Normal", color: "bg-green-500", textColor: "text-green-500" },
    { range: [25, 30], name: "Overweight", color: "bg-yellow-500", textColor: "text-yellow-500" },
    {
        range: [30, 35],
        name: "Obese Class I",
        color: "bg-orange-500",
        textColor: "text-orange-500"
    },
    { range: [35, 40], name: "Obese Class II", color: "bg-red-500", textColor: "text-red-500" },
    { range: [40, 100], name: "Obese Class III", color: "bg-red-700", textColor: "text-red-700" }
];

export const getBMICategory = (bmi: number) => {
    return bmiCategories.find((cat) => bmi >= cat.range[0] && bmi < cat.range[1]);
};
