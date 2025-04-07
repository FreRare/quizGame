import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import colors from "@/assets/colors";
import {useLinkTo} from "@react-navigation/native";
import NavigationScreens from "@/app/utils/NavigationScreens";

type BigMenuButtonProps = {
    navigation: any,
    title: string,
    content?: string,
    extensionText?: string,
    bgColor?: string,
    fontColor?: string,
    redirectPage: string,
    children?: React.JSX.Element,
};


function BigMenuButton(props: BigMenuButtonProps) {

    /**
     * Redirect based on navigation route map title matching
     */
    const redirectToTargetPage = () => {
        const link = NavigationScreens.filter(s => s.title === props.redirectPage)[0];
        if (!link) {
            console.warn("Invalid link!");
            return;
        }
        props.navigation.navigate(props.redirectPage)
    };

    return (
        <TouchableOpacity style={[styles.container, {backgroundColor: props.bgColor}]}
                          onPress={redirectToTargetPage}>
            <Text style={[styles.title, {color: props.fontColor}]}>{props.title}</Text>
            <Text style={[styles.content, {color: props.fontColor}]}>{props.content}</Text>
            {props.extensionText &&
                <Text style={[styles.subContent, {color: props.fontColor}]}
                      lineBreakMode={"clip"}>{props.extensionText}</Text>}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        maxWidth: 200,
        margin: 5,
        padding: 15,
        borderRadius: 10,
        borderColor: colors.secondary,
        borderWidth: 3,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    content: {
        fontSize: 16,
        marginVertical: 10,
    },
    subContent: {
        fontSize: 13,
        marginVertical: 5,
    }
});

export default BigMenuButton;