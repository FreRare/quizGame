import React from 'react';
import {AnswerType, RoundPlay} from "@/app/models/models";
import {StyleSheet, Text, View} from "react-native";
import commonStyles from "@/app/utils/CommonStyles";
import colors from "@/assets/colors";
import Icon from "@expo/vector-icons/FontAwesome";
import strings from "@/assets/strings";

type QuestionResultDisplayCardProps = {
    navigation: any;
    result: RoundPlay;
};

const QuestionResultDisplayCard = (props: QuestionResultDisplayCardProps) => {

    let borderColor: string = colors.secondary;

    switch (props.result.answerType) {
        case AnswerType.ATBlank:
            borderColor = colors.primary;
            break;
        case AnswerType.ATMissed:
            borderColor = colors.error;
            break;
        case AnswerType.ATScore:
            borderColor = colors.accent;
            break;
    }

    return (
        <View style={[styles.cardContainer, {borderColor: borderColor}]}>
            <View style={[commonStyles.horizontal, styles.row]}>
                <Text style={[commonStyles.text, styles.questionText, styles.item]}>{props.result.question.text}</Text>
            </View>
            <View style={[commonStyles.horizontal, styles.row, styles.header]}>
                <Icon style={[styles.item]} name={"check-circle-o"} size={30}/>
                <Icon style={[styles.item]} name={"crosshairs"} size={30}/>
                <Icon style={[styles.item]} name={"tachometer"} size={30}/>
            </View>
            <View style={[commonStyles.horizontal, styles.row, {flex: 2}]}>
                <Text style={[commonStyles.text, styles.item]}>{props.result.question.goodAnswer}</Text>
                <Text style={[commonStyles.text, styles.item]}>{props.result.answer}</Text>
                <Text style={[commonStyles.text, styles.item]}>{props.result.answerTime}s</Text>
            </View>
            <View style={[commonStyles.horizontal, styles.row]}>
                <Text style={[commonStyles.text, styles.item, styles.questionText]}>{strings.othersPerformance}:</Text>
            </View>
            <View style={[commonStyles.horizontal, styles.row]}>
                <Text style={[commonStyles.text, styles.item]}>0-20: 10%</Text>
                <Text style={[commonStyles.text, styles.item]}>20-40: 40%</Text>
                <Text style={[commonStyles.text, styles.item]}>40-: 80%</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        width: "90%",
        display: "flex",
        padding: 10,
        margin: 5,
        borderWidth: 3,
        borderRadius: 20,
    },
    questionText: {
        fontWeight: "bold",
        fontStyle: "italic",
        fontSize: 18,
    },
    header: {
        borderColor: colors.secondary,
        borderBottomWidth: 3,
    },
    row: {
        flex: 1,
        padding: 5,
    },
    item: {
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default QuestionResultDisplayCard;