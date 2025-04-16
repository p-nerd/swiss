export const calculateCharacters = (text: string) => {
    return text.length;
};

export const calculateCharactersWithSpaces = (text: string) => {
    return text.replace(/\s+/g, "").length;
};

export const calculateWords = (text: string) => {
    return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
};

export const calculateLines = (text: string) => {
    return text === "" ? 0 : text.split(/\r\n|\r|\n/).length;
};
