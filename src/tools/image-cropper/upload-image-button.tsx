import { Button } from "@/components/ui/button";
import { UploadIcon } from "lucide-react";
import { UploadImageInput } from "./upload-image-input";

export const UploadImageButton = () => {
    return (
        <label htmlFor="change-image" className="cursor-pointer">
            <Button variant="outline" asChild>
                <div className="gap-2">
                    <UploadIcon className="size-4" />
                    Change Image
                </div>
            </Button>
            <UploadImageInput id="change-image" />
        </label>
    );
};
