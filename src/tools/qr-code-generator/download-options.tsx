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

const getSVGElement = (qrCodeRef: TQRCodeRef) => {
    if (!qrCodeRef.current) {
        console.error("QR code reference is not available");
        return null;
    }

    const svg = qrCodeRef.current.querySelector("svg");
    if (!svg) {
        console.error("SVG element not found in QR code");
        return null;
    }

    return svg;
};

const createImageFromSVG = (svg: SVGElement) => {
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    return URL.createObjectURL(svgBlob);
};

const getImageURLFromSVG = (qrCodeRef: TQRCodeRef): string | null => {
    const svg = getSVGElement(qrCodeRef);
    if (!svg) return null;
    return createImageFromSVG(svg);
};

export const DownloadOptions = ({ qrCodeRef }: { qrCodeRef: TQRCodeRef }) => {
    const { fileName: sFileName } = useQrCodeGeneratorStore();

    const fileName = sFileName || "my-qrcode";

    const downloadSVG = () => {
        const url = getImageURLFromSVG(qrCodeRef);
        if (!url) return;

        downloadFile(url, fileName + ".svg");
    };

    const downloadPNG = () => {
        const url = getImageURLFromSVG(qrCodeRef);
        if (!url) return;

        console.log(url);

        // downloadFile(url, `${fileName}.png`);
    };

    const downloadJPEG = () => {
        const url = getImageURLFromSVG(qrCodeRef);
        if (!url) return;

        console.log(url);

        // downloadFile(url, `${fileName}.jpg`);
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
                <Button onClick={downloadJPEG} variant="outline" className="gap-2">
                    <DownloadIcon className="h-4 w-4" />
                    JPEG
                </Button>
            </div>
        </div>
    );
};
