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
    import { AnimatedCircularProgress } from 'react-native-circular-progress';

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
        <Text style = {{top:235 ,color:"#146C94" ,fontWeight:"bold",fontSize:17}} > {userStore.getState().currentUser.displayName} </Text>
        <Text style = {{top:234 ,color:"#19A7CE" ,fontWeight:"600",fontSize:16}} > {userStore.getState().currentUser.email} </Text>
        <Image source={blackBgIcon} style={{ width: 400, height: 700  , borderRadius: 30 ,top:300,}} />     
        <View style ={styles.progressView}>
          <AnimatedCircularProgress
            size={70}
            width={2}
            //1 * the item completed count
            fill={1.2 * userStore.getState().userTaskCreated + 5}
            tintColor="#00e0ff"
            onAnimationComplete={() => console.log('onAnimationComplete')}
            backgroundColor="#3d5875"         
          />
          <AnimatedCircularProgress
            size={70}
            width={2}
            fill={1.2 * userStore.getState().userTaskFinished + 5}
            tintColor="yellow"
            onAnimationComplete={() => console.log('onAnimationComplete')}
            backgroundColor="#3d5875"       
          /> 
           <AnimatedCircularProgress
          size={70}
          width={2}
          fill={1.2 * userStore.getState().userTaskDeleted + 5}
          tintColor="red"
          onAnimationComplete={() => console.log('onAnimationComplete')}
          backgroundColor="#3d5875"       
        />                       
          </View>
        <View style = {styles.TaskString}>  
        <Text style = {{color:"white"}}>Task Created</Text>
        <Text style = {{color:"white"}}>Task Fnished</Text>  
        <Text style = {{color:"white"}}>Task Deleted</Text>
        </View>
        <View style = {styles.TaskCount}>
        <Text style = {{color:"white" , fontSize:20, fontWeight:"bold" , left:75 }}>{userStore.getState().userTaskCreated}</Text>
        <Text style = {{color:"white", fontSize:20, fontWeight:"bold" ,left: 177}}>{userStore.getState().userTaskFinished}</Text>  
        <Text style = {{color:"white", fontSize:20, fontWeight:"bold" ,left:273}}>{userStore.getState().userTaskDeleted}</Text>
        </View>
        <TouchableOpacity  style = {{bottom:150}}  onPress={() => PerformSignOut()}>
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
    backgroundColor: "#F2E3DB",
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
  
},
progressView :{
  position: "absolute",
 flexDirection:"row",
  //alignItems:"baseline",
  justifyContent:"space-evenly",
  bottom:140,
  marginBottom:0,
  flex:1,
  width:400,
  height:200, 
},
TaskString :{
  position: "absolute",
  flexDirection:"row",
   //alignItems:"baseline",
   justifyContent:"space-evenly",
   bottom:50,
   marginBottom:0,
   flex:1,
   width:400,
   height:200, 

},
TaskCount :{
  position: "absolute",
  flexDirection:"row",
    //alignItems:"baseline",
  
   bottom:115,
   marginBottom:0,
   flex:1,
   width:400,
   height:200, 
  

}
});