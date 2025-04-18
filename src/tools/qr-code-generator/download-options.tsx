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

    const downloadPNG = async () => {
        const url = getImageURLFromSVG(qrCodeRef);
        if (!url) return;

        try {
            // Convert the SVG URL to an image
            const img = new Image();
            img.src = url;

            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
            });

            // Create canvas and draw image
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");

            if (ctx) {
                // Fill with white background
                ctx.fillStyle = "white";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                // Draw the image
                ctx.drawImage(img, 0, 0);

                // Get PNG data URL and download
                const pngUrl = canvas.toDataURL("image/png");
                downloadFile(pngUrl, `${fileName}.png`);
            }

            // Clean up
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error converting to PNG:", error);
        }
    };

    const downloadJPEG = async () => {
        const url = getImageURLFromSVG(qrCodeRef);
        if (!url) return;

        try {
            // Convert the SVG URL to an image
            const img = new Image();
            img.src = url;

            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
            });

            // Create canvas and draw image
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");

            if (ctx) {
                // Fill with white background
                ctx.fillStyle = "white";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                // Draw the image
                ctx.drawImage(img, 0, 0);

                // Get JPEG data URL and download
                const jpegUrl = canvas.toDataURL("image/jpeg", 0.9);
                downloadFile(jpegUrl, `${fileName}.jpg`);
            }

            // Clean up
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error converting to JPEG:", error);
        }
    };

    return (
        <div className="mt-6 flex flex-col items-center space-y-4 w-full">
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
