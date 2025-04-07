import {AnswerType, GameLength, HardnessLevel, QuestionTopic} from "@/app/models/models";

export const gameSchema = {
    title: 'game schema',
    version: 0,
    type: 'object',
    primaryKey: "id",
    properties: {
        id: {type: "string", maxLength: 50},
        participant: {type: "string"}, // user id
        length: {type: "string", enum: Object.values(GameLength)},
        type: {type: "string", enum: Object.values(HardnessLevel)},
        topics: {
            type: "array",
            items: {type: "string", enum: Object.values(QuestionTopic)},
        },
        startTime: {type: "string", format: "date-time"},
        duration: {type: "number"}, // ms
        rounds: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    roundNumber: {type: "number"},
                    question: {type: "string"}, // question id
                    points: {type: "number"},
                    answerType: {type: "string", enum: Object.values(AnswerType)},
                    answerTime: {type: "number"},
                },
                required: ["roundNumber", "question", "points", "answerType", "answerTime"],
            },
        },
    },
    required: ["id", "participant", "length", "type", "startTime", "duration", "rounds"],
}