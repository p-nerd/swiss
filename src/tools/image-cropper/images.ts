export const aspectRatios = {
    free: undefined,
    "1:1": 1,
    "4:3": 4 / 3,
    "16:9": 16 / 9,
    "3:4": 3 / 4,
    "9:16": 9 / 16
};

export type TAspectRatioKey = keyof typeof aspectRatios;

export const getAspectRatioValue = (aspectRatio: keyof typeof aspectRatios) => {
    return aspectRatios[aspectRatio];
};
