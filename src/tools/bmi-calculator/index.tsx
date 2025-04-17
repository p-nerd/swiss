import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { AgeInput } from "./age-input";
import { BMIResults } from "./bmi-results";
import { CalculateBMIButton } from "./calculate-bmi-button";
import { ErrorMessage } from "./error-message";
import { GenderInput } from "./gender-input";
import { HeightInput } from "./height-input";
import { ResetButton } from "./reset-button";
import { WeightInput } from "./weight-input";

export const BMICalculatorComponent = () => {
    return (
        <>
            <Card className="w-full">
                <CardContent>
                    <div className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            <HeightInput />
                            <WeightInput />
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <GenderInput />
                            <AgeInput />
                        </div>
                        <ErrorMessage />
                        <div className="flex flex-wrap gap-2">
                            <CalculateBMIButton />
                            <ResetButton />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start text-sm text-muted-foreground">
                    <p>
                        <strong>Note:</strong> This calculator is for adults 20 years and older. BMI
                        for children and teens should be age and gender-specific.
                    </p>
                </CardFooter>
            </Card>
            <BMIResults />
        </>
    );
};
