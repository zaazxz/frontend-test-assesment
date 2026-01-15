// pages/design/[flow]/index.tsx
import Flag from '@/components/icons/Flag';
import Square3Stack3d from '@/components/icons/Square3Stack3d';
import CanvasLayout from '@/layouts/canvas';
import { addEdge, applyEdgeChanges, applyNodeChanges, Background, BackgroundVariant, Controls, ReactFlow, ReactFlowProvider } from '@xyflow/react';
import React, { useCallback, useState } from 'react'

const initialNodes = [
    { id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
    { id: 'n2', position: { x: 0, y: 100 }, data: { label: 'Node 2' } },
];

const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2' }];

const DesignCanvasFlow = () => {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const onNodesChange = useCallback(
        (changes: any) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        [],
    );

    const onEdgesChange = useCallback(
        (changes: any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        [],
    );

    const onConnect = useCallback(
        (params: any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
        [],
    );

    return (
        <CanvasLayout title="Design Flow Editor">
            <div className="flex-1">
                <ReactFlowProvider>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        fitView
                        proOptions={{ hideAttribution: true }}
                        style={{ width: '100%', height: '100%' }}
                    >

                        {/* My Components */}
                        <div className="w-full flex justify-between p-3 items-center">

                            {/* Right Wrapper */}
                            <div className="flex">

                                {/* Version Selector */}
                                <select className="bg-white shadow-md p-3 rounded-lg text-sm z-50">
                                    <option value="1" selected>Version 1.0</option>
                                    <option value="2">Version 2.0</option>
                                </select>

                                {/* Flag Button */}
                                <button className="btn btn-primary ml-3 bg-white rounded-lg shadow-md p-2 hover:bg-white/50 cursor-pointer z-50" onClick={() => { console.log('clicked') }}>
                                    <Flag />
                                </button>

                            </div>

                            {/* Left Wrapper */}
                            <div className="flex gap-2">

                                {/* Parameter */}
                                <button className="btn btn-primary bg-white rounded-lg shadow-md p-2 hover:bg-white/50 cursor-pointer z-50 text-sm w-20 h-20 flex justify-center items-center flex-col gap-1">
                                    <Square3Stack3d />
                                    <small>Parameter</small>
                                </button>

                                {/* Funnel */}
                                <button className="btn btn-primary bg-white rounded-lg shadow-md p-2 hover:bg-white/50 cursor-pointer z-50 text-sm w-20 h-20 flex justify-center items-center flex-col gap-1">
                                    <Square3Stack3d />
                                    <small>Funnel</small>
                                </button>

                                {/* RPG */}
                                <button className="btn btn-primary bg-white rounded-lg shadow-md p-2 hover:bg-white/50 cursor-pointer z-50 text-sm w-20 h-20 flex justify-center items-center flex-col gap-1">
                                    <Square3Stack3d />
                                    <small>RPG</small>
                                </button>

                                {/* Processor */}
                                <button className="btn btn-primary bg-white rounded-lg shadow-md p-2 hover:bg-white/50 cursor-pointer z-50 text-sm w-20 h-20 flex justify-center items-center flex-col gap-1">
                                    <Square3Stack3d />
                                    <small>Processor</small>
                                </button>

                                {/* Export */}
                                <button className="btn btn-primary bg-white rounded-lg shadow-md p-2 hover:bg-white/50 cursor-pointer z-50 text-sm w-20 h-20 flex justify-center items-center flex-col gap-1">
                                    <Square3Stack3d />
                                    <small>Export</small>
                                </button>

                                {/* Publish */}
                                <button className="btn btn-primary bg-white rounded-lg shadow-md p-2 hover:bg-white/50 cursor-pointer z-50 text-sm w-20 h-20 flex justify-center items-center flex-col gap-1">
                                    <Square3Stack3d />
                                    <small>Publish</small>
                                </button>

                            </div>

                        </div>

                        <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
                        <Controls />
                    </ReactFlow>
                </ReactFlowProvider>
            </div>
        </CanvasLayout>
    )
}

export default DesignCanvasFlow;
