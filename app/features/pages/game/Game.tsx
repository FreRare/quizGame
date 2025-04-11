import React, {useEffect, useState} from 'react';
import StartGameForm from "@/app/features/pages/game/components/StartGameForm";
import {Text, View} from "react-native";
import Layout from "@/app/global/layout";
import {GameLength, HardnessLevel, Question, QuestionTopic} from "@/app/models/models";
import {AppState, useStore} from "@/app/models/GlobalState";

type GameProps = {
    navigation: any;
}

const Game = (props: GameProps) => {
    const [creatingGame, setCreatingGame] = useState(true);
    const [gameInProgress, setGameInProgress] = useState(false);
    const [questions, setQuestions] = useState<Question[]>([]);

    const db = useStore((s: AppState)=>s.db);

    useEffect(() => {
        if(!db){
            console.error("No database found!");
            return;
        }
        db.questions.find().exec().then((q)=>{
            if(q.length <= 0){
                console.error("No questions found!");
                return;
            }
            console.warn("Questions found!", q);
        })
    }, []);

    const handleGameStart = (t: QuestionTopic[], l: HardnessLevel, d: GameLength) => {

    }

    return (
        <Layout>
            {
                creatingGame &&
                (
                    <StartGameForm navigation={props.navigation} handleGameStart={handleGameStart}/>
                )
            }
            {gameInProgress && (<View><Text>Game started</Text></View>)}
        </Layout>
    );
};

export default Game;