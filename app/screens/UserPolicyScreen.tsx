import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Screen, Text } from "../components"
import { View } from "native-base"
import Footer from "../components/Footer"
import { spacing } from "../theme"
import { BottomNavigation, TopNavigation } from "../navigators/Navigation"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `UserPolicy: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="UserPolicy" component={UserPolicyScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const UserPolicyScreen: FC<StackScreenProps<AppStackScreenProps, "UserPolicy">> = observer(
  function UserPolicyScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    const navigation = useNavigation()
    return (
      <Screen style={$root} preset="scroll">
        <TopNavigation navigation={navigation} />
        <BottomNavigation navigation={navigation} />
        <View style={$container}>
          <Text preset="heading">User Policy Page</Text>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ad voluptates
            sapiente est eius explicabo cumque vitae pariatur voluptatem magnam iusto minima
            voluptas mollitia cupiditate ipsam aperiam minus ea architecto harum soluta earum, neque
            nulla! Sint modi, ducimus dolores fugiat corrupti quam deserunt explicabo facere illo
            atque consectetur voluptate autem reiciendis, debitis exercitationem quis veritatis
            nostrum a! Sequi a dicta aspernatur harum vitae natus quis, ea corrupti, aliquid
            explicabo minima totam. Sequi eveniet deleniti quod. Neque fugiat alias dignissimos
            nesciunt accusamus ut aspernatur, accusantium, earum nulla ad voluptate tempore minus
            reiciendis eaque soluta quae, consequuntur sed. Libero maxime optio voluptates culpa rem
            saepe, nihil nostrum velit eos laborum delectus. Laudantium harum, sequi iusto ipsa
            nulla corrupti, natus deserunt similique asperiores blanditiis optio, ipsum rem
            voluptatum illum inventore enim id quidem nesciunt! Recusandae nisi ducimus, quas
            molestias quisquam voluptates eaque corporis saepe atque. Autem sit minima beatae
            reprehenderit vero odio dolorem quasi a voluptatibus quaerat officiis amet, magnam enim
            obcaecati nostrum tempora repellat in quo porro ratione qui quis deserunt nam?
            Aspernatur quos, excepturi fugiat fuga iusto, eius perferendis, architecto beatae
            cupiditate cum commodi aliquam sapiente inventore officiis ipsam laboriosam error
            blanditiis quaerat illo nulla quis pariatur! Eveniet facilis tempore dolore!
          </Text>
        </View>
        <View>
          <Footer />
        </View>
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}
const $container: ViewStyle = {
  margin: spacing.large,
}
