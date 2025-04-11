import React from "react";
import strings from "@/assets/strings";
import Home from "@/app/features/pages/home/Home";
import Auth from "@/app/features/pages/auth/Auth";
import Profile from "@/app/features/pages/profile/Profile";
import Statistics from "@/app/pages/Statistics";
import StartGameForm from "@/app/features/pages/game/components/StartGameForm";
import AskQuestion from "@/app/pages/AskQuestion";
import QuestionResult from "@/app/pages/QuestionResult";
import Settings from "@/app/pages/Settings";
import {ReParseNavigationRoute} from "@/app/hooks/navigationRouteGeneratorPipe";
import Game from "@/app/features/pages/game/Game";

/**
 * Property type
 * icon represents the icon name in the
 */
type NavigationScreenListPrimitive = {
    title: string,
    route: string,
    icon: string,
    component: (p: any) => React.JSX.Element,
    showHeader: boolean,
    menubar: boolean,
};


const NavigationScreens: NavigationScreenListPrimitive[] = [
    {
        title: strings.PAGES.auth,
        route: "/",
        icon: "log-in-outline",
        component: Auth,
        showHeader: false,
        menubar: false,
    },
    {
        title: strings.PAGES.home,
        route: ReParseNavigationRoute(strings.PAGES.home),
        icon: "home-outline",
        component: Home,
        showHeader: false,
        menubar: false,
    },
    {
        title: strings.PAGES.profile,
        route: ReParseNavigationRoute(strings.PAGES.profile),
        icon: "person-outline",
        component: Profile,
        showHeader: false,
        menubar: false,
    },
    {
        title: strings.PAGES.stats,
        route: ReParseNavigationRoute(strings.PAGES.stats),
        icon: "bar-chart-outline",
        component: Statistics,
        showHeader: false,
        menubar: false,
    },
    {
        title: strings.PAGES.startGame,
        route: ReParseNavigationRoute(strings.PAGES.startGame),
        icon: "play-outline",
        component: Game,
        showHeader: false,
        menubar: false,
    },
    {
        title: strings.PAGES.askQuestion,
        route: ReParseNavigationRoute(strings.PAGES.askQuestion),
        icon: "help-circle-outline",
        component: AskQuestion,
        showHeader: false,
        menubar: false,
    },
    {
        title: strings.PAGES.questionResult,
        route: ReParseNavigationRoute(strings.PAGES.questionResult),
        icon: "list-outline",
        component: QuestionResult,
        showHeader: true,
        menubar: false,
    },
    {
        title: strings.PAGES.settings,
        route: ReParseNavigationRoute(strings.PAGES.settings),
        icon: "settings-outline",
        component: Settings,
        showHeader: true,
        menubar: true,
    },
];


export default NavigationScreens;