import { useImageCropperStore } from "./use-image-cropper-store";

import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";

export const ClearButton = () => {
    const { resetCropper } = useImageCropperStore();

    return (
        <Button variant="outline" onClick={resetCropper} className="gap-2">
            <TrashIcon className="h-4 w-4" />
            Clear
        </Button>
    );
};
