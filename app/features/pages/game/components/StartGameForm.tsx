import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import commonStyles from "@/app/utils/CommonStyles";
import strings from "@/assets/strings";
import colors from "@/assets/colors";
import {GameLength, HardnessLevel, QuestionTopic} from "@/app/models/models";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import RadioGroup from "react-native-radio-buttons-group";

type StartGameProps = {
    navigation: any;
    handleGameStart: (t: QuestionTopic[], l: HardnessLevel, d: GameLength) => Promise<void>;
}

const StartGameForm = (props: StartGameProps) => {

    const [selectedTopics, setSelectedTopics] = useState<QuestionTopic[]>([]);
    const [selectedLevel, setSelectedLevel] = useState<string>("");
    const [selectedDuration, setSelectedDuration] = useState<string>("");
    const [topicError, setTopicError] = useState<string>("");
    const [levelError, setLevelError] = useState<string>("");
    const [durationError, setDurationError] = useState<string>("");

    const handleCancelPress = () => {
        props.navigation.navigate("/profile");
    }

    const handleGameStart = () => {
        if (selectedTopics.length <= 0 || selectedLevel.length <= 0 || selectedDuration.length <= 0) {
            if (selectedTopics.length <= 0) {
                setTopicError(strings.ERROR.topicsEmptyError);
            } else {
                setTopicError("");
            }
            if (selectedLevel.length <= 0) {
                setLevelError(strings.ERROR.levelEmptyError);
            } else {
                setLevelError("");
            }
            if (selectedDuration.length <= 0) {
                setDurationError(strings.ERROR.durationEmptyError);
            } else {
                setDurationError("");
            }
            return;
        }
        const level = Object.values(HardnessLevel)[parseInt(selectedLevel)];
        if (!level) {
            setLevelError(`Wrong selection! ${selectedLevel}`);
            setSelectedLevel("");
            return;
        }
        const duration = Object.values(GameLength)[parseInt(selectedDuration)];
        if (!duration) {
            setDurationError(`Wrong selection! ${selectedDuration}`);
            setSelectedDuration("");
            return;
        }

        if(duration === GameLength.GLLong && selectedTopics.length < 2){
            setTopicError(strings.ERROR.notEnoughSelectedTopics);
            return;
        }

        setTopicError("");
        setLevelError("");
        setDurationError("");
        props.handleGameStart(selectedTopics, level, duration);
    }

    const topicSelectionSection = Object.values(QuestionTopic).map((k, i) => {
        return (
            <BouncyCheckbox
                key={i}
                size={25}
                fillColor={colors.secondary}
                innerIconStyle={{borderWidth: 2}}
                text={k.toString()}
                textStyle={[commonStyles.text, {color: colors.secondary, textDecorationLine: "none"}]}
                isChecked={selectedTopics.includes(k)}
                onPress={() => {
                    if (selectedTopics.includes(k)) {
                        setSelectedTopics(selectedTopics.filter((e) => e != k))
                    } else {
                        selectedTopics.push(k);
                        setSelectedTopics(selectedTopics);
                    }
                }}
            />
        );
    });

    const levelSelectorButtons = Object.values(HardnessLevel).map((v, i) => {
        return {
            id: i.toString(),
            label: v.toString(),
            value: v,
            borderColor: colors.secondary,
            layout: 'column',
        };
    });

    const gameDurationSelectorButtons = Object.values(GameLength).map((v, i) => {
        return {
            id: i.toString(),
            label: v.toString(),
            value: v,
            borderColor: colors.secondary,
            layout: 'column',
        }
    });

    const gameConfigurationForm = (
        <View style={commonStyles.vertical}>
            <View style={commonStyles.formContainer}>
                <Text style={commonStyles.title2}>{strings.gameSettings}</Text>
                <Text style={[commonStyles.text, styles.sectionTitle]}>{strings.selectTopics}</Text>
                {topicError && <Text style={[commonStyles.text, {color: colors.error}]}>{topicError}</Text>}
                <View style={styles.topicContainer}>
                    {topicSelectionSection}
                </View>
                <Text style={[commonStyles.text, styles.sectionTitle]}>{strings.selectLevel}</Text>
                {levelError && <Text style={[commonStyles.text, {color: colors.error}]}>{levelError}</Text>}
                <RadioGroup containerStyle={styles.radioGroup} labelStyle={[commonStyles.text, styles.radioElement]}
                            radioButtons={levelSelectorButtons} onPress={setSelectedLevel}
                            selectedId={selectedLevel}/>
                <Text style={[commonStyles.text, styles.sectionTitle]}>{strings.selectDuration}</Text>
                {durationError && <Text style={[commonStyles.text, {color: colors.error}]}>{durationError}</Text>}
                <RadioGroup containerStyle={styles.radioGroup} labelStyle={[commonStyles.text, styles.radioElement]}
                            radioButtons={gameDurationSelectorButtons} onPress={setSelectedDuration}
                            selectedId={selectedDuration}/>
                <View style={commonStyles.horizontal}>
                    <TouchableOpacity style={[commonStyles.bigButton, {borderColor: colors.error}]}
                                      onPress={() => handleCancelPress()}>
                        <Text style={commonStyles.text}>{strings.cancel}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[commonStyles.bigButton, {borderColor: colors.accent}]}
                                      onPress={() => handleGameStart()}>
                        <Text style={commonStyles.text}>{strings.letsGo}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <View style={commonStyles.vertical}>
            <Text style={commonStyles.title}>{strings.startGame}</Text>
            {gameConfigurationForm}
        </View>
    );
};

const styles = StyleSheet.create({
    sectionTitle: {
        marginBottom: 25,
        marginTop: 20,
        fontWeight: "bold",
        fontSize: 20,
        color: colors.primary
    },
    radioGroup: {
        display: "flex",
        flexDirection: "row",
    },
    radioElement: {
        flex: 1,
        color: colors.secondary,
    },
    topicContainer: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
    }
});

export default StartGameForm;