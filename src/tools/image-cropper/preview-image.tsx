import { useImageCropperStore } from "./store";

export const PreviewImage = () => {
    const { previewImageUrl } = useImageCropperStore();

    return (
        <div className="border rounded-lg p-2 bg-background flex flex-col">
            <div className="text-sm font-medium mb-2">Preview</div>
            <div className="flex-1 flex items-center justify-center overflow-hidden">
                {previewImageUrl ? (
                    <img
                        src={previewImageUrl}
                        alt="Preview"
                        className="max-w-full max-h-full object-contain"
                    />
                ) : (
                    <div className="text-sm text-muted-foreground">Adjust crop to see preview</div>
                )}
            </div>
        </div>
    );
};
