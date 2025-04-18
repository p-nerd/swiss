import type { TQRCodeRef } from "./types";

import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";

export const DownloadOptions = ({ qrCodeRef }: { qrCodeRef: TQRCodeRef }) => {
    const downloadQRCode = (format: "png" | "jpeg" | "svg") => {
        if (!qrCodeRef.current) return;

        const canvas = qrCodeRef.current.querySelector("canvas");
        const svg = qrCodeRef.current.querySelector("svg");

        if (!canvas && !svg) return;

        let url = "";
        let filename = `qrcode-${new Date().getTime()}`;

        if (format === "svg" && svg) {
            // For SVG format
            const svgData = new XMLSerializer().serializeToString(svg);
            const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
            url = URL.createObjectURL(svgBlob);
            filename += ".svg";
        } else if (canvas) {
            // For PNG and JPEG formats
            url = canvas.toDataURL(format === "jpeg" ? "image/jpeg" : "image/png");
            filename += format === "jpeg" ? ".jpg" : ".png";
        }

        if (url) {
            const link = document.createElement("a");
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            if (format === "svg") URL.revokeObjectURL(url);
        }
    };

    return (
        <div className="mt-6 space-y-4 w-full">
            <h4 className="text-sm font-medium">Download Options</h4>
            <div className="flex flex-wrap gap-2">
                <Button onClick={() => downloadQRCode("png")} className="gap-2">
                    <DownloadIcon className="h-4 w-4" />
                    PNG
                </Button>
                <Button onClick={() => downloadQRCode("svg")} variant="outline" className="gap-2">
                    <DownloadIcon className="h-4 w-4" />
                    SVG
                </Button>
                <Button onClick={() => downloadQRCode("jpeg")} variant="outline" className="gap-2">
                    <DownloadIcon className="h-4 w-4" />
                    JPEG
                </Button>
            </div>
        </div>
    );
};
