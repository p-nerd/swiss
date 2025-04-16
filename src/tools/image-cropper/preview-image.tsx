import type { TPreviewRef } from "./types";

import { CropperPreview } from "react-advanced-cropper";

export const PreviewImage = ({ previewRef }: { previewRef: TPreviewRef }) => {
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
