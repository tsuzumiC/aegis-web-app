import IDictionary from "common/viewModels/IDictionary";
import { Roles, TRoles } from "components/roles/api/Roles";
import { TModalTypes } from "../api/IModalManager";

export const checkPermission = (
    roles: TRoles[],
    type: TModalTypes,
    createNew?: boolean,
) => {
    if (createNew) {
        const permissions = addPermission[type];
        if (permissions) {
            return permissions?.some((x) => roles.includes(x));
        } else {
            return true;
        }
    } else {
        const permissions = viewPermission[type];
        if (permissions) {
            return permissions?.some((x) => roles.includes(x));
        } else {
            return true;
        }
    }
};

const viewPermission: { [key in TModalTypes]?: TRoles[] } = {
    custom_list_form: [Roles.Administrator],
    user_form: [
        Roles.Administrator,
        Roles.UserOwner,
        Roles.UserEditor,
        Roles.UserViewer,
    ],
};

const addPermission: { [key in TModalTypes]?: TRoles[] } = {
    recurrence: [Roles.Planner, Roles.Administrator],
    custom_list_form: [Roles.Administrator],
    user_form: [Roles.Administrator, Roles.UserOwner, Roles.UserEditor],
};
