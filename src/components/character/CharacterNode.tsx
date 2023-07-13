import EmptyImage from "components/EmptyImage";
import "./CharacterNode.scss";

import React, { PropsWithChildren } from "react";

interface IProps {
    title: React.ReactNode;
    avatar?: React.ReactNode;

    onClick?: () => void;
}

const CharacterNode = (props: PropsWithChildren<IProps>) => {
    const { title, avatar } = props;

    const handleOnClick = () => {
        if (props.onClick) {
            props.onClick();
        }
    };

    return (
        <div className=" character-node " onClick={handleOnClick}>
            <div className="character-node--image">
                {avatar ?? <EmptyImage />}
            </div>
            <div className="character-node--title">{title}</div>
        </div>
    );
};

export default CharacterNode;
