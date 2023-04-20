import SignIn from "./Screens/SignIn";
import HomeScreen from "./Screens/HomeScreen";
import Profile from "./Screens/Profile";
import SubTaskCreate from "./Screens/SubTaskCreate";
import CategoryCreate from "./Screens/CategoryCreate";
import TaskView from "./Screens/TaskView";
import { Button, StyleSheet, Text } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {

  function ProfileButton() {
    const navigation = useNavigation(); // get navigation object
    return (
      <Button onPress={() => navigation.navigate("Profile")} title="Profile" />
    );
  }

  function Logo() {
    return (
      <Text style={styles.font}>ZEAL</Text>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ title: "Sign In", headerBackVisible: false }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title:"",
            headerBackVisible: false,
            headerBackTitleVisible:false,
            animation: "fade",
            gestureEnabled: false,
            headerStyle: { backgroundColor: "#41644A" },
            headerRight: () => <ProfileButton />,
            headerLeft: () => <Logo/>
          }}
        />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "",
          animation: "slide_from_right",
          headerStyle: { backgroundColor: "#41644A" },
         headerBackVisible:false,
        
        }}
      />
        <Stack.Screen
          name="CategoryCreate"
          component={CategoryCreate}
          options={{ title: "Create your Categories", animation: "fade" }}
        />
        <Stack.Screen
          name="SubTaskCreate"
          component={SubTaskCreate}
          options={{ title: "Create your SubPlans", animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="TaskView"
          component={TaskView}
          options={{ title: "Task it", animation: "slide_from_right" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  font: {
    fontWeight: "900"
  }
});
