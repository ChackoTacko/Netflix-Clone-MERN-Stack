import axios from 'axios';
import toast from 'react-hot-toast';
import { create } from 'zustand';

export const useAuthStore = create(set => ({
    user: null,
    isSigningUp: false,
    isCheckingAuth: true,
    isLoggingOut: false,
    isLoggingIn: false,
    signup: async (creds) => {
        set({ isSigningUp: true });
        try {
            const response = await axios.post('/api/v1/auth/signup', creds);
            set({ user: response.data.user, isSigningUp: false });
            toast.success('Sign up successful');
        } catch (error) {
            toast.error(error.response.data.message || 'Signup Failed');
            set({ isSigningUp: false, user: null });
        }
    },
    login: async (creds) => {
        set({ isLoggingIn: true });
        try {
            const  response = await axios.post('/api/v1/auth/login', creds);
            set({ user: response.data.user, isLoggingIn: false });
            toast.success('Login successful');
        } catch (error) {
            set({ isLoggingIn: false, user: null });
            toast.error(error.response.data.message || 'Login Failed');
        }
    },
    logout: async () => {
        set({ isLoggingOut: true });
        try {
            await axios.post('/api/v1/auth/logout')
            toast.success('Logout successful');
            set({ user: null, isLoggingOut: false });
        } catch (error) {
            set({ isLoggingOut: false });
            toast.error('Logout Failed');
        }
    },  
    authCheck: async () => {
        set({ isCheckingAuth: true})
        try {
            const response = await axios('/api/v1/auth/authCheck');
            set({ user: response.data.user, isCheckingAuth: false });
        } catch (error) {
            set({ isCheckingAuth: false, user: null });
        }   
    },
}));