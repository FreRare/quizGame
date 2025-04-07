import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Layout from "@/app/components/global/layout";
import commonStyles from "@/app/utils/CommonStyles";
import strings from "@/assets/strings";
import colors from "@/assets/colors";
import {GameLength, HardnessLevel, QuestionTopic} from "@/app/models/models";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import RadioGroup from "react-native-radio-buttons-group";

type StartGameProps = {
    navigation: any;
}

const StartGame = (props: StartGameProps) => {

    const [selectedTopics, setSelectedTopics] = useState<QuestionTopic[]>([]);
    const [selectedLevel, setSelectedLevel] = useState<string>();
    const [selectedDuration, setSelectedDuration] = useState<string>();

    const handleCancelPress = () => {
        props.navigation.navigate("/profile");
    }

    const topicSelectionSection = Object.values(QuestionTopic).map((k, i) => {
        return (
            <BouncyCheckbox
                key={i}
                size={25}
                style={styles.checkBox}
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
                {topicSelectionSection}
                <Text style={[commonStyles.text, styles.sectionTitle]}>{strings.selectLevel}</Text>
                <RadioGroup containerStyle={styles.radioGroup} labelStyle={[commonStyles.text, styles.radioElement]}
                            radioButtons={levelSelectorButtons} onPress={setSelectedLevel}
                            selectedId={selectedLevel}/>
                <Text style={[commonStyles.text, styles.sectionTitle]}>{strings.selectDuration}</Text>
                <RadioGroup containerStyle={styles.radioGroup} labelStyle={[commonStyles.text, styles.radioElement]}
                            radioButtons={gameDurationSelectorButtons} onPress={setSelectedDuration}
                            selectedId={selectedDuration}/>
                <View style={commonStyles.vertical}>
                    <TouchableOpacity style={[commonStyles.bigButton, {borderColor: colors.accent}]}
                                      onPress={() => handleCancelPress()}>
                        <Text style={commonStyles.text}>{strings.letsGo}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[commonStyles.bigButton, {borderColor: colors.error}]}
                                      onPress={() => handleCancelPress()}>
                        <Text style={commonStyles.text}>{strings.cancel}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <Layout>
            <View style={commonStyles.vertical}>
                <Text style={commonStyles.title}>{strings.startGame}</Text>
                {gameConfigurationForm}
            </View>
        </Layout>
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
    checkBox: {
        width: "80%",
    },
    radioGroup: {
        display: "flex",
        flexDirection: "row",
    },
    radioElement: {
        flex: 1,
        color: colors.secondary,
    },
});

export default StartGame;