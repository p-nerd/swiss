import type { TQRType } from "./qr-types";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const defaultQRType: TQRType = "url";

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

export const useQrCodeGeneratorStore = create<{
    qrType: TQRType;
    setQrType: (qrType: TQRType) => void;

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
}>()(
    immer((set) => ({
        qrType: defaultQRType,
        setQrType: (qrType) => set({ qrType }),

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
        setContactWebsite: (contactWebsite) => set({ contactWebsite })
    }))
);
