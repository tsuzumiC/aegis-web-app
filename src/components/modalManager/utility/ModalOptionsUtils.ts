import { IModalOptions } from "../api/IModalManager";

export const ModalOptionsStringify = (options: IModalOptions) => {
    const result = Object.keys(options).map((x) => {
        switch (typeof options[x]) {
            case "object": {
                const objs = Object.keys(options[x]).map((obj) => {
                    switch (typeof options[x][obj]) {
                        case "string":
                        case "number":
                            return `${obj}:${options[x][obj]}`;

                        case "boolean":
                            return options[x][obj] === true ? obj : "";

                        case "undefined":
                            return "";

                        default:
                            return obj;
                    }
                });

                return `${x}:${objs.filter((x) => x !== "").join("|")}`;
            }

            case "string":
            case "number":
                return `${x}:${options[x]}`;

            case "boolean":
                return options[x] === true ? x : "";

            case "undefined":
                return "";

            default:
                return x;
        }
    });

    return result.filter((x) => x !== "").join(",");
};

// export const ModalOptionsObjectify = (options: string) => {
//     const list = options.split(",");

//     const result: IModalOptions = list.reduce((prev, cur) => {
//         const [key, value] = cur.split(/:(.*)/g) as [
//             string,
//             string | undefined,
//         ];

//         if (value) {
//             if (value.match(/:*\|*/g)) {
//                 const subList = value.split("|");

//                 const subResult: { [key: string]: string | boolean } =
//                     subList.reduce((subPrev, subCur) => {
//                         const [subKey, subValue] = subCur.split(/:(.*)/g) as [
//                             string,
//                             string | undefined,
//                         ];

//                         if (subValue) {
//                             return { ...subPrev, [subKey]: subValue };
//                         } else {
//                             return { ...subPrev, [subKey]: true };
//                         }
//                     }, {});

//                 return { ...prev, [key]: subResult };
//             } else {
//                 return { ...prev, [key]: value };
//             }
//         } else {
//             return { ...prev, [key]: true };
//         }
//     }, {});

//     return result;
// };

export const ModalOptionsObjectify = (options: string) => {
    const list = options.split(",");
    const result: {
        [key: string]: string | boolean | { [key: string]: string };
    } = {};

    list.forEach((option) => {
        const [key, value] = option.split(":");
        if (value && value.includes("|")) {
            const subResult: { [key: string]: string } = {};
            value.split("|").forEach((subOption) => {
                const [subKey, subValue] = subOption.split(":");
                if (subValue) {
                    subResult[subKey] = subValue;
                } else {
                    subResult[subKey] = "";
                }
            });
            result[key] = subResult;
        } else {
            result[key] = value || true;
        }
    });

    return result;
};
