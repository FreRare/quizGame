import React from 'react';
import {Animated, StyleSheet} from "react-native";
import Text = Animated.Text;
import Layout from "@/app/components/global/layout";
import commonStyles from "@/app/utils/CommonStyles";
import BigMenuButton from "@/app/components/global/BigMenuButton";
import colors from "@/assets/colors";
import strings from "@/assets/strings";

type HomeProps = {
    navigation: any
};

const Home = (props: HomeProps)=> {
    return (
        <Layout>
            <Text style={styles.title}>Quiz Game</Text>
            <BigMenuButton title={"Quick play"} content={"Start a game to test your knowledge"} extensionText={"You can select topics and difficulty later on, but no records will be made"} bgColor={"#FFFFFF"}
                           fontColor={"#45B6FE"} redirectPage={strings.PAGES.startGame} navigation={props.navigation}/>
            <Text style={styles.separatorText}>OR</Text>
            <BigMenuButton title={"Log in"} content={"Start by logging"}
                           extensionText={"After you'll be able to see all your scores and even more"}
                           bgColor={"#FFFFFF"} fontColor={"#45B6FE"} redirectPage={strings.PAGES.auth} navigation={props.navigation}/>
        </Layout>
    );
}

const styles = StyleSheet.create({
    separatorText: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors.blue,
        marginVertical: 15,
    },
    title:{
        width: "100%",
        fontSize: 30,
        color: colors.blue,
        fontWeight: "bold",
        borderBottomWidth: 2,
        borderColor: colors.blue,
        paddingHorizontal: 50,
        marginBottom: 20,
    }
});

export default Home;