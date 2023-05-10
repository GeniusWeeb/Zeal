import {create} from "zustand";
import {createJSONStorage, persist} from 'zustand/middleware'
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as firebaseAuth from 'firebase/auth';

const userStore = create(
  persist
  (
  (set, get) => ({
  currentUser: null,
  currentUserPicture : null ,
  currentUserCategory: null ,
  currentUserApp:null,
  currentUserCredential:null,
  isUserOnline : false,
  isUserSignedIn: false,

  lastUpdatedUser:Date.now(),
  assignUser: (user, app , credential) =>
    set((state) => ({
      currentUser: user,
      isUserSignedIn:true,
      lastUpdatedUser:Date.now(),
      currentUserApp:app,
      currentUserCredential:credential
    })),
  RemoveUser: () =>
    set((state) => ({
      currentUser: null,
      currentUserPicture:null,
      isUserSignedIn:false,
      currentUserApp:null,
      currentUserCredential:null ,
    })),
  assignUserPicture: (uri) => set((state) => ({
    currentUserPicture: uri
  })),
  SetCurrentUserCategory : (name) => set((state) => ({
    currentUserCategory:name,
  })) ,
   SetIsUserOnline : (val) => set((state) => ({
   isUserOnline: val,
  }))
}),
 {  name : "SavedUserData",
    storage: createJSONStorage(()=> AsyncStorage),
    onRehydrateStorage:(state)=> {
      console.log("User Hydration starting")
      return (state, error) => {
       
        if(error)
        console.log("Problem while retrieving data")
        else
        {console.log("Finished adding user back") 
    
          
      }
      }
     }
  }
))
;

export const firebaseAppStore =create ( 
  (set, get) => 
(
  {
    currentApp:null ,
    AssignApp : (app) =>
    set((state) => ({
      currentApp: app,
  
    })),
})
);

//can be independant of login state
export const CategoryStore = create( 
  persist
  (
        (set, get) => ({
        categories: [],
        lastUpdated : Date.now(),
        setCategories: (category) =>
        set((state) => ({
            categories: category,
            lastUpdated : Date.now()
          })),
         }),
       {
     name : "SavedCategoryStore",
     storage: createJSONStorage(()=> AsyncStorage),
     onRehydrateStorage:(state)=> {
      console.log("Category Hydration starting")
      return (state, error) => {
       
        if(error)
        console.log("Problem while retrieving data")
        else
        console.log("Finished adding Category store back")
        
      }


     }
      })
);






export default userStore;
