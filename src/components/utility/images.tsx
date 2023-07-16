export const getImage = (src?: string) =>
    src ? process.env.PUBLIC_URL + "/images" + src : undefined;

export interface IImageProps {
    ref: string;
    alt: string;
}
