import "./ModalStyle.scss";

import { CSSProperties, useMemo } from "react";

interface IProps {
    layerIndex?: number;
    lastIndex?: number;
    containerClassName?: string;

    onBackgroundClick: () => void;
}

const baseZIndex = 10100;

const hOffset = 60;
const vOffset = 10;

const ModalItem: React.FC<React.PropsWithChildren<IProps>> = (props) => {
    const { layerIndex = 0, lastIndex = 0, containerClassName } = props;

    const containerClass = useMemo(() => {
        const result = ["modal-manager--item"];

        if (containerClassName) {
            result.push(containerClassName);
        }

        if (layerIndex === lastIndex) {
            result.push("top-item");
        }

        return result.join(" ");
    }, [containerClassName, layerIndex, lastIndex]);

    const style: CSSProperties = useMemo(() => {
        const zIndex = baseZIndex + layerIndex * 10;

        const left = (layerIndex - lastIndex) * hOffset;

        const right = left * -1;

        const bottom = (layerIndex - lastIndex) * vOffset;

        const top = bottom * -1;

        return { zIndex, left, right, top, bottom };
    }, [layerIndex, lastIndex]);

    const backdropStyle: CSSProperties = useMemo(() => {
        const zIndex = baseZIndex + layerIndex * 10 + 5;

        const extraOpacity = 0.05 * (lastIndex - layerIndex);

        const opacity = 0.3 + extraOpacity <= 0.3 ? extraOpacity : 0.3;

        return { zIndex, opacity };
    }, [layerIndex, lastIndex]);

    return (
        <div className={containerClass} style={style}>
            {layerIndex !== lastIndex && (
                <div
                    className="modal-manager--item--backdrop"
                    style={backdropStyle}
                    onClick={props.onBackgroundClick}
                />
            )}

            {props.children}
        </div>
    );
};

export default ModalItem;
