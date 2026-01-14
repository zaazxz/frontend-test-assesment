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

    login: () => Promise<boolean>;
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

    login: async () => {
        try {
            
            // Get body
            const { email, password } = useLoginStore.getState();

            // Send request
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            // Check response
            if (!res.ok) {
                set({
                    error: {
                        message: data.message,
                        description: data.description,
                    },
                    isLoading: false,
                });
                return false;
            }

            // Set data
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            set({
                isLoading: false,
            })

            return true;

        } catch {
            set({
                error: {
                    message: 'Error',
                    description: 'Something went wrong',
                },
                isLoading: false,
            });
            return false;
        }
    },
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
