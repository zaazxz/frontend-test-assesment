import { create } from 'zustand';

interface FlowVersion {
    majorVersion: number;
    minorVersion: number;
    designName: string;
    comment: string;
    status: string;
    lastUpdated: string;
    minifiConfigVersion: any;
}

interface Design {
    id: number;
    classId: string;
    numberOfAgents: number;
    flowVersion: [];
}

interface DesignState {
    designs: Design[];
    loading: boolean;
    selectedDesign: any | null;
    selectedDesignId: number | null;
    search: string;

    fetchDesigns: () => Promise<void>;
    setSelectedDesign: (id: number) => void;
    createFlowVersion: (payload: FlowVersion) => Promise<void>;
    clearSelectedDesign: () => void;
    setSearch: (value: string) => void;
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

    createFlowVersion: async (flowVersion) => {
        const design = get().selectedDesign;
        console.log("SELECTED DESIGN:", design);

        if (!design) return;

        const res = await fetch(`/api/design/${design.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(flowVersion),
        })

        const updatedDesign = await res.json();

        set((state) => ({
            designs: state.designs.map((d) =>
                d.id === updatedDesign.id ? updatedDesign : d
            ),
            selectedDesign: updatedDesign
        }))
    }

}))