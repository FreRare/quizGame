import {HardnessLevel, Question, QuestionTopic} from "@/app/models/models";

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


export const convertSchemaToQuestion = (s: any): Question => {
    return {
        id: s._data.id,
        badAnswers: s._data.badAnswers,
        goodAnswer: s._data.goodAnswer,
        level: s._data.level,
        text: s._data.text,
        topic: s._data.topic,
    }
}

export const convertQuestionToSchema = (q: Question) => {
    return {}
}