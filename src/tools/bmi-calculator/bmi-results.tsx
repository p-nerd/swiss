import { getBMICategory } from "./options";
import { useBMICalculatorStore } from "./store";
import { getBmiGaugePosition } from "./utils";

import { InfoIcon } from "lucide-react";

export const BMIResults = () => {
    const { showResults, bmi } = useBMICalculatorStore();

    const bmiCategory = getBMICategory(bmi);

    return (
        <>
            {showResults && bmi !== null && bmiCategory && (
                <div className="mt-8 space-y-6">
                    <div className="rounded-lg border bg-card p-6">
                        <h3 className="mb-4 text-lg font-semibold">Your Results</h3>

                        {/* BMI Value and Category */}
                        <div className="mb-6 text-center">
                            <div className="text-4xl font-bold">{bmi}</div>
                            <div className={`text-lg font-medium ${bmiCategory.textColor}`}>
                                {bmiCategory.name}
                            </div>
                        </div>

                        {/* BMI Gauge */}
                        <div className="mb-6 space-y-2">
                            <div className="h-2 w-full rounded-full bg-gray-200">
                                <div
                                    className="h-2 rounded-full bg-gradient-to-r from-blue-500 via-green-500 to-red-500"
                                    style={{ width: "100%" }}
                                ></div>
                            </div>
                            <div className="relative h-6">
                                <div
                                    className="absolute h-6 w-0.5 bg-black dark:bg-white"
                                    style={{
                                        left: `${getBmiGaugePosition(bmi)}%`,
                                        transform: "translateX(-50%)"
                                    }}
                                ></div>
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>Underweight</span>
                                    <span>Normal</span>
                                    <span>Overweight</span>
                                    <span>Obese</span>
                                </div>
                            </div>
                        </div>

                        {/* Interpretation */}
                        <div className="rounded-md bg-muted p-4 text-sm">
                            <p className="mb-2">
                                <strong>What this means:</strong> Your BMI of {bmi} indicates that
                                you are in the{" "}
                                <span className={bmiCategory.textColor}>{bmiCategory.name}</span>{" "}
                                range.
                            </p>
                            <p>
                                {bmiCategory.range[0] < 18.5 &&
                                    "You may need to gain weight under medical supervision."}
                                {bmiCategory.range[0] >= 18.5 &&
                                    bmiCategory.range[1] <= 25 &&
                                    "You have a healthy weight for your height."}
                                {bmiCategory.range[0] >= 25 &&
                                    "You may benefit from losing some weight for health reasons."}
                            </p>
                        </div>
                    </div>

                    {/* BMI Information */}
                    <div className="rounded-lg border p-4">
                        <div className="flex items-start gap-2">
                            <InfoIcon className="mt-0.5 h-5 w-5 text-muted-foreground" />
                            <div className="text-sm">
                                <p className="mb-2">
                                    <strong>About BMI:</strong> Body Mass Index (BMI) is a measure
                                    of body fat based on height and weight that applies to adult men
                                    and women.
                                </p>
                                <p className="mb-2">
                                    <strong>Limitations:</strong> BMI is a screening tool, not a
                                    diagnostic tool. It doesn't account for muscle mass, bone
                                    density, or body composition.
                                </p>
                                <p>
                                    <strong>Next steps:</strong> Consult with a healthcare provider
                                    for a complete health assessment.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
