import type { TFileType } from "@/types/image-generator";

import { getExtensionByFileName, getFileNameWithoutExtension } from "@/lib/file";
import { useImageCropperStore } from "@/states/use-image-cropper-store";

export const UploadImageInput = ({ id }: { id: string }) => {
    const { setImgSrc, setFileName, setFileType, clearCropper } = useImageCropperStore();

    const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];

            const fileName = file.name;
            const fileType = file.type;

            const originalName = getFileNameWithoutExtension(fileName);
            const originalExtension = getExtensionByFileName(fileName);

            setFileType(fileType as TFileType);
            setFileName(`${originalName}-cropped.${originalExtension}`);

            const reader = new FileReader();

            reader.addEventListener("load", () => {
                if (typeof reader.result === "string") {
                    clearCropper();
                    setImgSrc(reader.result);
                }
            });

            reader.readAsDataURL(file);
        }
    };

    return (
        <input
            id={id}
            type="file"
            accept="image/png, image/jpeg, image/webp"
            onChange={handleSelectFile}
            className="hidden"
        />
    );
};
