import {addRxPlugin, createRxDatabase} from "rxdb";
import {userSchema} from "@/app/utils/db/schemas/user";
import {questionSchema} from "@/app/utils/db/schemas/question";
import {gameSchema} from "@/app/utils/db/schemas/game";
import {v4 as uuidv4} from "uuid";
import * as Crypto from "expo-crypto";
import {HardnessLevel, QuestionTopic} from "@/app/models/models";
import {getRxStorageLocalstorage} from "rxdb/plugins/storage-localstorage";
import {RxDBJsonDumpPlugin} from "rxdb/plugins/json-dump";

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
        {
            id: uuidv4(),
            topic: QuestionTopic.QTScience,
            level: HardnessLevel.HLEasy,
            text: "What is 2 + 2?",
            goodAnswer: "4",
            badAnswers: ["2", "10", "3"],
        },
        {
            id: uuidv4(),
            topic: QuestionTopic.QTScience,
            level: HardnessLevel.HLEasy,
            text: "What is the square root of 4?",
            goodAnswer: "2",
            badAnswers: ["3", "4", "16"],
        },
        {
            id: uuidv4(),
            topic: QuestionTopic.QTScience,
            level: HardnessLevel.HLMedium,
            text: "How many times could you cut a 1m long rope in half?",
            goodAnswer: "Infinite",
            badAnswers: ["two", "thousand", "1"],
        },
        {
            id: uuidv4(),
            topic: QuestionTopic.QTScience,
            level: HardnessLevel.HLHard,
            text: "Which one is not a programming language?",
            goodAnswer: "HTML",
            badAnswers: ["Python", "Ruby", "PHP"],
        },
        {
            id: uuidv4(),
            topic: QuestionTopic.QTHistory,
            level: HardnessLevel.HLHard,
            text: "In which country had the chief commander of police shot a grenade launcher in his office?",
            goodAnswer: "Poland",
            badAnswers: ["Slovakia", "Hungary", "Russia"],
        },
        {
            id: uuidv4(),
            topic: QuestionTopic.QTHistory,
            level: HardnessLevel.HLEasy,
            text: "Which country lost a war to emus?",
            goodAnswer: "Australia",
            badAnswers: ["USA", "China", "Brazil"],
        },
        {
            id: uuidv4(),
            topic: QuestionTopic.QTGeography,
            level: HardnessLevel.HLEasy,
            text: "The biggest country in the world is: ",
            goodAnswer: "Russia",
            badAnswers: ["USA", "Hungary", "China"],
        },
        {
            id: uuidv4(),
            topic: QuestionTopic.QTGeography,
            level: HardnessLevel.HLEasy,
            text: "Which type of clouds indicate a tornado is coming?",
            goodAnswer: "Murus",
            badAnswers: ["Cumulonimbus", "Stratus", "Cumulus"],
        },
        {
            id: uuidv4(),
            topic: QuestionTopic.QTMovies,
            level: HardnessLevel.HLEasy,
            text: "Which animated movie had a talking duck?",
            goodAnswer: "Mickey mouse",
            badAnswers: ["Viana", "Brother bear", "Ratatouille"],
        },
        {
            id: uuidv4(),
            topic: QuestionTopic.QTMovies,
            level: HardnessLevel.HLEasy,
            text: "Which movie is part of the marvel universe?",
            goodAnswer: "Vanda Vision",
            badAnswers: ["Fantastic 4", "X-men", "John Carter"],
        },
    ];
}
