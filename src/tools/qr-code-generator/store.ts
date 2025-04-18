import type { TQRType } from "./qr-types";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const defaultQRType: TQRType = "url";

export const useQRCodeGeneratorStore = create<{
    qrType: TQRType;
    setQRType: (qrType: TQRType) => void;
}>()(
    immer((set) => ({
        qrType: defaultQRType,
        setQRType: (qrType) => set({ qrType })
    }))
);
