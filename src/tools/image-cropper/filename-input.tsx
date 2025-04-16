import type { TFileType } from "@/types/image-generator";

import { getExtensionByFileName, getFileTypeByExtension, isValidExtension } from "./files";
import { useImageCropperStore } from "./store";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const FilenameInput = () => {
    const { fileName, setFileName, setFileType } = useImageCropperStore();

    return (
        <div className="space-y-2 pt-2">
            <Label htmlFor="filename">Filename</Label>
            <div className="flex items-center gap-2">
                <Input
                    id="filename"
                    type="text"
                    value={fileName}
                    onChange={(e) => {
                        const fileName = e.target.value;
                        const extension = getExtensionByFileName(fileName);
                        if (extension && isValidExtension(extension)) {
                            setFileType(getFileTypeByExtension(extension) as TFileType);
                        }
                        setFileName(fileName);
                    }}
                />
            </div>
        </div>
    );
};
