import { useQrCodeGeneratorStore } from "./store";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const SelectionContentContact = () => {
    const {
        contactName,
        setContactName,
        contactOrg,
        setContactOrg,
        contactTitle,
        setContactTitle,
        contactPhone,
        setContactPhone,
        contactEmail,
        setContactEmail,
        contactAddress,
        setContactAddress,
        contactWebsite,
        setContactWebsite
    } = useQrCodeGeneratorStore();

    return (
        <>
            <div className="space-y-2">
                <Label htmlFor="contact-name">Full Name</Label>
                <Input
                    id="contact-name"
                    placeholder="John Doe"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                />
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                    <Label htmlFor="contact-org">Organization</Label>
                    <Input
                        id="contact-org"
                        placeholder="Company"
                        value={contactOrg}
                        onChange={(e) => setContactOrg(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="contact-title">Job Title</Label>
                    <Input
                        id="contact-title"
                        placeholder="Developer"
                        value={contactTitle}
                        onChange={(e) => setContactTitle(e.target.value)}
                    />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="contact-phone">Phone</Label>
                <Input
                    id="contact-phone"
                    placeholder="+1234567890"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="contact-email">Email</Label>
                <Input
                    id="contact-email"
                    placeholder="john@example.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="contact-address">Address</Label>
                <Input
                    id="contact-address"
                    placeholder="123 Main St, City, Country"
                    value={contactAddress}
                    onChange={(e) => setContactAddress(e.target.value)}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="contact-website">Website</Label>
                <Input
                    id="contact-website"
                    placeholder="https://example.com"
                    value={contactWebsite}
                    onChange={(e) => setContactWebsite(e.target.value)}
                />
            </div>
        </>
    );
};
