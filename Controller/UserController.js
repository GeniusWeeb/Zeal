import {create} from "zustand";
import {createJSONStorage, persist} from 'zustand/middleware'
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as firebaseAuth from 'firebase/auth';
//60 means 1 minute , right now we are triggering notificaitons 1 minute before it expires for bette QA
export const notificationThreshold  = 60 ;


//We are using Zustand , and Async storage to store data on device
//In case of no internet connectivity ,  we can safely view the "CATEGORIES

//User Store -> this contains most of the users varaible , ref to the app , ulr ref and much more

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
  userTaskCreated : 0 ,
  userTaskFinished: 0 ,
  userTaskDeleted : 0,
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
      userTaskCreated : 0 ,
      userTaskFinished: 0 ,
      userTaskDeleted : 0,

    })),
  assignUserPicture: (uri) => set((state) => ({
    currentUserPicture: uri
  })),
  SetCurrentUserCategory : (name) => set((state) => ({
    currentUserCategory:name,
  })) ,
   SetIsUserOnline : (val) => set((state) => ({
   isUserOnline: val,
  })),

  UpdateUserTaskCreated: () =>set ((state) => ({
    userTaskCreated : state.userTaskCreated + 1,
    lastUpdated : Date.now(),
  })),
  UpdateUserTaskFinished: () => set((state) => ({
    userTaskFinished : state.userTaskFinished + 1,
    lastUpdated : Date.now(),
  })),
  UpdateUserTaskDeleted: () => set((state) => ({
    userTaskDeleted : state.userTaskDeleted + 1,
    lastUpdated : Date.now(),
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
//Contains all the categories also shown as a part of offline state
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
          DeleteCategory: (index) =>
          set((state) => ({
          
            categories: [
              ...state.categories.slice(0, index),
              ...state.categories.slice(index + 1)
            ],
            lastUpdated: Date.now()
          })),
           GetCategoryName:(index) => {
            const categoryName = CategoryStore.getState().categories[index];
            return categoryName ? categoryName : null;
          }
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
