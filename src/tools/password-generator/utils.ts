const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
const similarChars = "il1Lo0O";
const ambiguousChars = "{}[]()/\\'\"`~,;:.<>";

export const generatePassword = (
    length: number,
    includeUppercase: boolean,
    includeLowercase: boolean,
    includeNumbers: boolean,
    includeSymbols: boolean,
    excludeSimilar: boolean,
    excludeAmbiguous: boolean
): string => {
    // Ensure at least one character type is selected
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
        return "";
    }

    let chars = "";

    if (includeUppercase) chars += uppercaseChars;
    if (includeLowercase) chars += lowercaseChars;
    if (includeNumbers) chars += numberChars;
    if (includeSymbols) chars += symbolChars;

    // Remove similar characters if option is selected
    if (excludeSimilar) {
        for (const char of similarChars) {
            chars = chars.replace(new RegExp(char, "g"), "");
        }
    }

    // Remove ambiguous characters if option is selected
    if (excludeAmbiguous) {
        for (const char of ambiguousChars) {
            chars = chars.replace(new RegExp("\\" + char, "g"), "");
        }
    }

    // Generate password
    let newPassword = "";
    const charsLength = chars.length;

    if (charsLength === 0) {
        return "";
    }

    for (let i = 0; i < length; i++) {
        newPassword += chars.charAt(Math.floor(Math.random() * charsLength));
    }

    return newPassword;
};

export const calculateStrength = (password: string): number => {
    if (!password) {
        return 0;
    }

    // Calculate password strength (0-100)
    let score = 0;

    // Length contribution (up to 40 points)
    score += Math.min(40, length * 2);

    // Character variety contribution (up to 60 points)
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^A-Za-z0-9]/.test(password);

    const varietyCount = [hasUpper, hasLower, hasNumber, hasSymbol].filter(Boolean).length;
    score += varietyCount * 15;

    return score;
};
