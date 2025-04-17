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

/**
 * Converts from meters to inches
 */
export const metersToInches = (meters: number): number => {
    if (typeof meters !== "number" || isNaN(meters) || meters <= 0) {
        return 0;
    }
    // Convert meters to cm, then to inches (1 inch = 2.54 cm)
    return (meters * 100) / 2.54;
};

/**
 * Converts from inches to meters
 */
export const inchesToMeters = (inches: number): number => {
    if (typeof inches !== "number" || isNaN(inches) || inches <= 0) {
        return 0;
    }
    // Convert inches to cm (1 inch = 2.54 cm), then to meters
    return (inches * 2.54) / 100;
};

/**
 * Converts from meters to feet and inches
 */
export const metersToFeetAndInches = (meters: number): { feet: number; inches: number } => {
    const totalInches = metersToInches(meters);
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);

    // Handle case where inches rounds to 12
    if (inches === 12) {
        return { feet: feet + 1, inches: 0 };
    }

    return { feet, inches };
};

/**
 * Converts from feet and inches to meters
 */
export const feetAndInchesToMeters = (feet: number, inches: number): number => {
    if (
        typeof feet !== "number" ||
        isNaN(feet) ||
        feet < 0 ||
        typeof inches !== "number" ||
        isNaN(inches) ||
        inches < 0
    ) {
        return 0;
    }

    const totalInches = feet * 12 + inches;
    return inchesToMeters(totalInches);
};
