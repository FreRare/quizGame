import React, {useEffect, useRef, useState} from 'react';
import {AnswerType, HardnessLevel, Question, RoundPlay} from "@/app/models/models";
import {Animated, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import commonStyles from "@/app/utils/CommonStyles";
import colors from "@/assets/colors";
import CountDownBar from "@/app/features/pages/game/components/CountDownBar";
import strings from "@/assets/strings";

type QuestionDisplayProps = {
    navigation: any;
    roundCount: number;
    question: Question;
    finalizeResultCB: (r: RoundPlay) => void;
    currentScore: number;
}

const QuestionDisplay = (props: QuestionDisplayProps) => {

    const [didTimeout, setDidTimeout] = useState<boolean>(false);
    const [shouldTimerRun, setShouldTimerRun] = useState<boolean>(true);
    const [answers, setAnswers] = useState<string[]>([]);
    const [answerTime, setAnswerTime] = useState<number>(0);
    const [blinkColor, setBlinkColor] = useState<string | undefined>(undefined);
    const timeout = 10;

    useEffect(() => {
        if (answers.length <= 0) {
            const answerOptions = [...props.question.badAnswers, props.question.goodAnswer].sort(() => Math.random() - 0.5);
            setAnswers(answerOptions);
        }
    }, []);


    const blinkAnim = useRef(new Animated.Value(0)).current;

    const blink = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(blinkAnim, {
                    toValue: 1,
                    duration: 250,
                    useNativeDriver: false
                }),
                Animated.timing(blinkAnim, {
                    toValue: 0,
                    duration: 250,
                    useNativeDriver: false
                })
            ]),
            {iterations: 6} // 3 seconds / 500ms = 6 blinks
        ).start();
    };

    const evaluateAnswer = (answer: string) => {
        setShouldTimerRun(false);
        const wasTheAnswerGood = answer === props.question.goodAnswer;
        blink();
        setTimeout(() => {
            const play: RoundPlay = {
                roundNumber: props.roundCount,
                question: props.question,
                answer: answer,
                points: 1,
                answerTime: answerTime,
                answerType: wasTheAnswerGood ? AnswerType.ATScore : AnswerType.ATMissed,
            };
            props.finalizeResultCB(play);
        }, 3000);
    }

    const timeoutHandler = () => {
        setDidTimeout(true);
        setShouldTimerRun(false);
        blink();
        setTimeout(() => {
            const play: RoundPlay = {
                roundNumber: props.roundCount,
                question: props.question,
                answer: "",
                points: 0,
                answerTime: timeout,
                answerType: AnswerType.ATBlank,
            };
            props.finalizeResultCB(play);
        }, 3000);
    }

    const answerOptions = answers.map((a, i) => {
        return (
            <TouchableOpacity key={i}
                              onPress={() => evaluateAnswer(a)}
                              disabled={!shouldTimerRun}>
                <Animated.View style={[styles.answerTouchable, {
                    backgroundColor: blinkAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['transparent', a === props.question.goodAnswer ? colors.accent : colors.error]
                    })
                }]}>
                    <Text style={[commonStyles.text, styles.answerText]}>{a}</Text>
                </Animated.View>
            </TouchableOpacity>);
    });

    return (
        <View style={commonStyles.vertical}>
            <Text style={[commonStyles.title, styles.questionText]}>{props.roundCount}: {props.question.text}</Text>
            <Text style={[commonStyles.text, {color: colors.accent}]}>{strings.yourScore}: {props.currentScore}</Text>
            <CountDownBar key={props.roundCount} timesUpCB={() => timeoutHandler()} timeout={timeout}
                          isTimeout={didTimeout} shouldRun={shouldTimerRun} answerTimeUpdateCB={setAnswerTime}/>
            <View style={[commonStyles.horizontal, styles.answerColHolder]}>
                <View style={[commonStyles.vertical, styles.answerRowHolder]}>
                    {answerOptions.slice(0, answerOptions.length / 2)}
                </View>
                <View style={[commonStyles.vertical, styles.answerRowHolder]}>
                    {answerOptions.slice(answerOptions.length / 2, answerOptions.length)}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    questionText: {
        color: colors.primary,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
    },
    answerRowHolder: {
        marginHorizontal: 10,
    },
    answerColHolder: {
        marginHorizontal: 100,
    },
    answerTouchable: {
        display: "flex",
        width: "100%",
        paddingHorizontal: 100,
        paddingVertical: 20,
        margin: 20,
        borderColor: colors.secondary,
        borderWidth: 3,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    answerText: {
        alignContent: "center",
        justifyContent: "center",
        textAlign: "center",
        fontWeight: "bold",
    },
});

export default QuestionDisplay;