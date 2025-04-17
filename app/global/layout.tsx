import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from "@/assets/colors";
import commonStyles from "@/app/utils/CommonStyles";
import strings from "@/assets/strings";

type LayoutProps = {
    children: any,
};

function Layout(props: LayoutProps) {
    return (
        <View style={styles.container}>
            <Text style={commonStyles.title}>{strings.PROJECT_NAME}</Text>
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
        paddingBottom: 30,
        backgroundColor: colors.background,
    }
});

export default Layout;
