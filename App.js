import SignIn from "./Screens/SignIn";
import HomeScreen from "./Screens/HomeScreen";
import Profile from "./Screens/Profile";
import SubTaskCreate from "./Screens/SubTaskCreate";
import CategoryCreate from "./Screens/CategoryCreate";
import TaskView from "./Screens/TaskView";
import { Button, StyleSheet, Text , TouchableOpacity, Image } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import userStore from "./Controller/UserController";
import profileIcon from "./assets/profileIcon.png"

const Stack = createNativeStackNavigator();

export default function App() {

  function ProfileButton() {
    const navigation = useNavigation(); // get navigation object
    return (     
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
      <Image source={profileIcon} style={{ width: 35, height: 35, marginRight: 10 }} />
    </TouchableOpacity>
     
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
          options={{ title: "", headerBackVisible: false  , headerStyle :{ backgroundColor:"black"} , headerLeft: () => <Logo/>}}
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
            headerStyle: { backgroundColor: "black" },
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
          options={{ animation: "fade" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  font: {
    fontWeight: "900",
    color:"white",
    left:16
  }
});
