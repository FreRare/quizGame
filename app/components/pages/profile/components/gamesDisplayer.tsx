import React from 'react';
import {View, Text, TouchableOpacity} from "react-native";
import {GamePlay} from "@/app/models/models";
import strings from "@/assets/strings";
import commonStyles from "@/app/utils/CommonStyles";
import colors from "@/assets/colors";

type GameDisplayerProps = {
    games: GamePlay[];
    username: string;
    cancelViewCB: () => void;
};

const GamesDisplayer = (props: GameDisplayerProps) => {

    const displayableGames = props.games.map((g, i) => {
        return (
            <View style={commonStyles.vertical}>
                <View style={commonStyles.horizontal}>
                    <Text style={commonStyles.text}>{i}</Text>
                </View>
                <View style={commonStyles.horizontal}>

                </View>
            </View>
        );
    });


    return (
        <View style={commonStyles.vertical}>
            <Text style={commonStyles.title}>{strings.myGames}</Text>
            {
                props.games.length <= 0 &&
                (
                    <Text style={[commonStyles.text, {color: colors.error}]}>{strings.noGamesFound}</Text>
                )
            }
            <TouchableOpacity style={commonStyles.bigButton} onPress={() => props.cancelViewCB()}>
                <Text style={commonStyles.text}>{strings.goBack}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default GamesDisplayer;