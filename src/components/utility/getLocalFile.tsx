export const getLocalFile = (src?: string) =>
    src ? process.env.PUBLIC_URL + src : undefined;

export interface IImageProps {
    ref: string;
    alt: string;
}
