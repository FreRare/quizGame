import {addRxPlugin, createRxDatabase} from "rxdb";
import {userSchema} from "@/app/utils/db/schemas/user";
import {questionSchema} from "@/app/utils/db/schemas/question";
import {gameSchema} from "@/app/utils/db/schemas/game";
import {v4 as uuidv4} from "uuid";
import * as Crypto from "expo-crypto";
import {getRxStorageLocalstorage} from "rxdb/plugins/storage-localstorage";
import {RxDBJsonDumpPlugin} from "rxdb/plugins/json-dump";
import {
    AnimalsEasy,
    AnimalsHard,
    AnimalsMedium,
    GeographyEasy,
    GeographyHard,
    GeographyMedium,
    HistoryEasy,
    HistoryHard,
    HistoryMedium,
    MoviesEasy,
    MoviesHard,
    MoviesMedium,
    ScienceEasy,
    ScienceHard,
    ScienceMedium
} from "@/app/utils/db/questions";

export const setupDataBase = async () => {
    addRxPlugin(RxDBJsonDumpPlugin);

    const db = await createRxDatabase({
        name: "quizzydb",
        storage: getRxStorageLocalstorage(),
        multiInstance: true,
    });

    await db.addCollections({
        users: {
            schema: userSchema
        },
        questions: {
            schema: questionSchema
        },
        games: {
            schema: gameSchema
        }
    });

    const admin = await db.users.find({
        selector: {
            username: {
                $eq: "admin"
            }
        }
    }).exec();

    if (admin.length > 0) {
        return db;
    }
    const adminUser = await db.users.insert(await createAdminUser());
    await db.questions.bulkInsert(createBaseQuestions());
    console.log("Admin user created: ", adminUser);
    return db;
};

const createAdminUser = async () => {
    const password = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        "admin123"
    );
    const bd = new Date(new Date().setFullYear(2001, 2, 27));
    return {
        id: uuidv4(),
        firstName: "Abel",
        lastName: "Takacs",
        username: "admin",
        password: password,
        isAdmin: true,
        dateOfBirth: bd.toISOString(),
        registrationDate: new Date(Date.now()).toISOString(),
    }
}

const createBaseQuestions = () => {
    return [
        ...ScienceEasy,
        ...ScienceMedium,
        ...ScienceHard,
        ...HistoryEasy,
        ...HistoryMedium,
        ...HistoryHard,
        ...MoviesEasy,
        ...MoviesMedium,
        ...MoviesHard,
        ...GeographyEasy,
        ...GeographyMedium,
        ...GeographyHard,
        ...AnimalsEasy,
        ...AnimalsMedium,
        ...AnimalsHard,
    ];
}
