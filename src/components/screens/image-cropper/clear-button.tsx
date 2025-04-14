import { useImageCropperStore } from "@/states/use-image-cropper-store";

import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";

export const ClearButton = () => {
    const { clearCropper } = useImageCropperStore();

    return (
        <Button variant="outline" onClick={clearCropper} className="gap-2">
            <TrashIcon className="size-4" />
            Clear
        </Button>
    );
};
