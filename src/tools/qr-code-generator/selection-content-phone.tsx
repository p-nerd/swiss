import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const SelectionContentPhone = () => {
    const [phone, setPhone] = useState<string>("");

    return (
        <div className="space-y-2">
            <Label htmlFor="phone-number">Phone Number</Label>
            <Input
                id="phone-number"
                placeholder="+1234567890"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
                Include country code for international numbers
            </p>
        </div>
    );
};
