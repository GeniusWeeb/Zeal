import { firebaseAppStore } from '../Controller/UserController';
import { StatusBar } from 'expo-status-bar';
import * as WebBrowser from 'expo-web-browser'
import { StyleSheet, Text, SafeAreaView, useColorScheme, Alert, Button, Image, TouchableOpacity, ScrollView } from 'react-native';
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

WebBrowser.maybeCompleteAuthSession();

if (!firebaseApp.getApps().length) {
  console.log("Added firebase")
  firebaseAppStore.getState().AssignApp(  firebaseApp.initializeApp(firebaseConfig, "Zeal")); 
}


export default function SignIn() {

    const navigation = useNavigation(); 
    const app = firebaseAppStore.getState().currentApp;
    var auth =  firebaseAuth.getAuth(firebaseAppStore.getState().currentApp);
    const [accessToken, setAccessToken] = React.useState(null);
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
      if (response?.type === "success")
      { 
        setAccessToken(response.authentication.accessToken);
        const idToken =response.authentication;
        credential = firebaseAuth.GoogleAuthProvider.credential(idToken.idToken);
      //  SignInGoogle();
      } accessToken && FetchUserInfo() && SignInGoogle();
      }, 
      [response, accessToken]);



    React.useEffect(() => {   
         
     
        if(userStore.getState().isUserSignedIn )
        {
             console.log(` User online? -> ${userStore.getState().isUserOnline}`)      
            // If the user is already signed in, assign the Firebase app to the store again before logging in the user
            firebaseAppStore.getState().AssignApp(firebaseApp.initializeApp(firebaseConfig, "Zeal"));
            const app = firebaseAppStore.getState().currentApp;
            var auth = firebaseAuth.getAuth(firebaseAppStore.getState().currentApp);
            console.log(`USer Signed in ? -> ${userStore.getState().isUserSignedIn} `)
            console.log(firebaseApp.getApps().length);
            const user = userStore.getState().currentUser;
        // /    promptAsync();

            
        }
        
      }, [userStore.getState().isUserSignedIn]);
     
     
    async function SignInGoogle()
      {              
        
        try{ 
          console.log("trying to sign in")
              await firebaseAuth.signInWithCredential(auth , credential).then((result) => {
              const user =  result.user;
             if(user)
             {
                userStore.getState().SetIsUserOnline(true);
                userStore.getState().assignUser(user,firebaseAppStore.getState().currentApp);            
                SetFinalUser(userStore.getState().currentUser);
                navigation.navigate("HomeScreen");                    
              }}).catch(e)
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
    <SafeAreaView style={styles.container}>  
    {  < Button title=' Login' onPress={() => promptAsync()} />}
      <Button title = "Offline access" onPress={()=> SetOfflineState()}/>
      <Button title = "Storage access" onPress={()=> GetStorageSize()}/>

     
    <StatusBar style="dark" />
    </SafeAreaView>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4F4557',
    alignItems: 'center',
    justifyContent: 'center',
  },


});
