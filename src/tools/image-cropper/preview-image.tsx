import type { RefObject } from "react";
import type { CropperPreviewRef } from "react-advanced-cropper";

import { CropperPreview } from "react-advanced-cropper";

export const PreviewImage = ({
    previewRef
}: {
    previewRef: RefObject<CropperPreviewRef | null>;
}) => {
    return (
        <div className="border rounded-lg p-2 bg-background">
            <div className="overflow-auto h-125">
                <CropperPreview
                    ref={previewRef}
                    className="preview w-full max-w-full h-full max-h-full"
                />
            </div>
        </div>
    );
};
