import { useEffect } from "react";
import { useBMICalculatorStore } from "./store";
import { getBMI } from "./utils";

import { Button } from "@/components/ui/button";

export const CalculateBMIButton = () => {
    const {
        showResults,
        heightMeters,
        weightKilograms,
        gender,
        age,
        setErrorMessage,
        setShowResults,
        setBMI
    } = useBMICalculatorStore();

    useEffect(() => {
        if (showResults) {
            calculateBMI();
        }
    }, [showResults, heightMeters, weightKilograms, gender, age]);

    const calculateBMI = () => {
        setErrorMessage(null);
        try {
            const bmi = getBMI(weightKilograms, heightMeters);
            setBMI(bmi);
        } catch (e: any) {
            setErrorMessage("An error occurred while calculating BMI: " + e?.message);
            console.error(e);
        }
    };

    return (
        <Button
            type="button"
            onClick={() => {
                setShowResults(true);
                calculateBMI();
            }}
        >
            Calculate BMI
        </Button>
    );
};
