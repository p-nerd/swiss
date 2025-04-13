import { useImageCropperStore } from "./use-image-cropper-store";

import { Button } from "@/components/ui/button";
import { UploadIcon } from "lucide-react";

export const ChangeImageButton = () => {
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
        <label htmlFor="change-image" className="cursor-pointer">
            <Button variant="outline" asChild>
                <div className="gap-2">
                    <UploadIcon className="h-4 w-4" />
                    Change Image
                </div>
            </Button>
            <input
                id="change-image"
                type="file"
                accept="image/*"
                onChange={onSelectFile}
                className="hidden"
            />
        </label>
    );
};
