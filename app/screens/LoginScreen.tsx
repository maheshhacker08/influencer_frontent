import { observer } from "mobx-react-lite"
import {
  useBreakpointValue,
  Stack,
  VStack,
  HStack,
  Center,
  Image,
  Box,
  Pressable,
  FormControl,
  Input,
  WarningOutlineIcon,
  Link,
} from "native-base"
import { background } from "native-base/lib/typescript/theme/styled-system"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import {
  TextInput,
  ViewStyle,
  StyleSheet,
  View,
  ImageBackground,
  Platform,
  useWindowDimensions,
} from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../components"
import Footer from "../components/Footer"
import { useNavigation } from "@react-navigation/native"

import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import * as ScreenOrientation from "expo-screen-orientation"
import { ProgressSteps, ProgressStep } from "react-native-progress-steps"
import { OtpScreen } from "./OtpScreen"
import OtpInputs, { OtpInputsRef } from "react-native-otp-inputs"
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiResponse, create } from "apisauce"
import { SocialLogin } from "./SocialLogin"
import Config from "../config"
import Spinner from 'react-native-loading-spinner-overlay';

// import * as storage from "../../utils/storage"
// const image = { uri: "../../assets/images/plain_background_image.png" };
// const image = { uri: "../" };

// define the api
const api = create({  
  baseURL: Config.baseURL,
  headers: { Accept: "application/json" },
})

interface LoginScreenProps extends AppStackScreenProps<"Signin"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const authPasswordInput = useRef<TextInput>()
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const [loginError, setLoginError] = useState()

  const {
    authenticationStore: {
      authEmail,
      authPassword,
      setAuthEmail,
      setAuthPassword,
      setAuthToken,
      validationErrors,
    },
  } = useStores()

  const navigation = useNavigation<any>()
  const [orientation, setOrientation] = useState<number>(1)

  ScreenOrientation.getOrientationAsync()
    .then((res) => {
      // console.log(res)
      setOrientation(res)
    })
    .catch((error) => {
      console.log(error)
    })
  
    const {
      authenticationStore: { isAuthenticated },
    } = useStores()  
  

  useEffect(() => {
    return () => {
      setAuthPassword("")
      setAuthEmail("")
    }
  }, [])

  useEffect(()=>{
    if (isAuthenticated) {
      navigation.navigate("Find Influencer")
    }
  },[isAuthenticated])

  const errors: typeof validationErrors = isSubmitted ? validationErrors : ({} as any)
  const [loader, setLoader] = useState<boolean>(false)
  function login() {
    setLoader(true)
    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)

    if (Object.values(validationErrors).some((v) => !!v)) 
      return
    
    setIsSubmitted(false)
    setAuthPassword("")
    setAuthEmail("")

    api
      .post("/dj-rest-auth/login/", {
        email: authEmail,
        password: authPassword,
      })
      .then((res:ApiResponse<any, any>) => {
        console.log(res)
        setAuthToken(res && res.data && res.data.access_token)
        res.ok != true &&
          setLoginError(
            res && res.data && res.data.non_field_errors && res.data.non_field_errors[0],
          )
        setLoader(false)
      })
      .catch((error) => {
        console.log(error)
        setLoader(false)
      })
  }

  const PasswordRightAccessory = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        )
      },
    [isAuthPasswordHidden],
  )

  const defaultScrollViewProps = {
    keyboardShouldPersistTaps: "handled",
    contentContainerStyle: {
      flex: 1,
      justifyContent: "center",
    },
  }

  const onNextStep = () => {
    console.log("called next step")
  }

  const onSubmitSteps = () => {
    navigation.navigate("Home")
  }

  const progressStepsStyle = {
    borderWidth: 0.5,
    activeStepIconBorderColor: "gray",
    activeStepNumColor: "white",
    activeStepIconColor: "white",
    completedStepIconColor: "green",
    completedProgressBarColor: "green",
    completedCheckColor: "white",
    marginBottom: 0,
    topOffset: 0,
  }

  const otpRef = useRef<OtpInputsRef>()
  const [step, setStep] = useState(0)

  const mobile_background = useBreakpointValue({
    base: true,

    lg: false,
  })

  return (
    <Screen style={$root} preset="scroll">
      <Spinner
        //visibility of Overlay Loading Spinner
        visible={loader}
        //Text with the Spinner
        textContent={'Loading...'}
        //Text style of the Spinner Text
        textStyle={{color:'#FFF'}}
      />
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
         
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Image
              display={{ base: "none", lg: "flex" }}
              style={{ width: 160, height: 70 }}
              source={require("../../assets/images/logo_2x.png")}
            />
          </TouchableOpacity>          
          <VStack space={{ base: 5, lg: 10 }}>
            <Center mt={useBreakpointValue({ base: 10, md: 15, lg: 10 })}>
              <Text preset={useBreakpointValue({ base: "h4", md: "h2", lg: "h1" })}>Sign In</Text>
            </Center>
            <VStack space={2}>
             <SocialLogin/>
              <Center>
                <Text preset="body">or sign in with</Text>
              </Center>
            </VStack>
            <VStack space={1.5} w={{ base: "100%", md: "50%", lg: "100%" }} alignSelf="center">
              {loginError && <Text style={{ color: "red" }}>{loginError}</Text>}

              <FormControl isRequired isInvalid={errors?.authEmail ? true : false}>
                <FormControl.Label>Enter Email</FormControl.Label>
                <Input value={authEmail} onChangeText={setAuthEmail} isFocused={true} isHovered={true}/>
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                  {errors?.authEmail}
                </FormControl.ErrorMessage>
              </FormControl>

              {/* <TextField
                    value={authEmail}
                    onChangeText={setAuthEmail}
                    // containerStyle={$textField}
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect={false}
                    keyboardType="email-address"
                    labelTx="loginScreen.emailFieldLabel"
                    // placeholderTx="loginScreen.emailFieldPlaceholder"
                    helper={errors?.authEmail}
                    status={errors?.authEmail ? "error" : undefined}
                    onSubmitEditing={() => authPasswordInput.current?.focus()}
                  /> */}
              <FormControl isRequired isInvalid={errors?.authPassword ? true : false}>
                <FormControl.Label>Enter Password</FormControl.Label>
                <Input
                  type="password"
                  value={authPassword}
                  onChangeText={setAuthPassword}
                  onSubmitEditing={login}
                />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                  {errors?.authPassword}
                </FormControl.ErrorMessage>
              </FormControl>
              {/* <TextField
                    ref={authPasswordInput}
                    value={authPassword}
                    onChangeText={setAuthPassword}
                    // containerStyle={$textField}
                    autoCapitalize="none"
                    autoComplete="password"
                    autoCorrect={false}
                    secureTextEntry={isAuthPasswordHidden}
                    labelTx="loginScreen.passwordFieldLabel"
                    // placeholderTx="loginScreen.passwordFieldPlaceholder"
                    helper={errors?.authPassword}
                    status={errors?.authPassword ? "error" : undefined}
                    onSubmitEditing={login}
                    RightAccessory={PasswordRightAccessory}
                  /> */}
              <VStack space={1}>
                <Button
                  testID="login-button"
                  tx="loginScreen.tapToSignIn"
                  style={$tapButton}
                  preset="reversed"
                  onPress={login}
                  // onPress={() => setStep(1)}
                />
                <Text preset="body">
                  Don't have an account?
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Signup")
                    }}
                  >
                    <Text style={{ color: "blue", marginTop: 10 }}>Sign Up</Text>
                  </TouchableOpacity>
                </Text>
              </VStack>
            </VStack>
          </VStack>
          {/* </ProgressStep> */}
          {/* <ProgressStep              
              onSubmit={onSubmitSteps}
              scrollViewProps={defaultScrollViewProps}
              previousBtnDisabled={true}
              removeBtnRow={true}
            >
              <VStack space={{ base: 5, lg: 10 }}>
                <Box>
                  <Center>
                    <Text preset={useBreakpointValue({ base: "h4", md:"h2", lg: "h1" })}>
                      Enter OTP
                    </Text>
                    <Text preset={"body"}>We have sent OTP on your mobile number</Text>
                  </Center>
                </Box>
                <VStack space={1.5} w={{ base: "100%", md: "50%", lg: "100%" }} alignSelf="center">
                  <View style={styles.container}>                   
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
                      onPress={()=>{onSubmitSteps(); }}
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
            </ProgressStep>
          </ProgressSteps> */}
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
            h={{ base: "45%", lg: "100%" }}
            w="100vw"
            source={useBreakpointValue({
              base: require("../../assets/images/backgrounds/mob-login-banner.png"),
              lg: require("../../assets/images/backgrounds/sign_in_image.png"),
            })}
            resizeMode={useBreakpointValue({ lg: "contain" })}
            position={useBreakpointValue({
              base: "fixed",
              md: "fixed",
              lg: "none",
            })}
            zIndex={useBreakpointValue({
              base: 100,
              lg: 0,
            })}
          />
        </Box>
      </Stack>
    </Screen>
  )
})

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
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    // padding: 2
    width: 200,
  },
  otpInput: {
    // backgroundColor: 'wh',
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    margin: 2,
    width: 50,
    height: 50,
    textAlign: "center",
  },
})
