import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { useBMICalculatorStore } from "./store";

export const ErrorMessage = () => {
    const { errorMessage } = useBMICalculatorStore();

    return (
        errorMessage && (
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
        )
    );
};
