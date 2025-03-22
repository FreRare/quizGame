import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {NavigationContainer, NavigationIndependentTree} from "@react-navigation/native";
import NavigationScreens from "@/app/utils/NavigationScreens";

const Stack = createNativeStackNavigator();

export default function Navigation() {

    const linkingScreens = NavigationScreens.reduce((acc: { [key: string]: string }, nav) => {
        acc[nav.title] = nav.route;
        return acc;
    }, {});

    const routeLinking = {
        prefixes: ["https://localhost:8081"],
        config: {
            screens: linkingScreens
        }
    };

    const screens = NavigationScreens.map((nav, index) => {
        return (
            <Stack.Screen key={index} name={nav.title} component={nav.component as any} options={{
                headerShown: nav.showHeader,
                headerStyle: {
                    backgroundColor: "#DDDDDD",
                },
                headerShadowVisible: false,
                headerBackButtonMenuEnabled: true,
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