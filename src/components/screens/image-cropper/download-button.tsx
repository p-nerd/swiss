import type { RefObject } from "react";

import { getImageData } from "@/lib/image";
import { useImageCropperStore } from "@/states/use-image-cropper-store";

import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";

export const DownloadButton = ({ imgRef }: { imgRef: RefObject<HTMLImageElement | null> }) => {
    const { completedCrop, scale, rotate, fileName, fileType, fileQuality } =
        useImageCropperStore();

    const downloadCroppedImage = () => {
        if (!imgRef.current || !completedCrop) return;

        // Create a canvas with the cropped image
        const canvas = getImageData(imgRef.current, completedCrop, scale, rotate);

        // Convert canvas to blob
        canvas.toBlob(
            (blob) => {
                if (!blob) return;

                // Create a download link
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                // Clean up
                URL.revokeObjectURL(url);
            },
            fileType,
            fileQuality
        );
    };

    return (
        <Button onClick={downloadCroppedImage} disabled={!completedCrop} className="gap-2">
            <DownloadIcon className="h-4 w-4" />
            Download
        </Button>
    );
};
