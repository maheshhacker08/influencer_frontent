import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const UserProfileUpdateStoreModel = types
  .model("UserProfileUpdateStore")
  .props({
      id: types.maybe(types.string),
      first_name: types.maybe(types.string),
      last_name: types.maybe(types.string),
      email: types.maybe(types.string),
      mobile: types.maybe(types.string),
      gender: types.maybe(types.string),
      city: types.maybe(types.string),
      state: types.maybe(types.string),
      country: types.maybe(types.string),
      image: types.maybe(types.string),
      dob: types.maybe(types.string),
      is_active: false,
      is_staff: false,
      is_business: false,
      is_influencer: false,
      instagram: types.maybe(types.string),
      facebook: types.maybe(types.string),      
      favorites:0,
      profile_verified: false,
      price:0
  }
    )
  
  .views((store) => ({
    get validationErrors() {
      return {
        firstName: (function () {
          if (store.first_name?.length === 0) return "first name can't be blank"
          return ""
        })(),
        lastName: (function () {
          if (store.last_name?.length === 0) return "last name can't be blank"
          return ""
        })(),
        gender: (function () {
          if (store.gender?.length === 0) return "gender can't be blank"
          return ""
        })(),
        email: (function () {
          if (store.email?.length === 0) return "email can't be blank"
          if (store.email?.length < 6) return "must be at least 6 characters"
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(store.email))
            return "must be a valid email address"
            return ""
        })(),
        mobile: (function () {
          if (store.mobile?.length === 0) return "mobile can't be blank"
            return ""
        })(),
        dob: (function () {
          if (store.dob?.length === 0) return "DOB can't be blank"
            return ""
        })(),
        city: (function () {
          if (store.city?.length === 0) return "city can't be blank"
            return ""
        })(),
        state: (function () {
          if (store.state?.length === 0) return "state can't be blank"
            return ""
        })(),
        country: (function () {
          if (store.country?.length === 0) return "country can't be blank"
            return ""
        })(),
        instagram: (function () {
          if (store.instagram?.length === 0) return "instagram can't be blank"
            return ""
        })(),
        facebook: (function () {
          if (store.facebook?.length === 0) return "facebook can't be blank"
            return ""
        })()
      }
    },
  }))
  .actions((store) => ({
    setFirstName(value: string) {
      store.first_name = value
    },
    setLastName(value: string) {
      store.last_name = value
    },
    setGender(value: string) {
      store.gender = value
    },
    setEmail(value: string) {
      store.email = value.replace(/ /g, "")
    },
    setMobile(value: string) {
      store.mobile = value
    },
    setDOB(value: string) {
      store.dob = value
    },
    setCity(value: string) {
        store.city = value
    },
    setState(value: string) {
      store.city = value
    },
    setCountry(value: string) {
      store.country = value
    },
    setPrice(value: string) {
      store.price = parseInt(value)
    },
    setFavorites(value: string) {
      store.favorites = parseInt(value)
    },
    setInstagram(value: string) {
      store.instagram = value
    },
    setFacebook(value: string) {
      store.facebook = value
    },
    // setUserProfile(){
    //   store.id= types.maybe(types.string),
    //   store.first_name= types.maybe(types.string),
    //   store.last_name= types.maybe(types.string),
    //   store.email= types.maybe(types.string),
    //   store.mobile= types.maybe(types.string),
    //   store.gender= types.maybe(types.string),
    //   store.city= types.maybe(types.string),
    //   store.store.state= types.maybe(types.string),
    //   store.country= types.maybe(types.string),
    //   store.image= types.maybe(types.string),
    //   store.is_active= false,
    //   store.store.is_staff= false,
    //   store.store.is_business= false,
    //   store.is_influencer= false,
    //   store.instagram= types.maybe(types.string),
    //   store.store.store.store.facebook= types.maybe(types.string),      
    //   store.favorites=0,
    //   store.profile_verified= false,
    //   store.price=0
    // }
  }))
  .preProcessSnapshot((snapshot) => {
    // remove sensitive data from snapshot to avoid secrets
    // being stored in AsyncStorage in plain text if backing up store
    // const { authToken, authPassword, ...rest } = snapshot // eslint-disable-line @typescript-eslint/no-unused-vars

    // see the following for strategies to consider storing secrets on device
    // https://reactnative.dev/docs/security#storing-sensitive-info

    return snapshot
  })

export interface UserProfileUpdateStore extends Instance<typeof UserProfileUpdateStoreModel> {}
export interface UserProfileUpdateStoreSnapshot extends SnapshotOut<typeof UserProfileUpdateStoreModel> {}

// @demo remove-file
