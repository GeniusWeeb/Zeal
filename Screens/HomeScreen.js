import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet , Text , View , Image , TouchableOpacity, ScrollView} from "react-native";
import userStore from "../Controller/UserController";
import { GetCategories, PatchData } from "../Controller/DatabaseController";
import * as firebaseAuth from 'firebase/auth'
import { firebaseAppStore } from "../Controller/UserController";
import { CategoryStore } from "../Controller/UserController";
import React from "react";
export default function HomeScreen()

{   

    const route =  useRoute();
    const navigation = useNavigation();
    const user   =  route.params?.user;
    const auth =  firebaseAuth.getAuth(firebaseAppStore.getState().currentApp);
  
    function Get() {
      let contAr = [];
      GetCategories(auth.currentUser).then((result) => {
        for (let prop in result) {
          contAr.push(`${prop}`)
        }
        CategoryStore.getState().setCategories(contAr);
        CategoryStore.getState().categories.map((item , index) => {
          console.log(item)
        })
      })
    }


  return (    
    
    <View style = {styles.container}>
    <Get/> 
  {/* <Button title="Profile" onPress={()=> navigation.navigate("Profile" , user)}/> */}
        
    <StatusBar style="auto"/> 
    <View style = {styles.buttonContainer}>
       <Button title="Create Task" onPress={() => navigation.navigate("CategoryCreate")}/> 
     </View>
    <View style={styles.footer}>
        <Text>Footer content goes here</Text>
            <View style= {styles.footerButtons}>
                <Button title="Buton1"/>
                <Button title="Buton2"/>
                <Button title = "Button3"/>
            </View>
        </View>
   <Text></Text> 
    </View>
);


}


const styles=   StyleSheet.create(
{
container:{

    flex:1 ,
    backgroundColor: "#aff",
    alignItems : 'center',
    justifyContent:'space-evenly',
},

buttonContainer: {
    paddingBottom:0,
    position: 'absolute',
    bottom: 80,
    width: '100%',
    padding: 0,
    

},
footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#DDD2DD',
    alignItems: 'center',
    justifyContent: 'center',
    height:75,
    
  },
  footerButtons: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-around',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    height: 80,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  ScrollView : {
    flex:1


  }
});