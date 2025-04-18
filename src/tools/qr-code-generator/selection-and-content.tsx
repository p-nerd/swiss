import type { TQRType } from "./qr-types";

import { qrTypes } from "./qr-types";
import { useQRCodeGeneratorStore } from "./store";

import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const SelectionAndContent = () => {
    const { qrType, setQRType } = useQRCodeGeneratorStore();

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label>QR Code Type</Label>
                <Tabs
                    defaultValue={qrType}
                    onValueChange={(v: string) => setQRType(v as TQRType)}
                    className="w-full"
                >
                    <TabsList className="grid grid-cols-4 h-auto">
                        {qrTypes.slice(0, 4).map((type) => (
                            <TabsTrigger
                                key={type.id}
                                value={type.id}
                                className="flex items-center gap-1 text-xs sm:text-sm"
                            >
                                <type.icon className="h-3 w-3 sm:h-4 sm:w-4" />
                                <span className="hidden sm:inline">{type.label}</span>
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    <TabsList className="grid grid-cols-4 h-auto">
                        {qrTypes.slice(4).map((type) => (
                            <TabsTrigger
                                key={type.id}
                                value={type.id}
                                className="flex items-center gap-1 text-xs sm:text-sm"
                            >
                                <type.icon className="h-3 w-3 sm:h-4 sm:w-4" />
                                <span className="hidden sm:inline">{type.label}</span>
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    <div className="h-2"></div>
                    {qrTypes.map(({ id, content: Content }) => (
                        <TabsContent value={id} className="mt-4 space-y-4">
                            <Content />
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </div>
    );
};
