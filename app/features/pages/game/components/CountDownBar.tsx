import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View} from "react-native";
import * as Progress from "react-native-progress";
import commonStyles from "@/app/utils/CommonStyles";
import colors from "@/assets/colors";
import strings from "@/assets/strings";

type CountdownBarProps = {
    timesUpCB: () => void;
    timeout: number;
    isTimeout: boolean;
    shouldRun: boolean;
    answerTimeUpdateCB: (t: number) => void;
}

const CountDownBar = (props: CountdownBarProps) => {

    const [progress, setProgress] = useState<number>(1.0);
    const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);
    if (!props.shouldRun) {
        if (countdownIntervalRef.current) {
            clearInterval(countdownIntervalRef.current);
            countdownIntervalRef.current = null;
        }
    }
    useEffect(() => {

        // Start the countdown
        countdownIntervalRef.current = setInterval(() => {
            setProgress(prevProgress => {
                const newProgress = prevProgress - (0.1 / props.timeout);
                props.answerTimeUpdateCB(Math.round((props.timeout - Math.round(newProgress * 1000) / 100) * 100) / 100);

                if (newProgress <= 0) {
                    clearInterval(countdownIntervalRef.current as NodeJS.Timeout);
                    props.timesUpCB();
                    return 0;
                }

                return newProgress;
            });
        }, (1 / props.timeout) * 1000);

        return () => {
            if (countdownIntervalRef.current) {
                clearInterval(countdownIntervalRef.current);
                countdownIntervalRef.current = null;
            }
        };
    }, []);

    return (
        <View style={styles.container}>
            {
                props.isTimeout ?
                    (
                        <View>
                            <Text style={[commonStyles.title2, {color: colors.error}]}>{strings.timesUp}</Text>
                        </View>
                    ) :
                    <View style={commonStyles.vertical}>
                        <Progress.Bar progress={progress} width={500}/>
                        <Text
                            style={commonStyles.text}>{Math.round((props.timeout - (progress * props.timeout)) * 100) / 100}s</Text>
                    </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        flex: 0.2,
        alignContent: "center",
        justifyContent: "center",
    }
});

export default CountDownBar;