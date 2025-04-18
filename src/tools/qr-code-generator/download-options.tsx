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

const createCanvas = (width: number, height: number, withBackground: boolean = false) => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
        console.error("Could not get canvas context");
        return null;
    }

    if (withBackground) {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    return { canvas, ctx };
};

export const DownloadOptions = ({ qrCodeRef }: { qrCodeRef: TQRCodeRef }) => {
    const { fileName: sFileName } = useQrCodeGeneratorStore();
    const fileName = sFileName || "my-qrcode";

    const downloadSVG = () => {
        const svg = getSVGElement(qrCodeRef);
        if (!svg) return;

        const url = createImageFromSVG(svg);
        downloadFile(url, fileName + ".svg");
        return;
    };

    const downloadPNG = () => {
        const svg = getSVGElement(qrCodeRef);
        if (!svg) return;

        const svgRect = svg.getBoundingClientRect();
        const canvasSetup = createCanvas(svgRect.width, svgRect.height);
        if (!canvasSetup) return;

        const { canvas, ctx } = canvasSetup;
        const img = new Image();
        const svgUrl = createImageFromSVG(svg);

        img.onload = () => {
            ctx.drawImage(img, 0, 0);

            canvas.toBlob((blob) => {
                if (!blob) {
                    console.error("Failed to create blob from canvas");
                    return;
                }

                const url = URL.createObjectURL(blob);
                downloadFile(url, `${fileName}.png`);
                return;
            }, "image/png");

            URL.revokeObjectURL(svgUrl);
            return;
        };

        img.src = svgUrl;
        return;
    };

    const downloadJPEG = () => {
        const svg = getSVGElement(qrCodeRef);
        if (!svg) return;

        const svgRect = svg.getBoundingClientRect();
        const canvasSetup = createCanvas(svgRect.width, svgRect.height, true);
        if (!canvasSetup) return;

        const { canvas, ctx } = canvasSetup;
        const img = new Image();
        const svgUrl = createImageFromSVG(svg);

        img.onload = () => {
            ctx.drawImage(img, 0, 0);

            canvas.toBlob(
                (blob) => {
                    if (!blob) {
                        console.error("Failed to create blob from canvas");
                        return;
                    }

                    const url = URL.createObjectURL(blob);
                    downloadFile(url, `${fileName}.jpg`);
                    return;
                },
                "image/jpeg",
                0.9
            );

            URL.revokeObjectURL(svgUrl);
            return;
        };

        img.src = svgUrl;
        return;
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
