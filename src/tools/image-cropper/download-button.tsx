import { useState } from "react";
import { getExtensionByFileType, getFileName } from "./files";
import { useImageCropperStore } from "./store";

import { Button } from "@/components/ui/button";
import { DownloadIcon, Loader2Icon } from "lucide-react";

export const DownloadButton = () => {
    const [isDownloading, setIsDownloading] = useState(false);

    const { previewImageUrl, fileName, fileType } = useImageCropperStore();

    const downloadCroppedImage = () => {
        if (!previewImageUrl) {
            return;
        }

        try {
            setIsDownloading(true);

            const link = document.createElement("a");
            link.href = previewImageUrl;

            link.download = `${getFileName(fileName)}.${getExtensionByFileType(fileType)}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(previewImageUrl);
            setIsDownloading(false);
        } catch (error) {
            console.error("Error downloading image:", error);
            setIsDownloading(false);
        }
    };

    return (
        <Button onClick={downloadCroppedImage} disabled={!previewImageUrl} className="gap-2">
            {isDownloading ? (
                <>
                    <Loader2Icon className="size-4 animate-spin" />
                    Download...
                </>
            ) : (
                <>
                    <DownloadIcon className="size-4" />
                    Download
                </>
            )}
        </Button>
    );
};
