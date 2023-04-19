import SignIn from "./Screens/SignIn";
import HomeScreen from "./Screens/HomeScreen";
import Profile from "./Screens/Profile";
import SubTaskCreate from "./Screens/SubTaskCreate";
import CategoryCreate from "./Screens/CategoryCreate";
import TaskView from "./Screens/TaskView";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
export default function App()
{

 
  return(
          <NavigationContainer>
              <Stack.Navigator>

              <Stack.Screen   
              name="SignIn"
              component={SignIn}
              options={
                {title: "Sign In",
              headerBackVisible: false}
             }         
              />

                <Stack.Screen   
              name="HomeScreen"
              component={HomeScreen}
              options={{title: "Welcome", headerBackVisible: false,animation :"fade",gestureEnabled:false}}
              />
                <Stack.Screen   
              name="Profile"
              component={Profile}
              options={{title: "Profile",animation :"slide_from_right",}}
              />
               <Stack.Screen   
              name="CategoryCreate"
              component={CategoryCreate}
              options={{title: "Create your Categories",animation :"slide_from_right"}}
              />
               <Stack.Screen   
              name="SubTaskCreate"
              component={SubTaskCreate}
              options={{title: "Create your SubPlans",animation :"slide_from_right",}}
              />
               <Stack.Screen   
              name="TaskView"
              component={Profile}
              options={{title: "Task it",animation :"slide_from_right",}}
              />


              </Stack.Navigator>
        
          </NavigationContainer>

  );
}