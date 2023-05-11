//#region Header Files  
    import { useNavigation, useRoute } from "@react-navigation/native";
    import { StatusBar } from "expo-status-bar";
    import { StyleSheet , Text , View  , Image, Button, TouchableOpacity, Alert} from "react-native";
    import { SafeAreaView } from "react-native-safe-area-context";
    import userStore, { CategoryStore } from "../Controller/UserController";
    import * as firebaseAuth from 'firebase/auth'
    import { firebaseAppStore } from "../Controller/UserController";
    import logoutIcon from "../assets/logout.png"
    import blackBgIcon from "../assets/black-bg.png"

//#endregion
export default function Profile()
{   
    const route = useRoute();
    const navigation =  useNavigation();
    const auth =  firebaseAuth.getAuth(firebaseAppStore.getState().currentApp);
    const  isOnline = userStore.getState().isUserOnline;  

  //for sample offline state , we can try to go online ,
  //not sure if this is working or should be working since we dont have the response token at this stage
    function GoOnline()
    {
      userStore.getState().SetIsUserOnline(true);
    }

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
          userStore.persist.clearStorage();
          if(!userStore.getState().currentUser && auth.currentUser)
            {
            auth.signOut().then( () => {navigation.navigate("SignIn")});    
            }               
    }

    return (     

        <SafeAreaView style = {styles.container}>  
        { <Image source={{ uri:userStore.getState().currentUserPicture }} style={styles.profileImageStyle} /> }
        <Text style = {{top:235 ,color:"black" ,fontWeight:"bold",fontSize:17}} > {userStore.getState().currentUser.displayName} </Text>
        <Text style = {{top:234 ,color:"grey" ,fontWeight:"600",fontSize:16}} > {userStore.getState().currentUser.email} </Text>
        <Image source={blackBgIcon} style={{ width: 400, height: 700  , borderRadius: 30 ,top:300,}} />
        
        <TouchableOpacity  style = {{bottom:100}}  onPress={() => PerformSignOut()}>
        <Image source={logoutIcon} style={{ width: 60, height: 60 ,  }} />
        <Text style ={{fontWeight:"bold", top:1, color:"white"}}>Logout</Text>
        </TouchableOpacity>
        
        <StatusBar style="auto"/> 
        </SafeAreaView>
    );

}


const styles=   StyleSheet.create(
{
container:{

    flex:1 ,
    backgroundColor: "white",
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

profileImageStyle :{
  width: 170, 
  height: 170,
   borderRadius: 60 ,
   top:220,
  
  
}
});