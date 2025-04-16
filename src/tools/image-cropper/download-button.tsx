import type { RefObject } from "react";
import type { CropperRef } from "react-advanced-cropper";

import { useState } from "react";
import { getFileName } from "./files";
import { useImageCropperStore } from "./store";

import { Button } from "@/components/ui/button";
import { DownloadIcon, Loader2Icon } from "lucide-react";

export const DownloadButton = ({ cropperRef }: { cropperRef: RefObject<CropperRef | null> }) => {
    const [isDownloading, setIsDownloading] = useState(false);

    const { fileName, fileType, fileQuality } = useImageCropperStore();

    const downloadCroppedImage = () => {
        const url = cropperRef.current?.getCanvas()?.toDataURL(fileType, fileQuality);

        if (!url) return;

        try {
            setIsDownloading(true);

            const link = document.createElement("a");
            link.href = url;

            link.download = getFileName(fileName, fileType);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(url);
            setIsDownloading(false);
        } catch (error) {
            console.error("Error downloading image:", error);
            setIsDownloading(false);
        }
    };

    return (
        <Button onClick={downloadCroppedImage} className="gap-2">
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
