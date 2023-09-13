import React from "react";

export interface IFlowChartContextValue {
    onShowModal?: (id: string) => void;
}

export const FlowChartContext = React.createContext<
    IFlowChartContextValue | undefined
>(undefined);

export const useFlowChartContext = () => {
    const result = React.useContext(FlowChartContext);

    if (result === undefined) {
        throw new Error(
            "This component must be used within a <FlowChart> component"
        );
    }

    return result;
};
