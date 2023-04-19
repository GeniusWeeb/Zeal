import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet , Text , View  , Image, Button} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import userStore from "../Controller/UserController";
import * as firebaseAuth from 'firebase/auth'
import { firebaseAppStore } from "../Controller/UserController";


export default function Profile()
{   
    const route = useRoute();
    const navigation =  useNavigation();
    const auth =  firebaseAuth.getAuth(firebaseAppStore.getState().currentApp);


    return (

        <SafeAreaView style = {styles.container}>
        <Text>Welcome to Profile Screen {userStore.getState().currentUser.displayName }</Text>      
        
        {<Image source={{ uri:userStore.getState().currentUserPicture }} style={{ width: 100, height: 100, borderRadius: 50 }} /> }
        <Button title="Sign out"
         onPress={()=> {
            auth.signOut().then(() => {
                auth.onAuthStateChanged((user) => {
                  if (!user) {
                    console.log("User is signed out");
                    // Clear the user's information from the application stat
                    userStore.getState().RemoveUser();
                    navigation.navigate("SignIn");
                  }
                });
              });
        }} />

        <Text>{userStore.getState().currentUser.displayName}</Text>
        <StatusBar style="auto"/> 
        </SafeAreaView>
    );

}


const styles=   StyleSheet.create(
{
container:{

    flex:1 ,
    backgroundColor: "#fff",
    alignItems : 'center',
    justifyContent:'center',
},
});