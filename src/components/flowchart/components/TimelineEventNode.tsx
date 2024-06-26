import "./TimelineEventNode.scss";

import {
    ITimelineEventNode,
    TimelineEventNodeType,
} from "pages/HlaarFamily/utility/TimelineNodes";
import { CustomNode } from "../utility/NodeUtility";
import { Handle, Position } from "reactflow";

export interface ITimelineEventNodeProps extends ITimelineEventNode {}

type TimelineEventNodeProps = CustomNode<ITimelineEventNodeProps>;

const TimelineEventNode: React.FC<TimelineEventNodeProps> = (props) => {
    const { id, data } = props;

    const agePos = data?.agePos;

    return (
        <div className="timeline-event-node">
            {agePos && (
                <div className={`timeline-event-node--age pos-${agePos}`}>
                    <div className="timeline-event-node--age--current">
                        {data.currentAge?.year},{data.currentAge?.month}
                    </div>
                    <div className="timeline-event-node--age--offset">
                        {data.offsetAge?.year},{data.offsetAge?.month}
                    </div>
                </div>
            )}
            <div className="timeline-event-node--container">
                <Handle
                    type="source"
                    position={Position.Top}
                    id={`top-handle-${id}`}
                    className="timeline-event-node--handle handle-top"
                />
                <Handle
                    type="source"
                    position={Position.Right}
                    id={`right-handle-${id}`}
                    className="timeline-event-node--handle handle-right"
                />
                <Handle
                    type="source"
                    position={Position.Bottom}
                    id={`bottom-handle-${id}`}
                    className="timeline-event-node--handle handle-bottom"
                />
                <Handle
                    type="target"
                    position={Position.Left}
                    id={`left-handle-${id}`}
                    className="timeline-event-node--handle handle-left"
                />
                {data.type === TimelineEventNodeType.birth && (
                    <svg width="50" height="50">
                        <path d="M0 25 H50" stroke="gray" strokeWidth="16" />
                        <path d="M25 0 V50" stroke="gray" strokeWidth="16" />
                    </svg>
                )}
                {data.type === TimelineEventNodeType.event && (
                    <svg width="10" height="50">
                        <path d="M5 0 V50" stroke="gray" strokeWidth="10" />
                    </svg>
                )}
            </div>
        </div>
    );
};

export default TimelineEventNode;
