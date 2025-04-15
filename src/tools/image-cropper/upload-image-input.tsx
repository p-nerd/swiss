import type { TFileType } from "./types";

import { getExtensionByFileType, getFileNameWithoutExtension } from "./files";
import { useImageCropperStore } from "./store";

export const UploadImageInput = ({ id }: { id: string }) => {
    const { setOriginalImageUrl, setFileName, setFileType, clear } = useImageCropperStore();

    const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];

            const reader = new FileReader();

            reader.addEventListener("load", () => {
                if (typeof reader.result === "string") {
                    clear();

                    const fileType = file.type as TFileType;
                    const fileName = `${getFileNameWithoutExtension(file.name)}-cropped.${getExtensionByFileType(fileType)}`;

                    setFileType(fileType);
                    setFileName(fileName);
                    setOriginalImageUrl(reader.result);
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
