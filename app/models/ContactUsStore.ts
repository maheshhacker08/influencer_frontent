import { Instance, SnapshotOut, types } from "mobx-state-tree"




export const ContactUsStoreModel = types
  .model("ContactUsStore")
  .props({
    fullName: types.maybe(types.string),
    phone: "",
    email: "",
    message: ""
  })
  .views((store) => ({
    get validationErrors() {
      return {
        fullName: (function () {
          if (store.fullName?.length === 0) return "full name can't be blank"
          return ""
        })(),
        phone: (function () {
          if (store.phone?.length === 0) return "phone can't be blank"
          if (store.phone?.length < 10) return "must be at least 10 characters"
          return ""
        })(),
        email: (function () {
          if (store.email?.length === 0) return "email can't be blank"
          if (store.email?.length < 6) return "must be at least 6 characters"
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(store.email))
            return "must be a valid email address"
            return ""
        })(),
        message: (function () {
          if (store.message?.length === 0) return "message can't be blank"
            return ""
        })(),
      }
    },
  }))
  .actions((store) => ({
    setFullName(value: string) {
      store.fullName = value
    },
    setPhone(value: string) {
      store.phone = value.replace(/ /g, "")
    },
    setEmail(value: string) {
      store.email = value.replace(/ /g, "")
    },
    setMessage(value: string) {
      store.message = value
    },
  }))
  .preProcessSnapshot((snapshot) => {
    // remove sensitive data from snapshot to avoid secrets
    // being stored in AsyncStorage in plain text if backing up store
    // const { authToken, authPassword, ...rest } = snapshot // eslint-disable-line @typescript-eslint/no-unused-vars
    
    // see the following for strategies to consider storing secrets on device
    // https://reactnative.dev/docs/security#storing-sensitive-info

    return snapshot
  })

export interface ContactUsStore extends Instance<typeof ContactUsStoreModel> {}
export interface ContactUsStoreSnapshot extends SnapshotOut<typeof ContactUsStoreModel> {}

// @demo remove-file
