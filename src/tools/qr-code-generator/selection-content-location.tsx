import { useQrCodeGeneratorStore } from "./store";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const SelectionContentLocation = () => {
    const { latitude, setLatitude, longitude, setLongitude } = useQrCodeGeneratorStore();

    return (
        <>
            <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                    <Label htmlFor="latitude">Latitude</Label>
                    <Input
                        id="latitude"
                        placeholder="37.7749"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="longitude">Longitude</Label>
                    <Input
                        id="longitude"
                        placeholder="-122.4194"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                    />
                </div>
            </div>
            <p className="text-xs text-muted-foreground">
                Tip: You can find coordinates by right-clicking on a location in Google Maps and
                selecting "What's here?"
            </p>
        </>
    );
};
