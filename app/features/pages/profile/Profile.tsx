import React, {useEffect, useState} from 'react';
import Layout from "@/app/global/layout";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import {AppState, useStore} from "@/app/models/GlobalState";
import strings from "@/assets/strings";
import commonStyles from "@/app/utils/CommonStyles";
import colors from "@/assets/colors";
import GamesDisplayer from "@/app/features/pages/profile/components/gamesDisplayer";
import * as DocumentPicker from 'expo-document-picker';

type ProfileProps = {
    navigation: any;
}

const Profile = (props: ProfileProps) => {
    const user = useStore((state: AppState) => state.activeUser);
    const setUser = useStore((s: AppState) => s.setUser);
    const db = useStore((s: AppState) => s.db);
    const [showGames, setShowGames] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        if (!user) {
            console.warn("No user!");
            props.navigation.navigate('/');
        }
    }, []);

    const exportDatabase = async () => {
        setLoading(true);
        const dump = await db?.exportJSON();
        if (!dump) {
            setError("Error while exporting database to JSON!");
            return;
        }
        const blob = new Blob([JSON.stringify(dump)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        setLoading(false);
        a.href = url;
        a.download = 'rxdb-exported.json';
        a.click();
    };

    const importDatabase = async () => {
        const doc = await DocumentPicker.getDocumentAsync({type: ".json"});
        if (doc.canceled || !doc.output) {
            return;
        }
        console.log("Got file: ", doc.output[0].name);
        const contents = await doc.output[0].text();
        await db?.importJSON(JSON.parse(contents));
    };

    const startNewGame = () => {
        props.navigation.navigate("/start_game");
    };

    const logOut = () => {
        setUser(undefined);
        props.navigation.navigate("/");
    }

    const getYearDiff = (a: Date, b: Date): number => {
        return Math.abs(a.getFullYear() - b.getFullYear())
    }

    const adminInterface = (
        <View style={commonStyles.horizontal}>
            <TouchableOpacity style={commonStyles.bigButton}
                              onPress={() => exportDatabase()}>
                <Text style={commonStyles.text}>{strings.exportDatabase}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={commonStyles.bigButton}
                              onPress={() => importDatabase()}>
                <Text style={commonStyles.text}>{strings.importDatabase}</Text>
            </TouchableOpacity>
        </View>
    );

    const generalInterface = (
        <View style={commonStyles.vertical}>
            <View style={[commonStyles.vertical, {flex: 1}]}>
                <View>
                    <Text style={[commonStyles.text, styles.nameText]}>{user?.firstName} {user?.lastName}</Text>
                </View>
                <Text style={commonStyles.text}> aka. </Text>
                <Text style={[commonStyles.text, styles.usernameText]}>{user?.username}</Text>
                <Text style={[commonStyles.text]}>{strings.age}: {getYearDiff(new Date(), user!.dateOfBirth)}</Text>
                <Text style={commonStyles.text}>MAYBE leaderboard placement</Text>
            </View>
            <View style={commonStyles.vertical}>
                <TouchableOpacity style={commonStyles.bigButton} onPress={() => startNewGame()}>
                    <Text style={commonStyles.text}>{strings.startGame}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={commonStyles.bigButton} onPress={() => setShowGames(true)}>
                    <Text style={commonStyles.text}>{strings.myGames}: {user?.games.length}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[commonStyles.bigButton, {borderColor: colors.error, marginTop: 50}]}
                                  onPress={() => logOut()}>
                    <Text style={commonStyles.text}>{strings.logout}</Text>
                </TouchableOpacity>
            </View>
            {user?.isAdmin && adminInterface}
        </View>
    );

    return (
        <Layout>
            {error && (<Text style={[commonStyles.text, {color: colors.error}]}>{error}</Text>)}
            {
                showGames ?
                    (
                        <GamesDisplayer navigation={props.navigation} games={user!.games} username={user!.username}
                                        cancelViewCB={() => setShowGames(false)}/>
                    ) : generalInterface
            }
        </Layout>
    );
};

const styles = StyleSheet.create({
    nameText: {
        fontSize: 25,
        color: colors.primary
    },
    usernameText: {
        fontSize: 25,
        color: colors.primary
    }
});

export default Profile;