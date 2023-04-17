import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const UserRegistrationStoreModel = types
  .model("UserRegistrationStore")
  .props({
    isBusiness:false,
    isInfluencer:true,
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    createPassword: "",
    confirmPassword: "",
    instagram:"",
    facebook:""
  })
  .views((store) => ({
    get validationErrors() {
      return {        
        instagram: (function () {
          if (store.instagram?.length === 0) return "Instagram ID can't be blank"
          return ""
        })(),
        facebook: (function () {
          if (store.facebook?.length === 0) return "Instagram ID can't be blank"
          return ""
        })(),
        first_name: (function () {
          if (store.first_name?.length === 0) return "first name can't be blank"
          return ""
        })(),
        last_name: (function () {
          if (store.last_name?.length === 0) return "last name can't be blank"
          return ""
        })(),
        phone: (function () {
          if (store.phone?.length === 0) return "phone can't be blank"
          if (store.phone?.length < 10) return "must be at least 10 characters"
          return ""
        })(),
        email: (function () {
          if (store.email?.length === 0) return "email can't be blank"
          // if (store.email?.length < 6) return "must be at least 6 characters"
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(store.email))
            return "must be a valid email address"
            return ""
        })(),
        createPassword: (function () {
          if (store.createPassword?.length === 0) return "password can't be blank"
          if (store.createPassword?.length < 8) return "must be at least 8 characters"
            return ""
        })(),
        confirmPassword: (function () {
          if (store.confirmPassword?.length === 0) return "confirm password can't be blank"
          if (store.confirmPassword?.length < 8) return "must be at least 8 characters"
          if (store.confirmPassword?.length !== store.createPassword?.length ) return "password should match"
            return ""
        })()
      }
    },
  }))
  .actions((store) => ({   
    setIsBusiness(value: boolean) {      
      store.isBusiness = value
    },
    setIsInfluencer(value: boolean) {      
      store.isInfluencer = value
    },
    setFirstName(value: string) {      
      store.first_name = value
    },
    setLastName(value: string) {      
      store.last_name = value
    },
    setPhone(value: string) {
      store.phone = value
    },
    setEmail(value: string) {
      store.email = value.replace(/ /g, "")
    },
    setCreatePassword(value: string) {
      store.createPassword = value.replace(/ /g, "")
    },
    setConfirmPassword(value: string) {
      store.confirmPassword = value.replace(/ /g, "")
    },
    setInstagram(value: string) {
      store.instagram = value.replace(/ /g, "")
    },
    setFacebook(value: string) {
      store.facebook = value.replace(/ /g, "")
    },
    resetStore() {
      // store.isBusiness=true
      // store.isInfluencer=false
      // store.first_name= ""
      // store.last_name= ""
      // store.phone= ""
      // store.email= ""
      store.createPassword= ""
      store.confirmPassword= ""
      // store.instagram=""
      // store.facebook=""
    },
    resetFullStore() {
      store.isBusiness=false
      store.isInfluencer=true
      store.first_name= ""
      store.last_name= ""
      store.phone= ""
      store.email= ""
      store.createPassword= ""
      store.confirmPassword= ""
      store.instagram=""
      store.facebook=""
    }
  }))
  .preProcessSnapshot((snapshot) => {
    // remove sensitive data from snapshot to avoid secrets
    // being stored in AsyncStorage in plain text if backing up store
    // const { authToken, authPassword, ...rest } = snapshot // eslint-disable-line @typescript-eslint/no-unused-vars

    // see the following for strategies to consider storing secrets on device
    // https://reactnative.dev/docs/security#storing-sensitive-info

    return snapshot
  })

export interface UserRegistrationStore extends Instance<typeof UserRegistrationStoreModel> {}
export interface UserRegistrationSnapshot extends SnapshotOut<typeof UserRegistrationStoreModel> {}

// @demo remove-file
