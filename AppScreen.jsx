import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import ReservationCodeScreen from "./screens/ReservationCodeScreen";
import ReservationSummaryScreen from "./screens/ReservationSummaryScreen";
import ErrorScreen from "./screens/ErrorScreen";

const Stack = createStackNavigator();

function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="ReservationCode">
                <Stack.Screen
                    name="ReservationCode"
                    component={ReservationCodeScreen}
                />
                <Stack.Screen
                    name="ReservationSummary"
                    component={ReservationSummaryScreen}
                />
                <Stack.Screen name="Error" component={ErrorScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;
