import { StatusBar } from "expo-status-bar";
import { StyleSheet , Text , View } from "react-native";
import { GETDATA, GetSubCategories } from "../Controller/DatabaseController";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import React from "react";

export default function TaskView()
{
    //THIS PAGE COMES WHEN YOU CLICK INDIVIDUAL CATEGORIES

    const route =  useRoute();
    const navigation = useNavigation();
    const name   =  route.params?.name;

    const { title } = route.params;

    React.useEffect(() => {
        navigation.setOptions({ title: title });
      }, [title]);
      
    function Get()
    {
        //Show tasks
        GetSubCategories(auth.currentUser,name);
      
    }

    return (

        <View style = {styles.container}>
        {/* <Get/> */}
        <Text>Enjoy your tasks </Text>   
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
});