import type { TIconKey } from "@/components/icons/icons-list";

export type TTool = {
    icon: TIconKey;
    iconClass: string;
    title: string;
    href: string;
    desc: string;
    descMore: string;
    keywords: string[];
};

export const tools: TTool[] = [
    {
        icon: "crop-icon",
        iconClass: "text-purple-500 dark:text-purple-400",
        title: "Image Cropper",
        href: "/image-cropper",
        desc: "Easily crop, resize, and edit your images online. Adjust aspect ratios, zoom, rotate, and download in multiple formats.",
        descMore: "Free online image cropping tool with no watermarks or ads.",
        keywords: [
            "image cropper",
            "photo editor",
            "crop image",
            "resize image",
            "image editor",
            "aspect ratio",
            "rotate image",
            "online image tool",
            "free image cropper",
            "image trimmer",
            "picture cropper",
            "crop and save",
            "image manipulation",
            "web image editor",
            "swiss"
        ]
    },
    {
        icon: "key-icon",
        iconClass: "text-red-500 dark:text-red-400",
        title: "Password Generator",
        href: "/password-generator",
        desc:
            "Generate strong, secure passwords with customizable length, character types, " +
            "and advanced options for maximum online security.",
        descMore: "Free online password generator tool with no data storage.",
        keywords: [
            "password generator",
            "secure password",
            "strong password",
            "random password",
            "password creator",
            "password tool",
            "security tool",
            "password strength",
            "custom password",
            "online password generator",
            "swiss"
        ]
    },
    {
        icon: "file-text-icon",
        iconClass: "text-blue-500 dark:text-blue-400",
        title: "Text Case Converter",
        href: "/text-case-converter",
        desc: "Instantly convert text between different cases: lowercase, UPPERCASE, Title Case, camelCase, snake_case, and more.",
        descMore: "Free online text transformation tool with additional text statistics.",
        keywords: [
            "text case converter",
            "uppercase converter",
            "lowercase converter",
            "title case",
            "camel case",
            "pascal case",
            "snake case",
            "kebab case",
            "text transformer",
            "text formatter",
            "case changer",
            "text utility",
            "online text tool",
            "swiss"
        ]
    },
    {
        icon: "calculator-icon",
        iconClass: "text-green-500 dark:text-green-400",
        title: "Unit Converter",
        href: "/unit-converter",
        desc: "Quickly and accurately convert between different units of measurement for length, weight, volume, temperature, time, and more.",
        descMore: "Free online unit conversion tool with support for multiple measurement systems.",
        keywords: [
            "unit converter",
            "measurement converter",
            "length converter",
            "weight converter",
            "volume converter",
            "temperature converter",
            "time converter",
            "speed converter",
            "data size converter",
            "metric conversion",
            "imperial conversion",
            "conversion calculator",
            "measurement tool",
            "online converter",
            "swiss"
        ]
    },
    {
        icon: "activity-icon",
        iconClass: "text-orange-500 dark:text-orange-400",
        title: "BMI Calculator",
        href: "/bmi-calculator",
        desc: "Calculate your Body Mass Index (BMI) to assess your weight relative to your height and better understand your health status.",
        descMore: "Free online BMI calculator with health category assessment and recommendations.",
        keywords: [
            "BMI calculator",
            "body mass index",
            "weight calculator",
            "health assessment",
            "fitness tool",
            "weight status",
            "health calculator",
            "obesity measurement",
            "weight-to-height ratio",
            "body health check",
            "weight management",
            "health indicator",
            "online health tool",
            "swiss"
        ]
    },
    {
        icon: "qr-code-icon",
        iconClass: "text-indigo-500 dark:text-indigo-400",
        title: "QR Code Generator",
        href: "/qr-code-generator",
        desc: "Create customizable QR codes for websites, text, contact information, Wi-Fi networks, and more with this easy-to-use tool.",
        descMore: "Free online QR code generator with download options in multiple formats.",
        keywords: [
            "QR code generator",
            "QR maker",
            "QR creator",
            "create QR code",
            "scan code generator",
            "URL to QR",
            "custom QR code",
            "mobile QR",
            "scannable code",
            "digital code generator",
            "contact QR",
            "WiFi QR code",
            "online QR tool",
            "free QR generator",
            "swiss"
        ]
    }
];

export const getToolData = (href: string): TTool => {
    const data = tools.find((t) => t.href === href);
    if (!data) throw new Error(`Tool data not found, href: ${href}`);
    return data;
};
