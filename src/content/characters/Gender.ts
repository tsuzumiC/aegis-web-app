export const Gender = {
    Male_P: "Male_P",
    Female_V: "Female_V",
    Male_V: "Male_V",
    Female_P: "Female_P",
    Male_VP: "Male_VP",
    Female_VP: "Female_VP",
} as const;

export const GenderString = {
    [Gender.Male_P]: "Male, Penis",
    [Gender.Female_V]: "Female, Vagina",
    [Gender.Male_V]: "Male, Vagina",
    [Gender.Female_P]: "Female, Penis",
    [Gender.Male_VP]: "Male, Vagina & Penis",
    [Gender.Female_VP]: "Female, Vagina & Penis",
};

const _Gender = Object.values(Gender);

export type TGender = (typeof _Gender)[number];
