  //#region HeaderFiles 

   import { StatusBar } from "expo-status-bar";
    import React from "react";
    import { StyleSheet , Text , View , TextInput, Button, TouchableOpacity , Image , Alert} from "react-native";
    import { PatchData, PushData } from "../Controller/DatabaseController";
    import * as firebaseAuth from 'firebase/auth'
    import { firebaseAppStore } from "../Controller/UserController";
    import CategoryTaskIcon from "../assets/CreateTask.png";
    import HomeIcon from "../assets/HomeIcon.jpg";
    import { useNavigation } from "@react-navigation/native";

//#endregion


  //Summary : Cateogry Create Page : Category contains Sub Tasks
  

export default function CategoryCreate()
{
    const[text , SetText] = React.useState('');
    const auth =  firebaseAuth.getAuth(firebaseAppStore.getState().currentApp);
    const navigate = useNavigation();


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
      Alert.alert("Category added")
      navigate.navigate("HomeScreen")
      

    }

//Moved to the SubTaksCreation Page
   

    return (
          <View style = {styles.container}>  
                  <TextInput style={styles.input}  onChangeText={SetText} value={text}
                  placeholder="Enter Category name here"  placeholderTextColor="#aaa"  keyboardType="default"
                  />
                  <TouchableOpacity onPress={() => 
                  {  
                  if(!text) return;      
                  endPoint =  text;          
                  AddCategoriesFireBase();
                   }}>
                  <View style={styles.button}>
                  <Text style={styles.buttonText}>Save</Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.footer}>
                </View>
                <StatusBar style="auto"/> 
          </View>
    );



}


const styles=   StyleSheet.create(
{
container:{

    flex:1 ,
    backgroundColor: "#D6E4E5",
    alignItems : 'center',
    justifyContent:'center',
}, 
footer: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: 'black',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  height:60,
  width:400


},
    input: {
    height: 100,
    fontSize: 20,
    fontWeight: '900',
    color: '#497174',
    bottom:100
  },
  button: {
    width: 120,
    height: 60,
    backgroundColor: '#497174',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '900',
    bottom: 100
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '900',
  },

});