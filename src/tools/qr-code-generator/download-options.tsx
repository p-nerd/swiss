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
        if (!qrCodeRef.current) {
            console.error("QR code reference is not available");
            return;
        }

        const svg = qrCodeRef.current.querySelector("svg");
        if (!svg) {
            console.error("SVG element not found in QR code");
            return;
        }

        // Create a canvas element
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            console.error("Could not get canvas context");
            return;
        }

        // Get the SVG dimensions
        const svgRect = svg.getBoundingClientRect();
        canvas.width = svgRect.width;
        canvas.height = svgRect.height;

        // Create an image from the SVG
        const img = new Image();
        const svgData = new XMLSerializer().serializeToString(svg);
        const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
        const svgUrl = URL.createObjectURL(svgBlob);

        img.onload = () => {
            // Draw the image on the canvas
            ctx.drawImage(img, 0, 0);

            // Convert the canvas to a PNG blob
            canvas.toBlob((blob) => {
                if (!blob) {
                    console.error("Failed to create blob from canvas");
                    return;
                }

                // Download the PNG
                const url = URL.createObjectURL(blob);
                downloadFile(url, fileName + ".png");
            }, "image/png");

            // Clean up the SVG URL
            URL.revokeObjectURL(svgUrl);
        };

        img.src = svgUrl;
    };

    const downloadJPEG = () => {
        if (!qrCodeRef.current) {
            console.error("QR code reference is not available");
            return;
        }

        const svg = qrCodeRef.current.querySelector("svg");
        if (!svg) {
            console.error("SVG element not found in QR code");
            return;
        }

        // Create a canvas element
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            console.error("Could not get canvas context");
            return;
        }

        // Get the SVG dimensions
        const svgRect = svg.getBoundingClientRect();
        canvas.width = svgRect.width;
        canvas.height = svgRect.height;

        // Set white background for JPEG (since JPEGs don't support transparency)
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Create an image from the SVG
        const img = new Image();
        const svgData = new XMLSerializer().serializeToString(svg);
        const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
        const svgUrl = URL.createObjectURL(svgBlob);

        img.onload = () => {
            // Draw the image on the canvas
            ctx.drawImage(img, 0, 0);

            // Convert the canvas to a JPEG blob
            canvas.toBlob(
                (blob) => {
                    if (!blob) {
                        console.error("Failed to create blob from canvas");
                        return;
                    }

                    // Download the JPEG
                    const url = URL.createObjectURL(blob);
                    downloadFile(url, fileName + ".jpg");
                },
                "image/jpeg",
                0.9
            ); // 0.9 quality for JPEG

            // Clean up the SVG URL
            URL.revokeObjectURL(svgUrl);
        };

        img.src = svgUrl;
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
