import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const WIFI_ENCRYPTION_TYPES = [
    { value: "WPA", label: "WPA/WPA2" },
    { value: "WEP", label: "WEP" },
    { value: "nopass", label: "No Password" }
] as const;

export const SelectionContentWifi = () => {
    const [wifiName, setWifiName] = useState<string>("");
    const [wifiPassword, setWifiPassword] = useState<string>("");
    const [wifiEncryption, setWifiEncryption] = useState<string>("WPA");
    const [wifiHidden, setWifiHidden] = useState<boolean>(false);

    return (
        <>
            <div className="space-y-2">
                <Label htmlFor="wifi-name">Network Name (SSID)</Label>
                <Input
                    id="wifi-name"
                    placeholder="Your Wi-Fi network name"
                    value={wifiName}
                    onChange={(e) => setWifiName(e.target.value)}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="wifi-encryption">Encryption Type</Label>
                <Select value={wifiEncryption} onValueChange={setWifiEncryption}>
                    <SelectTrigger id="wifi-encryption">
                        <SelectValue placeholder="Select encryption type" />
                    </SelectTrigger>
                    <SelectContent>
                        {WIFI_ENCRYPTION_TYPES.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                                {type.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            {wifiEncryption !== "nopass" && (
                <div className="space-y-2">
                    <Label htmlFor="wifi-password">Password</Label>
                    <Input
                        id="wifi-password"
                        type="password"
                        placeholder="Wi-Fi password"
                        value={wifiPassword}
                        onChange={(e) => setWifiPassword(e.target.value)}
                    />
                </div>
            )}
            <div className="flex items-center space-x-2">
                <Switch id="wifi-hidden" checked={wifiHidden} onCheckedChange={setWifiHidden} />
                <Label htmlFor="wifi-hidden">Hidden Network</Label>
            </div>
        </>
    );
};
