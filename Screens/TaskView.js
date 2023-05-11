//#region  Header Files
    import { StatusBar } from "expo-status-bar";
    import { StyleSheet , Text , View , ScrollView , TouchableOpacity  ,Image} from "react-native";
    import {  DeleteSubTasks, GetSubCategories } from "../Controller/DatabaseController";
    import { useRoute } from "@react-navigation/native";
    import { useNavigation } from "@react-navigation/native";
    import * as firebaseAuth from 'firebase/auth';
    import { firebaseAppStore } from "../Controller/UserController";
    import React from "react";
    import { useState } from "react";
    import { Card } from "react-native-paper";
    import deleteIcon from "../assets/delete.png"
    import { Swipeable } from "react-native-gesture-handler";
    import CountDown from "react-native-countdown-component"
    import { scheduleNotificationAsync } from "expo-notifications";
    import { func } from "prop-types";
    import * as Notifications from 'expo-notifications';
    import { notificationThreshold } from "../Controller/UserController";
    import userStore from "../Controller/UserController";
 //#endregion   

export default function TaskView()
{
    //THIS PAGE COMES WHEN YOU CLICK INDIVIDUAL CATEGORIES
    
    const route =  useRoute();
    const navigation = useNavigation();
    const { title } = route.params;
    const auth =  firebaseAuth.getAuth(firebaseAppStore.getState().currentApp);
    const[subTasks ,SetTaskData] = React.useState([]);

    //Whenever this component mounts , we will clear any and all notifications that were schedules 
    // and reschedule the notifications
    //important use case or it creates bad clutter in the memory

    //We can use this useEffect as well , Just clear the notifications
  
    React.useEffect(() => {
        navigation.setOptions({
          title: title,
          headerStyle: { backgroundColor: '#7C96AB' },
          headerTitleStyle: {
            fontWeight: "900",
            fontSize:25,
           
          },
        });
      }, [title]);

      async function Cancel()
      {
        await Notifications.cancelAllScheduledNotificationsAsync().then((result) => {
        console.log("Cleaned notification")
        });
      }   
      //Delets the sub tasks -> different end points
      async  function Delete (name)
      {
        const idToken = await auth.currentUser.getIdToken;
        // set up the request headers, including the Firebase ID token in the Authorization header
        const headers = new Headers({
          "Authorization": `Bearer ${idToken}`,
          "Content-Type": "application/json"
        });
    
        DeleteSubTasks(headers, auth.currentUser,title,name);
    
      }
      const handleDelete = (index , name) => {
        //Adding a guard clause so we prevent any actions in offline state
         const newCategory = [...subTasks];
         newCategory.splice(index, 1);
         SetTaskData(newCategory);
         Delete(name);
         userStore.getState().  UpdateUserTaskDeleted();

    
    
      };
        //this is the the delete button
      const renderRightActions = (index , name) => {
        return (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDelete(index , name)}  >
             <Image source={deleteIcon} style={{ width: 50, height: 50, top:100 }} />       
          </TouchableOpacity>
        );
      };

      React.useEffect(() => {
        const unsubscribe = navigation.addListener('state', (event) => {
          // Check if the current screen is HomeScreen
          if (event.data.state.routes[event.data.state.index].name === 'TaskView') {
            
            let subCategories = []
            // Fetch categories here
            GetSubCategories(auth.currentUser,title ).then((result) => {             
              for( let item   in result)
                {              
                  subCategories.push(result[item])
                }
              SetTaskData(subCategories);
           
            })
          }
        });
      
        return unsubscribe;
      }, [navigation]);



    
      //Generate differnt card colour eveyrtime and changing its alpha to make it a bit more subtle
      const generateRandomColor = () => {
        const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)},0.1)`;
        return "#" + randomColor;
      };
      const generateRandomColorTime = () => {
        const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)},0.7)`;
        return "#" + randomColor;
      };
    return (

        <View style = {styles.container}>
         <View style={[ { marginTop: 10 }]}>
        </View>
       <ScrollView showsVerticalScrollIndicator ={false}  alwaysBounceVertical = {false} >     
        {  subTasks.map((item, index) => (   
            <Swipeable
                    key={index} 
                    renderRightActions={() => renderRightActions(index , item.name)}        
                  >           
                <Card style = {{...styles.cardContainer , backgroundColor: generateRandomColor() , elevation:3} }  key={index} onPress={() => {
                }}>
                <Card.Content>
                    <Text style={styles.cardTitle}>{item.name}</Text>
                    <View style={[ { marginTop:0}]}>
                    </View>
                    <Text style = {styles.cardText}>{item.task_info} </Text>
                    <View style={[ { marginTop: 0}]}>
                    </View>
                    <Text style = {styles.cardText}>Deadline Date :  {item.time} </Text>
                    <View style={[ { marginTop:0}]}>
                    </View>
                    <CountDown  digitStyle = {{backgroundColor : generateRandomColorTime() }} timeLabelStyle= {{fontSize:14 ,fontWeight:"bold" }}
                    until={ Math.round((new Date(item.time).getTime() - new Date().getTime())/1000)} 
                    size={30}
                    onFinish={() => { userStore.getState().UpdateUserTaskFinished()
            }}
              />
                </Card.Content>
                <View style={[ { marginTop: 2 }]}>
                </View>
        </Card>     
        </Swipeable>
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
    backgroundColor: "#B7B7B7",
    alignItems : 'center',
    justifyContent:'space-evenly',

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
  cardContainer: {
    width: 300,
    height: 300,
   
    borderRadius: 5,
    elevation: 5,
    alignSelf: 'center',
    marginBottom: 10,
    padding: 10,

//   borderWidth: 2,
    //borderColor: 'grey',

   marginVertical: 10,
   marginHorizontal: 20,
   
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 2},
    textShadowRadius: 1,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    marginVertical: 10,
    fontWeight:"700",
    color:"black"
  },


});