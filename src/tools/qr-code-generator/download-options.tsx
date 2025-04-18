import type { TQRCodeRef } from "./types";

import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import { useQrCodeGeneratorStore } from "./store";

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
};

export const DownloadOptions = ({ qrCodeRef }: { qrCodeRef: TQRCodeRef }) => {
    const { fileName: sFileName } = useQrCodeGeneratorStore();

    const fileName = sFileName || "my-qrcode";

    const downloadSVG = () => {
        if (!qrCodeRef.current) {
            console.error("QR code reference is not available");
            return;
        }

        const svg = qrCodeRef.current.querySelector("svg");
        if (!svg) {
            console.error("SVG element found in QR code");
            return;
        }

        const svgData = new XMLSerializer().serializeToString(svg);
        const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(svgBlob);

        downloadFile(url, fileName + ".svg");
    };

    const downloadPNG = () => {
        //
    };

    const downloadJPEG = () => {
        //
    };

    return (
        <div className="mt-6 space-y-4 w-full">
            <h4 className="text-sm font-medium">Download Options</h4>
            <div className="flex flex-wrap gap-2">
                <Button onClick={downloadSVG} className="gap-2">
                    <DownloadIcon className="h-4 w-4" />
                    SVG
                </Button>
                <Button onClick={downloadPNG} variant="outline" className="gap-2">
                    <DownloadIcon className="h-4 w-4" />
                    PNG
                </Button>

                <Button onClick={() => downloadJPEG} variant="outline" className="gap-2">
                    <DownloadIcon className="h-4 w-4" />
                    JPEG
                </Button>
            </div>
        </div>
    );
};
