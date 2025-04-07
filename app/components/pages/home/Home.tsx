import React from 'react';
import {Animated, StyleSheet} from "react-native";
import Text = Animated.Text;
import Layout from "@/app/components/global/layout";
import colors from "@/assets/colors";
import strings from "@/assets/strings";

type HomeProps = {
    navigation: any
};

const Home = (props: HomeProps) => {
    return (
        <Layout>
            <Text style={styles.title}>Quiz Game</Text>
        </Layout>
    );
}

const styles = StyleSheet.create({
    separatorText: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors.primary,
        marginVertical: 15,
    },
    title: {
        width: "100%",
        fontSize: 30,
        color: colors.primary,
        fontWeight: "bold",
        borderBottomWidth: 2,
        borderColor: colors.primary,
        paddingHorizontal: 50,
        marginBottom: 20,
    }
});

export default Home;