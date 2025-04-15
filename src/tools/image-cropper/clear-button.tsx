import { useImageCropperStore } from "./store";

import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";

export const ClearButton = () => {
    const { clear } = useImageCropperStore();

    return (
        <Button variant="outline" onClick={clear} className="gap-2">
            <TrashIcon className="size-4" />
            Clear
        </Button>
    );
};
