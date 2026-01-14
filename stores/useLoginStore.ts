import { create } from 'zustand';

interface LoginState {
    email: string;
    password: string;
    checkbox: boolean;
    isVisible: boolean;
    isLoading: boolean;
    error: {
        message: string;
        description: string;
    };
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    toggleCheckbox: () => void;
    toggleVisibility: () => void;
    setLoading: (loading: boolean) => void;
    setError: (error: { message: string; description: string }) => void;
    reset: () => void;
}

export const useLoginStore = create<LoginState>((set) => ({
    email: '',
    password: '',
    checkbox: false,
    isVisible: false,
    isLoading: false,
    error: { message: '', description: '' },
    setEmail: (email) => set({ email }),
    setPassword: (password) => set({ password }),
    toggleCheckbox: () => set((state) => ({ checkbox: !state.checkbox })),
    toggleVisibility: () => set((state) => ({ isVisible: !state.isVisible })),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
    reset: () =>
        set({
            email: "",
            password: "",
            checkbox: false,
            isVisible: false,
            isLoading: false,
            error: { message: "", description: "" },
        }),
}));
