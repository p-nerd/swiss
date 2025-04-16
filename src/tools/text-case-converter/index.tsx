import { CaseTabs } from "./case-tabs";
import { ConvertedTextArea } from "./converted-text-area";
import { EnteredTextArea } from "./entered-text-area";

export const TextCaseConverterComponent = () => {
    return (
        <div className="space-y-8">
            <CaseTabs />
            <div className="flex flex-row w-full gap-4">
                <EnteredTextArea />
                <ConvertedTextArea />
            </div>
            <div className="text-sm flex flex-col items-center text-muted-foreground">
                <h3 className="font-medium mb-1">About Text Case Converter</h3>
                <p className="max-w-xl">
                    This tool allows you to convert text between different case formats. It's useful
                    for coding, writing, and formatting text for various purposes. Simply enter your
                    text above and select the desired case format.
                </p>
            </div>
        </div>
    );
};
