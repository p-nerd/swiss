import type { TQRCodeRef } from "./types";

import { useQrCodeGeneratorStore } from "./store";

import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";

const downloadFile = (url: string, fileName: string) => {
    if (url) {
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
    return;
};

const getCanvasElement = (qrCodeRef: TQRCodeRef) => {
    if (!qrCodeRef.current) {
        console.error("QR code reference is not available");
        return null;
    }
    const canvas = qrCodeRef.current.querySelector("canvas");
    if (!canvas) {
        console.error("Canvas element not found in QR code");
        return null;
    }
    return canvas;
};

export const DownloadOptions = ({ qrCodeRef }: { qrCodeRef: TQRCodeRef }) => {
    const { fileName: sFileName } = useQrCodeGeneratorStore();

    const fileName = sFileName || "my-qrcode";

    const downloadPNG = () => {
        const canvas = getCanvasElement(qrCodeRef);
        if (!canvas) return;

        const url = canvas.toDataURL("image/png");

        downloadFile(url, `${fileName}.png`);
    };

    const downloadJPEG = () => {
        const canvas = getCanvasElement(qrCodeRef);
        if (!canvas) return;

        const url = canvas.toDataURL("image/jpeg", 0.9);

        downloadFile(url, `${fileName}.jpg`);
    };
    return (
        <div className="mt-6 flex flex-col items-center space-y-4 w-full">
            <h4 className="text-sm font-medium">Download Options</h4>
            <div className="flex flex-wrap gap-2">
                <Button onClick={downloadPNG} className="gap-2">
                    <DownloadIcon className="h-4 w-4" />
                    PNG
                </Button>
                <Button onClick={downloadJPEG} variant="outline" className="gap-2">
                    <DownloadIcon className="h-4 w-4" />
                    JPEG
                </Button>
            </div>
        </div>
    );
};
