import "./Character.scss";

import { ReactNode, PropsWithChildren } from "react";

import EmptyImage from "components/EmptyImage";

interface IProps {
    title?: ReactNode;
    subTitle?: ReactNode;
    mainImage?: ReactNode;
}

const Character = (props: PropsWithChildren<IProps>) => {
    const { title, subTitle, mainImage } = props;
    return (
        <div className="character">
            <h2 className="character--title">{title ?? "Unamed Character"}</h2>
            {subTitle && <div className="character--sub-title">{subTitle}</div>}
            <div className="character--content">
                <div className="character--main-image">
                    {mainImage ?? <EmptyImage />}
                </div>
                <div className="character--description">
                    {props.children ?? "No description"}
                </div>
            </div>
        </div>
    );
};

export default Character;
