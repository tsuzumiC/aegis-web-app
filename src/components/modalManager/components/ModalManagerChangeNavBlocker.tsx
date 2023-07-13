import React, { useMemo } from "react";
import { IIdModalHaveChanges } from "../models/ModalMangerModels";
import NavigationBlocker from "./NavigationBlocker";

interface IProps {
    haveChangesList?: IIdModalHaveChanges;
}

const ModalManagerChangeNavBlocker: React.FC<
    React.PropsWithChildren<IProps>
> = (props) => {
    const { haveChangesList } = props;

    const hasChanges = useMemo(() => {
        if (haveChangesList) {
            return Object.values(haveChangesList).includes(true);
        }

        return false;
    }, [haveChangesList]);

    const showPrompt = hasChanges;

    return <NavigationBlocker showPrompt={showPrompt} />;
};

export default ModalManagerChangeNavBlocker;
