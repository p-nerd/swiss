import { useState } from "react";

import { Button } from "@/components/ui/button";
import { CheckIcon, CopyIcon } from "lucide-react";

export const CopyButton = ({ text }: { text?: string | null }) => {
    const [copied, setCopied] = useState<boolean>(false);

    const copyToClipboard = () => {
        if (!text) return;

        navigator.clipboard.writeText(text);
        setCopied(true);

        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            disabled={!text}
            className="h-8 gap-1"
        >
            {copied ? <CheckIcon className="size-4" /> : <CopyIcon className="size-4" />}
            {copied ? "Copied" : "Copy"}
        </Button>
    );
};
