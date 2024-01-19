import React from "react";
import { View, Image, StyleSheet, ActivityIndicator } from "react-native";

export default function LoadingScreen() {
    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/logo_512.webp")}
                style={styles.logo}
            />
            <ActivityIndicator size="large" color="#0267C1" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e8eff5",
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        width: 300,
        height: 300,
        marginBottom: 50,
    },
});
