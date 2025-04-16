export const categoryOptions = [
    {
        value: "length",
        label: "Length"
    },
    {
        value: "area",
        label: "Area"
    },
    {
        value: "volume",
        label: "Volume"
    },
    {
        value: "weight",
        label: "Weight"
    },
    {
        value: "temperature",
        label: "Temperature"
    },
    {
        value: "time",
        label: "Time"
    },
    {
        value: "speed",
        label: "Speed"
    },
    {
        value: "data",
        label: "Data"
    }
] as const;

export type TCategory = (typeof categoryOptions)[number]["value"];

export const conversionUnits = {
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

export type TConversionUnitKey = keyof typeof conversionUnits;

const conversionFactors = {
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
    time: {
        ms: 0.001,
        s: 1,
        min: 60,
        h: 3600,
        d: 86400,
        wk: 604800,
        mo: 2592000,
        yr: 31536000
    },
    speed: {
        mps: 1,
        kph: 0.277778,
        fps: 0.3048,
        mph: 0.44704,
        kn: 0.514444
    },
    data: {
        b: 1,
        kb: 1024,
        mb: 1048576,
        gb: 1073741824,
        tb: 1099511627776,
        pb: 1125899906842624
    }
};

const convertTemperature = (value: number, from: string, to: string): number => {
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

export const convertValue = (
    isValidInput: boolean,
    inputValue: string | number,
    category: TCategory,
    fromUnit: string,
    toUnit: string
): string | number => {
    if (!fromUnit || !toUnit || !isValidInput || inputValue === "") {
        return "Invalid input";
    }

    const value = Number(inputValue);

    // Special case for temperature
    if (category === "temperature") {
        const convertedValue = convertTemperature(value, fromUnit, toUnit);
        return Number(convertedValue.toFixed(8));
    }

    // For other units, use conversion factors
    const factors = conversionFactors[category as keyof typeof conversionFactors];
    if (!factors) return "";

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
    return formattedResult;
};
