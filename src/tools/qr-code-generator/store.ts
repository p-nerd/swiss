import type { TQRType } from "./qr-types";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const defaultQRType: TQRType = "url";

const defaultUrl: string = "https://";

const defaultText: string = "";

export const useQrCodeGeneratorStore = create<{
    qrType: TQRType;
    setQrType: (qrType: TQRType) => void;

    url: string;
    setUrl: (url: string) => void;

    text: string;
    setText: (text: string) => void;
}>()(
    immer((set) => ({
        qrType: defaultQRType,
        setQrType: (qrType) => set({ qrType }),

        url: defaultUrl,
        setUrl: (url) => set({ url }),

        text: defaultText,
        setText: (text) => set({ text })
    }))
);
