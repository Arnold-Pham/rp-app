import React, { useState } from "react";
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import ReservationSummaryScreen from "./ReservationSummaryScreen";

const ReservationCodeScreen = () => {
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [reservationDetails, setReservationDetails] = useState(null);
    const [showSummary, setShowSummary] = useState(false);

    const handlePress = () => {
        setLoading(true);
        setError("");
        if (code.length === 16) {
            fetch(`https://creativitez.fr/api/reservation/${code}`)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else if (
                        response.status === 403 ||
                        response.status === 404
                    ) {
                        throw new Error("Code Invalide");
                    } else {
                        throw new Error(
                            "Une erreur innatendu s'est produite, veuillez réessayer plus tard"
                        );
                    }
                })
                .then((data) => {
                    setReservationDetails(data.reservation);
                    setError("");
                    setShowSummary(true);
                })
                .catch((error) => {
                    console.error(error);
                    setError(error.message);
                    setReservationDetails(null);
                });
        } else {
            setError("Code Invalide");
        }
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            {showSummary ? (
                <ReservationSummaryScreen
                    reservationDetails={reservationDetails}
                    onGoBack={() => setShowSummary(false)}
                />
            ) : (
                <>
                    <Text style={styles.title}>Réservation</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Code de Réservation"
                            value={code}
                            onChangeText={setCode}
                            autoCapitalize="characters"
                        />
                        {error ? (
                            <Text style={styles.errorText}>{error}</Text>
                        ) : null}
                        {loading && (
                            <ActivityIndicator size="large" color="#FFF" />
                        )}
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handlePress}
                        >
                            <Text style={styles.buttonText}>Chercher</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    );
};

export default ReservationCodeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#e8eff5",
    },
    title: {
        fontSize: 38,
        marginBottom: 20,
        textAlign: "center",
        color: "#000",
    },
    inputContainer: {
        backgroundColor: "#B3CADE",
        borderRadius: 10,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    input: {
        height: 50,
        borderColor: "#CCC",
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        fontSize: 16,
        backgroundColor: "#fff",
    },
    button: {
        backgroundColor: "#0267C1",
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    errorText: {
        marginBottom: 10,
        color: "red",
    },
});
