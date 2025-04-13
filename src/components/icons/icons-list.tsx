import {
    ActivityIcon,
    CalculatorIcon,
    CropIcon,
    FileTextIcon,
    KeyIcon,
    QrCodeIcon
} from "lucide-react";

export const iconsList = {
    "key-icon": KeyIcon,
    "file-text-icon": FileTextIcon,
    "calculator-icon": CalculatorIcon,
    "crop-icon": CropIcon,
    "activity-icon": ActivityIcon,
    "qr-code-icon": QrCodeIcon
};

export type TIconKey = keyof typeof iconsList;

export const getIcon = (key?: keyof typeof iconsList | null): any => {
    return key ? iconsList[key] : null;
};
