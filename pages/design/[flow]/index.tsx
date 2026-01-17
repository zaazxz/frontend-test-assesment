import LoadingOverlay from '@/components/common/LoadingOverlay';
import CircleStack from '@/components/icons/CircleStack';
import Cloud from '@/components/icons/Cloud';
import CloudArrowUp from '@/components/icons/CloudArrowUp';
import CpuChip from '@/components/icons/CpuChip';
import DocumentArrowDown from '@/components/icons/DocumentArrowDown';
import ExclamationTriangle from '@/components/icons/ExclamationTriangle';
import Flag from '@/components/icons/Flag';
import Funnel from '@/components/icons/Funnel';
import Square3Stack3d from '@/components/icons/Square3Stack3d';
import CanvasLayout from '@/layouts/canvas';
import { useDesignStore } from '@/stores/useDesignStore';
import { Button } from '@heroui/button';
import { Modal, ModalBody, ModalContent, useDisclosure } from '@heroui/modal';
import { Tooltip } from '@heroui/tooltip';
import { addEdge, applyEdgeChanges, applyNodeChanges, Background, BackgroundVariant, Controls, ReactFlow, ReactFlowProvider } from '@xyflow/react';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';

const initialNodes = [
    { id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
    { id: 'n2', position: { x: 0, y: 100 }, data: { label: 'Node 2' } },
];

const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2' }];

const DesignCanvasFlow = () => {

    // type
    type ModalType = 'sorry' | 'processors' | 'export' | 'publish' | null;
    type ProcessorType = 'sql' | 'processors';

    // Dummy data (debugging use)
    const processors = [
        {
            id: 'p1',
            type: 'processors',
            name: 'GenerateFlowFile',
            description:
                'Generates FlowFiles with random or configured content. Commonly used for testing pipelines, simulations, or bootstrapping flows during development.',
        },
        {
            id: 'p2',
            type: 'processors',
            name: 'UpdateAttribute',
            description:
                'Updates FlowFile attributes using dynamic properties and expression language. Useful for routing, enrichment, and metadata manipulation.',
        },
        {
            id: 'p3',
            type: 'processors',
            name: 'PutFile',
            description:
                'Writes the contents of FlowFiles to the local file system. Supports configurable directory structures and conflict resolution strategies.',
        },
        {
            id: 'p4',
            type: 'processors',
            name: 'GetFile',
            description:
                'Monitors a directory and retrieves files as FlowFiles. Commonly used for ingesting batch data from external systems.',
        },
        {
            id: 'p5',
            type: 'processors',
            name: 'RouteOnAttribute',
            description:
                'Routes FlowFiles based on attribute values and expression language rules. Enables conditional branching within dataflows.',
        },
        {
            id: 'p6',
            type: 'processors',
            name: 'MergeContent',
            description:
                'Combines multiple FlowFiles into a single FlowFile based on correlation attributes, size, or count thresholds.',
        },
        {
            id: 'p7',
            type: 'processors',
            name: 'SplitText',
            description:
                'Splits large text-based FlowFiles into smaller fragments. Useful for parallel processing and large file handling.',
        },
        {
            id: 'p8',
            type: 'processors',
            name: 'ReplaceText',
            description:
                'Searches and replaces content within FlowFiles using regular expressions. Supports dynamic replacements via expression language.',
        },
        {
            id: 'p9',
            type: 'processors',
            name: 'ValidateRecord',
            description:
                'Validates records against a configured schema. Invalid records can be routed separately for error handling.',
        },
        {
            id: 'p10',
            type: 'processors',
            name: 'TransformRecord',
            description:
                'Transforms incoming records into different schemas or formats. Often used in ETL pipelines.',
        },

        // ===== SQL =====
        {
            id: 's1',
            type: 'sql',
            name: 'ExecuteSQL',
            description:
                'Executes a SQL select query against a relational database and outputs the result set as FlowFiles.',
        },
        {
            id: 's2',
            type: 'sql',
            name: 'PutSQL',
            description:
                'Inserts or updates records in a relational database using data from incoming FlowFiles.',
        },
        {
            id: 's3',
            type: 'sql',
            name: 'QueryDatabaseTable',
            description:
                'Generates SQL queries to fetch rows incrementally from a database table based on maximum-value columns.',
        },
        {
            id: 's4',
            type: 'sql',
            name: 'GenerateTableFetch',
            description:
                'Creates SQL statements for fetching data in parallel partitions, enabling efficient large-table ingestion.',
        },
        {
            id: 's5',
            type: 'sql',
            name: 'PutDatabaseRecord',
            description:
                'Writes record-oriented data to relational databases using configurable record writers and readers.',
        },
        {
            id: 's6',
            type: 'sql',
            name: 'ConvertAvroToSQL',
            description:
                'Converts Avro-formatted data into SQL insert or update statements for relational storage.',
        },
        {
            id: 's7',
            type: 'sql',
            name: 'LookupRecord',
            description:
                'Performs database lookups for incoming records and enriches FlowFiles with lookup results.',
        },
        {
            id: 's8',
            type: 'sql',
            name: 'ExecuteScriptedSQL',
            description:
                'Executes dynamically generated SQL scripts using custom scripting logic for advanced use cases.',
        },
        {
            id: 's9',
            type: 'sql',
            name: 'FetchDistributedMapCache',
            description:
                'Fetches reference data from a distributed cache, often used together with database-backed caches.',
        },
        {
            id: 's10',
            type: 'sql',
            name: 'PutDistributedMapCache',
            description:
                'Stores key-value pairs into a distributed cache for fast lookups in subsequent processing steps.',
        },
    ];

    // use Router
    const router = useRouter();

    // Getting the flow version id
    const { flow } = router.query;

    // use Design Store
    const { findFlowById, designs, fetchDesigns } = useDesignStore();

    // Disclosure
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    // State
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
    const [invalid, setInvalid] = useState(false);
    const [activeModal, setActiveModal] = useState<ModalType>(null);
    const [activeButtonFilter, setActiveButtonFilter] = useState<'all' | 'processors' | 'sql'>('all');
    const [checking, setChecking] = useState(true);
    const [resolved, setResolved] = useState<{
        design: any;
        flow: any;
    } | null>(null);

    // Fetch and validate
    useEffect(() => {
        if (!flow) return;

        const init = async () => {
            if (designs.length === 0) {
                await fetchDesigns();
            }

            const result = findFlowById(flow as string);

            if (!result) {
                setInvalid(true)
            } else {
                setInvalid(false)
                setResolved(result);
            }

            setChecking(false);

        }

        init();
    }, [router.isReady, flow])

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

    const openModal = (type: ModalType) => {
        setActiveModal(type);
        onOpen();
    }

    const closeModal = () => {
        setActiveModal(null);
    }

    const filteredProcessors = useMemo(() => {
        if (activeButtonFilter === 'all') return processors;

        return processors.filter((processor) => processor.type === activeButtonFilter);
    }, [activeButtonFilter, processors])

    const filterBtnClass = (active: boolean) => `w-full p-3 rounded text-start flex gap-2 transition ${active ? 'bg-blue-600 text-white' : 'bg-gray-400 text-white hover:bg-gray-600'}`;

    if (checking) {
        return (
            <CanvasLayout title="Loading...">
                <LoadingOverlay />
            </CanvasLayout>
        );
    }

    if (invalid) {
        return (
            <CanvasLayout title="Unknown Version">
                <div className="w-full h-full flex items-center justify-center">
                    <div className="bg-white shadow-lg rounded-xl p-6 text-center">
                        <h2 className="text-lg font-bold mb-2">Version Unknown</h2>
                        <p className="text-sm text-gray-500 mb-4">
                            Flow version not found.
                        </p>
                        <button
                            onClick={() => router.push('/design')}
                            className="px-4 py-2 bg-primary text-white rounded-lg"
                        >
                            Back to Design
                        </button>
                    </div>
                </div>
            </CanvasLayout>
        );
    }

    else {
        return (
            <CanvasLayout
                title="Design Flow Editor"
                onBack={() => router.push('/design')}
            >

                {/* Content Wrapper */}
                <div className="flex-1">

                    {/* React Flow */}
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
                                    {resolved && resolved.design?.flowVersion && (
                                        <select
                                            className="bg-white shadow-md p-3 rounded-lg text-sm z-50"
                                            value={resolved.flow.id}
                                            onChange={(e) => {
                                                router.push(`/design/${e.target.value}`);
                                            }}
                                            disabled={resolved.design.flowVersion.length <= 1}
                                        >
                                            {resolved.design.flowVersion.map((flowVersion: any) => (
                                                <option key={flowVersion.id} value={flowVersion.id}>
                                                    Version {flowVersion.majorVersion}.{flowVersion.minorVersion}
                                                </option>
                                            ))}
                                        </select>
                                    )}

                                    {/* Flag Button */}
                                    <button
                                        className="btn btn-primary ml-3 bg-white rounded-lg shadow-md p-2 hover:bg-white/50 cursor-pointer z-50"
                                        onClick={() => {
                                            openModal('sorry')
                                        }}
                                    >
                                        <Flag />
                                    </button>

                                </div>

                                {/* Left Wrapper */}
                                <div className="flex gap-2">

                                    {/* Parameter */}
                                    <button
                                        className="btn btn-primary bg-white rounded-lg shadow-md p-2 hover:bg-white/50 cursor-pointer z-50 text-sm w-20 h-20 flex justify-center items-center flex-col gap-1"
                                        onClick={() => {
                                            openModal('sorry')
                                        }}
                                    >
                                        <Square3Stack3d />
                                        <small>Parameter</small>
                                    </button>

                                    {/* Funnel */}
                                    <button
                                        className="btn btn-primary bg-white rounded-lg shadow-md p-2 hover:bg-white/50 cursor-pointer z-50 text-sm w-20 h-20 flex justify-center items-center flex-col gap-1"
                                        onClick={() => {
                                            openModal('sorry')
                                        }}
                                    >
                                        <Funnel />
                                        <small>Funnel</small>
                                    </button>

                                    {/* RPG */}
                                    <button
                                        className="btn btn-primary bg-white rounded-lg shadow-md p-2 hover:bg-white/50 cursor-pointer z-50 text-sm w-20 h-20 flex justify-center items-center flex-col gap-1"
                                        onClick={() => {
                                            openModal('sorry')
                                        }}
                                    >
                                        <Cloud />
                                        <small>RPG</small>
                                    </button>

                                    {/* Processor */}
                                    <button
                                        className="btn btn-primary bg-white rounded-lg shadow-md p-2 hover:bg-white/50 cursor-pointer z-50 text-sm w-20 h-20 flex justify-center items-center flex-col gap-1"
                                        onClick={() => {
                                            openModal('processors')
                                        }}
                                    >
                                        <CpuChip />
                                        <small>Processor</small>
                                    </button>

                                    {/* Export */}
                                    <button
                                        className="btn btn-primary bg-white rounded-lg shadow-md p-2 hover:bg-white/50 cursor-pointer z-50 text-sm w-20 h-20 flex justify-center items-center flex-col gap-1"
                                        onClick={() => {
                                            openModal('sorry')
                                        }}
                                    >
                                        <DocumentArrowDown />
                                        <small>Export</small>
                                    </button>

                                    {/* Publish */}
                                    <button
                                        className="btn btn-primary bg-white rounded-lg shadow-md p-2 hover:bg-white/50 cursor-pointer z-50 text-sm w-20 h-20 flex justify-center items-center flex-col gap-1"
                                        onClick={() => {
                                            openModal('sorry')
                                        }}
                                    >
                                        <CloudArrowUp />
                                        <small>Publish</small>
                                    </button>

                                </div>

                            </div>

                            <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
                            <Controls />
                        </ReactFlow>
                    </ReactFlowProvider>

                    {/* Modal */}
                    <Modal
                        backdrop="blur"
                        classNames={{
                            base:
                                activeModal === 'processors'
                                    ? 'w-[80vw] h-[85vh] max-w-none max-h-none flex flex-col z-50'
                                    : 'z-50',
                            body:
                                activeModal === 'processors'
                                    ? 'p-6 overflow-y-auto'
                                    : 'p-10',
                            closeButton: "hover:bg-white/5 active:bg-white/10",
                        }}
                        isOpen={isOpen}
                        radius="lg"
                        size={
                            activeModal === 'processors'
                                ? '5xl'
                                : 'lg'
                        }
                        onOpenChange={onOpenChange}
                        hideCloseButton={activeModal === 'processors'}
                    >
                        <ModalContent>
                            {(onClose: any) => (
                                <>
                                    <ModalBody>

                                        {/* Sorry Modal */}
                                        {activeModal === 'sorry' && (
                                            <>
                                                {/* Exclamation Triangle */}
                                                <div className="flex items-center justify-center gap-2">
                                                    <div className='w-15 h-15 rounded-full bg-yellow-500 flex justify-center items-center text-2xl text-white'>
                                                        <ExclamationTriangle />
                                                    </div>
                                                </div>

                                                {/* Sorry message */}
                                                <div className="flex items-center justify-center gap-2">
                                                    <h1 className="text-2xl font-bold">
                                                        Sorry
                                                    </h1>
                                                </div>

                                                {/* Description */}
                                                <div className="flex items-center justify-center gap-2">
                                                    <p className="text-lg">
                                                        This feature is under development
                                                    </p>
                                                </div>

                                                {/* Close button */}
                                                <div className="flex items-center justify-center gap-2">
                                                    <Button
                                                        onPress={() => {
                                                            onClose();
                                                            closeModal();
                                                        }}
                                                        color='primary'
                                                        variant='flat'
                                                    >
                                                        Close
                                                    </Button>
                                                </div>
                                            </>
                                        )}

                                        {/* Processors Modal */}
                                        {activeModal === 'processors' && (
                                            <>

                                                {/* Wrapper */}
                                                <div className="border flex flex-col h-full justify-between">

                                                    {/* Buttons section */}
                                                    <div className="w-full flex flex-1 min-h-0">

                                                        {/* Left section */}
                                                        <div className="w-1/4 p-3 flex flex-col gap-2">

                                                            {/* All Button */}
                                                            <button
                                                                className={filterBtnClass(activeButtonFilter === 'all')}
                                                                onClick={() => setActiveButtonFilter('all')}
                                                            >
                                                                All
                                                            </button>

                                                            {/* Standard Button */}
                                                            <button
                                                                className={filterBtnClass(activeButtonFilter === 'processors')}
                                                                onClick={() => setActiveButtonFilter('processors')}
                                                            >
                                                                <CpuChip /> Standard
                                                            </button>

                                                            {/* SQL Button */}
                                                            <button
                                                                className={filterBtnClass(activeButtonFilter === 'sql')}
                                                                onClick={() => setActiveButtonFilter('sql')}
                                                            >
                                                                <CircleStack /> SQL
                                                            </button>

                                                        </div>

                                                        {/* Right section */}
                                                        <div className="w-3/4 border border-red-500 p-3 flex flex-wrap gap-2 items-start content-start justify-start overflow-y-auto">

                                                            {/* All Button */}
                                                            {filteredProcessors.map((p) => (
                                                                <button className="bg-gray-300 w-[250px] h-[90px] p-3 rounded text-white text-start flex gap-2 hover:bg-gray-500 transition items-center">

                                                                    {/* Icon */}
                                                                    <div>
                                                                        {p.type === 'sql' ? <CircleStack /> : <CpuChip />}
                                                                    </div>

                                                                    {/* Text */}
                                                                    <div className="flex flex-col">
                                                                        <h1 className='text-lg font-bold'>
                                                                            {p.name}
                                                                        </h1>
                                                                        <Tooltip content={p.description}>
                                                                            <small className='text-xs tracking-tight truncate max-w-[180px]'>
                                                                                {p.description}
                                                                            </small>
                                                                        </Tooltip>
                                                                    </div>
                                                                </button>
                                                            ))}

                                                        </div>

                                                    </div>

                                                    {/* Button Close */}
                                                    <div className="w-full border border-gray-500 p-3 flex justify-end">
                                                        <Button
                                                            onPress={() => {
                                                                onClose();
                                                                closeModal();
                                                            }}
                                                            color='primary'
                                                            variant='flat'
                                                        >
                                                            Close
                                                        </Button>
                                                    </div>

                                                </div>

                                            </>
                                        )}

                                    </ModalBody>
                                </>
                            )}
                        </ModalContent>
                    </Modal>

                </div>


            </CanvasLayout >
        )
    }
}

export default DesignCanvasFlow;
