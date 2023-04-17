import { Instance, SnapshotOut, types } from "mobx-state-tree"




export const AddInfluencerModel = types
  .model("AddInfluencerStore")
  .props({
    firstName: types.maybe(types.string),
    lastName: types.maybe(types.string),
    gender: types.maybe(types.string),
    dob: types.maybe(types.string),
    email: "",
    phone: "",
    address: types.maybe(types.string),
    city: types.maybe(types.string),
    state: types.maybe(types.string),
    facebookURl: types.maybe(types.string),
    linkedin: types.maybe(types.string),
    instaURl: types.maybe(types.string),
    industries: types.maybe(types.string),
    maxAmount: types.maybe(types.string),
    minAmount: types.maybe(types.string),
  })
  .views((store) => ({
    get validationErrors() {
      return {
        firstName: (function () {
          if (store.firstName?.length === 0) return "First Name can't be blank"
          return ""
        })(),
        lastName: (function () {
          if (store.lastName?.length === 0) return "Last Name can't be blank"
          return ""
        })(),
        gender: (function () {
          if (store.gender?.length === 0) return "Gender can't be blank"
          return ""
        })(),
        dob: (function () {
          if (store.dob?.length === 0) return "Dob can't be blank"
          return ""
        })(),
        email: (function () {
            if (store.email?.length === 0) return "email can't be blank"
            if (store.email?.length < 6) return "must be at least 6 characters"
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(store.email))
            return "must be a valid email address"
            return ""
        })(),
        phone: (function () {
          if (store.phone?.length === 0) return "phone can't be blank"
          if (store.phone?.length < 10) return "must be at least 10 characters"
          return ""
        })(),
        address: (function () {
          if (store.address?.length === 0) return "Address can't be blank"
            return ""
        })(),
        city: (function () {
          if (store.city?.length === 0) return "City can't be blank"
            return ""
        })(),
        state: (function () {
          if (store.state?.length === 0) return "State can't be blank"
            return ""
        })(),
        facebookURl: (function () {
          if (store.facebookURl?.length === 0) return "Facebook URL can't be blank"
            return ""
        })(),
        instaURl: (function () {
          if (store.instaURl?.length === 0) return "Instagram URL can't be blank"
            return ""
        })(),
        linkedin: (function () {
          if (store.linkedin?.length === 0) return "linkedin URL can't be blank"
            return ""
        })(),
        industries: (function () {
          if (store.industries?.length === 0) return "Industries can't be blank"
            return ""
        })(),
        maxAmount: (function () {
          if (store.maxAmount?.length === 0) return "Max Amount can't be blank"
            return ""
        })(),
        minAmount: (function () {
          if (store.minAmount?.length === 0) return "Min Amount can't be blank"
            return ""
        })(),
       

      }
    },
  }))
  .actions((store) => ({
    setFirstName(value: string) {
      store.firstName = value
    },
    setLastName(value: string) {
      store.lastName = value
    },
    setGender(value: string) {
      store.gender = value.replace(/ /g, "")
    },
    setDob(value: string) {
      store.dob = value
    },
    setEmail(value: string) {
      store.email = value.replace(/ /g, "")
    },
    setPhone(value: string) {
      store.phone = value.replace(/ /g, "")
    },
    setAddress(value: string) {
      store.address = value
    },
    setCity(value: string) {
      store.city = value
    },
    setState(value: string) {
      store.state = value
    },
    setFacebookURl(value: string) {
      store.facebookURl = value
    },
    setLinkedinURl(value: string) {
      store.linkedin = value
    },
    setInstaURl(value: string) {
      store.instaURl = value
    },
    setIndustries(value: string) {
      store.industries = value
    },
    setMaxAmount(value: string) {
      store.maxAmount = value.replace(/ /g, "")
    },
    setMinAmount(value: string) {
      store.minAmount = value.replace(/ /g, "")
    },
    resetStore() {
        store.firstName=""
        store.lastName= ""
        store.gender= ""
        store.dob= ""
        store.phone= ""
        store.email= ""
        store.address= ""
        store.city= ""
        store.state= ""
        store.facebookURl= ""
        store.instaURl= ""
        store.linkedin= ""
        store.industries= ""
        store.maxAmount=""
        store.minAmount=""
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

export interface AddInfluencerStore extends Instance<typeof AddInfluencerModel> {}
export interface AddInfluencerSnapshot extends SnapshotOut<typeof AddInfluencerModel> {}

// @demo remove-file
