import { CreateFlowVersionInput, Design, FlowVersion } from '@/types/flow';
import { slugify } from '@/utils/helper/slugify';
import { create } from 'zustand';

interface DesignState {
    designs: Design[];
    loading: boolean;
    selectedDesign: any | null;
    selectedDesignId: number | null;
    search: string;

    fetchDesigns: () => Promise<void>;
    setSelectedDesign: (id: number) => void;
    createFlowVersion: (payload: CreateFlowVersionInput) => Promise<void>;
    clearSelectedDesign: () => void;
    setSearch: (value: string) => void;

    findFlowById: (flowId: string) => {
        design: Design;
        flow: FlowVersion;
    } | null;

    updateFlowVersionConfig: (
        designId: number,
        flowVersionId: string,
        minifiConfigVersion: any
    ) => Promise<void>;
}

export const useDesignStore = create<DesignState>((set, get) => ({
    designs: [],
    loading: false,
    selectedDesign: null,
    search: "",
    selectedDesignId: null,

    setSelectedDesign: (id) => {
        const design = get().designs.find(d => d.id === id) || null;

        set({
            selectedDesignId: id,
            selectedDesign: design,
        });
    },

    clearSelectedDesign: () => {
        set({
            selectedDesignId: null,
            selectedDesign: null,
        });
    },

    setSearch: (value) => {
        set({ search: value });
    },

    fetchDesigns: async () => {
        set({
            loading: true
        })

        const res = await fetch("/api/design", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();
        set({
            designs: data,
            loading: false
        })

    },

    createFlowVersion: async (flowVersion: CreateFlowVersionInput) => {
        const design = get().selectedDesign;
        if (!design) return;

        // Custom slug for flow version
        const designSlug = slugify(design.classId);
        const generatedId = `fv-${designSlug}-${flowVersion.majorVersion}-${flowVersion.minorVersion}`;

        // Edit payload
        const payload = {
            ...flowVersion,
            id: generatedId,
        }

        const res = await fetch(`/api/design/${design.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })

        const updatedDesign = await res.json();

        set((state) => ({
            designs: state.designs.map((d) =>
                d.id === updatedDesign.id ? updatedDesign : d
            ),
            selectedDesign: updatedDesign
        }))
    },

    findFlowById(flowId) {
        const designs = get().designs;

        for (const design of designs) {
            const flow = design.flowVersion.find((f: any) => f.id === flowId);
            if (flow) {
                return {
                    design: design,
                    flow: flow,
                };
            }
        }

        return null;

    },

    updateFlowVersionConfig: async (
        designId,
        flowVersionId,
        minifiConfigVersion
    ) => {
        const res = await fetch(`/api/design/${designId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                flowVersionId,
                minifiConfigVersion,
            }),
        });

        const updatedDesign = await res.json();

        set(state => ({
            designs: state.designs.map(d =>
                d.id === updatedDesign.id ? updatedDesign : d
            ),
            selectedDesign:
                state.selectedDesign?.id === updatedDesign.id
                    ? updatedDesign
                    : state.selectedDesign,
        }));
    },


}))