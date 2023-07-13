import "./EmptyImage.scss";

import { CiImageOff } from "react-icons/ci";

const EmptyImage = () => {
    return (
        <div className="empty-image">
            <CiImageOff size={100} />
        </div>
    );
};

export default EmptyImage;
