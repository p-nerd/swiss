import type { TErrorCorrectionLevel, TQRType } from "./options";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const defaultQrContent: string = "";
const defaultQrType: TQRType = "url";

const defaultFileName: string = "";
const defaultSize: number = 200;
const defaultErrorCorrection: TErrorCorrectionLevel = "M";
const defaultBgColor: string = "#FFFFFF";
const defaultFgColor: string = "#000000";
const defaultIncludeMargin: boolean = true;
const defaultLogoUrl: string = "";
const defaultLogoSize: number = 50;

const defaultUrl: string = "https://";

const defaultText: string = "";

const defaultWifiName: string = "";
const defaultWifiPassword: string = "";
const defaultWifiEncryption: string = "WPA";
const defaultWifiHidden: boolean = false;

const defaultEmail: string = "";
const defaultEmailSubject: string = "";
const defaultEmailBody: string = "";

const defaultPhone: string = "";

const defaultContactName: string = "";
const defaultContactOrg: string = "";
const defaultContactTitle: string = "";
const defaultContactPhone: string = "";
const defaultContactEmail: string = "";
const defaultContactAddress: string = "";
const defaultContactWebsite: string = "";

const defaultEventTitle: string = "";
const defaultEventLocation: string = "";
const defaultEventStart: string = "";
const defaultEventEnd: string = "";
const defaultEventDescription: string = "";

const defaultLatitude: string = "";
const defaultLongitude: string = "";

export const useQrCodeGeneratorStore = create<{
    qrContent: string;
    setQrContent: (qrContent: string) => void;
    qrType: TQRType;
    setQrType: (qrType: TQRType) => void;

    fileName: string;
    setFileName: (fileName: string) => void;
    size: number;
    setSize: (size: number) => void;
    errorCorrection: TErrorCorrectionLevel;
    setErrorCorrection: (errorCorrection: TErrorCorrectionLevel) => void;
    bgColor: string;
    setBgColor: (bgColor: string) => void;
    fgColor: string;
    setFgColor: (fgColor: string) => void;
    includeMargin: boolean;
    setIncludeMargin: (includeMargin: boolean) => void;
    logoUrl: string;
    setLogoUrl: (logoUrl: string) => void;
    logoSize: number;
    setLogoSize: (logoSize: number) => void;

    url: string;
    setUrl: (url: string) => void;

    text: string;
    setText: (text: string) => void;

    wifiName: string;
    setWifiName: (wifiName: string) => void;
    wifiPassword: string;
    setWifiPassword: (wifiPassword: string) => void;
    wifiEncryption: string;
    setWifiEncryption: (wifiEncryption: string) => void;
    wifiHidden: boolean;
    setWifiHidden: (wifiHidden: boolean) => void;

    email: string;
    setEmail: (email: string) => void;
    emailSubject: string;
    setEmailSubject: (emailSubject: string) => void;
    emailBody: string;
    setEmailBody: (emailBody: string) => void;

    phone: string;
    setPhone: (phone: string) => void;

    contactName: string;
    setContactName: (contactName: string) => void;
    contactOrg: string;
    setContactOrg: (contactOrg: string) => void;
    contactTitle: string;
    setContactTitle: (contactTitle: string) => void;
    contactPhone: string;
    setContactPhone: (contactPhone: string) => void;
    contactEmail: string;
    setContactEmail: (contactEmail: string) => void;
    contactAddress: string;
    setContactAddress: (contactAddress: string) => void;
    contactWebsite: string;
    setContactWebsite: (contactWebsite: string) => void;

    eventTitle: string;
    setEventTitle: (eventTitle: string) => void;
    eventLocation: string;
    setEventLocation: (eventLocation: string) => void;
    eventStart: string;
    setEventStart: (eventStart: string) => void;
    eventEnd: string;
    setEventEnd: (eventEnd: string) => void;
    eventDescription: string;
    setEventDescription: (eventDescription: string) => void;

    latitude: string;
    setLatitude: (latitude: string) => void;
    longitude: string;
    setLongitude: (longitude: string) => void;
}>()(
    immer((set) => ({
        qrContent: defaultQrContent,
        setQrContent: (qrContent) => set({ qrContent }),
        qrType: defaultQrType,
        setQrType: (qrType) => set({ qrType }),

        fileName: defaultFileName,
        setFileName: (fileName) => set({ fileName }),
        size: defaultSize,
        setSize: (size) => set({ size }),
        errorCorrection: defaultErrorCorrection,
        setErrorCorrection: (errorCorrection) => set({ errorCorrection }),
        bgColor: defaultBgColor,
        setBgColor: (bgColor) => set({ bgColor }),
        fgColor: defaultFgColor,
        setFgColor: (fgColor) => set({ fgColor }),
        includeMargin: defaultIncludeMargin,
        setIncludeMargin: (includeMargin) => set({ includeMargin }),
        logoUrl: defaultLogoUrl,
        setLogoUrl: (logoUrl) => set({ logoUrl }),
        logoSize: defaultLogoSize,
        setLogoSize: (logoSize) => set({ logoSize }),

        url: defaultUrl,
        setUrl: (url) => set({ url }),

        text: defaultText,
        setText: (text) => set({ text }),

        wifiName: defaultWifiName,
        setWifiName: (wifiName) => set({ wifiName }),
        wifiPassword: defaultWifiPassword,
        setWifiPassword: (wifiPassword) => set({ wifiPassword }),
        wifiEncryption: defaultWifiEncryption,
        setWifiEncryption: (wifiEncryption) => set({ wifiEncryption }),
        wifiHidden: defaultWifiHidden,
        setWifiHidden: (wifiHidden) => set({ wifiHidden }),

        email: defaultEmail,
        setEmail: (email) => set({ email }),
        emailSubject: defaultEmailSubject,
        setEmailSubject: (emailSubject) => set({ emailSubject }),
        emailBody: defaultEmailBody,
        setEmailBody: (emailBody) => set({ emailBody }),

        phone: defaultPhone,
        setPhone: (phone) => set({ phone }),

        contactName: defaultContactName,
        setContactName: (contactName) => set({ contactName }),
        contactOrg: defaultContactOrg,
        setContactOrg: (contactOrg) => set({ contactOrg }),
        contactTitle: defaultContactTitle,
        setContactTitle: (contactTitle) => set({ contactTitle }),
        contactPhone: defaultContactPhone,
        setContactPhone: (contactPhone) => set({ contactPhone }),
        contactEmail: defaultContactEmail,
        setContactEmail: (contactEmail) => set({ contactEmail }),
        contactAddress: defaultContactAddress,
        setContactAddress: (contactAddress) => set({ contactAddress }),
        contactWebsite: defaultContactWebsite,
        setContactWebsite: (contactWebsite) => set({ contactWebsite }),

        eventTitle: defaultEventTitle,
        setEventTitle: (eventTitle) => set({ eventTitle }),
        eventLocation: defaultEventLocation,
        setEventLocation: (eventLocation) => set({ eventLocation }),
        eventStart: defaultEventStart,
        setEventStart: (eventStart) => set({ eventStart }),
        eventEnd: defaultEventEnd,
        setEventEnd: (eventEnd) => set({ eventEnd }),
        eventDescription: defaultEventDescription,
        setEventDescription: (eventDescription) => set({ eventDescription }),

        latitude: defaultLatitude,
        setLatitude: (latitude) => set({ latitude }),
        longitude: defaultLongitude,
        setLongitude: (longitude) => set({ longitude })
    }))
);
