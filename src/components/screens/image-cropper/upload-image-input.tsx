import { useImageCropperStore } from "./use-image-cropper-store";

export const UploadImageInput = ({ id }: { id: string }) => {
    const { setImgSrc, setCrop, setScale, setRotate, setFileName } = useImageCropperStore();

    const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];

            const originalName = file.name.split(".").slice(0, -1).join(".");
            file.type;
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
        <input
            id={id}
            type="file"
            accept="image/png, image/jpeg, image/webp"
            onChange={handleSelectFile}
            className="hidden"
        />
    );
};
