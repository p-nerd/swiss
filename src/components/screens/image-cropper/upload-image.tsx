import { useImageCropperStore } from "./use-image-cropper-store";

import { UploadIcon } from "lucide-react";

export const UploadImage = () => {
    const { setImgSrc, setCrop, setScale, setRotate, setFileName } = useImageCropperStore();

    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];

            const originalName = file.name.split(".").slice(0, -1).join(".");
            setFileName(`${originalName}-cropped.png`);

            const reader = new FileReader();

            reader.addEventListener("load", () => {
                if (typeof reader.result === "string") {
                    setImgSrc(reader.result);
                    setCrop(undefined);
                    setScale(1);
                    setRotate(0);
                }
            });

            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12 text-center">
            <UploadIcon className="h-12 w-12 text-purple-500 dark:text-purple-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">Upload an image to crop</h3>
            <p className="text-sm text-muted-foreground mb-4">
                Supported formats: JPG, PNG, GIF, WebP
            </p>
            <div>
                <label htmlFor="image-upload" className="cursor-pointer">
                    <div className="bg-primary hover:bg-primary/90 text-primary-foreground inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow">
                        Select Image
                    </div>
                    <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={onSelectFile}
                        className="hidden"
                    />
                </label>
            </div>
        </div>
    );
};
