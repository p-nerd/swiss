import { Card, CardContent } from "@/components/ui/card";
import { AboutSection } from "./about-section";
import { CategorySelection } from "./category-selection";
import { FromUnitInput } from "./from-unit-input";
import { ResultSection } from "./result-section";
import { SwapUnitsButton } from "./swap-units-button";
import { ToUnitInput } from "./to-unit-input";
import { ValueInput } from "./value-input";

export const UnitConverterComponent = () => {
    return (
        <Card className="w-full">
            <CardContent>
                <div className="space-y-6">
                    <CategorySelection />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <ValueInput />
                            <FromUnitInput />
                            <SwapUnitsButton />
                            <ToUnitInput />
                        </div>
                        <div className="flex flex-col justify-center space-y-4">
                            <ResultSection />
                            <AboutSection />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
