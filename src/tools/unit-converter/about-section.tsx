import type { ReactNode } from "react";
import type { TCategory } from "./category-options";

import { useUnitConverterStore } from "./store";

const getDescription = (category: TCategory): ReactNode => {
    switch (category) {
        case "length":
            return (
                <>
                    Length conversion allows you to convert between different units of distance,
                    from millimeters to miles.
                </>
            );
        case "area":
            return (
                <>
                    Area conversion helps you convert between different units of surface
                    measurement, from square millimeters to square miles.
                </>
            );
        case "volume":
            return (
                <>
                    Volume conversion lets you convert between different units of capacity, from
                    milliliters to gallons.
                </>
            );
        case "weight":
            return (
                <>
                    Weight conversion allows you to convert between different units of mass, from
                    milligrams to tons.
                </>
            );
        case "temperature":
            return (
                <>
                    Temperature conversion helps you convert between Celsius, Fahrenheit, and Kelvin
                    scales.
                </>
            );
        case "time":
            return (
                <>
                    Time conversion lets you convert between different units of time, from
                    milliseconds to years.
                </>
            );
        case "speed":
            return (
                <>
                    Speed conversion allows you to convert between different units of velocity, from
                    meters per second to miles per hour.
                </>
            );
        case "data":
            return (
                <>
                    Data conversion helps you convert between different digital storage units, from
                    bytes to petabytes.
                </>
            );
        default:
            return <>Select a conversion category to learn more.</>;
    }
};

export const AboutSection = () => {
    const { category } = useUnitConverterStore();

    return (
        <div className="bg-muted rounded-lg p-4 text-sm">
            <h4 className="font-medium mb-1">
                About {category.charAt(0).toUpperCase() + category.slice(1)} Conversion
            </h4>
            <p className="text-muted-foreground">{getDescription(category)}</p>
        </div>
    );
};
