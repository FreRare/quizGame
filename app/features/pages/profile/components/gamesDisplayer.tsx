import React from 'react';
import {View, Text, TouchableOpacity, ScrollView, StyleSheet} from "react-native";
import {GamePlay} from "@/app/models/models";
import strings from "@/assets/strings";
import commonStyles from "@/app/utils/CommonStyles";
import colors from "@/assets/colors";
import Icon from "@expo/vector-icons/FontAwesome";
import GameCard from "@/app/features/pages/profile/components/gameCard";

type GameDisplayerProps = {
    navigation: any,
    games: GamePlay[];
    username: string;
    cancelViewCB: () => void;
};

const GamesDisplayer = (props: GameDisplayerProps) => {


    const displayableGames = props.games.sort((g1, g2) => g2.startTime.getTime() - g1.startTime.getTime()).map((g, i) =>
        <GameCard navigation={props.navigation} index={i} game={g}/>);


    return (
        <View style={commonStyles.vertical}>
            <Text style={commonStyles.title}>{strings.myGames}</Text>
            {
                props.games.length <= 0 ?
                    (
                        <Text style={[commonStyles.text, {color: colors.error}]}>{strings.noGamesFound}</Text>
                    ) : (
                        <ScrollView contentContainerStyle={styles.scrollContent} style={styles.scrollContainer}>
                            {displayableGames}
                        </ScrollView>
                    )
            }
            <TouchableOpacity style={commonStyles.bigButton} onPress={() => props.cancelViewCB()}>
                <Text style={commonStyles.text}>{strings.goBack}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {

    },
    scrollContent: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    gameCard: {
        width: "90%",
        display: "flex",
        padding: 10,
        margin: 5,
        borderWidth: 3,
        borderColor: colors.secondary,
        borderRadius: 20,
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

export default GamesDisplayer;