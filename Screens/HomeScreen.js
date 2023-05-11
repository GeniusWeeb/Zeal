  //#region HeaderFiles  
    import { useNavigation, useRoute } from "@react-navigation/native";
    import { StatusBar } from "expo-status-bar";
    import { Button, StyleSheet , Text , View , Image , TouchableOpacity, ScrollView, Alert} from "react-native";
    import userStore from "../Controller/UserController";
    import { GetCategories, PatchData } from "../Controller/DatabaseController";
    import * as firebaseAuth from 'firebase/auth'
    import { firebaseAppStore } from "../Controller/UserController";
    import { CategoryStore } from "../Controller/UserController";
    import { useState } from "react";
    import React from "react";
    import CategoryTaskIcon from "../assets/CreateTask.png";
    import CategoryCreateIcon from "../assets/CategoryCreate.png";
    import HomeIcon from "../assets/HomeIcon.jpg";
    import { Swipeable } from "react-native-gesture-handler";
    import deleteIcon from "../assets/delete.png"
    import { DeleteTaskCategory } from "../Controller/DatabaseController";
    import { Card } from "react-native-paper";
//#endregion

export default function HomeScreen()

{   
    const route =  useRoute();
    const navigation = useNavigation();
    const user   =  route.params?.user;
    const auth =  firebaseAuth.getAuth(firebaseAppStore.getState().currentApp);
    const [category, setCategory] = useState([]);
    const  isOnline =  userStore.getState().isUserOnline? true: false ;

    const generateRandomColor = () => 
    {
      const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)},0.2)`;
      return "#" + randomColor;
    };

    //As soon as component mounts we will set data
   React.useEffect ( () => {
    setCategory(CategoryStore.getState().categories);
     } , [CategoryStore.getState().categories])
  
//for fetching the data from firebase 
   React.useEffect(() => {  
    const unsubscribe = navigation.addListener('state', (event) => {
      if (event.data.state.routes[event.data.state.index].name === 'HomeScreen') 
      {   
        console.log(`User Signed in ??${userStore.getState().isUserSignedIn}`)      
        if(isOnline)
        {
          GetCategories(auth.currentUser).then((result) => {
            let categories = [];
            for (let prop in result) {
              categories.push(`${prop}`)
            }
          CategoryStore.getState().setCategories(categories);
           console.log(CategoryStore.getState().lastUpdated);
            setCategory(categories);
          })
        }             
      }
    });
  
    return unsubscribe;
   }, []);


  async  function Delete (name)
  {
        const idToken = await auth.currentUser.getIdToken;
        // set up the request headers, including the Firebase ID token in the Authorization header
        const headers = new Headers({
          "Authorization": `Bearer ${idToken}`,
          "Content-Type": "application/json"
        });
      DeleteTaskCategory(headers, auth.currentUser,name);
  }

    
      const handleDelete = (index) => 
      {
      //Adding a guard clause so we prevent any actions in offline state
            let name = CategoryStore.getState() .GetCategoryName(index) ;
            if(!isOnline ||  name == null)return;    
            const newCategory = [...category];
            newCategory.splice(index, 1);
            setCategory(newCategory);
            CategoryStore.getState().DeleteCategory(index);
            Delete(name);
      };


  //this is the the delete button
  const renderRightActions = (index) => {
          return (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDelete(index)}  >
            <Image source={deleteIcon} style={{ width: 40, height: 40, top:15 }} />       
          </TouchableOpacity>
        );
  };


  //region -> Render 
  return (    
    
    <View style = {styles.container}>
    <View style={[ { marginTop: 10 }]}>
        </View>
        <ScrollView showsVerticalScrollIndicator ={false}  alwaysBounceVertical = {false}>
        {category.map((item, index) => (
          <Swipeable
            key={index} 
            renderRightActions={() => renderRightActions(index)}
          > 
              <Card style = {{...styles.cardContainer , backgroundColor: generateRandomColor() , elevation:3} }  key={index} onPress={() => {
        }}>
        <Card.Content>
            <TouchableOpacity
              style={styles.button}
              //Here we add a slight delay , so we can differ between the swipe gesture
              // and the button click , for button press we need to hold down the button
              delayLongPress={200}
              onLongPress={() => {             
                if (!userStore.getState().isUserOnline) return;
                userStore.getState().SetCurrentUserCategory(item);
                navigation.navigate('TaskView', { title: `${item}` });
              }}
            >
              <Text style={styles.buttonText}>{item}</Text>
            </TouchableOpacity>
         
        </Card.Content>
        </Card>
        <View style={[ { marginTop: 10 }]}>
        </View>
        </Swipeable>
        
        ))}
    </ScrollView>
    <StatusBar style="light"/> 
    <View style={styles.footer}>
      <View style= {styles.footerButtons}>
     
      <TouchableOpacity onPress={() =>  navigation.navigate("CategoryCreate")}>
        <Image source={CategoryCreateIcon} style={{ width: 45, height: 40 , top:5}} />
       </TouchableOpacity>
       <TouchableOpacity onPress={() =>  navigation.navigate("HomeScreen")}>
        <Image source={HomeIcon} style={{ width: 45, height: 40 , top:5}} />
       </TouchableOpacity>  
        <TouchableOpacity onPress={() =>   navigation.navigate("SubTaskCreate")}>
        <Image source={CategoryTaskIcon} style={{ width: 50 , height: 50 , top:2}} />
       </TouchableOpacity>
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
    backgroundColor: "#434242",
    alignItems : 'center',
    justifyContent:'space-evenly',
},

buttonContainer: {
    paddingBottom:0,
    position: 'absolute',
    bottom: 80,
    width: '100%',
    padding: 50,
  backgroundColor:'#41644A'
},

taskButtons :{
    width:200,
    backgroundColor:'#41644A',
    height: 50,
    backgroundColor: '#41644A',
    borderRadius: 50,
   justifyContent: 'center',
   alignItems: 'center',
    fontWeight: '100',
    bottom: 45,
    padding:0,

},
footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
    height:60,
    width:400
  
    
  },
  footerButtons: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-around',
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'black',
    height: 80,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '2A2F4F',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  ScrollView : {
    flex:1,
    


  },
  button: {
    width: 300,
    height: 60,
    backgroundColor: '#00000',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '900',
    bottom: 0,
    padding:0,
  
   

  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '900',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 2},
    textShadowRadius: 1,
    elevation: 3,
  },
  box: {
    backgroundColor: 'gray',
    padding: 20,
    borderRadius: 10,
  },
  
});