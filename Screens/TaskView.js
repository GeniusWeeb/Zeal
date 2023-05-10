import { StatusBar } from "expo-status-bar";
import { StyleSheet , Text , View , ScrollView , TouchableOpacity } from "react-native";
import {  GetSubCategories } from "../Controller/DatabaseController";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import * as firebaseAuth from 'firebase/auth';
import { firebaseAppStore } from "../Controller/UserController";
import React from "react";
import { useState } from "react";
export default function TaskView()
{
    //THIS PAGE COMES WHEN YOU CLICK INDIVIDUAL CATEGORIES

    const route =  useRoute();
    const navigation = useNavigation();
    const { title } = route.params;
    const auth =  firebaseAuth.getAuth(firebaseAppStore.getState().currentApp);
    const[subTasks ,SetTaskData] = React.useState([]);

    React.useEffect(() => {
        navigation.setOptions({
          title: title,
          headerStyle: { backgroundColor: '#41644A' },
          headerTitleStyle: {
            fontWeight: "bold",
          },
        });
      }, [title]);
      
    
      React.useEffect(() => {
        const unsubscribe = navigation.addListener('state', (event) => {
          // Check if the current screen is HomeScreen
          if (event.data.state.routes[event.data.state.index].name === 'TaskView') {
            console.log("in the page")
            let subCategories = []
            // Fetch categories here
            GetSubCategories(auth.currentUser,title ).then((result) => {
              for (let prop in result) {
                    {
                     subCategories.push(`${prop}`)
                    }
              }   
              SetTaskData(subCategories);
            })
          }
        });
      
        return unsubscribe;
      }, [navigation]);
    

    return (

        <View style = {styles.container}>
          <View style={[ { marginTop: 10 }]}>
        </View>
     <ScrollView>
        {subTasks.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => {
        }}>
        <View style={styles.button}>
         <Text style={styles.buttonText}>{item}</Text>
        </View>
        <View style={[ { marginTop: 10 }]}>
        </View>
        </TouchableOpacity>     
      ))}
    </ScrollView>
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
button: {
    width: 300,
    height: 60,
    backgroundColor: '#E86A33',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '900',
    bottom: 0,
    padding:20
   

  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '900',
  },
});