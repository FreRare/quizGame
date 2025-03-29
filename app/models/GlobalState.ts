import {create} from "zustand";

type User = {
    id: string;
    username: string;
}

type AppState = {
    // ==========
    // Variables
    // ==========
    user: User | undefined | null;
}


const useStore = create<AppState>((set) => {
    // Logic to initialize data
    // Return the state data
    return {
        user: undefined,
    }
});

export {AppState, useStore, User};