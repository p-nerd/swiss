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
        updateQRContent();
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
    const updateQRContent = () => {
        let content = "";

        switch (qrType) {
            case "url":
                content = url;
                break;
            case "text":
                content = text;
                break;
            case "wifi":
                content = `WIFI:S:${wifiName};T:${wifiEncryption};P:${wifiPassword};H:${wifiHidden ? "true" : "false"};`;
                break;
            case "email":
                content = `mailto:${email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
                break;
            case "phone":
                content = `tel:${phone}`;
                break;
            case "contact":
                content = [
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
                break;
            case "event":
                // Format dates for iCalendar
                const formatDate = (dateString: string) => {
                    if (!dateString) return "";
                    const date = new Date(dateString);
                    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
                };

                const startDate = formatDate(eventStart);
                const endDate = formatDate(eventEnd);

                content = [
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
                break;
            case "location":
                content = `geo:${latitude},${longitude}`;
                break;
            default:
                content = "";
        }

        setQrContent(content);
    };
};
