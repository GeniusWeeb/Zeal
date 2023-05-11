//DataBaseController Scripts 
//Manages PUSH , GET , DELETE , PATCH
//THIS DOES NOT CARE ABOUT THE MODEL OR VIEW SIDE OF THINGS
//root node
//summary---------------------/summary

const  url = `https://zeal-383911-default-rtdb.europe-west1.firebasedatabase.app/users`;
export const firebaseConfig = {
    apiKey: "AIzaSyA4Ml4pXtp1_Gs7hEWcik8V7HCB5rN0evM",
    authDomain: "zeal-383911.firebaseapp.com",
    projectId: "zeal-383911",
    storageBucket: "zeal-383911.appspot.com",
    messagingSenderId: "381324936027",
    appId: "1:381324936027:web:45c24cd9feb2ee9330507e",
    measurementId: "G-8SQEPQSDW6"
  };
  
 //console.log(addedData["JobProfile"]["bio"]["name "])
export async function PushData(body , headers , currentUser , endPoint)
{
    const response =  await fetch(`${url}/${currentUser.uid}/${endPoint}.json` ,{
        method: "PUT" , 
        headers: headers,
        body: body
      });
      const addedData = await response.json();
      console.log("Added data:", addedData);
  
}
//existing ones
//import for the patch and puhs sections specifically because 
// we want to avoid repeated update calls onto the server 
// so we can update the local json string and patch the whole node once and for all

export async function PatchData(body , headers , currentUser , endPoint)
{
    // WE CAN AD APPENDED URL SECTIONS AND HAVE THEM SAVED and we can just operawte on the base url  that is upto 
    // the unique user id
    const response =  await fetch(`${url}/${currentUser.uid}/${endPoint}.json`,{
        method: "PATCH" , 
        headers: headers,
        body: body
      });
      const addedData = await response.json();
      console.log("Added data:", addedData);
  
}




export async function GETDATA(body , headers , currentUser)
{
    // Note => We always looks to fetch from the root node and then parse data as we want
    //this helps us to subscribe to the entire UID node than a specific sub node,

    const response =  await fetch(`${url}/${currentUser.uid}.json` ,{
        method: "GET" , 
        headers: headers,
        body: body
      });
      const addedData = await response.json();
      //response.json can be stored in => local storage and parsed directly to the UI elemtns
      console.log("Fetced data:", addedData);
  
}
      
export async function DeleteTaskCategory( headers , currentUser ,categoryName)
{
    // WE CAN AD APPENDED URL SECTIONS AND HAVE THEM SAVED and we can just operawte on the base url  that is upto 
    // the unique user id
    const response =  await fetch(`${url}/${currentUser.uid}/Categories/${categoryName}.json` ,{
        method: "DELETE" , 
        headers: headers,
  
      });
      const addedData = await response.json();
      //response.json can be stored in => local storage and parsed directly to the UI elemtns

  
}

export async function DeleteSubTasks(  headers , currentUser , categoryName , taskName)
{
    // WE CAN AD APPENDED URL SECTIONS AND HAVE THEM SAVED and we can just operawte on the base url  that is upto 
    //note => replace tasl_name => specifc subtask name
    // the unique user id
    const response =  await fetch(`${url}/${currentUser.uid}/Categories/${categoryName}/names/${taskName}.json` ,{
        method: "DELETE" , 
        headers: headers,
      });
      const addedData = await response.json();
      //response.json can be stored in => local storage and parsed directly to the UI elemtns
      console.log("Added data:", addedData);
  
}




//Task content

export async function GetCategories( currentUser)
{
  // get the Firebase ID token
  const idToken = await currentUser.getIdToken;
  // set up the request headers, including the Firebase ID token in the Authorization header
  const headers = new Headers({
    "Authorization": `Bearer ${idToken}`,
    "Content-Type": "application/json"
  });
   const response =  await fetch(`${url}/${currentUser.uid}/Categories.json?shallow=true` ,{
  method: "GET" , 
  headers: headers,
});
 
return await response.json();
}


//When Category is clicked -> go to new page and get this 
export async function GetSubCategories( currentUser , categoryName)
{
  // get the Firebase ID token
  const idToken = await currentUser.getIdToken;
  // set up the request headers, including the Firebase ID token in the Authorization header
  const headers = new Headers({
    "Authorization": `Bearer ${idToken}`,
    "Content-Type": "application/json"
  });
   const response =  await fetch(`${url}/${currentUser.uid}/Categories/${categoryName}/names.json` ,{
  method: "GET" , 
  headers: headers,
});
return await response.json();
}




//as soon as delete happens we fetch the updated stuff or when addition happens , in both case
//IN THE HOMEPAGE WE ARE ONLY SHOWING, TASK CATEGORIES SINCE THEY ARE THE PRIMARY FORM OF DIFFERNTIATION BETWEEN DIFFERENT THINGS
//PUT, PATCH, GET AND DELETE -> Sample
