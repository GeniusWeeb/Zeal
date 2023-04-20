import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet , Text , View , TextInput, Button, TouchableOpacity} from "react-native";
import { PatchData, PushData } from "../Controller/DatabaseController";
import * as firebaseAuth from 'firebase/auth'
import { firebaseAppStore } from "../Controller/UserController";

//CATEGORY CREATE PAGE

export default function CategoryCreate()
{
    const[text , SetText] = React.useState('');
    const auth =  firebaseAuth.getAuth(firebaseAppStore.getState().currentApp);
   


    async function AddCategoriesFireBase()
    {
        const idToken = await auth.currentUser.getIdToken;
        // set up the request headers, including the Firebase ID token in the Authorization header
        const headers = new Headers({
          "Authorization": `Bearer ${idToken}`,
          "Content-Type": "application/json"
        });

        const data = {   
          
            "names": ""
        }

        body = JSON.stringify(data);
    
      PatchData(body , headers , auth.currentUser , text);

    }

//Moved to the SubTaksCreation Page
   

    return (
      <View style = {styles.container}>  
       <TextInput style={styles.input}  onChangeText={SetText} value={text}
        placeholder="Enter text here"  placeholderTextColor="#aaa"  keyboardType="default"
      />
     <TouchableOpacity onPress={() => 
     {
        if(text)
            {
                endPoint =  text;
            }
        AddCategoriesFireBase();
     }}>
        <View style={styles.button}>
            <Text style={styles.buttonText}>Save</Text>
        </View>
    </TouchableOpacity>
   
        <StatusBar style="auto"/> 
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
    input: {
    height: 100,
    fontSize: 30,
    fontWeight: '900',
    color: '#333',
    bottom:100
  },
  button: {
    width: 120,
    height: 60,
    backgroundColor: '#988980',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '900',
    bottom: 100
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '900',
  },

});