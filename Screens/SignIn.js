import { firebaseAppStore } from '../Controller/UserController';
import { StatusBar } from 'expo-status-bar';
import * as WebBrowser from 'expo-web-browser'
import { StyleSheet, Text, SafeAreaView, useColorScheme, Alert, Button, Image, TouchableOpacity, ScrollView , ImageBackground} from 'react-native';
import * as Google from 'expo-auth-session/providers/google'
import * as React from 'react';
import * as firebaseApp from 'firebase/app'
import * as firebaseAuth from 'firebase/auth'
import { ResponseType } from 'expo-auth-session';
import { ScreenStack } from 'react-native-screens';
import { NavigationContext, useNavigation } from '@react-navigation/native';
import {  firebaseConfig, PatchData } from '../Controller/DatabaseController';
import userStore,{ useAssignUserController, useUserController } from '../Controller/UserController';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStore } from 'zustand';
import googleIcon from "../assets/google.png"
import offlineIcon from "../assets/Offline.png"
import * as Notifications from 'expo-notifications';

WebBrowser.maybeCompleteAuthSession();

if (!firebaseApp.getApps().length) {
  console.log("Added firebase")
  firebaseAppStore.getState().AssignApp(  firebaseApp.initializeApp(firebaseConfig, "Zeal")); 
}

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//   }),
// });
export default function SignIn() {

    const navigation = useNavigation(); 
    const app = firebaseAppStore.getState().currentApp;
    var auth =  firebaseAuth.getAuth(firebaseAppStore.getState().currentApp);
    const [accessToken, setAccessToken] = React.useState(null);
    const [notification ,SetNotification] =  React.useState(false)
    const notificationListener = React.useRef();
    const responseListener = React.useRef();
    var credential ; 
    const[user ,SetFinalUser] = React.useState(null);
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId :"381324936027-h9b9kblph89k8p70ef2vr4uijs22h0a9.apps.googleusercontent.com",
        iosClientId : "381324936027-bjbcdlp87kshmgntcf56bco0ltdfe13f.apps.googleusercontent.com",
        androidClientId : "381324936027-mnoj4t98j0elf7g7totb9bkjflv76om3.apps.googleusercontent.com"     
      });

      React.useEffect(()=>{
          console.log("App has been assigned");
      },[firebaseAppStore.getState().currentApp] )

      React.useEffect(() => {  
        if (response?.type === "success") { 
          setAccessToken(response.authentication.accessToken);
          const idToken = response.authentication;
          credential = firebaseAuth.GoogleAuthProvider.credential(idToken.idToken);
        }
        accessToken && FetchUserInfo() && SignInGoogle();
      }, [response, accessToken]);


      React.useEffect(() => {
        console.log(userStore.getState().isUserSignedIn)
        // Check if user is already signed in
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user || userStore.getState().isUserSignedIn) {
            SetFinalUser(userStore.getState().currentUser);
            navigation.navigate("HomeScreen");
          } else {
            // User is signed out
            console.log('User is not signed in.');
          }
        });
        // Unsubscribe when component is unmounted
        return () => unsubscribe();
      }, []);

      React.useEffect(()=>{
        console.log("Trying Silent Sign in")
      },[userStore.getState().currentUserCredential] )

  
     
    async function SignInGoogle()
      {              
        
        try{ 
              await firebaseAuth.signInWithCredential(auth , credential ).then((result) => {
              const user =  result.user;
             if(user)
             {
                userStore.getState().SetIsUserOnline(true);
       
                userStore.getState().assignUser(user,firebaseAppStore.getState().currentApp , credential);            
                SetFinalUser(userStore.getState().currentUser);
                           
              }}).catch
                {console.log(e)}
                  
          }
          catch(error)
          {
            console.log(error)
          }
        
      }

    async function FetchUserInfo()
    {

      let response = await fetch("https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${accessToken}` }    
        });  
      const userInfo = await response.json();
      userStore.getState().assignUserPicture(userInfo.picture);    
    }

    function SetOfflineState()
    { 
      if(!userStore.getState().isUserSignedIn)
      {
        Alert.alert("please Sign in");
        return;
      }

      userStore.getState().SetIsUserOnline(false);
      console.log(userStore.getState().isUserOnline);
     navigation.navigate("HomeScreen");    
    }

    async function GetStorageSize() {
      let totalSize = 0;
      const allKeys = await AsyncStorage.getAllKeys();
      for (let key of allKeys) {
        const value = await AsyncStorage.getItem(key);
        totalSize += key.length + value.length;
      }
      console.log(`Current AsyncStorage size: ${totalSize} bytes`);
    }


  return (
    <ImageBackground source={require('../assets/splash.jpg')} style={styles.backgroundImage} > 
     <TouchableOpacity onPress={() => promptAsync()}>
      <Image source={googleIcon} style={{ width: 150, height: 150, left: 40, top:184 }} />
    </TouchableOpacity>
      <TouchableOpacity onPress={() => SetOfflineState()}>
      <Image source={offlineIcon} style={{ width: 75, height: 75, right: 50 , top:70 }} />
    </TouchableOpacity>
      {/* <Button title = "Storage access" onPress={()=> GetStorageSize()}/> */}
      <StatusBar style="dark" />
      {/* <SafeAreaView style={styles.container}>  
   
   
    </SafeAreaView> */}
    </ImageBackground>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4F4557',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "center",
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor:'rgba(0, 0, 0,10)',
    
    
}


});
