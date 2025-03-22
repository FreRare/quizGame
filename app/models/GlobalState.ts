import {create} from "zustand";
import colors from "@/assets/colors";

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

// @ts-ignore
export default useStore = create<AppState>((set) => {
    // Logic to initialize data
    // Return the state data
    return {
        user: undefined,
    }
});

export {AppState};