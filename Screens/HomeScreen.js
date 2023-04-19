import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet , Text , View } from "react-native";
import userStore from "../Controller/UserController";
import { PatchData } from "../Controller/DatabaseController";
export default function HomeScreen()
{   

    const route =  useRoute();
    const navigation = useNavigation();
    const user   =  route.params?.user;


   

    return (

        
        <View style = {styles.container}>
        <Text>Welcome to {userStore.getState().currentUser.displayName }</Text>  
        <Button title="Profile" onPress={()=> navigation.navigate("Profile" , user)}/>
        <StatusBar style="auto"/> 
       <Text></Text> 
        </View>
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