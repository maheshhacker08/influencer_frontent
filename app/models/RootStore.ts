import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { AddBlogStoreModel } from "./AddBlogStore"
import { AddInfluencerModel } from "./AddInfluencerStore"
import { AuthenticationStoreModel } from "./AuthenticationStore" // @demo remove-current-line
import { ContactUsStoreModel } from "./ContactUsStore" // @demo remove-current-line
import { EpisodeStoreModel } from "./EpisodeStore" // @demo remove-current-line
import { UserProfileUpdateStoreModel } from "./UserProfileUpdateStore"
import { UserRegistrationStoreModel } from "./UserRegistrationStore"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  authenticationStore: types.optional(AuthenticationStoreModel, {}), // @demo remove-current-line
  episodeStore: types.optional(EpisodeStoreModel, {}), // @demo remove-current-line
  contactUsStore: types.optional(ContactUsStoreModel, {}), // @demo remove-current-line
  AddInfluencerStore: types.optional(AddInfluencerModel, {}), // @demo remove-current-line
  userProfileUpdateStore: types.optional(UserProfileUpdateStoreModel, {}), // @demo remove-current-line
  userRegistrationStore: types.optional(UserRegistrationStoreModel, {}), // @demo remove-current-line
  AddBlogStore: types.optional(AddBlogStoreModel, {}), // @demo remove-current-line
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
