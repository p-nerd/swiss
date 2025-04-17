import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { bmiCategories } from "./bmi-categories";

import { useEffect, useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InfoIcon } from "lucide-react";
import { HeightInput } from "./height-input";

export const BMICalculatorComponent = () => {
    // State for unit system
    const [unitSystem, setUnitSystem] = useState<"metric" | "imperial">("metric");

    // State for metric inputs
    const [heightCm, setHeightCm] = useState<string>("170");
    const [weightKg, setWeightKg] = useState<string>("70");

    // State for imperial inputs
    const [heightFt, setHeightFt] = useState<string>("5");
    const [heightIn, setHeightIn] = useState<string>("7");
    const [weightLbs, setWeightLbs] = useState<string>("154");

    // State for additional info
    const [gender, setGender] = useState<string>("male");
    const [age, setAge] = useState<string>("30");

    // State for results
    const [bmi, setBmi] = useState<number | null>(null);
    const [bmiCategory, setBmiCategory] = useState<(typeof bmiCategories)[0] | null>(null);
    const [showResults, setShowResults] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Calculate BMI when inputs change
    useEffect(() => {
        if (showResults) {
            calculateBMI();
        }
    }, [heightCm, weightKg, heightFt, heightIn, weightLbs, showResults, unitSystem]);

    // Calculate BMI
    const calculateBMI = () => {
        setError(null);
        let calculatedBMI: number;

        try {
            if (unitSystem === "metric") {
                // Validate metric inputs
                const height = Number.parseFloat(heightCm);
                const weight = Number.parseFloat(weightKg);

                if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
                    setError("Please enter valid height and weight values");
                    return;
                }

                // Calculate BMI using metric formula: weight (kg) / height (m)²
                calculatedBMI = weight / Math.pow(height / 100, 2);
            } else {
                // Validate imperial inputs
                const feet = Number.parseFloat(heightFt);
                const inches = Number.parseFloat(heightIn);
                const pounds = Number.parseFloat(weightLbs);

                if (
                    isNaN(feet) ||
                    isNaN(inches) ||
                    isNaN(pounds) ||
                    (feet <= 0 && inches <= 0) ||
                    pounds <= 0
                ) {
                    setError("Please enter valid height and weight values");
                    return;
                }

                // Calculate total height in inches
                const totalInches = feet * 12 + inches;

                // Calculate BMI using imperial formula: 703 × weight (lb) / height (in)²
                calculatedBMI = (703 * pounds) / Math.pow(totalInches, 2);
            }

            // Round to 1 decimal place
            calculatedBMI = Math.round(calculatedBMI * 10) / 10;

            // Set BMI and find category
            setBmi(calculatedBMI);

            // Find BMI category
            const category = bmiCategories.find(
                (cat) => calculatedBMI >= cat.range[0] && calculatedBMI < cat.range[1]
            );

            setBmiCategory(category || null);
        } catch (err) {
            setError("An error occurred while calculating BMI");
            console.error(err);
        }
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowResults(true);
        calculateBMI();
    };

    // Reset form
    const handleReset = () => {
        setHeightCm("170");
        setWeightKg("70");
        setHeightFt("5");
        setHeightIn("7");
        setWeightLbs("154");
        setAge("30");
        setGender("male");
        setBmi(null);
        setBmiCategory(null);
        setShowResults(false);
        setError(null);
    };

    // Get BMI gauge position (0-100%)
    const getBmiGaugePosition = () => {
        if (bmi === null) return 0;

        // Clamp BMI between 10 and 40 for the gauge
        const clampedBmi = Math.max(10, Math.min(bmi, 40));

        // Convert to percentage (10 = 0%, 40 = 100%)
        return ((clampedBmi - 10) / 30) * 100;
    };

    return (
        <Card className="w-full">
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Unit System Selection */}
                    <div className="space-y-2">
                        <Label>Unit System</Label>
                        <Tabs
                            defaultValue={unitSystem}
                            onValueChange={(value) => setUnitSystem(value as "metric" | "imperial")}
                            className="w-full"
                        >
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="metric">Metric (cm, kg)</TabsTrigger>
                                <TabsTrigger value="imperial">Imperial (ft, lb)</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>

                    {/* Height and Weight Inputs */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <HeightInput />
                        {unitSystem === "metric" ? (
                            <>
                                {/* Metric Weight */}
                                <div className="space-y-2">
                                    <Label htmlFor="weight-kg">Weight (kg)</Label>
                                    <Input
                                        id="weight-kg"
                                        type="number"
                                        min="20"
                                        max="300"
                                        value={weightKg}
                                        onChange={(e) => setWeightKg(e.target.value)}
                                        placeholder="Weight in kilograms"
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Imperial Height */}

                                {/* Imperial Weight */}
                                <div className="space-y-2">
                                    <Label htmlFor="weight-lbs">Weight (lb)</Label>
                                    <Input
                                        id="weight-lbs"
                                        type="number"
                                        min="40"
                                        max="700"
                                        value={weightLbs}
                                        onChange={(e) => setWeightLbs(e.target.value)}
                                        placeholder="Weight in pounds"
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    {/* Additional Information */}
                    <div className="grid gap-4 md:grid-cols-2">
                        {/* Gender */}
                        <div className="space-y-2">
                            <Label>Gender (optional)</Label>
                            <RadioGroup
                                value={gender}
                                onValueChange={setGender}
                                className="flex gap-4"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="male" id="male" />
                                    <Label htmlFor="male" className="cursor-pointer">
                                        Male
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="female" id="female" />
                                    <Label htmlFor="female" className="cursor-pointer">
                                        Female
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>
                        {/* Age */}
                        <div className="space-y-2">
                            <Label htmlFor="age">Age (optional)</Label>
                            <Input
                                id="age"
                                type="number"
                                min="2"
                                max="120"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                placeholder="Your age"
                            />
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <Alert variant="destructive">
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2">
                        <Button type="submit">Calculate BMI</Button>
                        <Button type="button" variant="outline" onClick={handleReset}>
                            Reset
                        </Button>
                    </div>
                </form>

                {/* Results Section */}
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
                                        className="absolute h-6 w-0.5 bg-black"
                                        style={{
                                            left: `${getBmiGaugePosition()}%`,
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
                                    <strong>What this means:</strong> Your BMI of {bmi} indicates
                                    that you are in the{" "}
                                    <span className={bmiCategory.textColor}>
                                        {bmiCategory.name}
                                    </span>{" "}
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
                                        <strong>About BMI:</strong> Body Mass Index (BMI) is a
                                        measure of body fat based on height and weight that applies
                                        to adult men and women.
                                    </p>
                                    <p className="mb-2">
                                        <strong>Limitations:</strong> BMI is a screening tool, not a
                                        diagnostic tool. It doesn't account for muscle mass, bone
                                        density, or body composition.
                                    </p>
                                    <p>
                                        <strong>Next steps:</strong> Consult with a healthcare
                                        provider for a complete health assessment.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex flex-col items-start text-sm text-muted-foreground">
                <p>
                    <strong>Note:</strong> This calculator is for adults 20 years and older. BMI for
                    children and teens should be age and gender-specific.
                </p>
            </CardFooter>
        </Card>
    );
};
