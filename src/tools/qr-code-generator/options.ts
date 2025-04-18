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

import type { LucideIcon } from "lucide-react";
import type { ComponentType } from "react";

import { SelectionContentContact } from "./selection-content-contact";
import { SelectionContentEmail } from "./selection-content-email";
import { SelectionContentEvent } from "./selection-content-event";
import { SelectionContentLocation } from "./selection-content-location";
import { SelectionContentPhone } from "./selection-content-phone";
import { SelectionContentText } from "./selection-content-text";
import { SelectionContentURL } from "./selection-content-url";
import { SelectionContentWifi } from "./selection-content-wifi";

export type TQRType =
    | "url"
    | "text"
    | "wifi"
    | "email"
    | "phone"
    | "contact"
    | "event"
    | "location";

export const QR_TYPES: {
    id: TQRType;
    label: string;
    icon: LucideIcon;
    content: ComponentType<any>;
}[] = [
    { id: "url", label: "URL", icon: LinkIcon, content: SelectionContentURL },
    { id: "text", label: "Text", icon: FileTextIcon, content: SelectionContentText },
    { id: "wifi", label: "Wi-Fi", icon: WifiIcon, content: SelectionContentWifi },
    { id: "email", label: "Email", icon: MailIcon, content: SelectionContentEmail },
    { id: "phone", label: "Phone", icon: PhoneIcon, content: SelectionContentPhone },
    { id: "contact", label: "Contact", icon: CreditCardIcon, content: SelectionContentContact },
    { id: "event", label: "Event", icon: CalendarIcon, content: SelectionContentEvent },
    { id: "location", label: "Location", icon: MapPinIcon, content: SelectionContentLocation }
] as const;

export type TErrorCorrectionLevel = "L" | "M" | "Q" | "H";

export const ERROR_CORRECTION_LEVELS = [
    { value: "L", label: "Low (7%)" },
    { value: "M", label: "Medium (15%)" },
    { value: "Q", label: "Quartile (25%)" },
    { value: "H", label: "High (30%)" }
];
