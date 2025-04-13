import { useImageCropperStore } from "./use-image-cropper-store";

import { Label } from "@/components/ui/label";

export const FilenameInput = () => {
    const { fileName, setFileName } = useImageCropperStore();

    return (
        <div className="space-y-2 pt-2">
            <Label htmlFor="filename">Filename</Label>
            <div className="flex items-center gap-2">
                <input
                    id="filename"
                    type="text"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>
        </div>
    );
};
