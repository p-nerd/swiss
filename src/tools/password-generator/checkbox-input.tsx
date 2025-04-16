import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export const CheckboxInput = ({
    id,
    value,
    onValue,
    label
}: {
    id: string;
    value: boolean;
    onValue: (value: boolean) => void;
    label: string;
}) => {
    return (
        <div className="flex items-center space-x-2">
            <Checkbox id={id} checked={value} onCheckedChange={(v) => onValue(!!v)} />
            <Label htmlFor={id} className="cursor-pointer">
                {label}
            </Label>
        </div>
    );
};
