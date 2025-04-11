import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import strings from "@/assets/strings";
import commonStyles from "@/app/utils/CommonStyles";
import colors from "@/assets/colors";
import Icon from "@expo/vector-icons/FontAwesome";
import {AppState, useStore} from "@/app/models/GlobalState";
import * as Crypto from "expo-crypto";
import {GamePlay, User} from "@/app/models/models";

interface LoginScreenProps {
    navigation: any;
    setIsLogin: (l: boolean) => void;
}

const LoginForm = (props: LoginScreenProps) => {

    const [error, setError] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const db = useStore((state: AppState) => state.db);
    const setUser = useStore((state: AppState) => state.setUser);

    const validateForm = (): boolean => {
        if (username.length <= 0 || password.length <= 0) {
            setError("Fields should be filled out");
            return false;
        }
        return true;
    }

    const handleLogin = async () => {
        if (!validateForm()) {
            return;
        }
        if (db === null) {
            console.error("Database is null!");
            setError("Database is null!");
            return;
        }
        const userForUsername = await db.users.find({
            selector: {
                username: {
                    $eq: username,
                }
            }
        }).exec();
        if (userForUsername.length < 0) {
            setError(strings.ERROR.invalidLogin);
        }
        const firstMatch = userForUsername[0];
        const hashedPass = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, password);
        if (hashedPass === firstMatch._data.password) {
            setError("");
            // Create active user
            const user: User = {
                id: firstMatch._data.id,
                username: firstMatch._data.username,
                firstName: firstMatch._data.firstName,
                lastName: firstMatch._data.lastName,
                password: firstMatch._data.password,
                isAdmin: firstMatch._data.isAdmin,
                dateOfBirth: new Date(firstMatch._data.dateOfBirth) || new Date(),
                registrationDate: new Date(firstMatch._data.registrationDate) || new Date(),
                games: [] // fetch games here
            }

            const userGamesResult = await db.games.find({
                selector: {
                    participant: {
                        $eq: user.id,
                    }
                }
            }).exec();
            let userGames = [];
            if (userGamesResult.length > 0) {
                // Create game objects
                for (const g of userGamesResult) {
                    const game: GamePlay = {
                        id: g._data.id as string,
                        participant: user,
                        length: g._data.length,
                        type: g._data.type,
                        topics: g._data.topics,
                        startTime: new Date(g._data.startTime),
                        duration: g._data.duration,
                        rounds: [],
                    }
                    userGames.push(game);
                }
            }
            user.games = userGames;
            setUser(user);
            props.navigation.navigate("/profile");
        } else {
            setError(strings.ERROR.invalidLogin);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.icon}>
                <Icon name="user" size={60}/>
            </View>
            <Text style={commonStyles.title}>
                {strings.login}
            </Text>
            {error && (
                <View>
                    <Text id="errorMsg" style={styles.errorMsg}>
                        {error}
                    </Text>
                </View>
            )}
            <TextInput
                placeholder={strings.usernameInputPlaceholder}
                style={commonStyles.input}
                value={username}
                onChangeText={(e) => setUsername(e)}
                autoCapitalize="none"
            ></TextInput>
            <TextInput
                placeholder={strings.passwordInputPlaceHolder}
                style={commonStyles.input}
                value={password}
                onChangeText={(t) => setPassword(t)}
                secureTextEntry={true}
                autoCapitalize="none"
            ></TextInput>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={commonStyles.button} onPress={handleLogin}>
                    <Text style={commonStyles.text}>{strings.login}</Text>
                </TouchableOpacity>
                <Text style={commonStyles.text}>{strings.or}</Text>
                <TouchableOpacity
                    style={commonStyles.button}
                    onPress={() => props.setIsLogin(false)}
                >
                    <Text style={commonStyles.text}>{strings.signup}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        position: "relative",
        borderRadius: 50,
        opacity: 1,
        width: "50%",
        backgroundColor: colors.secondary,
        borderColor: colors.textSecondary,
        borderWidth: 5,
        alignItems: "center",
        justifyContent: "flex-start",
        flex: 1,
        flexDirection: "column",
        marginTop: "10%",
        marginBottom: "10%",
    },
    icon: {
        marginBottom: 40,
        marginTop: 50,
        borderColor: colors.textPrimary,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 3,
        borderRadius: 50,
        padding: 10,
    },
    errorMsg: {
        color: colors.error,
        flex: 1.5,
        fontSize: 18,
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    }
});

export default LoginForm;