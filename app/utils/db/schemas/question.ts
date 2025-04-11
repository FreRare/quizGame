import {HardnessLevel, QuestionTopic} from "@/app/models/models";

export const questionSchema = {
    title: 'question schema',
    version: 0,
    type: 'object',
    primaryKey: 'id',
    properties: {
        id: {type: "string", maxLength: 50},
        topic: {type: "string", enum: Object.values(QuestionTopic), maxLength: 50},
        level: {type: "string", enum: Object.values(HardnessLevel), maxLength: 50},
        text: {type: "string"},
        goodAnswer: {type: "string"},
        badAnswers: {
            type: "array",
            items: {type: "string"},
            minItems: 3,
            maxItems: 3,
        },
    },
    required: ["id", "topic", "level", "text", "goodAnswer", "badAnswers"],
    indexes: [
        ['topic'],
        ['level'],
        ['topic', 'level']
    ]
};