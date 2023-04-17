import { Instance, SnapshotOut, types } from "mobx-state-tree"




export const AddBlogStoreModel = types
  .model("AddBlogStore")
  .props({
    title: "",
    slug: "",
    tag: "",
    content: "",
    // image: ""
  })
  .views((store) => ({
    get validationErrors() {
      return {
        title: (function () {
          if (store.title?.length === 0) return "Title can't be blank"
          return ""
        })(),
        slug: (function () {
          if (store.slug?.length === 0) return "Slug can't be blank"
            return ""
        })(),
        tag: (function () {
          if (store.tag?.length === 0) return "Tag can't be blank"
            return ""
        })(),
        content: (function () {
          if (store.content?.length === 0) return "Content can't be blank"
            return ""
        })(),
        // image: (function () {
        //   if (store.image?.length === 0) return "image can't be blank"
        //     return ""
        // })(),
      }
    },
  }))
  .actions((store) => ({
    setTitle(value: string) {
      store.title = value
    },
    setSlug(value: string) {
      store.slug = value.replace(/ /g, "")
    },
    setTag(value: string) {
      store.tag = value
    },
    setContent(value: string) {
      store.content = value
    },
    // setImage(value: string) {
    //   store.image = value
    // },
    resetStore() {
      store.title=""
      store.slug= ""
      store.tag= ""
      store.content= ""
      // store.image= ""
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

export interface AddBlogStore extends Instance<typeof AddBlogStoreModel> {}
export interface AddBlogStoreSnapshot extends SnapshotOut<typeof AddBlogStoreModel> {}

// @demo remove-file
