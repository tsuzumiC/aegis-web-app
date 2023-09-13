export const getLocalFilePath = (src?: string) =>
    src ? process.env.PUBLIC_URL + src : undefined;

export const getCharacterImagePath = (
    characterPath?: string,
    type: "ref" | "treeAvatar" = "ref"
) => `/characters/${characterPath}/${characterPath}.${type}.jpg`;

export interface IImageProps {
    ref: string;
    alt: string;
}
