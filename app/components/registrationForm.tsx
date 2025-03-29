import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
} from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";
import strings from "@/assets/strings";
import commonStyles from "@/app/utils/CommonStyles";
import colors from "@/assets/colors";

interface RegistrationFormProps {
    navigation: any;
    setIsLogin: (l: boolean) => void;
}

const RegistrationForm = (props: RegistrationFormProps) => {

    const [error, setError] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [firstname, setFirstname] = React.useState("");
    const [lastname, setLastname] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [passwordAgain, setPasswordAgain] = React.useState("");

    const handleSignup = ()=>{
        console.log("Handling sign up");
    };

    return (
        <View style={styles.container}>
            <View style={styles.icon}>
                <Icon name="user-plus" size={60}/>
            </View>
            {error && (
                <ScrollView contentContainerStyle={styles.errorContainer}>
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
                autoComplete="email"
            />
            <TextInput
                placeholder={strings.firstNameInputPlaceHolder}
                style={commonStyles.input}
                value={firstname}
                onChangeText={(e) => setFirstname(e)}
                autoCapitalize="words"
                autoComplete="given-name"
            />
            <TextInput
                placeholder={strings.lastNameInputPlaceHolder}
                style={commonStyles.input}
                value={lastname}
                onChangeText={(e) => setLastname(e)}
                autoCapitalize="words"
                autoComplete="family-name"
            />
            <TextInput
                placeholder={strings.passwordInputPlaceHolder}
                style={commonStyles.input}
                value={password}
                onChangeText={(t) => setPassword(t)}
                secureTextEntry={true}
                autoCapitalize="none"
            />
            <TextInput
                placeholder={strings.passwordAgainInputPlaceHolder}
                style={commonStyles.input}
                value={passwordAgain}
                onChangeText={(t) => setPasswordAgain(t)}
                secureTextEntry={true}
                autoCapitalize="none"
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={commonStyles.button} onPress={handleSignup}>
                    <Text>{strings.confirm}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={commonStyles.button}
                    onPress={() => props.setIsLogin(true)}
                >
                    <Text>{strings.cancel}</Text>
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
        width: "75%",
        backgroundColor: colors.formBackground,
        borderColor: colors.textSecondary,
        borderWidth: 5,
        alignItems: "center",
        justifyContent: "flex-start",
        flex: 1,
        flexDirection: "column",
        padding: 20,
        marginTop: "10%",
        marginBottom: "10%",
    },
    buttonContainer: {
        flex: 5,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        width: "75%",
    },
    icon: {
        marginBottom: 10,
        borderColor: colors.black,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 3,
        borderRadius: 50,
        padding: 15,
    },
    errorContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    errorMsg: {
        color: colors.errorColor,
        fontSize: 15,
        textAlign: "center",
    },
});

export default RegistrationForm;