import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity, Platform,
} from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";
import strings from "@/assets/strings";
import commonStyles from "@/app/utils/CommonStyles";
import colors from "@/assets/colors";
import DateTimePicker from '@react-native-community/datetimepicker';
import {AppState, useStore} from "@/app/models/GlobalState";

interface RegistrationFormProps {
    navigation: any;
    setIsLogin: (l: boolean) => void;
}

const RegistrationForm = (props: RegistrationFormProps) => {

    const [error, setError] = React.useState<string>("");
    const [username, setUsername] = React.useState<string>("");
    const [firstname, setFirstname] = React.useState<string>("");
    const [lastname, setLastname] = React.useState<string>("");
    const [dateOfBirth, setDateOfBirth] = React.useState<Date>(new Date());
    const [password, setPassword] = React.useState<string>("");
    const [passwordAgain, setPasswordAgain] = React.useState<string>("");
    const [showDatePicker, setShowDatePicker] = React.useState<boolean>(false);

    const db = useStore((state: AppState) => state.db);

    if (db === null) {
        console.error("Database is null!");
    }

    const formatDateForHTMLInputValue = (d: Date): string => {
        if(!d) return "";
        const pad = (num: number) => num.toString().padStart(2, "0");
        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`

    }

    const handleSignup = () => {
        console.log("Handling sign up");
    };

    return (
        <View style={styles.container}>
            <View style={styles.icon}>
                <Icon name="user-plus" size={60}/>
            </View>
            <Text style={[commonStyles.text, commonStyles.title]}>{strings.signup}</Text>
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
            {
                Platform.OS === "web" ? (<input
                    type="date"
                    value={formatDateForHTMLInputValue(dateOfBirth ?? new Date(0))}
                    onChange={(e) => {
                        console.log("Trying to parse: ", e.target.value);
                        const parsed = Date.parse(e.target.value);
                        console.log("Parsed: ", parsed)
                        console.log(`${dateOfBirth?.getFullYear()}-${dateOfBirth?.getMonth()}-${dateOfBirth?.getDate()}`)
                        setDateOfBirth(new Date(parsed));
                    }}
                    style={commonStyles.input}

                />) : (<View style={[commonStyles.horizontal, commonStyles.input]}>
                    <TouchableOpacity style={styles.datePickerInput} onPress={() => setShowDatePicker(true)}>
                        {`${dateOfBirth?.getFullYear()}/${dateOfBirth?.getMonth()}/${dateOfBirth?.getDate()}`}
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setShowDatePicker(true)}
                    >
                        <Icon name={"calendar"} size={20}/>
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            mode="date"
                            display="calendar"
                            value={dateOfBirth ?? new Date(0)}
                            onChange={(event, date) => {
                                setDateOfBirth(date ?? new Date(0));
                                setShowDatePicker(false);
                            }}
                        />
                    )}
                </View>)
            }
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
        backgroundColor: colors.secondary,
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
        color: colors.error,
        fontSize: 15,
        textAlign: "center",
    },
    datePickerInput: {
        display: "flex",
        flex: 1,
        alignContent: "flex-start",
        paddingHorizontal: 10
    }
});

export default RegistrationForm;