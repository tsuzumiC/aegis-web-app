import "./TimelineEdge.scss";

import { SmoothStepEdgeProps, getBezierPath } from "reactflow";

export interface ITimelineEdgeProps {
    birthDate: Date;
    startDate: Date;
    endDate: Date;
}

const TimelineEdge = (props: SmoothStepEdgeProps<ITimelineEdgeProps>) => {
    const { id, sourceX, sourceY, targetX, targetY } = props;

    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
    });
    return (
        <>
            <path
                id={id}
                className="timeline-edge"
                d={edgePath}
                data-tip
                data-for={id}
                style={{ fill: "none", stroke: "grey", strokeWidth: 16 }}
            />
        </>
    );
};

export default TimelineEdge;
