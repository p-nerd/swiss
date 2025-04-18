import type { TQRCodeRef } from "./types";

import { QRCodeSVG } from "qrcode.react";
import { DownloadOptions } from "./download-options";

export const QRCodePreview = ({ qrCodeRef }: { qrCodeRef: TQRCodeRef }) => {
    const qrContent = "";
    const size = undefined;
    const bgColor = undefined;
    const fgColor = undefined;
    const errorCorrection = undefined;
    const includeMargin = undefined;
    const logoUrl = undefined;
    const logoSize = 50;

    return (
        <div className="flex w-full flex-col items-center justify-start space-y-6">
            <div className="rounded-lg border bg-card p-6 w-full flex flex-col items-center">
                <h3 className="mb-4 text-lg font-medium">QR Code Preview</h3>
                <div
                    ref={qrCodeRef}
                    className="flex items-center justify-center bg-white p-4 rounded-lg"
                >
                    <QRCodeSVG
                        value={qrContent}
                        size={size}
                        bgColor={bgColor}
                        fgColor={fgColor}
                        level={errorCorrection}
                        includeMargin={includeMargin}
                        imageSettings={
                            logoUrl
                                ? {
                                      src: logoUrl,
                                      height: logoSize,
                                      width: logoSize,
                                      excavate: true
                                  }
                                : undefined
                        }
                    />
                </div>
                <DownloadOptions qrCodeRef={qrCodeRef} />
            </div>
        </div>
    );
};
