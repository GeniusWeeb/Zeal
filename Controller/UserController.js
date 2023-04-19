import {create} from "zustand";

const userStore = create((set) => ({

  currentUser: null,
  currentUserPicture : null ,
  assignUser: (user) =>
    set((state) => ({
      currentUser: user,
    })),

  removeUser: () =>
    set((state) => ({
      currentUser: null,
    })),
  assignUserPicture: (uri) => set((state) => ({
    currentUserPicture: uri
  }))
}));

export default userStore;
