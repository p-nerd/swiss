// Special case for temperature conversions
export const convertTemperature = (value: number, from: string, to: string): number => {
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
