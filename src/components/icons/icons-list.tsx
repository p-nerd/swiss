import { CalculatorIcon, CropIcon, FileTextIcon, KeyIcon } from "lucide-react";

export const iconsList = {
    "key-icon": KeyIcon,
    "file-text-icon": FileTextIcon,
    "calculator-icon": CalculatorIcon,
    "crop-icon": CropIcon
};

export const getIcon = (key?: keyof typeof iconsList | null): any => {
    return key ? iconsList[key] : null;
};
