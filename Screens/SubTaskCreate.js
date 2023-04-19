import { StatusBar } from "expo-status-bar";
import { StyleSheet , Text , View } from "react-native";

export default function SubTaskCreate()
{

    //SELECT CATEGORY BY DROP DOWN AND THEN TAKE THIS

    //map this to button onpress
    async function AddSubTaskCategoriesToFireBase()
    {
       const text  = "Your_Category_name_from_DropDown"
        const idToken = await auth.currentUser.getIdToken;
        const subTaskName = "University Living event";  // sub plans name
        //text is -> Task Category
        // set up the request headers, including the Firebase ID token in the Authorization header
        const headers = new Headers({
          "Authorization": `Bearer ${idToken}`,
          "Content-Type": "application/json"
        });

        const data = {   

            "date" : "30thJune",
            "description" : "Various Miscal events"      
        }

       
        const body = JSON.stringify(data);
        //name is the linking key 
        const alterEndPoint = `${text}/names/${subTaskName}`;
        PatchData(body , headers , auth.currentUser , alterEndPoint);
    }

    return (

        <View style = {styles.container}>
        <Text> Create your plans now</Text>   
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