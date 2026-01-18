import { Edge, Node } from "@xyflow/react";

export type FlowNode = Node<{
    label: string;
    processor: any;
}>;

export type FlowEdge = Edge<{
    relationship?: string;
}>;

export interface FlowVersion {
    id: string;
    majorVersion: number;
    minorVersion: number;
    designName: string;
    comment: string;
    status: "draft" | "published";
    lastUpdated: string;
    minifiConfigVersion: any;
}

export interface CreateFlowVersionInput {
    majorVersion: number;
    minorVersion: number;
    designName: string;
    comment: string;
    status: "draft" | "published";
    lastUpdated: string;
    minifiConfigVersion: Record<string, any>;
}

export interface Design {
    id: number;
    classId: string;
    numberOfAgents: number;
    flowVersion: [];
}