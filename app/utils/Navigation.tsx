import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {NavigationContainer, NavigationIndependentTree} from "@react-navigation/native";
import NavigationScreens from "@/app/utils/NavigationScreens";

const Stack = createNativeStackNavigator();

export default function Navigation() {

    const linkingScreens = NavigationScreens.reduce((acc: { [key: string]: string }, nav) => {
        acc[nav.route] = nav.route;
        return acc;
    }, {});

    const routeLinking = {
        prefixes: ["http://localhost", "https://localhost"],
        config: {
            screens: {
                ...linkingScreens,
                NotFound: "*",
            }
        }
    };

    const screens = NavigationScreens.map((nav, index) => {
        return (
            <Stack.Screen key={index} name={nav.route} component={nav.component as any} options={{
                title: nav.title,
                headerShown: nav.showHeader,
                headerStyle: {
                    backgroundColor: "#DDDDDD",
                },
                headerShadowVisible: false,
                headerBackButtonMenuEnabled: false,
                headerTitleStyle: {
                    color: ""
                },
            }}/>
        );
    });

    return (
        <NavigationIndependentTree>
            <NavigationContainer linking={routeLinking}>
                <Stack.Navigator>
                    {screens}
                </Stack.Navigator>
            </NavigationContainer>
        </NavigationIndependentTree>
    );
}