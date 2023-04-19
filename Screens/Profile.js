import { useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet , Text , View  , Image} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import userStore from "../Controller/UserController";
export default function Profile()
{   
    const route = useRoute();
    const user =  route.params?.user;

    return (

        <SafeAreaView style = {styles.container}>
        <Text>Welcome to Profile Screen {userStore.getState().currentUser.displayName }</Text>      
        
        {  <Image source={{ uri:userStore.getState().currentUserPicture }} style={{ width: 100, height: 100, borderRadius: 50 }} /> }

        <Text>{user}</Text>
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