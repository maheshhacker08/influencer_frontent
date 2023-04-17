import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../../../navigators"
import { Screen} from "../../../components"
import { Box, Image, Text } from "native-base"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `BusinessCard: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="BusinessCard" component={BusinessCardScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const BusinessCardScreen: React.FC<Props> = observer(function BusinessCardScreen({companyLogo, category, baseWidth, mdWidth, lgWidth}) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
       <Box p='5' mb='3' rounded={'5'} w={{base: baseWidth, md: mdWidth, lg: lgWidth}} bg='white' borderColor='#7128ED' borderWidth='1' alignItems='center' justifyContent='center'>
        <Image
          w={"60"}
          h={"60"}
          source={require(`../../../../assets/images/backgrounds/${companyLogo}.png`)}
          resizeMode="contain"
          // alignSelf={'center'}
          alt='companyLogo'
          />

        <Text rounded='3' bg='#D9D4FB' m='1' p='1' fontSize='12' style={{fontFamily: 'Poppins_400Regular', lineHeight: 18, color: '#203655'}}>
            Beauty
        </Text>

       </Box>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
