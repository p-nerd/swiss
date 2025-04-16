import { useTextCaseConverterStore } from "./store";

import { CopyButton } from "@/components/elements/copy-button";
import { Textarea } from "@/components/ui/textarea";

export const ConvertedTextArea = () => {
    const { convertedText } = useTextCaseConverterStore();

    return (
        <div className="space-y-2 flex-1">
            <div className="flex items-center justify-between">
                <label htmlFor="output-text" className="text-sm font-medium">
                    Converted text
                </label>
                <CopyButton text={convertedText} />
            </div>
            <Textarea
                id="output-text"
                className="min-h-50 font-mono"
                value={convertedText}
                readOnly
                placeholder="Converted text will appear here..."
            />
        </div>
    );
};
