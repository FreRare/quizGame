import React from 'react';
import {ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import strings from "@/assets/strings";
import commonStyles from "@/app/utils/CommonStyles";
import {User} from "@/app/models/GlobalState";
import colors from "@/assets/colors";
import Icon from "@expo/vector-icons/FontAwesome";

interface LoginScreenProps {
    navigation: any;
    setIsLogin: (l: boolean) => void;
}

const LoginForm = (props: LoginScreenProps) => {

    const [error, setError] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleLogin = ()=>{
        console.log("Handling login submission");
    };

    return (
        <View style={styles.container}>
            <View style={styles.icon}>
                <Icon name="user" size={60} />
            </View>
            <Text style={commonStyles.title}>
                {strings.login}
            </Text>
            {error && (
                <ScrollView>
                    <Text id="errorMsg" style={styles.errorMsg}>
                        {error}
                    </Text>
                </ScrollView>
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
                    <Text>{strings.login}</Text>
                </TouchableOpacity>
                <Text>{strings.or}</Text>
                <TouchableOpacity
                    style={commonStyles.button}
                    onPress={() => props.setIsLogin(false)}
                >
                    <Text>{strings.signup}</Text>
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
        backgroundColor: colors.formBackground,
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
        borderColor: colors.black,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 3,
        borderRadius: 50,
        padding: 10,
    },
    errorMsg: {
        color: colors.error,
        flex: 1.5,
        fontSize: 15,
    },
    buttonContainer:{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    }
});

export default LoginForm;