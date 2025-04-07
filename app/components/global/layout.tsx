import React from 'react';
import {StyleSheet, View} from 'react-native';
import colors from "@/assets/colors";

type LayoutProps = {
    children: any,
};

function Layout(props: LayoutProps) {
    return (
        <View style={styles.container}>
            {props.children}
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: colors.background,
    }
});

export default Layout;
