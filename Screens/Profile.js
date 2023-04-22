import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet , Text , View  , Image, Button, TouchableOpacity, Alert} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import userStore, { CategoryStore } from "../Controller/UserController";
import * as firebaseAuth from 'firebase/auth'
import { firebaseAppStore } from "../Controller/UserController";


export default function Profile()
{   
    const route = useRoute();
    const navigation =  useNavigation();
    const auth =  firebaseAuth.getAuth(firebaseAppStore.getState().currentApp);
    const  isOnline = userStore.getState().isUserOnline;  

    function PerformSignOut()
    {
      if(!isOnline) 
      {
        Alert.alert("You need to be online to sign out")
        return;
      }
     userStore.getState().RemoveUser();
     CategoryStore.getState().setCategories([]);
     CategoryStore.persist.clearStorage();
     if(!userStore.getState().currentUser && auth.currentUser)
      {
      auth.signOut().then( () => {navigation.navigate("SignIn")});    
      }               
    }

    return (
      
        <SafeAreaView style = {styles.container}>  
        {  <Image source={{ uri:userStore.getState().currentUserPicture }} style={{ width: 200, height: 200, borderRadius: 100 , bottom:50}} /> }

        <TouchableOpacity  onPress={() => PerformSignOut()}>
        <View style={styles.button}>
            <Text style={styles.buttonText}>Sign Out</Text>
        </View>
        <View style={[ { marginTop: 10 }]}>
        </View>
        </TouchableOpacity>     
    

     
        <StatusBar style="auto"/> 
        </SafeAreaView>
    );

}


const styles=   StyleSheet.create(
{
container:{

    flex:1 ,
    backgroundColor: "#4F4557",
    alignItems : 'center',
    justifyContent:'center',
},

font: {
  fontWeight: "900",
  bottom:50, 
  fontSize:25,
  color:"#F4EEE0",
  // width:500,
  justifyContent:"flex-end",
 
}, button: {
  width: 200,
  height: 60,
  backgroundColor: '#E86A33',
  borderRadius: 50,
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: '900',
  bottom: -100,
  padding:30
 

},
buttonText: {
  color: '#fff',
  fontSize: 25,
  fontWeight: '900',
  bottom:-10,
  height:50
},
});