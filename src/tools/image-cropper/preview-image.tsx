import { useImageCropperStore } from "./store";

export const PreviewImage = () => {
    const { previewImageUrl } = useImageCropperStore();

    return (
        <div className="border rounded-lg p-2 bg-background">
            <div className="h-125 flex items-center justify-center overflow-hidden">
                {previewImageUrl ? (
                    <img
                        src={previewImageUrl}
                        alt="Preview"
                        className="w-full max-w-full h-full max-h-full object-contain"
                    />
                ) : (
                    <div className="text-sm text-muted-foreground">Adjust crop to see preview</div>
                )}
            </div>
        </div>
    );
};
