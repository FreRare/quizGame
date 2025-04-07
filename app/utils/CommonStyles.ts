import {Dimensions, StyleSheet} from "react-native";
import colors from "@/assets/colors";

const windowWidth = Dimensions.get("window").width;

const commonStyles = StyleSheet.create({
    title: {
        fontSize: 30,
        marginBottom: 10,
        color: colors.title,
        fontWeight: "bold",
    },
    title2: {
        fontSize: 25,
        marginBottom: 10,
        color: colors.secondary,
        fontWeight: "bold",
    },
    text: {
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: colors.textPrimary,
        fontSize: 20,
        margin: 5,
    },
    input: {
        flex: 1,
        opacity: 1,
        width: "80%",
        padding: 10,
        margin: "2%",
        backgroundColor: colors.background,
        maxHeight: 50,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: colors.primary,
        color: colors.textSecondary,
    },
    button: {
        borderColor: colors.background,
        borderWidth: 4,
        borderRadius: 50,
        backgroundColor: colors.secondary,
        alignItems: "center",
        justifyContent: "center",
        minWidth: "40%",
        maxWidth: "60%",
        padding: 10,
        margin: 10,

    },
    horizontal: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 2,
    },
    vertical: {
        flex: 1,
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 2,
    },
    bigButton: {
        display: "flex",
        minWidth: "40%",
        maxWidth: "90%",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 5,
        borderWidth: 3,
        borderRadius: 20,
        borderColor: colors.secondary,
        backgroundColor: colors.background,
    },
    formContainer: {
        flex: 1,
        width: "70%",
        alignItems: "center",
        justifyContent: "center",
        borderColor: colors.secondary,
        borderWidth: 3,
        borderRadius: 20,
        padding: 20,
        backgroundColor: colors.background,
    },
    scrollContainer: {
        width: windowWidth,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        marginTop: -25,
        flexGrow: 1,
        paddingBottom: 60,
    },
});

export default commonStyles;