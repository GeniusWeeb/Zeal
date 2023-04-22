import {create} from "zustand";
import {createJSONStorage, persist} from 'zustand/middleware'
import AsyncStorage from "@react-native-async-storage/async-storage";

const userStore = create((set) => ({
  currentUser: null,
  currentUserPicture : null ,
  currentUserCategory: null ,
  isUserOnline : false,
  isUserSignedIn: false,
  assignUser: (user) =>
    set((state) => ({
      currentUser: user,
    })),
  RemoveUser: () =>
    set((state) => ({
      currentUser: null,
      currentUserPicture:null
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

}));

export const firebaseAppStore =create ( (set) => 
({
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
     name : "OfflineCategories",
     storage: createJSONStorage(()=> AsyncStorage),
     onRehydrateStorage:(state)=> {
      console.log("Category Hydration starting")
      return (state, error) => {
       
        if(error)
        console.log("Problem while retrieving data")
        else
        console.log("Finished adding store back")
        
      }


     }
      })
);




export default userStore;
