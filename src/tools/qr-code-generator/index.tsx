import { useRef } from "react";
import { useUpdateQrContent } from "./hooks";

import { AboutSection } from "./about-section";
import { CustomizeQRCode } from "./customize-qr-code";
import { QRCodePreview } from "./qr-code-preview";
import { SelectionAndContent } from "./selection-and-content";

export const QRCodeGeneratorComponent = () => {
    const qrCodeRef = useRef<HTMLDivElement>(null);

    useUpdateQrContent();

    return (
        <div className="space-y-6">
            <div className="w-full flex flex-col md:flex-row gap-6">
                <div className="flex w-full flex-col gap-6">
                    <SelectionAndContent />
                    <CustomizeQRCode />
                </div>
                <div className="flex w-full flex-col gap-6">
                    <QRCodePreview qrCodeRef={qrCodeRef} />
                    <AboutSection />
                </div>
            </div>
        </div>
    );
};
