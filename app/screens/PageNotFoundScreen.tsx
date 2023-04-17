import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ImageBackground, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Screen, Text } from "../components"
import { Button, Image, useBreakpointValue, View, VStack } from "native-base"
import Footer from "../components/Footer"
import { BottomNavigation, TopNavigation } from "../navigators/Navigation"
import { useNavigation } from "@react-navigation/native"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `PageNotFound: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="PageNotFound" component={PageNotFoundScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const PageNotFoundScreen = observer(function PageNotFoundScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const tabDimension = useBreakpointValue({
    base : false,
    sm : false,
    md : true,
    lg : false,
    xl : false
  })
  const webDimension = useBreakpointValue({
    base : false,
    sm : false,
    md : false,
    lg : true,
    xl : true
  })


  // Pull in navigation via hook
  const navigation = useNavigation()

  return (
    <Screen style={$root} preset="scroll">
      <TopNavigation navigation={navigation} />
      <BottomNavigation navigation={navigation} />
      {/* <VStack h={"100%"}> */}
      {webDimension ?
      <>
      <Image
        w={"100%"}
        h={"100vh"}
        source={require("../../assets/images/backgrounds/404Error.png")}
        resizeMode="stretch"
        />
       <VStack position='absolute' top='300' alignSelf={'center'}>
            <Image
            w={"200"}
            h={"200"}
            source={require("../../assets/images/backgrounds/404Search.png")}
            resizeMode="contain"
            />
            <Image
            w={"200"}
            h={"200"}
            source={require("../../assets/images/backgrounds/404Text.png")}
            resizeMode="contain"
            />
            <Button rounded='full' w={'70%'} alignSelf="center">
              Back To Home
            </Button>
          </VStack>
        {/* <Button rounded='full' position='absolute' top={'450'} left={'58px'}>Back To Home</Button> */}
        </>
        : tabDimension ?
        <>
        <Image
          
          mt={-12}
          w={"100vw"}
          h={"100vh"}
          source={require("../../assets/images/backgrounds/404Tab.png")}
          resizeMode="stretch"
          />
          <VStack position='absolute' top='300' alignSelf={'center'}>
            <Image
            w={"200"}
            h={"200"}
            source={require("../../assets/images/backgrounds/404Search.png")}
            resizeMode="contain"
            />
            <Image
            w={"200"}
            h={"200"}
            source={require("../../assets/images/backgrounds/404Text.png")}
            resizeMode="contain"
            />
            <Button rounded='full' w={'70%'} >
              Back To Home
            </Button>
          </VStack>
            
        </>
        :
        <>
        <Image
        mt={-12}
        w={"100vw"}
        h={"100vh"}
        source={require("../../assets/images/backgrounds/404Mobile.png")}
        resizeMode="stretch"
        />
        <VStack position='absolute' top='300' alignSelf={'center'}>
            <Image
            w={"200"}
            h={"200"}
            source={require("../../assets/images/backgrounds/404Search.png")}
            resizeMode="contain"
            />
            <Image
            w={"200"}
            h={"200"}
            source={require("../../assets/images/backgrounds/404Text.png")}
            resizeMode="contain"
            />
            <Button rounded='full' w={'70%'} >
              Back To Home
            </Button>
          </VStack>
          {/* <Button rounded='full' w={'45%'} position='absolute' top={'520'} alignSelf="center">Back To Home</Button> */}
        </>
        }
      {/* </VStack> */}

     <View>
        <Footer/>
      </View>
      
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
