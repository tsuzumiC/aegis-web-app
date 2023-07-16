export const Gender = {
    Male_P: "Male, Penis",
    Female_V: "Female, Vagina",
    Male_V: "Male, Vagina",
    Female_P: "Female, Penis",
    Male_VP: "Male, Vagina & Penis",
    Female_VP: "Female, Vagina & Penis",
} as const;

const _Gender = Object.values(Gender);

export type TGender = (typeof _Gender)[number];
