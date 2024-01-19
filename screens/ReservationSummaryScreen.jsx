import React, { useEffect, useState, useMemo } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
} from "react-native";
import moment from "moment-timezone";

const ReservationSummaryScreen = ({ reservationDetails, onGoBack }) => {
    const [op0, setOp0] = useState(false);
    const [op1, setOp1] = useState(false);
    const [op2, setOp2] = useState(false);
    const [op3, setOp3] = useState(false);

    const {
        firstName,
        flightA,
        dateA,
        flightB,
        dateB,
        valet,
        parking,
        place,
        status,
    } = reservationDetails;

    const date1 = useMemo(
        () => moment.tz(dateA.date, dateA.timezone).format("DD/MM/YYYY HH:mm"),
        [dateA]
    );
    const date2 = useMemo(
        () => moment.tz(dateB.date, dateB.timezone).format("DD/MM/YYYY HH:mm"),
        [dateB]
    );

    useEffect(() => {
        if (valet === 1 || valet === 2 || valet === 4) setOp0(true);
        if (valet & 1) setOp1(true);
        if (valet & 2) setOp2(true);
        if (valet & 4) setOp3(true);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Récapitulatif</Text>
            <Text style={styles.greeting}>Bonjour {firstName}.</Text>
            <Text style={styles.txt}>
                Voici le récapitulatif de votre réservation chez RoissyParks.
                Pour toute correction ou tout changement, merci de bien vouloir
                contacter le service client.
            </Text>
            <ImageBackground
                source={require("../assets/kb2pVzs.webp")}
                style={styles.bulle}
            >
                <View style={styles.section}>
                    {valet ? (
                        <>
                            <Text style={styles.sectionHeader}>Option:</Text>
                            {valet === 0 ? (
                                <Text style={styles.option}>
                                    Vous avez choisi l'option voiturier sans
                                    services suplémentaires.
                                </Text>
                            ) : op0 ? (
                                <Text style={styles.option}>
                                    Vous avez choisi l'option voiturier avec le
                                    service suivant:
                                </Text>
                            ) : (
                                <Text style={styles.option}>
                                    Vous avez choisi l'option voiturier avec les
                                    services suivants:
                                </Text>
                            )}
                            {op1 && (
                                <Text style={styles.option}>
                                    • Nettoyage Intérieur
                                </Text>
                            )}
                            {op2 && (
                                <Text style={styles.option}>
                                    • Nettoyage Extérieur
                                </Text>
                            )}
                            {op3 && (
                                <Text style={styles.option}>
                                    • Plein d'Essence
                                </Text>
                            )}
                        </>
                    ) : (
                        <>
                            <Text style={styles.sectionHeader}>Parking:</Text>
                            <Text style={styles.option}>
                                Parking: {parking}
                            </Text>
                            <Text style={styles.option}>Place: {place}</Text>
                        </>
                    )}
                </View>
                <View style={styles.hr}></View>
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>
                        Status de la réservation:
                    </Text>
                    {status === "Awaiting" && (
                        <Text style={styles.wait}>En attente</Text>
                    )}
                    {status === "Canceled" && (
                        <Text style={styles.canc}>Annulée</Text>
                    )}
                    {status === "Done" && (
                        <Text style={styles.done}>Finie</Text>
                    )}
                </View>
                <View style={styles.hr}></View>
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Aller:</Text>
                    <Text style={styles.option}>N° de vol: {flightA}</Text>
                    <Text style={styles.option}>Date: {date1}</Text>
                </View>
                <View style={styles.hr}></View>
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Retour:</Text>
                    <Text style={styles.option}>N° de vol: {flightB}</Text>
                    <Text style={styles.option}>Date: {date2}</Text>
                </View>
            </ImageBackground>
            <TouchableOpacity style={styles.button} onPress={onGoBack}>
                <Text style={styles.buttonText}>Retour</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ReservationSummaryScreen;

const styles = StyleSheet.create({
    title: {
        fontSize: 38,
        marginBottom: 20,
        textAlign: "center",
        color: "#000",
    },
    greeting: {
        fontSize: 19,
        marginBottom: 20,
        textAlign: "center",
    },
    txt: {
        fontSize: 19,
        marginBottom: 20,
    },
    hr: {
        height: 1,
        width: "75%",
        backgroundColor: "#DDD",
        marginVertical: 14,
        alignSelf: "center",
    },
    bulle: {
        textAlign: "center",
        borderColor: "#CCC",
        borderWidth: 1,
        paddingHorizontal: 15,
        paddingBottom: 10,
        paddingTop: 15,
        marginHorizontal: 10,
        marginBottom: 50,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    section: {
        marginBottom: 20,
    },
    sectionHeader: {
        fontSize: 25,
        textAlign: "center",
    },
    option: {
        fontSize: 18,
        textAlign: "center",
    },
    done: {
        backgroundColor: "#28a745",
        textAlign: "center",
    },
    wait: {
        backgroundColor: "#ffc107",
        textAlign: "center",
    },
    canc: {
        backgroundColor: "#dc3545",
        textAlign: "center",
        color: "#fff",
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
});
