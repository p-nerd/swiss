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

import { useState } from "react";

import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { SelectionContentContact } from "./selection-content-contact";
import { SelectionContentEmail } from "./selection-content-email";
import { SelectionContentEvent } from "./selection-content-event";
import { SelectionContentLocation } from "./selection-content-location";
import { SelectionContentPhone } from "./selection-content-phone";
import { SelectionContentText } from "./selection-content-text";
import { SelectionContentURL } from "./selection-content-url";
import { SelectionContentWifi } from "./selection-content-wifi";

const qrTypes = [
    { id: "url", label: "URL", icon: LinkIcon, content: SelectionContentURL },
    { id: "text", label: "Text", icon: FileTextIcon, content: SelectionContentText },
    { id: "wifi", label: "Wi-Fi", icon: WifiIcon, content: SelectionContentWifi },
    { id: "email", label: "Email", icon: MailIcon, content: SelectionContentEmail },
    { id: "phone", label: "Phone", icon: PhoneIcon, content: SelectionContentPhone },
    { id: "contact", label: "Contact", icon: CreditCardIcon, content: SelectionContentContact },
    { id: "event", label: "Event", icon: CalendarIcon, content: SelectionContentEvent },
    { id: "location", label: "Location", icon: MapPinIcon, content: SelectionContentLocation }
];

export const SelectionAndContent = () => {
    const [qrType, setQrType] = useState<string>("url");

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label>QR Code Type</Label>
                <Tabs defaultValue={qrType} onValueChange={setQrType} className="w-full">
                    <TabsList className="grid grid-cols-4 h-auto">
                        {qrTypes.slice(0, 4).map((type) => (
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
                        {qrTypes.slice(4).map((type) => (
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
                    {qrTypes.map(({ id, content: Content }) => (
                        <TabsContent value={id} className="mt-4 space-y-4">
                            <Content />
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </div>
    );
};
