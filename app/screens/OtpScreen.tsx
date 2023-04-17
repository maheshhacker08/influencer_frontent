import React, { FC, useCallback, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { TouchableOpacity, View, ViewStyle, Button as RButton, StyleSheet } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Button, Screen, Text } from "../components"
import { useBreakpointValue, Stack, VStack, HStack, Center, Image, Box } from "native-base"
import OtpInputs, { OtpInputsRef } from "react-native-otp-inputs"
import * as ScreenOrientation from "expo-screen-orientation"

// import CodeInput from 'react-native-confirmation-code-input';
import { useNavigation } from "@react-navigation/native"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `Otp: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="Otp" component={OtpScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const OtpScreen = observer( function OtpScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()

    const navigation = useNavigation<any>()
    const [orientation, setOrientation] = useState<number>(1)
    const otpRef = useRef<OtpInputsRef>()

    ScreenOrientation.getOrientationAsync()
      .then((res) => {
        console.log(res)
        setOrientation(res)
      })
      .catch((error) => {
        console.log(error)
      })

    const focusOTP = useCallback(() => {
      otpRef.current.focus()
    }, [])

    const resetOTP = useCallback(() => {
      otpRef.current.reset()
    }, [])
    return (
      <Screen style={$root} preset="scroll">
        <Stack direction={{ base: "column-reverse", lg: "row" }}>
          <VStack
            bg={"white"}
            w={{ base: "100%", lg: "40%" }}
            h={{ base: orientation >= 3 ? "100vh" : "65vh", lg: "100vh" }}
            px={5}
            space={{ base: 5, lg: 10 }}
            // borderColor="#000"
            // borderWidth={10}
          >
            <Image
              display={{ base: "none", lg: "flex" }}
              style={{ width: 160, height: 70 }}
              source={require("../../assets/images/logo_2x.png")}
            />
            <Box>
              <Center>
                <Text preset={useBreakpointValue({ base: "h4", lg: "h1" })}>
                  Enter Verification Code
                </Text>
                <Text preset={"body"}>We have sent OTP on your mobile number</Text>
              </Center>
            </Box>
            <VStack space={1.5} w={{ base: "100%", md: "50%", lg: "100%" }} alignSelf="center">
              <View style={styles.container}>
                {/* <RButton title="Reset" onPress={resetOTP} />
                <RButton title="Focus" onPress={focusOTP} /> */}
                <OtpInputs
                  ref={otpRef}
                  handleChange={(code) => console.log(code)}
                  numberOfInputs={4}
                  autofillFromClipboard={true}
                  // style={}
                  inputStyles={styles.otpInput}
                />
              </View>
              <VStack space={1}>
                <Button
                  testID="otp-button"
                  tx="otpScreen.submitOtp"
                  style={$tapButton}
                  preset="reversed"
                  // onPress={login}
                  onPress={() => {
                    navigation.navigate("Home")
                  }}
                />
                <Text preset="body">
                  Didn't receive a code?
                  <TouchableOpacity
                  // onPress={() => {
                  //   navigation.navigate("SignupCategory")
                  // }}
                  >
                    <Text style={{ color: "blue", marginTop: 10 }}>Resend</Text>
                  </TouchableOpacity>
                </Text>
              </VStack>
            </VStack>
          </VStack>
          <Box
            display="flex"
            w={{ base: "100vw", lg: "60%" }}
            h={{ base: "35vh", lg: "100vh" }}
            alignItems="center"
            justifyContent="center"
            // borderColor="#000"
            // borderWidth={10}
            p={{ base: 0, lg: 20 }}
          >
            <Image
              h={{ base: "100%", lg: "100%" }}
              w="100%"
              source={useBreakpointValue({
                base: require("../../assets/images/backgrounds/mob-login-banner.png"),
                lg: require("../../assets/images/backgrounds/sign_in_image.png"),
              })}
              resizeMode={useBreakpointValue({ lg: "contain" })}
            />
          </Box>
        </Stack>
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}

const $tapButton: ViewStyle = {
  backgroundColor: "#127AD0",
  borderRadius: 100,
  minHeight: 0,
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    // padding: 2
    width: 200
  },
  otpInput:{
    // backgroundColor: 'wh',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    margin: 2,
    width: 50,
    height: 50,
    textAlign: 'center'
  }
});