import {
    CalendarIcon,
    CreditCardIcon,
    FileTextIcon,
    LinkIcon,
    MailIcon,
    MapPinIcon,
    PhoneIcon,
    WifiIcon
} from "lucide-react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

// QR Code types
const QR_TYPES = [
    { id: "url", label: "URL", icon: LinkIcon },
    { id: "text", label: "Text", icon: FileTextIcon },
    { id: "wifi", label: "Wi-Fi", icon: WifiIcon },
    { id: "email", label: "Email", icon: MailIcon },
    { id: "phone", label: "Phone", icon: PhoneIcon },
    { id: "vcard", label: "Contact", icon: CreditCardIcon },
    { id: "event", label: "Event", icon: CalendarIcon },
    { id: "location", label: "Location", icon: MapPinIcon }
];

// Wi-Fi encryption types
const WIFI_ENCRYPTION_TYPES = [
    { value: "WPA", label: "WPA/WPA2" },
    { value: "WEP", label: "WEP" },
    { value: "nopass", label: "No Password" }
];

export const SelectionAndContent = () => {
    // QR Code content state
    const [qrType, setQrType] = useState<string>("url");
    const [qrContent, setQrContent] = useState<string>("https://");

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

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label>QR Code Type</Label>
                <Tabs defaultValue={qrType} onValueChange={setQrType} className="w-full">
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
                    <div className="h-2"></div>

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
                            <Select value={wifiEncryption} onValueChange={setWifiEncryption}>
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
                            Tip: You can find coordinates by right-clicking on a location in Google
                            Maps and selecting "What's here?"
                        </p>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};
