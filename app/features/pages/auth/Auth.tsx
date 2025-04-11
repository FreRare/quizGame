import React, {useEffect} from 'react';
import {Dimensions, StyleSheet, View, Text} from "react-native";
import Layout from "@/app/global/layout";
import LoginForm from "@/app/features/pages/auth/components/loginForm";
import RegistrationForm from "@/app/features/pages/auth/components/registrationForm";
import strings from "@/assets/strings";
import commonStyles from "@/app/utils/CommonStyles";
import {AppState, useStore} from "@/app/models/GlobalState";

type AuthProps = {
    navigation: any;
};

function Auth(props: AuthProps) {

    const [isLogin, setIsLogin] = React.useState<boolean>(true); // Flag to show login or registration

    const initDb = useStore((state: AppState) => state.initDb);

    useEffect(() => {
        initDb().then(() => {
            console.log("Database ready");
        });
    }, []);

    return (
        <Layout>
            <View style={styles.titleContainer}>
                <Text style={commonStyles.title}>{strings.PROJECT_NAME}</Text>
            </View>
            <View style={styles.backgroundImage}>
                {isLogin && (
                    <LoginForm
                        navigation={props.navigation}
                        setIsLogin={setIsLogin}
                    />
                )}
                {!isLogin && (
                    <RegistrationForm navigation={props.navigation} setIsLogin={setIsLogin}/>
                )}
            </View>
        </Layout>
    );
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    backgroundImage: {
        position: "absolute",
        width: windowWidth,
        height: windowHeight,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    titleContainer: {
        display: "flex",
        margin: 10,
        padding: 10,
    },
});

export default Auth;