//#region  Header Files

  import { StatusBar } from "expo-status-bar";
  import React from "react";
  import { StyleSheet , Text , View  , Alert , TextInput, TouchableOpacity, Button , Image} from "react-native";
  import { SelectList } from "react-native-dropdown-select-list";
  import * as firebaseAuth from 'firebase/auth'
  import { firebaseAppStore } from "../Controller/UserController";
  import { GetCategories, PatchData } from "../Controller/DatabaseController";
  import DateTimePickerModal from "react-native-modal-datetime-picker";
  import { notificationThreshold } from "../Controller/UserController";
  import * as Notifications from 'expo-notifications';
  import { StartNotificationProcess } from "../Controller/NotificationController";
  import calendarIcon from "../assets/calendar.png"
  import userStore from "../Controller/UserController";
//#endregion

export default function SubTaskCreate()
{

    //SELECT CATEGORY BY DROP DOWN AND THEN TAKE THIS
      const auth =  firebaseAuth.getAuth(firebaseAppStore.getState().currentApp);
      const [taskSelected , setTaskSelected] = React.useState("");
      const [fetchedData, AddData] = React.useState([]);
      const[name , SetName] = React.useState(''); 
      const[descrip , SetDescription] = React.useState('');
      const nameInputRef = React.useRef(null);
      const descriptionInputRef = React.useRef(null);
      const dateRef = React.useRef(null);
      const [mydate ,SetDate] =React.useState(null);
      const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

      const showDatePicker = () => {
       
        setDatePickerVisibility(true);
      
      };
    
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
    
      const handleConfirm = (date) => {
       const dat =  date.toLocaleString('en-US')
        SetDate(dat);
        hideDatePicker();         
      };
    
      //dont give a dependancy so that it runs when the component mounts
      // We will use this to load data from Firebase
      React.useEffect( (
      )=> { 

        GetCategories(auth.currentUser).then((result) => {
            let categories = [];
            for (let prop in result) {
              categories.push(`${prop}`)
            }
            AddData(categories);
       
      })}, [])


    //map this to button onpress
    async function AddSubCategoriesToFireBase()
    {
        const idToken = await auth.currentUser.getIdToken;
        //text is -> Task Category
        // set up the request headers, including the Firebase ID token in the Authorization header
        const headers = new Headers({
          "Authorization": `Bearer ${idToken}`,
          "Content-Type": "application/json"
        });
        const data = {   
            "name" : `${name}`,
            "task_info" : `${descrip}`,  
            "time":  `${mydate}`   
        } 
        const body = JSON.stringify(data);
        //name is the linking key 
        const alterEndPoint = `Categories/${taskSelected}/names/${name}`;
        PatchData(body , headers , auth.currentUser , alterEndPoint);
        StartNotificationProcess(mydate , name , auth.currentUser.displayName);
        SetName("")
        SetDescription("")
        nameInputRef.current.clear();
        descriptionInputRef.current.clear();
        userStore.getState().UpdateUserTaskCreated();
        console.log(userStore.getState().userTaskCreated)

            
    }
//#region  Render Area
   return (           
            <View style = {styles.container}>  
                  {/* <View style = {styles.body}>     
                  </View>    */}
                  <View style = {styles.dropdownContainer}>
                                  <SelectList data={fetchedData} setSelected={setTaskSelected} 
                                  search = {false}
                                  placeholder="Select Task Category"                                  
                                  boxStyles={{ alignContent:"center",backgroundColor :"#9F8772" , elevation:"20" }}                       
                                  dropdownTextStyles={{color:"black", fontWeight:700 , fontSize:17}}
                                  dropdownItemStyles={{alignItems:"center",direction:"inherit"}}                 
                                  disabledItemStyles={{marginHorizontal:20}}
                                  inputStyles={{fontSize:20}}
                                  notFoundText="Tasks Empty"
                                  //onSelect={Alert.alert(taskSelected)
                                  maxHeight={100}
                                  
                                  />
                  </View>   
                  <View style={[ { marginTop: 100 }]}>
                  </View>
                { <TextInput style={styles.input}  onChangeText={SetName} value={name}
                  placeholder="Enter Task Name"  placeholderTextColor="#394867"  keyboardType="default" ref={nameInputRef} />  }    
                  <View style={[ { marginTop: 25 }]}>
                  </View>
                  <TextInput style={styles.input}  onChangeText={SetDescription} value={descrip}
                  placeholder="Enter Task Info"  placeholderTextColor="#394867"  keyboardType="default"  ref={descriptionInputRef}/>
                  <View style={[ { marginTop: 25}]}>
                  </View>               
                  <TouchableOpacity  style = {{bottom:10}}  onPress={showDatePicker}>
                  <Image source={calendarIcon} style={{ width: 60, height: 60 , left:0  }} />
                  {/* <Text style ={{fontWeight:"bold", top:1, color:"black"}}>Choose Time</Text> */}
                   </TouchableOpacity>
                  <Text  ref={dateRef} style = {styles.input}> {mydate}  </Text> 
                  <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="datetime"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                  display="inline"
                      
                />
                  <View style={[ { marginTop: 180}]}>
                  </View>
                <TouchableOpacity onPress={() =>{
                  if(name && descrip)
                  {   
                      AddSubCategoriesToFireBase();
                        
                  }
                }}>
                  <View style={styles.button}>
                      <Text style={styles.buttonText}>ADD</Text>
                  </View>
              </TouchableOpacity>
                  <StatusBar style="auto"/> 
            </View>
    );
//#endregion
}

// Style sheet -> Not a Big fan
const styles=   StyleSheet.create(
{
container:{
    paddingBottom: 1,
    paddingHorizontal :20, 
    paddingVertical:50,
    flex:1,  
    backgroundColor:"#9BA4B5",
    alignItems:"center"
   

},       
body: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingTop:0,
    width: "100%",
    paddingLeft:100,
    fontWeight:900,

},
dropdownContainer: {
    paddingVertical: 20,
    paddingHorizontal:10,
    width: "90%",
    alignContent:"center",
    fontWeight:'100',
    alignItems:"center",
    
    
},
input: {
    height: 30,
    fontSize: 17,
    fontWeight: '900',
    color: '#394867',
    alignSelf:"center",
  
},
button: {
    width:400,
    height: 300,
    backgroundColor: 'grey',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '900',
    bottom: 40,
    top:0,

  },
  buttonText: {
    color: '#fff',
    fontSize: 50,
    fontWeight: '900',
    bottom:90
  },

}
) 