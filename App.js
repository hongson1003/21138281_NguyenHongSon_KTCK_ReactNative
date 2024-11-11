import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import HomeScreen from "./components/homeScreen";
import ManageScreen from "./components/manageScreen";
import store from "./redux/store";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Danh sách xe đạp" }}
          />
          <Stack.Screen
            name="AddBike"
            component={ManageScreen}
            options={{ title: "Thêm xe đạp mới" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
