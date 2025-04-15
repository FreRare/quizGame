import React, {useEffect, useState} from 'react';
import StartGameForm from "@/app/features/pages/game/components/StartGameForm";
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Layout from "@/app/global/layout";
import {GameLength, HardnessLevel, Question, QuestionTopic, RoundPlay} from "@/app/models/models";
import {AppState, useStore} from "@/app/models/GlobalState";
import strings from "@/assets/strings";
import commonStyles from "@/app/utils/CommonStyles";
import colors from "@/assets/colors";
import QuestionDisplay from "@/app/features/pages/game/components/QuestionDisplay";
import QuestionResultDisplayCard from "@/app/features/pages/game/components/QuestionResultDisplayCard";

type GameProps = {
    navigation: any;
}

const Game = (props: GameProps) => {
    const [creatingGame, setCreatingGame] = useState(true);
    const [gameInProgress, setGameInProgress] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<Question | undefined>(undefined);
    const [roundCount, setRoundCount] = useState<number>(1);
    const [roundPlays, setRoundPlays] = useState<RoundPlay[]>([]);
    const [currentScore, setCurrentScore] = useState<number>(0);


    const db = useStore((s: AppState) => s.db);

    const handleCancel = () => {
        setGameInProgress(false);
        setCreatingGame(true);
        setIsGameOver(false);
    }

    const shuffleQuestions = (q: Question[], len: number) => {
        const shuffled = q.sort(() => Math.random() - 0.5).slice(0, len);
        setQuestions(shuffled);
        setCurrentQuestion(shuffled[0]);
        setLoading(false);
        setGameInProgress(true);
    }

    const handleGameStart = async (t: QuestionTopic[], l: HardnessLevel, d: GameLength) => {
        setCreatingGame(false);
        setLoading(true);
        setRoundPlays([]);
        setRoundCount(1);
        setCurrentScore(0);
        if (!db) {
            console.error("No database found!");
            alert("No database found!")
            return;
        }
        // Get topic and level related questions
        const fetchedQuestions = await db.questions.find({
            selector: {
                topic: {$in: t},
                level: {$eq: l}
            }
        }).exec();
        if (fetchedQuestions.length <= 0) {
            console.error("No questions found!");
            return;
        }

        let parsedQuestions: Question[] = [];
        for (const q of fetchedQuestions) {
            parsedQuestions.push(
                {
                    id: q._data.id,
                    level: q._data.level,
                    topic: q._data.topic,
                    text: q._data.text,
                    goodAnswer: q._data.goodAnswer,
                    badAnswers: q._data.badAnswers,
                }
            );
        }
        // Set up game engine
        switch (d) {
            case GameLength.GLShort: { // 5
                if (parsedQuestions.length < 5) {
                    setError(strings.ERROR.notEnoughQuestions);
                    return;
                }
                shuffleQuestions(parsedQuestions, 1);
                break;
            }
            case GameLength.GLMedium: { // 10
                if (parsedQuestions.length < 10) {
                    setError(strings.ERROR.notEnoughQuestions);
                    return;
                }
                shuffleQuestions(parsedQuestions, 10);
                break;
            }
            case GameLength.GLLong: { // 20
                if (parsedQuestions.length < 20) {
                    setError(strings.ERROR.notEnoughQuestions);
                    return;
                }
                shuffleQuestions(parsedQuestions, 20);
                break;
            }
            default: {
                alert("Invalid game duration!");
                return;
            }
        }
    }

    const handleQuestionAnswer = (r: RoundPlay): void => {
        setRoundPlays([...roundPlays, r]);
        setCurrentScore(currentScore + r.points);
        if (roundCount === questions.length) {
            setRoundCount(1);
            setCurrentQuestion(undefined);
            setGameInProgress(false);
            setIsGameOver(true);
        }
        setRoundCount(roundCount + 1);
        setCurrentQuestion(questions[roundCount]);
    }

    const gameEvaluation = roundPlays.map((r, i) => {
        return (
            <QuestionResultDisplayCard key={i} navigation={props.navigation} result={r}/>
        );
    });

    return (
        <Layout>
            <View>
                {error && <Text style={[commonStyles.text, {color: colors.error}]}>{error}</Text>}
            </View>
            {
                creatingGame &&
                (
                    <StartGameForm navigation={props.navigation} handleGameStart={handleGameStart}/>
                )
            }
            {gameInProgress && (
                <View style={commonStyles.vertical}>
                    {
                        currentQuestion &&
                        (
                            <QuestionDisplay key={roundCount} currentScore={currentScore} navigation={props.navigation}
                                             question={currentQuestion!}
                                             roundCount={roundCount}
                                             finalizeResultCB={handleQuestionAnswer}/>)}
                    <TouchableOpacity style={commonStyles.bigButton} onPress={() => handleCancel()}>
                        <Text style={commonStyles.text}>{strings.goBack}</Text>
                    </TouchableOpacity>
                </View>)}
            {isGameOver && (
                <View style={commonStyles.vertical}>
                    <Text style={commonStyles.title2}>{strings.gameOver}</Text>
                    <Text
                        style={commonStyles.title2}>{strings.yourScore}: {(Math.round((currentScore / roundPlays.length) * 10) / 10) * 100}% ({currentScore} {strings.points})</Text>
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <TouchableOpacity style={commonStyles.bigButton} onPress={() => handleCancel()}>
                            <Text style={commonStyles.text}>{strings.playAgain}</Text>
                        </TouchableOpacity>
                        <Text style={commonStyles.title2}>{strings.breakDown}</Text>
                        {gameEvaluation}
                    </ScrollView>
                </View>
            )}
        </Layout>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        alignItems: "center",
        justifyContent: "center",

    },
});

export default Game;