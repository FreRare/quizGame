import React from 'react';
import {GamePlay} from "@/app/models/models";
import commonStyles from "@/app/utils/CommonStyles";
import {StyleSheet, Text, View} from "react-native";
import colors from "@/assets/colors";
import Icon from "@expo/vector-icons/FontAwesome";

type GameCardProps = {
    navigation: any,
    index: number,
    game: GamePlay,
}

const GameCard = (props: GameCardProps) => {

    const formatDate = (d: Date): string => {
        return `${d.getFullYear()}/${d.getMonth()}/${d.getDate()} ${d.getHours()}:${d.getMinutes()}`;
    }
    // console.log("Evaluating game: ", props.game);
    const fullGamePoints = props.game.rounds.reduce((sum, r) => sum + r.points, 0);
    const gameTopicsDisplay = props.game.topics.reduce((sum, t) => sum + t.toString() + " ", "");
    return (
        <View style={[commonStyles.horizontal, styles.gameCard]}>
            <Text style={[commonStyles.title2, {margin: 5}]}>{props.index}.</Text>
            <View style={[styles.cardContentContainer]}>
                <View style={[commonStyles.horizontal, styles.row, styles.header]}>
                    <Icon style={[styles.item]} name={"calendar"} size={30}/>
                    <Icon style={[styles.item]} name={"tachometer"} size={30}/>
                    <Icon style={[styles.item]} name={"compass"} size={30}/>
                </View>
                <View style={[commonStyles.horizontal, styles.row]}>
                    <Text style={[commonStyles.text, styles.item]}>{formatDate(props.game.startTime)}</Text>
                    <Text style={[commonStyles.text, styles.item]}>{props.game.duration}s</Text>
                    <Text
                        style={[commonStyles.text, styles.item]}>{fullGamePoints}/{props.game.rounds.length} ({Math.round((fullGamePoints / props.game.rounds.length) * 100)}%)</Text>
                </View>
                <View style={[commonStyles.horizontal, styles.row, styles.header]}>
                    <Icon style={[styles.item]} name={"comments"} size={30}/>
                    <Icon style={[styles.item]} name={"star"} size={30}/>
                    <Icon style={[styles.item]} name={"puzzle-piece"} size={30}/>
                </View>
                <View style={[commonStyles.horizontal, styles.row]}>
                    <Text style={[commonStyles.text, styles.item]}>{gameTopicsDisplay}</Text>
                    <Text style={[commonStyles.text, styles.item]}>{props.game.type.toString()}</Text>
                    <Text style={[commonStyles.text, styles.item]}>{props.game.length} ({props.game.rounds.length})</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    gameCard: {
        display: "flex",
        padding: 10,
        margin: 5,
        marginVertical: 20,
        borderWidth: 3,
        borderColor: colors.button,
        borderRadius: 20,
    },
    cardContentContainer: {
        display: "flex",
        flex: 3,
        margin: 10,
        padding: 5,
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
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default GameCard;