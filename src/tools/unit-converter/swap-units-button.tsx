import { useUnitConverterStore } from "./store";

import { Button } from "@/components/ui/button";
import { ArrowRightLeftIcon } from "lucide-react";

export const SwapUnitsButton = () => {
    const { fromUnit, toUnit, setFromUnit, setToUnit } = useUnitConverterStore();

    const swapUnits = () => {
        const temp = fromUnit;
        setFromUnit(toUnit);
        setToUnit(temp);
    };

    return (
        <div className="">
            <Button
                variant="outline"
                size="icon"
                onClick={swapUnits}
                className="rounded-full h-10 w-10"
            >
                <ArrowRightLeftIcon className="h-4 w-4" />
                <span className="sr-only">Swap units</span>
            </Button>
        </div>
    );
};
