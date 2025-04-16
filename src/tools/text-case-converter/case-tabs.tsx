import type { TCaseType } from "./case-options";

import { caseOptions } from "./case-options";
import { convertText } from "./convert-text";
import { useTextCaseConverterStore } from "./store";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const CaseTabs = () => {
    const { caseType, enteredText, setCaseType, setConvertedText } = useTextCaseConverterStore();

    return (
        <div className="flex flex-col items-center w-full">
            <Tabs
                defaultValue="uppercase"
                value={caseType}
                onValueChange={(v) => {
                    const caseType = v as TCaseType;
                    setCaseType(caseType);
                    setConvertedText(convertText(enteredText, caseType));
                }}
                className="w-auto"
            >
                <TabsList>
                    {caseOptions.map((option) => (
                        <TabsTrigger
                            key={option.value}
                            value={option.value}
                            className="text-xs sm:text-sm"
                        >
                            {option.label}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>
        </div>
    );
};
