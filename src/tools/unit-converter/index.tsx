import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRightLeft, Calculator } from "lucide-react";

// Conversion units by category
const conversionUnits = {
    length: [
        { value: "mm", label: "Millimeters (mm)" },
        { value: "cm", label: "Centimeters (cm)" },
        { value: "m", label: "Meters (m)" },
        { value: "km", label: "Kilometers (km)" },
        { value: "in", label: "Inches (in)" },
        { value: "ft", label: "Feet (ft)" },
        { value: "yd", label: "Yards (yd)" },
        { value: "mi", label: "Miles (mi)" }
    ],
    area: [
        { value: "mm2", label: "Square Millimeters (mm²)" },
        { value: "cm2", label: "Square Centimeters (cm²)" },
        { value: "m2", label: "Square Meters (m²)" },
        { value: "ha", label: "Hectares (ha)" },
        { value: "km2", label: "Square Kilometers (km²)" },
        { value: "in2", label: "Square Inches (in²)" },
        { value: "ft2", label: "Square Feet (ft²)" },
        { value: "ac", label: "Acres (ac)" },
        { value: "mi2", label: "Square Miles (mi²)" }
    ],
    volume: [
        { value: "ml", label: "Milliliters (ml)" },
        { value: "l", label: "Liters (l)" },
        { value: "m3", label: "Cubic Meters (m³)" },
        { value: "pt", label: "Pints (pt)" },
        { value: "qt", label: "Quarts (qt)" },
        { value: "gal", label: "Gallons (gal)" },
        { value: "floz", label: "Fluid Ounces (fl oz)" },
        { value: "cup", label: "Cups" },
        { value: "tbsp", label: "Tablespoons (tbsp)" },
        { value: "tsp", label: "Teaspoons (tsp)" }
    ],
    weight: [
        { value: "mg", label: "Milligrams (mg)" },
        { value: "g", label: "Grams (g)" },
        { value: "kg", label: "Kilograms (kg)" },
        { value: "t", label: "Metric Tons (t)" },
        { value: "oz", label: "Ounces (oz)" },
        { value: "lb", label: "Pounds (lb)" },
        { value: "st", label: "Stone (st)" },
        { value: "ton", label: "US Tons (ton)" }
    ],
    temperature: [
        { value: "c", label: "Celsius (°C)" },
        { value: "f", label: "Fahrenheit (°F)" },
        { value: "k", label: "Kelvin (K)" }
    ],
    time: [
        { value: "ms", label: "Milliseconds (ms)" },
        { value: "s", label: "Seconds (s)" },
        { value: "min", label: "Minutes (min)" },
        { value: "h", label: "Hours (h)" },
        { value: "d", label: "Days (d)" },
        { value: "wk", label: "Weeks (wk)" },
        { value: "mo", label: "Months (mo)" },
        { value: "yr", label: "Years (yr)" }
    ],
    speed: [
        { value: "mps", label: "Meters per Second (m/s)" },
        { value: "kph", label: "Kilometers per Hour (km/h)" },
        { value: "fps", label: "Feet per Second (ft/s)" },
        { value: "mph", label: "Miles per Hour (mph)" },
        { value: "kn", label: "Knots (kn)" }
    ],
    data: [
        { value: "b", label: "Bytes (B)" },
        { value: "kb", label: "Kilobytes (KB)" },
        { value: "mb", label: "Megabytes (MB)" },
        { value: "gb", label: "Gigabytes (GB)" },
        { value: "tb", label: "Terabytes (TB)" },
        { value: "pb", label: "Petabytes (PB)" }
    ]
};

// Conversion factors and formulas
const conversionFactors = {
    // Length conversions (to meters)
    length: {
        mm: 0.001,
        cm: 0.01,
        m: 1,
        km: 1000,
        in: 0.0254,
        ft: 0.3048,
        yd: 0.9144,
        mi: 1609.344
    },
    // Area conversions (to square meters)
    area: {
        mm2: 0.000001,
        cm2: 0.0001,
        m2: 1,
        ha: 10000,
        km2: 1000000,
        in2: 0.00064516,
        ft2: 0.09290304,
        ac: 4046.8564224,
        mi2: 2589988.110336
    },
    // Volume conversions (to liters)
    volume: {
        ml: 0.001,
        l: 1,
        m3: 1000,
        pt: 0.473176,
        qt: 0.946353,
        gal: 3.78541,
        floz: 0.0295735,
        cup: 0.24,
        tbsp: 0.0147868,
        tsp: 0.00492892
    },
    // Weight conversions (to kilograms)
    weight: {
        mg: 0.000001,
        g: 0.001,
        kg: 1,
        t: 1000,
        oz: 0.0283495,
        lb: 0.453592,
        st: 6.35029,
        ton: 907.185
    },
    // Speed conversions (to meters per second)
    speed: {
        mps: 1,
        kph: 0.277778,
        fps: 0.3048,
        mph: 0.44704,
        kn: 0.514444
    },
    // Data conversions (to bytes)
    data: {
        b: 1,
        kb: 1024,
        mb: 1048576,
        gb: 1073741824,
        tb: 1099511627776,
        pb: 1125899906842624
    }
};

// Special case for temperature conversions
const convertTemperature = (value: number, from: string, to: string): number => {
    // Convert to Kelvin first (as the intermediate unit)
    let kelvin: number;

    switch (from) {
        case "c":
            kelvin = value + 273.15;
            break;
        case "f":
            kelvin = (value + 459.67) * (5 / 9);
            break;
        case "k":
            kelvin = value;
            break;
        default:
            return 0;
    }

    // Convert from Kelvin to the target unit
    switch (to) {
        case "c":
            return kelvin - 273.15;
        case "f":
            return kelvin * (9 / 5) - 459.67;
        case "k":
            return kelvin;
        default:
            return 0;
    }
};

export function UnitConverterComponent() {
    const [category, setCategory] = useState("length");
    const [inputValue, setInputValue] = useState<number | string>(1);
    const [fromUnit, setFromUnit] = useState("");
    const [toUnit, setToUnit] = useState("");
    const [result, setResult] = useState<number | string>(0);
    const [isValidInput, setIsValidInput] = useState(true);

    // Set default units when category changes
    useEffect(() => {
        if (conversionUnits[category as keyof typeof conversionUnits]) {
            const units = conversionUnits[category as keyof typeof conversionUnits];
            setFromUnit(units[0].value);
            setToUnit(units[1].value);
        }
    }, [category]);

    // Perform conversion when inputs change
    useEffect(() => {
        if (fromUnit && toUnit && isValidInput && inputValue !== "") {
            convertValue();
        }
    }, [inputValue, fromUnit, toUnit, category]);

    const convertValue = () => {
        if (!isValidInput || inputValue === "") {
            setResult("Invalid input");
            return;
        }

        const value = Number(inputValue);

        // Special case for temperature
        if (category === "temperature") {
            const convertedValue = convertTemperature(value, fromUnit, toUnit);
            setResult(Number(convertedValue.toFixed(8)));
            return;
        }

        // For other units, use conversion factors
        const factors = conversionFactors[category as keyof typeof conversionFactors];
        if (!factors) return;

        // Convert to base unit, then to target unit
        const baseValue = value * factors[fromUnit as keyof typeof factors];
        const convertedValue = baseValue / factors[toUnit as keyof typeof factors];

        // Format the result to avoid floating point issues
        // Show fewer decimal places for larger numbers
        let formattedResult: number;
        if (Math.abs(convertedValue) >= 1000) {
            formattedResult = Number(convertedValue.toFixed(2));
        } else if (Math.abs(convertedValue) >= 10) {
            formattedResult = Number(convertedValue.toFixed(4));
        } else {
            formattedResult = Number(convertedValue.toFixed(8));
        }

        // Remove trailing zeros
        setResult(formattedResult);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        // Allow empty input or valid numbers (including decimals and negative)
        if (value === "" || /^-?\d*\.?\d*$/.test(value)) {
            setInputValue(value);
            setIsValidInput(true);
        } else {
            setIsValidInput(false);
        }
    };

    const swapUnits = () => {
        const temp = fromUnit;
        setFromUnit(toUnit);
        setToUnit(temp);
    };

    return (
        <Card className="w-full">
            <CardContent className="p-6">
                <div className="space-y-6">
                    {/* Category Selection */}
                    <Tabs
                        defaultValue="length"
                        value={category}
                        onValueChange={setCategory}
                        className="w-full"
                    >
                        <TabsList className="grid grid-cols-4 md:grid-cols-8 h-auto">
                            <TabsTrigger value="length" className="text-xs sm:text-sm">
                                Length
                            </TabsTrigger>
                            <TabsTrigger value="area" className="text-xs sm:text-sm">
                                Area
                            </TabsTrigger>
                            <TabsTrigger value="volume" className="text-xs sm:text-sm">
                                Volume
                            </TabsTrigger>
                            <TabsTrigger value="weight" className="text-xs sm:text-sm">
                                Weight
                            </TabsTrigger>
                            <TabsTrigger value="temperature" className="text-xs sm:text-sm">
                                Temperature
                            </TabsTrigger>
                            <TabsTrigger value="time" className="text-xs sm:text-sm">
                                Time
                            </TabsTrigger>
                            <TabsTrigger value="speed" className="text-xs sm:text-sm">
                                Speed
                            </TabsTrigger>
                            <TabsTrigger value="data" className="text-xs sm:text-sm">
                                Data
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>

                    {/* Converter Interface */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Input Section */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="input-value">Value</Label>
                                <Input
                                    id="input-value"
                                    type="text"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    className={`font-mono ${!isValidInput ? "border-red-500" : ""}`}
                                />
                                {!isValidInput && (
                                    <p className="text-red-500 text-xs">
                                        Please enter a valid number
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="from-unit">From</Label>
                                <Select value={fromUnit} onValueChange={setFromUnit}>
                                    <SelectTrigger id="from-unit">
                                        <SelectValue placeholder="Select unit" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {conversionUnits[
                                            category as keyof typeof conversionUnits
                                        ]?.map((unit) => (
                                            <SelectItem key={unit.value} value={unit.value}>
                                                {unit.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={swapUnits}
                                    className="rounded-full h-10 w-10"
                                >
                                    <ArrowRightLeft className="h-4 w-4" />
                                    <span className="sr-only">Swap units</span>
                                </Button>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="to-unit">To</Label>
                                <Select value={toUnit} onValueChange={setToUnit}>
                                    <SelectTrigger id="to-unit">
                                        <SelectValue placeholder="Select unit" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {conversionUnits[
                                            category as keyof typeof conversionUnits
                                        ]?.map((unit) => (
                                            <SelectItem key={unit.value} value={unit.value}>
                                                {unit.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Result Section */}
                        <div className="flex flex-col justify-center space-y-4">
                            <div className="text-center">
                                <Calculator className="h-12 w-12 mx-auto text-green-500 dark:text-green-400 mb-2" />
                                <h3 className="text-lg font-medium mb-2">Conversion Result</h3>
                                <div className="text-3xl font-bold font-mono">
                                    {isValidInput ? result : "Invalid input"}
                                </div>
                                {isValidInput && inputValue !== "" && (
                                    <p className="text-sm text-muted-foreground mt-2">
                                        {inputValue}{" "}
                                        {
                                            conversionUnits[
                                                category as keyof typeof conversionUnits
                                            ]?.find((u) => u.value === fromUnit)?.label
                                        }{" "}
                                        = {result}{" "}
                                        {
                                            conversionUnits[
                                                category as keyof typeof conversionUnits
                                            ]?.find((u) => u.value === toUnit)?.label
                                        }
                                    </p>
                                )}
                            </div>

                            <div className="bg-muted rounded-lg p-4 text-sm">
                                <h4 className="font-medium mb-1">
                                    About {category.charAt(0).toUpperCase() + category.slice(1)}{" "}
                                    Conversion
                                </h4>
                                <p className="text-muted-foreground">
                                    {category === "length" &&
                                        "Length conversion allows you to convert between different units of distance, from millimeters to miles."}
                                    {category === "area" &&
                                        "Area conversion helps you convert between different units of surface measurement, from square millimeters to square miles."}
                                    {category === "volume" &&
                                        "Volume conversion lets you convert between different units of capacity, from milliliters to gallons."}
                                    {category === "weight" &&
                                        "Weight conversion allows you to convert between different units of mass, from milligrams to tons."}
                                    {category === "temperature" &&
                                        "Temperature conversion helps you convert between Celsius, Fahrenheit, and Kelvin scales."}
                                    {category === "time" &&
                                        "Time conversion lets you convert between different units of time, from milliseconds to years."}
                                    {category === "speed" &&
                                        "Speed conversion allows you to convert between different units of velocity, from meters per second to miles per hour."}
                                    {category === "data" &&
                                        "Data conversion helps you convert between different digital storage units, from bytes to petabytes."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
