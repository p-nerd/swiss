import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const SelectionContentEmail = () => {
    const [email, setEmail] = useState<string>("");
    const [emailSubject, setEmailSubject] = useState<string>("");
    const [emailBody, setEmailBody] = useState<string>("");

    return (
        <>
            <div className="space-y-2">
                <Label htmlFor="email-address">Email Address</Label>
                <Input
                    id="email-address"
                    type="email"
                    placeholder="example@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="email-subject">Subject (Optional)</Label>
                <Input
                    id="email-subject"
                    placeholder="Email subject"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="email-body">Body (Optional)</Label>
                <Textarea
                    id="email-body"
                    placeholder="Email body"
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    rows={3}
                />
            </div>
        </>
    );
};
