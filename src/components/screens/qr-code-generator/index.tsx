import {
    Calendar,
    CreditCard,
    Download,
    FileText,
    Info,
    Link,
    Mail,
    MapPin,
    Phone,
    Wifi
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

// QR Code types
const QR_TYPES = [
    { id: "url", label: "URL", icon: Link },
    { id: "text", label: "Text", icon: FileText },
    { id: "wifi", label: "Wi-Fi", icon: Wifi },
    { id: "email", label: "Email", icon: Mail },
    { id: "phone", label: "Phone", icon: Phone },
    { id: "vcard", label: "Contact", icon: CreditCard },
    { id: "event", label: "Event", icon: Calendar },
    { id: "location", label: "Location", icon: MapPin }
];

// Error correction levels
const ERROR_CORRECTION_LEVELS = [
    { value: "L", label: "Low (7%)" },
    { value: "M", label: "Medium (15%)" },
    { value: "Q", label: "Quartile (25%)" },
    { value: "H", label: "High (30%)" }
];

// Wi-Fi encryption types
const WIFI_ENCRYPTION_TYPES = [
    { value: "WPA", label: "WPA/WPA2" },
    { value: "WEP", label: "WEP" },
    { value: "nopass", label: "No Password" }
];

export function QRCodeGeneratorComponent() {
    // QR Code content state
    const [qrType, setQrType] = useState<string>("url");
    const [qrContent, setQrContent] = useState<string>("https://");

    // QR Code appearance state
    const [size, setSize] = useState<number>(200);
    const [errorCorrection, setErrorCorrection] = useState<"L" | "M" | "Q" | "H">("M");
    const [bgColor, setBgColor] = useState<string>("#FFFFFF");
    const [fgColor, setFgColor] = useState<string>("#000000");
    const [includeMargin, setIncludeMargin] = useState<boolean>(true);
    const [logoUrl, setLogoUrl] = useState<string>("");
    const [logoSize, setLogoSize] = useState<number>(50);

    // Form state for different QR types
    const [url, setUrl] = useState<string>("https://");
    const [text, setText] = useState<string>("");
    const [wifiName, setWifiName] = useState<string>("");
    const [wifiPassword, setWifiPassword] = useState<string>("");
    const [wifiEncryption, setWifiEncryption] = useState<string>("WPA");
    const [wifiHidden, setWifiHidden] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [emailSubject, setEmailSubject] = useState<string>("");
    const [emailBody, setEmailBody] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [contactName, setContactName] = useState<string>("");
    const [contactOrg, setContactOrg] = useState<string>("");
    const [contactTitle, setContactTitle] = useState<string>("");
    const [contactPhone, setContactPhone] = useState<string>("");
    const [contactEmail, setContactEmail] = useState<string>("");
    const [contactAddress, setContactAddress] = useState<string>("");
    const [contactWebsite, setContactWebsite] = useState<string>("");
    const [eventTitle, setEventTitle] = useState<string>("");
    const [eventLocation, setEventLocation] = useState<string>("");
    const [eventStart, setEventStart] = useState<string>("");
    const [eventEnd, setEventEnd] = useState<string>("");
    const [eventDescription, setEventDescription] = useState<string>("");
    const [latitude, setLatitude] = useState<string>("");
    const [longitude, setLongitude] = useState<string>("");

    // Reference to QR code container for downloading
    const qrCodeRef = useRef<HTMLDivElement>(null);

    // Update QR content when form values change
    useEffect(() => {
        updateQRContent();
    }, [
        qrType,
        url,
        text,
        wifiName,
        wifiPassword,
        wifiEncryption,
        wifiHidden,
        email,
        emailSubject,
        emailBody,
        phone,
        contactName,
        contactOrg,
        contactTitle,
        contactPhone,
        contactEmail,
        contactAddress,
        contactWebsite,
        eventTitle,
        eventLocation,
        eventStart,
        eventEnd,
        eventDescription,
        latitude,
        longitude
    ]);

    // Generate QR code content based on type
    const updateQRContent = () => {
        let content = "";

        switch (qrType) {
            case "url":
                content = url;
                break;
            case "text":
                content = text;
                break;
            case "wifi":
                content = `WIFI:S:${wifiName};T:${wifiEncryption};P:${wifiPassword};H:${wifiHidden ? "true" : "false"};`;
                break;
            case "email":
                content = `mailto:${email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
                break;
            case "phone":
                content = `tel:${phone}`;
                break;
            case "vcard":
                content = [
                    "BEGIN:VCARD",
                    "VERSION:3.0",
                    `FN:${contactName}`,
                    contactOrg ? `ORG:${contactOrg}` : "",
                    contactTitle ? `TITLE:${contactTitle}` : "",
                    contactPhone ? `TEL:${contactPhone}` : "",
                    contactEmail ? `EMAIL:${contactEmail}` : "",
                    contactAddress ? `ADR:;;${contactAddress};;;` : "",
                    contactWebsite ? `URL:${contactWebsite}` : "",
                    "END:VCARD"
                ]
                    .filter(Boolean)
                    .join("\n");
                break;
            case "event":
                // Format dates for iCalendar
                const formatDate = (dateString: string) => {
                    if (!dateString) return "";
                    const date = new Date(dateString);
                    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
                };

                const startDate = formatDate(eventStart);
                const endDate = formatDate(eventEnd);

                content = [
                    "BEGIN:VEVENT",
                    `SUMMARY:${eventTitle}`,
                    startDate ? `DTSTART:${startDate}` : "",
                    endDate ? `DTEND:${endDate}` : "",
                    eventLocation ? `LOCATION:${eventLocation}` : "",
                    eventDescription ? `DESCRIPTION:${eventDescription}` : "",
                    "END:VEVENT"
                ]
                    .filter(Boolean)
                    .join("\n");
                break;
            case "location":
                content = `geo:${latitude},${longitude}`;
                break;
            default:
                content = "";
        }

        setQrContent(content);
    };

    // Download QR code as image
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

    // Create a canvas with the QR code for downloading
    // const createQRCanvas = () => {
    //     const canvas = document.createElement("canvas");
    //     const qrSvg = qrCodeRef.current?.querySelector("svg");
    //     if (!qrSvg) return null;
    //
    //     const svgData = new XMLSerializer().serializeToString(qrSvg);
    //     const img = new Image();
    //     img.src = "data:image/svg+xml;base64," + btoa(svgData);
    //
    //     return new Promise<HTMLCanvasElement>((resolve) => {
    //         img.onload = () => {
    //             canvas.width = size;
    //             canvas.height = size;
    //             const ctx = canvas.getContext("2d");
    //             if (ctx) {
    //                 ctx.fillStyle = bgColor;
    //                 ctx.fillRect(0, 0, canvas.width, canvas.height);
    //                 ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    //                 resolve(canvas);
    //             }
    //         };
    //     });
    // };

    return (
        <Card className="w-full">
            <CardContent className="space-x-8 flex">
                <div className="grid w-2/3 gap-6 md:grid-cols-2">
                    {/* QR Code Type Selection and Content Forms */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label>QR Code Type</Label>
                            <Tabs
                                defaultValue={qrType}
                                onValueChange={setQrType}
                                className="w-full"
                            >
                                <TabsList className="grid grid-cols-4 h-auto">
                                    {QR_TYPES.slice(0, 4).map((type) => (
                                        <TabsTrigger
                                            key={type.id}
                                            value={type.id}
                                            className="flex items-center gap-1 text-xs sm:text-sm"
                                        >
                                            <type.icon className="h-3 w-3 sm:h-4 sm:w-4" />
                                            <span className="hidden sm:inline">{type.label}</span>
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                                <div className="h-2"></div>
                                <TabsList className="grid grid-cols-4 h-auto">
                                    {QR_TYPES.slice(4).map((type) => (
                                        <TabsTrigger
                                            key={type.id}
                                            value={type.id}
                                            className="flex items-center gap-1 text-xs sm:text-sm"
                                        >
                                            <type.icon className="h-3 w-3 sm:h-4 sm:w-4" />
                                            <span className="hidden sm:inline">{type.label}</span>
                                        </TabsTrigger>
                                    ))}
                                </TabsList>

                                {/* QR Code Content Forms */}
                                <TabsContent value="url" className="mt-4 space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="url-input">Website URL</Label>
                                        <Input
                                            id="url-input"
                                            placeholder="https://example.com"
                                            value={url}
                                            onChange={(e) => setUrl(e.target.value)}
                                        />
                                    </div>
                                </TabsContent>

                                <TabsContent value="text" className="mt-4 space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="text-input">Text Content</Label>
                                        <Textarea
                                            id="text-input"
                                            placeholder="Enter your text here..."
                                            value={text}
                                            onChange={(e) => setText(e.target.value)}
                                            rows={5}
                                        />
                                    </div>
                                </TabsContent>

                                <TabsContent value="wifi" className="mt-4 space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="wifi-name">Network Name (SSID)</Label>
                                        <Input
                                            id="wifi-name"
                                            placeholder="Your Wi-Fi network name"
                                            value={wifiName}
                                            onChange={(e) => setWifiName(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="wifi-encryption">Encryption Type</Label>
                                        <Select
                                            value={wifiEncryption}
                                            onValueChange={setWifiEncryption}
                                        >
                                            <SelectTrigger id="wifi-encryption">
                                                <SelectValue placeholder="Select encryption type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {WIFI_ENCRYPTION_TYPES.map((type) => (
                                                    <SelectItem key={type.value} value={type.value}>
                                                        {type.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    {wifiEncryption !== "nopass" && (
                                        <div className="space-y-2">
                                            <Label htmlFor="wifi-password">Password</Label>
                                            <Input
                                                id="wifi-password"
                                                type="password"
                                                placeholder="Wi-Fi password"
                                                value={wifiPassword}
                                                onChange={(e) => setWifiPassword(e.target.value)}
                                            />
                                        </div>
                                    )}
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="wifi-hidden"
                                            checked={wifiHidden}
                                            onCheckedChange={setWifiHidden}
                                        />
                                        <Label htmlFor="wifi-hidden">Hidden Network</Label>
                                    </div>
                                </TabsContent>

                                <TabsContent value="email" className="mt-4 space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email-address">Email Address</Label>
                                        <Input
                                            id="email-address"
                                            type="email"
                                            placeholder="example@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email-subject">Subject (Optional)</Label>
                                        <Input
                                            id="email-subject"
                                            placeholder="Email subject"
                                            value={emailSubject}
                                            onChange={(e) => setEmailSubject(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email-body">Body (Optional)</Label>
                                        <Textarea
                                            id="email-body"
                                            placeholder="Email body"
                                            value={emailBody}
                                            onChange={(e) => setEmailBody(e.target.value)}
                                            rows={3}
                                        />
                                    </div>
                                </TabsContent>

                                <TabsContent value="phone" className="mt-4 space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="phone-number">Phone Number</Label>
                                        <Input
                                            id="phone-number"
                                            placeholder="+1234567890"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Include country code for international numbers
                                        </p>
                                    </div>
                                </TabsContent>

                                <TabsContent value="vcard" className="mt-4 space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="contact-name">Full Name</Label>
                                        <Input
                                            id="contact-name"
                                            placeholder="John Doe"
                                            value={contactName}
                                            onChange={(e) => setContactName(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="contact-org">Organization</Label>
                                            <Input
                                                id="contact-org"
                                                placeholder="Company"
                                                value={contactOrg}
                                                onChange={(e) => setContactOrg(e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="contact-title">Job Title</Label>
                                            <Input
                                                id="contact-title"
                                                placeholder="Developer"
                                                value={contactTitle}
                                                onChange={(e) => setContactTitle(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="contact-phone">Phone</Label>
                                        <Input
                                            id="contact-phone"
                                            placeholder="+1234567890"
                                            value={contactPhone}
                                            onChange={(e) => setContactPhone(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="contact-email">Email</Label>
                                        <Input
                                            id="contact-email"
                                            placeholder="john@example.com"
                                            value={contactEmail}
                                            onChange={(e) => setContactEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="contact-address">Address</Label>
                                        <Input
                                            id="contact-address"
                                            placeholder="123 Main St, City, Country"
                                            value={contactAddress}
                                            onChange={(e) => setContactAddress(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="contact-website">Website</Label>
                                        <Input
                                            id="contact-website"
                                            placeholder="https://example.com"
                                            value={contactWebsite}
                                            onChange={(e) => setContactWebsite(e.target.value)}
                                        />
                                    </div>
                                </TabsContent>

                                <TabsContent value="event" className="mt-4 space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="event-title">Event Title</Label>
                                        <Input
                                            id="event-title"
                                            placeholder="Meeting"
                                            value={eventTitle}
                                            onChange={(e) => setEventTitle(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="event-location">Location</Label>
                                        <Input
                                            id="event-location"
                                            placeholder="Conference Room"
                                            value={eventLocation}
                                            onChange={(e) => setEventLocation(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="event-start">Start</Label>
                                            <Input
                                                id="event-start"
                                                type="datetime-local"
                                                value={eventStart}
                                                onChange={(e) => setEventStart(e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="event-end">End</Label>
                                            <Input
                                                id="event-end"
                                                type="datetime-local"
                                                value={eventEnd}
                                                onChange={(e) => setEventEnd(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="event-description">Description</Label>
                                        <Textarea
                                            id="event-description"
                                            placeholder="Event details..."
                                            value={eventDescription}
                                            onChange={(e) => setEventDescription(e.target.value)}
                                            rows={3}
                                        />
                                    </div>
                                </TabsContent>

                                <TabsContent value="location" className="mt-4 space-y-4">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="latitude">Latitude</Label>
                                            <Input
                                                id="latitude"
                                                placeholder="37.7749"
                                                value={latitude}
                                                onChange={(e) => setLatitude(e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="longitude">Longitude</Label>
                                            <Input
                                                id="longitude"
                                                placeholder="-122.4194"
                                                value={longitude}
                                                onChange={(e) => setLongitude(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Tip: You can find coordinates by right-clicking on a
                                        location in Google Maps and selecting "What's here?"
                                    </p>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>

                    {/* QR Code Customization */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Customize QR Code</h3>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="qr-size">Size</Label>
                                <span className="text-xs text-muted-foreground">{size}px</span>
                            </div>
                            <Slider
                                id="qr-size"
                                min={100}
                                max={400}
                                step={10}
                                value={[size]}
                                onValueChange={(value) => setSize(value[0])}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="error-correction">Error Correction</Label>
                            <Select
                                value={errorCorrection}
                                onValueChange={(value) =>
                                    setErrorCorrection(value as "L" | "M" | "Q" | "H")
                                }
                            >
                                <SelectTrigger id="error-correction">
                                    <SelectValue placeholder="Select error correction level" />
                                </SelectTrigger>
                                <SelectContent>
                                    {ERROR_CORRECTION_LEVELS.map((level) => (
                                        <SelectItem key={level.value} value={level.value}>
                                            {level.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <p className="text-xs text-muted-foreground">
                                Higher levels allow QR codes to remain readable even when partially
                                damaged or obscured
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-2">
                                <Label htmlFor="bg-color">Background Color</Label>
                                <div className="flex items-center gap-2">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="w-8 h-8 p-0"
                                                style={{ backgroundColor: bgColor }}
                                                aria-label="Pick background color"
                                            >
                                                <span className="sr-only">
                                                    Pick background color
                                                </span>
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-2">
                                            <input
                                                type="color"
                                                value={bgColor}
                                                onChange={(e) => setBgColor(e.target.value)}
                                                className="w-32 h-32 cursor-pointer"
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <Input
                                        id="bg-color"
                                        value={bgColor}
                                        onChange={(e) => setBgColor(e.target.value)}
                                        className="font-mono"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="fg-color">Foreground Color</Label>
                                <div className="flex items-center gap-2">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="w-8 h-8 p-0"
                                                style={{ backgroundColor: fgColor }}
                                                aria-label="Pick foreground color"
                                            >
                                                <span className="sr-only">
                                                    Pick foreground color
                                                </span>
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-2">
                                            <input
                                                type="color"
                                                value={fgColor}
                                                onChange={(e) => setFgColor(e.target.value)}
                                                className="w-32 h-32 cursor-pointer"
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <Input
                                        id="fg-color"
                                        value={fgColor}
                                        onChange={(e) => setFgColor(e.target.value)}
                                        className="font-mono"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Switch
                                id="include-margin"
                                checked={includeMargin}
                                onCheckedChange={setIncludeMargin}
                            />
                            <Label htmlFor="include-margin">Include Margin</Label>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="logo-url">Logo URL (Optional)</Label>
                            <Input
                                id="logo-url"
                                placeholder="https://example.com/logo.png"
                                value={logoUrl}
                                onChange={(e) => setLogoUrl(e.target.value)}
                            />
                            {logoUrl && (
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="logo-size">Logo Size</Label>
                                        <span className="text-xs text-muted-foreground">
                                            {logoSize}px
                                        </span>
                                    </div>
                                    <Slider
                                        id="logo-size"
                                        min={20}
                                        max={100}
                                        step={5}
                                        value={[logoSize]}
                                        onValueChange={(value) => setLogoSize(value[0])}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* QR Code Preview and Download */}
                <div className="flex w-1/3 flex-col items-center justify-start space-y-6">
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
                                // includeMargin={includeMargin}
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
                        <div className="mt-6 space-y-4 w-full">
                            <h4 className="text-sm font-medium">Download Options</h4>
                            <div className="flex flex-wrap gap-2">
                                <Button onClick={() => downloadQRCode("png")} className="gap-2">
                                    <Download className="h-4 w-4" />
                                    PNG
                                </Button>
                                <Button
                                    onClick={() => downloadQRCode("svg")}
                                    variant="outline"
                                    className="gap-2"
                                >
                                    <Download className="h-4 w-4" />
                                    SVG
                                </Button>
                                <Button
                                    onClick={() => downloadQRCode("jpeg")}
                                    variant="outline"
                                    className="gap-2"
                                >
                                    <Download className="h-4 w-4" />
                                    JPEG
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start text-sm text-muted-foreground">
                <div className="rounded-lg border bg-muted p-4 w-full">
                    <div className="flex items-start gap-2">
                        <Info className="mt-0.5 h-5 w-5 text-muted-foreground" />
                        <div className="text-sm">
                            <p className="mb-2">
                                <strong>About QR Codes:</strong> QR (Quick Response) codes are
                                two-dimensional barcodes that can be scanned with a smartphone
                                camera to quickly access information.
                            </p>
                            <p className="mb-2">
                                <strong>Scanning:</strong> Most modern smartphones can scan QR codes
                                directly with the camera app. Simply open your camera and point it
                                at the QR code to scan.
                            </p>
                            <p>
                                <strong>Tips:</strong> For best scanning results, ensure good
                                lighting and hold your device steady. Higher error correction levels
                                make QR codes more reliable in less-than-ideal conditions.
                            </p>
                            <p>
                                <strong>Note:</strong> All QR code generation happens in your
                                browser. No data is sent to our servers, ensuring your privacy.
                            </p>
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}
