import { BaseEdge, EdgeProps } from "reactflow";

export interface ICustomEdgeProps extends EdgeProps {
    path: string;
}

const CustomEdge = (props: ICustomEdgeProps) => {
    return <BaseEdge {...props} style={{ strokeWidth: 5 }} path={props.path} />;
};

export default CustomEdge;
