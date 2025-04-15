import { UploadIcon } from "lucide-react";
import { UploadImageInput } from "./upload-image-input";

export const UploadImageArea = () => {
    return (
        <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12 text-center">
            <UploadIcon className="h-12 w-12 text-purple-500 dark:text-purple-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">Upload an image to crop</h3>
            <p className="text-sm text-muted-foreground mb-4">Supported formats: JPG, PNG, WebP</p>
            <div>
                <label htmlFor="image-upload" className="cursor-pointer">
                    <div className="bg-primary hover:bg-primary/90 text-primary-foreground inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow">
                        Select Image
                    </div>
                    <UploadImageInput id="image-upload" />
                </label>
            </div>
        </div>
    );
};
