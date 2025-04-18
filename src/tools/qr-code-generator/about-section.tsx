import { InfoIcon } from "lucide-react";

export const AboutSection = () => {
    return (
        <div className="rounded-lg border bg-muted p-4 w-full">
            <div className="flex items-start gap-2">
                <InfoIcon className="mt-0.5 h-5 w-5 text-muted-foreground" />
                <div className="text-sm">
                    <p className="mb-2">
                        <strong>About QR Codes:</strong> QR (Quick Response) codes are
                        two-dimensional barcodes that can be scanned with a smartphone camera to
                        quickly access information.
                    </p>
                    <p className="mb-2">
                        <strong>Scanning:</strong> Most modern smartphones can scan QR codes
                        directly with the camera app. Simply open your camera and point it at the QR
                        code to scan.
                    </p>
                    <p>
                        <strong>Tips:</strong> For best scanning results, ensure good lighting and
                        hold your device steady. Higher error correction levels make QR codes more
                        reliable in less-than-ideal conditions.
                    </p>
                    <p>
                        <strong>Note:</strong> All QR code generation happens in your browser. No
                        data is sent to our servers, ensuring your privacy.
                    </p>
                </div>
            </div>
        </div>
    );
};
