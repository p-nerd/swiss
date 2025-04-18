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
        setEmailBody: (emailBody) => set({ emailBody })
    }))
);
