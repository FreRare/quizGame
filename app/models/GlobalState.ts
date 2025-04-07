import {create} from "zustand";
import {User} from "@/app/models/models";
import {RxDatabase} from "rxdb";
import {setupDataBase} from "@/app/utils/db/dbInit";

type AppState = {
    // ==========
    // Variables
    // ==========
    activeUser: User | undefined;
    db: RxDatabase | null;
    initDb: () => Promise<void>;
    setUser: (u: User) => void;
}


const useStore = create<AppState>((set) => {
    // Logic to initialize data
    // Return the state data
    return {
        activeUser: undefined,
        db: null,
        initDb: async () => {
            let dbInstance;
            try {
                dbInstance = await setupDataBase();
                set({
                    db: dbInstance,
                });
            } catch (e) {
                console.log("Error while creating database: ", e);
            }
        },
        setUser: (u: User | undefined) => {
            set({
                activeUser: u,
            })
        }
    }
});

export {AppState, useStore, User};