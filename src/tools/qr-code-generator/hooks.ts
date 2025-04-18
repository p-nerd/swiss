import { useEffect } from "react";
import { useQrCodeGeneratorStore } from "./store";

export const useUpdateQrContent = () => {
    const {
        qrType,
        url,
        text,
        wifiName,
        wifiPassword,
        wifiEncryption,
        wifiHidden,
        email,
        emailSubject,
        emailBody,
        phone,
        contactName,
        contactOrg,
        contactTitle,
        contactPhone,
        contactEmail,
        contactAddress,
        contactWebsite,
        eventTitle,
        eventLocation,
        eventStart,
        eventEnd,
        eventDescription,
        latitude,
        longitude,
        setQrContent
    } = useQrCodeGeneratorStore();

    useEffect(() => {
        setQrContent(getQrContent());
    }, [
        qrType,
        url,
        text,
        wifiName,
        wifiPassword,
        wifiEncryption,
        wifiHidden,
        email,
        emailSubject,
        emailBody,
        phone,
        contactName,
        contactOrg,
        contactTitle,
        contactPhone,
        contactEmail,
        contactAddress,
        contactWebsite,
        eventTitle,
        eventLocation,
        eventStart,
        eventEnd,
        eventDescription,
        latitude,
        longitude
    ]);

    // Generate QR code content based on type
    const getQrContent = (): string => {
        switch (qrType) {
            case "url":
                return url;
            case "text":
                return text;
            case "wifi":
                return `WIFI:S:${wifiName};T:${wifiEncryption};P:${wifiPassword};H:${wifiHidden ? "true" : "false"};`;
            case "email":
                return `mailto:${email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
            case "phone":
                return `tel:${phone}`;
            case "contact":
                return [
                    "BEGIN:VCARD",
                    "VERSION:3.0",
                    `FN:${contactName}`,
                    contactOrg ? `ORG:${contactOrg}` : "",
                    contactTitle ? `TITLE:${contactTitle}` : "",
                    contactPhone ? `TEL:${contactPhone}` : "",
                    contactEmail ? `EMAIL:${contactEmail}` : "",
                    contactAddress ? `ADR:;;${contactAddress};;;` : "",
                    contactWebsite ? `URL:${contactWebsite}` : "",
                    "END:VCARD"
                ]
                    .filter(Boolean)
                    .join("\n");
            case "event":
                // Format dates for iCalendar
                const formatDate = (dateString: string) => {
                    if (!dateString) return "";
                    const date = new Date(dateString);
                    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
                };

                const startDate = formatDate(eventStart);
                const endDate = formatDate(eventEnd);

                return [
                    "BEGIN:VEVENT",
                    `SUMMARY:${eventTitle}`,
                    startDate ? `DTSTART:${startDate}` : "",
                    endDate ? `DTEND:${endDate}` : "",
                    eventLocation ? `LOCATION:${eventLocation}` : "",
                    eventDescription ? `DESCRIPTION:${eventDescription}` : "",
                    "END:VEVENT"
                ]
                    .filter(Boolean)
                    .join("\n");
            case "location":
                return `geo:${latitude},${longitude}`;
            default:
                return "";
        }
    };
};
