/**
 * Calculates Body Mass Index (BMI) based on weight in kilograms and height in meters.
 * @param weightKg Weight in kilograms
 * @param heightMeter Height in meters
 * @returns The calculated BMI value rounded to one decimal place
 */
export const calculateBMI = (weightKg: number, heightMeter: number): number => {
    if (weightKg <= 0 || heightMeter <= 0) {
        return 0;
    }

    const bmi = weightKg / (heightMeter * heightMeter);

    return Math.round(bmi * 10) / 10;
};

/**
 * Converts from centimeters to meters.
 */
export const centimetersToMeters = (centimeters: number): number => {
    if (typeof centimeters !== "number" || isNaN(centimeters) || centimeters <= 0) {
        return 0;
    }
    return centimeters / 100;
};

/**
 * Converts from meters to centimeters.
 */
export const metersToCentimeters = (meters: number): number => {
    if (typeof meters !== "number" || isNaN(meters) || meters <= 0) {
        return 0;
    }
    return meters * 100;
};
