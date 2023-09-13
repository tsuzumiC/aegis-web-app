import "./FamilyTree.scss";

import React, { PropsWithRef, useContext } from "react";

import "reactflow/dist/style.css";

import { ModalManagerContext } from "components/modalManager/ModalManager";
import { useLocation } from "react-router-dom";
import {
    IShowModalPayload,
    ModalTypes,
} from "components/modalManager/models/ModalMangerModels";
import {
    ConnectionLineType,
    Controls,
    ReactFlow,
    ReactFlowProvider,
    Transform,
} from "reactflow";
import { Node } from "react-flow-renderer";
import { FlowChartContext } from "./FlowChartContext";

export interface IPosition {
    x: number;
    y: number;
}

export interface INode {
    content: React.ReactNode;
    position: IPosition;
}

export interface IPathNode {
    position: IPosition;

    radius?: number;
    rounded?: boolean;
}

export interface IPath {
    nodes: IPathNode[];
}

const RADIUS = 10;

const distance = (a: IPosition, b: IPosition) =>
    Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

const edgeMaker = (path: IPath) => {
    const dPath = path.nodes.reduce((acc, node, index, array) => {
        if (index === 0) {
            return `M ${node.position.x},${node.position.y}`;
        }

        if (index === array.length - 1) {
            return `${acc} L ${node.position.x},${node.position.y}`;
        }

        if (node.rounded) {
            const prevNode = path.nodes[index - 1];
            const nextNode = path.nodes[index + 1];

            const radius = Math.min(
                RADIUS,
                distance(prevNode.position, node.position) / 2,
                distance(node.position, nextNode.position) / 2
            );

            //calculate the angle between the vectors from the current node to the previous and next nodes
            const angle1 = Math.atan2(
                node.position.y - prevNode.position.y,
                node.position.x - prevNode.position.x
            );
            const angle2 = Math.atan2(
                node.position.y - nextNode.position.y,
                node.position.x - nextNode.position.x
            );

            const start = {
                x: node.position.x - radius * Math.cos(angle1),
                y: node.position.y - radius * Math.sin(angle1),
            };
            const end = {
                x: node.position.x - radius * Math.cos(angle2),
                y: node.position.y - radius * Math.sin(angle2),
            };

            return `${acc} L ${start.x},${start.y} Q ${node.position.x},${node.position.y} ${end.x},${end.y}`;
        }

        return `${acc} L ${node.position.x},${node.position.y}`;
    }, "");

    return (
        <svg
            viewBox="-5 -5 210 210"
            style={{ width: "210px", height: "210px" }}
        >
            <path d={dPath} stroke="red" fill="none" />
        </svg>
    );
};

const testPath: IPath = {
    nodes: [
        { position: { x: 0, y: 0 } },
        { position: { x: 100, y: 25 }, rounded: true },
        { position: { x: 125, y: 125 } },
        { position: { x: 200, y: 100 }, rounded: true },
        { position: { x: 200, y: 200 } },
    ],
};

const defaultTransform: Transform = [0, 0, 1];

const elements: Node[] = [
    {
        id: "1",
        type: "input",
        data: { label: "Input Node" },
        position: { x: 250, y: 5 },
    },
];

export interface IFlowchartProps {}

const FamilyTree = (props: PropsWithRef<IFlowchartProps>) => {
    const modalManagerContext = useContext(ModalManagerContext);

    const location = useLocation();

    /*   const handleOnShowModal = (character: TCharacters) => {
        const payload: IShowModalPayload = {
            id: character,
            type: ModalTypes.character,
            callerAddress: location.pathname,
        };
        modalManagerContext.onShowModal(payload);
    }; */

    const removeContextValue = {
        onShowModal: () => {},
    };

    return (
        <div className="family-tree">
            <FlowChartContext.Provider value={removeContextValue}>
                <ReactFlowProvider>
                    <svg className="hideSvgSoThatItSupportsFirefox">
                        <filter id="dot-blur">
                            <feGaussianBlur stdDeviation={1} />
                        </filter>
                    </svg>

                    <ReactFlow
                        nodes={elements}
                        nodesDraggable={false}
                        nodesFocusable={false}
                        elementsSelectable={false}
                        preventScrolling={false}
                        connectionLineType={ConnectionLineType.SmoothStep}
                        deleteKeyCode="Delete"
                        multiSelectionKeyCode="Shift"
                        zoomActivationKeyCode="Shift"
                        minZoom={0}
                        maxZoom={10}
                    ></ReactFlow>

                    <Controls
                        style={{ bottom: "15px", left: "10px", zIndex: 15 }}
                        showInteractive={false}
                    ></Controls>
                </ReactFlowProvider>
            </FlowChartContext.Provider>
        </div>
    );
};

export default FamilyTree;
