import { useImageCropperStore } from "@/states/use-image-cropper-store";

export const PreviewImage = () => {
    const { previewUrl } = useImageCropperStore();

    return (
        <div className="border rounded-lg p-2 bg-background flex flex-col">
            <div className="text-sm font-medium mb-2">Preview</div>
            <div className="flex-1 flex items-center justify-center overflow-hidden">
                {previewUrl ? (
                    <img
                        src={previewUrl || "/placeholder.svg"}
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
