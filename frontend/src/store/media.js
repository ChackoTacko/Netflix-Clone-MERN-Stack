import { create } from 'zustand';

export const useMediaStore = create(set => ({
    mediaType: 'movies',
    setMediaType: (type) => set({ mediaType: type }),
}));