import { useBMICalculatorStore } from "./store";

import { Button } from "@/components/ui/button";

export const ResetButton = () => {
    const { reset } = useBMICalculatorStore();

    return (
        <Button type="button" variant="outline" onClick={reset}>
            Reset
        </Button>
    );
};
