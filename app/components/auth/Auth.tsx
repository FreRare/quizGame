import React from 'react';
import {Dimensions, StyleSheet, View} from "react-native";
import Layout from "@/app/components/global/layout";
import LoginForm from "@/app/components/auth/components/loginForm";
import RegistrationForm from "@/app/components/auth/components/registrationForm";

type AuthProps = {
    navigation: any;
};

function Auth(props: AuthProps) {

    const [isLogin, setIsLogin] = React.useState<boolean>(true); // Flag to show login or registration

    return (
        <Layout>
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
});

export default Auth;