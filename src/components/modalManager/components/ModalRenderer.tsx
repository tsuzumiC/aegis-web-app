import "./ModalStyle.scss";

import React from "react";
import ModalItem from "./ModalItem";
import { IIdModalListItems, IModalRenderer } from "../api/IModalManager";
import { ModalByType } from "./ModalByType";

interface IProps {
    modalList: IIdModalListItems;
    order: string[];

    onBackgroundClick: () => void;
}

const ModalRenderer: React.FC<React.PropsWithChildren<IProps>> = (props) => {
    const { modalList, order } = props;

    if (order.length === 0) {
        return null;
    }

    return (
        <div className="modal-manager">
            <div
                className="modal-manager--backdrop"
                onClick={props.onBackgroundClick}
            />
            <div className="modal-manager--list">
                {order.map((id, index) => (
                    <ModalItem
                        layerIndex={index}
                        lastIndex={order.length - 1}
                        key={id}
                        onBackgroundClick={props.onBackgroundClick}
                    >
                        <ModalByType modalItem={modalList[id]} />
                    </ModalItem>
                ))}
            </div>
        </div>
    );
};

export default ModalRenderer;
