import ReactCrop, { centerCrop, makeAspectCrop, type Crop, type PixelCrop } from "react-image-crop";

import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, RotateCw, Trash, Upload, ZoomIn } from "lucide-react";

import "react-image-crop/dist/ReactCrop.css";

// This is to help identify what aspect ratio to use based on the preset
const ASPECT_RATIOS = {
    free: undefined,
    "1:1": 1,
    "4:3": 4 / 3,
    "16:9": 16 / 9,
    "3:4": 3 / 4,
    "9:16": 9 / 16
};

// Function to create a centered crop with a specific aspect ratio
function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number | undefined) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: "%",
                width: 90
            },
            aspect || 1,
            mediaWidth,
            mediaHeight
        ),
        mediaWidth,
        mediaHeight
    );
}

// Function to get image data from a canvas
function getImageData(image: HTMLImageElement, crop: PixelCrop, scale = 1, rotate = 0) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
        throw new Error("No 2d context");
    }

    // Calculate the size of the cropped image
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const pixelRatio = window.devicePixelRatio;

    // Set canvas size to the cropped image size
    canvas.width = Math.floor(crop.width * scaleX * scale);
    canvas.height = Math.floor(crop.height * scaleY * scale);

    // Set canvas pixel density
    ctx.scale(pixelRatio, pixelRatio);
    ctx.imageSmoothingQuality = "high";

    // Calculate the center of the canvas
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Move the canvas context to the center
    ctx.translate(centerX, centerY);
    // Rotate the canvas context if needed
    ctx.rotate((rotate * Math.PI) / 180);
    // Move back
    ctx.translate(-centerX, -centerY);

    // Draw the cropped image
    ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width * scaleX,
        crop.height * scaleY
    );

    return canvas;
}

export function ImageCropperComponent() {
    const [imgSrc, setImgSrc] = useState<string>("");
    const imgRef = useRef<HTMLImageElement>(null);
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const [aspectRatio, setAspectRatio] = useState<string>("free");
    const [scale, setScale] = useState<number>(1);
    const [rotate, setRotate] = useState<number>(0);
    const [fileName, setFileName] = useState<string>("cropped-image.png");
    const [maintainQuality, setMaintainQuality] = useState<boolean>(true);
    const [fileType, setFileType] = useState<string>("image/png");
    const [fileQuality, setFileQuality] = useState<number>(0.92);
    const [previewUrl, setPreviewUrl] = useState<string>("");

    // Reset crop when aspect ratio changes
    useEffect(() => {
        if (imgRef.current && aspectRatio !== "free") {
            const { width, height } = imgRef.current;
            const newCrop = centerAspectCrop(
                width,
                height,
                ASPECT_RATIOS[aspectRatio as keyof typeof ASPECT_RATIOS]
            );
            setCrop(newCrop);
        }
    }, [aspectRatio, imgSrc]);

    // Update preview when crop changes
    useEffect(() => {
        if (completedCrop && imgRef.current) {
            updatePreview();
        }
    }, [completedCrop, scale, rotate, fileType, fileQuality]);

    // Clean up object URLs when component unmounts
    useEffect(() => {
        return () => {
            if (imgSrc.startsWith("blob:")) {
                URL.revokeObjectURL(imgSrc);
            }
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [imgSrc, previewUrl]);

    // Handle file selection
    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            // Get original filename without extension
            const originalName = file.name.split(".").slice(0, -1).join(".");
            setFileName(`${originalName}-cropped.png`);

            // Create a blob URL for the image
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                if (typeof reader.result === "string") {
                    setImgSrc(reader.result);

                    // Reset crop, scale, and rotation
                    setCrop(undefined);
                    setScale(1);
                    setRotate(0);
                }
            });
            reader.readAsDataURL(file);
        }
    };

    // Handle image load
    const onImageLoad = useCallback(
        (e: React.SyntheticEvent<HTMLImageElement>) => {
            const { width, height } = e.currentTarget;

            // If aspect ratio is set, create a centered crop
            if (aspectRatio !== "free") {
                const newCrop = centerAspectCrop(
                    width,
                    height,
                    ASPECT_RATIOS[aspectRatio as keyof typeof ASPECT_RATIOS]
                );
                setCrop(newCrop);
            } else {
                // For free aspect ratio, create a default crop
                setCrop({
                    unit: "%",
                    x: 10,
                    y: 10,
                    width: 80,
                    height: 80
                });
            }
        },
        [aspectRatio]
    );

    // Update the preview image
    const updatePreview = () => {
        if (!imgRef.current || !completedCrop) return;

        // Revoke previous preview URL
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }

        // Create a canvas with the cropped image
        const canvas = getImageData(imgRef.current, completedCrop, scale, rotate);

        // Convert canvas to blob
        canvas.toBlob(
            (blob) => {
                if (!blob) return;
                const url = URL.createObjectURL(blob);
                setPreviewUrl(url);
            },
            fileType,
            fileQuality
        );
    };

    // Download the cropped image
    const downloadCroppedImage = () => {
        if (!imgRef.current || !completedCrop) return;

        // Create a canvas with the cropped image
        const canvas = getImageData(imgRef.current, completedCrop, scale, rotate);

        // Convert canvas to blob
        canvas.toBlob(
            (blob) => {
                if (!blob) return;

                // Create a download link
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                // Clean up
                URL.revokeObjectURL(url);
            },
            fileType,
            fileQuality
        );
    };

    // Reset the cropper
    const resetCropper = () => {
        setImgSrc("");
        setCrop(undefined);
        setCompletedCrop(undefined);
        setScale(1);
        setRotate(0);
        setPreviewUrl("");
    };

    return (
        <Card className="w-full">
            <CardContent className="p-6">
                <div className="space-y-6">
                    {/* File Upload Section */}
                    {!imgSrc && (
                        <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12 text-center">
                            <Upload className="h-12 w-12 text-purple-500 dark:text-purple-400 mb-4" />
                            <h3 className="text-lg font-medium mb-2">Upload an image to crop</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Supported formats: JPG, PNG, GIF, WebP
                            </p>
                            <div>
                                <label htmlFor="image-upload" className="cursor-pointer">
                                    <div className="bg-primary hover:bg-primary/90 text-primary-foreground inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow">
                                        Select Image
                                    </div>
                                    <input
                                        id="image-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={onSelectFile}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>
                    )}

                    {/* Image Cropper Section */}
                    {imgSrc && (
                        <div className="space-y-6">
                            {/* Controls */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    {/* Aspect Ratio Selection */}
                                    <div className="space-y-2">
                                        <Label>Aspect Ratio</Label>
                                        <Tabs
                                            defaultValue={aspectRatio}
                                            value={aspectRatio}
                                            onValueChange={setAspectRatio}
                                            className="w-full"
                                        >
                                            <TabsList className="grid grid-cols-3 md:grid-cols-6 h-auto">
                                                <TabsTrigger value="free" className="text-xs">
                                                    Free
                                                </TabsTrigger>
                                                <TabsTrigger value="1:1" className="text-xs">
                                                    1:1
                                                </TabsTrigger>
                                                <TabsTrigger value="4:3" className="text-xs">
                                                    4:3
                                                </TabsTrigger>
                                                <TabsTrigger value="16:9" className="text-xs">
                                                    16:9
                                                </TabsTrigger>
                                                <TabsTrigger value="3:4" className="text-xs">
                                                    3:4
                                                </TabsTrigger>
                                                <TabsTrigger value="9:16" className="text-xs">
                                                    9:16
                                                </TabsTrigger>
                                            </TabsList>
                                        </Tabs>
                                    </div>

                                    {/* Zoom Control */}
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="zoom">Zoom</Label>
                                            <span className="text-xs text-muted-foreground">
                                                {Math.round(scale * 100)}%
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <ZoomIn className="h-4 w-4 text-muted-foreground" />
                                            <Slider
                                                id="zoom"
                                                min={0.5}
                                                max={3}
                                                step={0.01}
                                                value={[scale]}
                                                onValueChange={(value) => setScale(value[0])}
                                            />
                                        </div>
                                    </div>

                                    {/* Rotation Control */}
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="rotation">Rotation</Label>
                                            <span className="text-xs text-muted-foreground">
                                                {rotate}°
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <RotateCw className="h-4 w-4 text-muted-foreground" />
                                            <Slider
                                                id="rotation"
                                                min={0}
                                                max={360}
                                                step={1}
                                                value={[rotate]}
                                                onValueChange={(value) => setRotate(value[0])}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {/* Output Settings */}
                                    <div className="space-y-2">
                                        <Label>Output Format</Label>
                                        <Tabs
                                            defaultValue={fileType}
                                            value={fileType}
                                            onValueChange={setFileType}
                                            className="w-full"
                                        >
                                            <TabsList className="grid grid-cols-3 h-auto">
                                                <TabsTrigger value="image/png" className="text-xs">
                                                    PNG
                                                </TabsTrigger>
                                                <TabsTrigger value="image/jpeg" className="text-xs">
                                                    JPEG
                                                </TabsTrigger>
                                                <TabsTrigger value="image/webp" className="text-xs">
                                                    WebP
                                                </TabsTrigger>
                                            </TabsList>
                                        </Tabs>
                                    </div>

                                    {/* Quality Control (only for JPEG and WebP) */}
                                    {fileType !== "image/png" && (
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <Label htmlFor="quality">Quality</Label>
                                                <span className="text-xs text-muted-foreground">
                                                    {Math.round(fileQuality * 100)}%
                                                </span>
                                            </div>
                                            <Slider
                                                id="quality"
                                                min={0.1}
                                                max={1}
                                                step={0.01}
                                                value={[fileQuality]}
                                                onValueChange={(value) => setFileQuality(value[0])}
                                            />
                                        </div>
                                    )}

                                    {/* Maintain Original Quality Option */}
                                    <div className="flex items-center space-x-2 pt-2">
                                        <Switch
                                            id="maintain-quality"
                                            checked={maintainQuality}
                                            onCheckedChange={setMaintainQuality}
                                        />
                                        <Label
                                            htmlFor="maintain-quality"
                                            className="cursor-pointer"
                                        >
                                            Maintain original quality
                                        </Label>
                                    </div>

                                    {/* Filename */}
                                    <div className="space-y-2 pt-2">
                                        <Label htmlFor="filename">Filename</Label>
                                        <div className="flex items-center gap-2">
                                            <input
                                                id="filename"
                                                type="text"
                                                value={fileName}
                                                onChange={(e) => setFileName(e.target.value)}
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Cropper and Preview */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Cropper */}
                                <div className="border rounded-lg p-2 bg-background">
                                    <div className="overflow-auto">
                                        <ReactCrop
                                            crop={crop}
                                            onChange={(c) => setCrop(c)}
                                            onComplete={(c) => setCompletedCrop(c)}
                                            aspect={
                                                ASPECT_RATIOS[
                                                    aspectRatio as keyof typeof ASPECT_RATIOS
                                                ]
                                            }
                                            className="max-w-full"
                                        >
                                            <img
                                                ref={imgRef}
                                                src={imgSrc || "/placeholder.svg"}
                                                alt="Crop me"
                                                style={{
                                                    transform: `scale(${scale}) rotate(${rotate}deg)`
                                                }}
                                                onLoad={onImageLoad}
                                                className="max-w-full transition-all"
                                            />
                                        </ReactCrop>
                                    </div>
                                </div>

                                {/* Preview */}
                                <div className="border rounded-lg p-2 bg-background flex flex-col">
                                    <div className="text-sm font-medium mb-2">Preview</div>
                                    <div className="flex-1 flex items-center justify-center overflow-hidden">
                                        {previewUrl ? (
                                            <img
                                                src={previewUrl || "/placeholder.svg"}
                                                alt="Preview"
                                                className="max-w-full max-h-full object-contain"
                                            />
                                        ) : (
                                            <div className="text-sm text-muted-foreground">
                                                Adjust crop to see preview
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-3 justify-center">
                                <Button
                                    onClick={downloadCroppedImage}
                                    disabled={!completedCrop}
                                    className="gap-2"
                                >
                                    <Download className="h-4 w-4" />
                                    Download
                                </Button>
                                <Button variant="outline" onClick={resetCropper} className="gap-2">
                                    <Trash className="h-4 w-4" />
                                    Clear
                                </Button>
                                <label htmlFor="change-image" className="cursor-pointer">
                                    <Button variant="outline" asChild>
                                        <div className="gap-2">
                                            <Upload className="h-4 w-4" />
                                            Change Image
                                        </div>
                                    </Button>
                                    <input
                                        id="change-image"
                                        type="file"
                                        accept="image/*"
                                        onChange={onSelectFile}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
