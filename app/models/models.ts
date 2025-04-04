export type User = {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    dateOfBirth: Date;
    registrationDate: Date;
    games: GamePlay[];
};

export enum QuestionTopic {
    QTScience = "Science",
    QTHistory = "History",
    QTLiterature = "Literature",
    QTGeography = "Geography",
    QTSports = "Sports",
    QTMusic = "Music",
    QTMovies = "Movies",
    QTGaming = "Gaming",
    QTRiddles = "Riddles",
}

export enum HardnessLevel {
    HLEasy = "Easy",
    HLMedium = "Medium",
    HLHard = "Hard",
    HLSuperHard = "SuperHard",
    HLImpossible = "Impossible",
}

export type Question = {
    id: string;
    topic: QuestionTopic;
    level: HardnessLevel;
    text: string;
    goodAnswer: string;
    badAnswers: [string, string, string];
}

export enum AnswerType{
    ATBlank = "Blank",
    ATMissed = "Wrong answer",
    ATScore = "Good answer",
}

export type RoundPlay = {
    roundNumber: number;
    question: Question;
    points: number;
    answerType: AnswerType;
    answerTime: number; // in ms
}

export enum GameLength{
    GLShort = "Short",
    GLMedium = "Medium",
    GLLong = "Long",
}

export type GamePlay = {
    id: string;
    participant: User;
    length: GameLength;
    type: HardnessLevel;
    topics: QuestionTopic[];
    startTime: Date;
    duration: number; // ms
    rounds: RoundPlay[];
}
