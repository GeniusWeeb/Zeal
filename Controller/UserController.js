import {create} from "zustand";

const userStore = create((set) => ({
  currentUser: null,
  currentUserPicture : null ,
  assignUser: (user) =>
    set((state) => ({
      currentUser: user,
    })),

  RemoveUser: () =>
    set((state) => ({
      currentUser: null,
    })),
  assignUserPicture: (uri) => set((state) => ({
    currentUserPicture: uri
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

export const CategoryStore = create((set) => ({
  categories: [],
  setCategories: (category) =>
    set((state) => ({
      categories: category,
    })),
}));




export default userStore;
