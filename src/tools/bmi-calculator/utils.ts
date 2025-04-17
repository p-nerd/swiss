/**
 * Calculates Body Mass Index (BMI) based on weight in kilograms and height in meters.
 * @param weightKg Weight in kilograms
 * @param heightM Height in meters
 * @returns The calculated BMI value rounded to one decimal place
 */
const calculateBMI = (weightKg: number, heightM: number): number => {
    if (weightKg <= 0 || heightM <= 0) {
        return 0;
    }

    const bmi = weightKg / (heightM * heightM);

    return Math.round(bmi * 10) / 10;
};
