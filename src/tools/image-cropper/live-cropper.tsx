import { useState } from "react";
import { Cropper, type CropperRef } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";

export const LiveCropper = () => {
    const [image] = useState(
        "https://images.unsplash.com/photo-1599140849279-1014532882fe?fit=crop&w=1300&q=80"
    );

    const onChange = (cropper: CropperRef) => {
        console.log(cropper.getCoordinates(), cropper.getCanvas());
    };

    return (
        <div className="border rounded-lg p-2 bg-background">
            <div className="overflow-auto">
                <Cropper src={image} onChange={onChange} className={"cropper"} />
            </div>
        </div>
    );
};
