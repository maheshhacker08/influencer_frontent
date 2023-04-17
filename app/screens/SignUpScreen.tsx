import { observer } from "mobx-react-lite"
import {
  useBreakpointValue,
  Stack,
  VStack,
  HStack,
  Center,
  Image,
  Box,
  Radio,
  FormControl,
  Input,
  WarningOutlineIcon,
} from "native-base"
import { background } from "native-base/lib/typescript/theme/styled-system"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import {
  TextInput,
  TextStyle,
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
import { ApiResponse, create } from "apisauce"
import { SocialLogin } from "./SocialLogin"
import Config from "../config"
import Spinner from 'react-native-loading-spinner-overlay';

// define the api
const api = create({  
  baseURL: Config.baseURL,
  headers: { Accept: "application/json" },
})

// const image = { uri: "../../assets/images/plain_background_image.png" };
// const image = { uri: "../" };

interface SignupScreenProps extends AppStackScreenProps<"Signup"> {}
// const windowWidth = Dimensions.get("window").width

export const SignUpScreen: FC<SignupScreenProps> = observer(function SignUpScreen(_props) {
  const navigation = useNavigation<any>()
  const window = useWindowDimensions()  

  const flex_direction = useBreakpointValue({
    base: "column-reverse",
    sm: "column-reverse",
    md: "column-reverse",
    lg: "row",
    xl: "row",
  })
  const flex_image_size = useBreakpointValue({
    base: 2,
    sm: 2,
    md: 2,
    lg: 2,
    xl: 2,
  })
  const flex_form_size = useBreakpointValue({
    base: 3,
    sm: 3,
    md: 3,
    lg: 1,
    xl: 1,
  })  
  const width = useBreakpointValue({
    base: 200,
    sm: 200,
    md: 200,
    lg: 450,
    xl: 750,
  })
  const height = useBreakpointValue({
    base: 200,
    sm: 200,
    md: 200,
    lg: 450,
    xl: 585,
  })

  const logo_show = useBreakpointValue({
    sm: false,
    md: false,
    lg: true,
    xl: true,
  })
  const mobile_background = useBreakpointValue({
    sm: true,
    md: true,
    lg: false,
    xl: false,
  })

  const margin = useBreakpointValue({
    base: 10,
    sm: 10,
    md: 10,
    lg: -10,
    xl: -10,
  })
  const flex_form_height = useBreakpointValue({
    base: window.height,
    sm: window.height,
    md: window.height,
    lg: window.height,
    xl: window.height,
  })

  const defaultScrollViewProps = {
    keyboardShouldPersistTaps: "handled",
    contentContainerStyle: {
      flex: 1,
      justifyContent: "center",
    },
  }

  const [orientation, setOrientation] = useState<number>(1)

  ScreenOrientation.getOrientationAsync()
  .then((res) => {      
    setOrientation(res)
  })
  .catch((error) => {
    console.log(error)
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [emailError, setEmailError] = useState()

  const {
    userRegistrationStore: {   
      isBusiness,
      isInfluencer,   
      first_name,
      last_name,
      phone,
      email,
      createPassword,
      confirmPassword,
      instagram,
      facebook,
      setIsBusiness,
      setIsInfluencer,
      setFirstName,
      setLastName,
      setPhone,
      setEmail,
      setCreatePassword,
      setConfirmPassword,
      setInstagram,
      setFacebook,
      resetStore,
      resetFullStore,
      validationErrors,
    },
    authenticationStore: { setAuthToken },
  } = useStores()

  const errors: typeof validationErrors = isSubmitted ? validationErrors : ({} as any)

  const [instaError, setInstaError] = useState<any>({
      status:false,
      message:"Invalid IG Creator/Business"
    })
  const [loader, setLoader] = useState<boolean>(false)
  function SignUpSubmit() {
    setLoader(true)
    setIsSubmitted(true)
    console.log("sign up called", isSubmitted)
    
    api
      .post("/dj-rest-auth/registration/", {        
        email: email,
        password1: createPassword,
        password2: confirmPassword,        
        first_name: first_name,
        last_name: last_name,
        is_business: isBusiness,
        is_influencer: isInfluencer,
        instagram:instagram,
        facebook:facebook
      })
      .then((res:ApiResponse<any,any>) => {
        console.log(res)
        setAuthToken(res.data.access_token)
        if(res.ok != true){
          if(res.data.email)
            setEmailError(res.data.email[0]) 
          if(res.data.error)
            setEmailError(res.data.error) 
          if(res.data.password1)
            setEmailError(res.data.password1[0]) 
        }
        resetStore()
        setIsSubmitted(false)
        setLoader(false)
      })
      .catch(
        (error) => { 
          if(error){
            setInstaError({              
                ...instaError,
                status:true
            })
          }
        setLoader(false)     
        }
      )
    navigation.navigate("Find Influencer")

    if (Object.values(validationErrors).some((v) => !!v)) return
    setIsSubmitted(false)
  }  

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
        <Box
          bg={"white"}
          w={{ base: "100%", lg: "40%" }}
          pb={10}
        >
          <VStack            
            w={{ base: "100%" }}         
            px={5}
            space={{ base: 5 }}
          >
            <Image
              alt="Sociofusion logo"
              display={{ base: "none", lg: "flex" }}
              style={{ width: 160, height: 70 }}
              source={require("../../assets/images/logo_2x.png")}
            />
            <VStack space={{ base: 5 }}>
              <Center>
                <Text preset={useBreakpointValue({ base: "h4", md: "h2", lg: "h1" })}>Sign Up</Text>
              </Center>
              <Center>
                <Text preset="body">Please Select One Category</Text>
              </Center>
              <VStack space={5} w={{ base: "80%", md: "70%", lg: "100%" }} alignSelf="center" mx={5}>
                <Radio.Group
                  name="myRadioGroup"
                  value={isBusiness?"business":"influencer"}
                  onChange={(nextValue) => {
                    console.log(nextValue)                  
                    setIsBusiness(nextValue=="business")
                    setIsInfluencer(nextValue=="influencer")
                  }}
                  w={{ base: "100%", md: "100%", lg: "36vw" }}
                  alignItems={{ base: "center", lg: "space-evenly" }}
                >
                  <HStack
                    space={{ base: 5, lg: 3, xl: 5 }}
                    justifyContent="space-evenly"
                    alignItems="space-evenly"
                  >
                    <Radio value="business" aria-label="Business" position="absolute" top={2} left={{ base: 5, lg: 2, xl: 5 }}>
                      <VStack                      
                        pt={5}
                        space={{ base: 1, lg: 2, xl: 3 }}
                        justifyContent="center"
                        alignItems="center"
                        bg={isBusiness ? "blue.100" : "white"}
                        shadow={2}
                        borderRadius={5}
                        width={{ base: 150, lg: 180, xl: 220 }}
                        height={{ base: 150, lg: 180 }}
                      >
                        <Image
                          alt="Business"
                          style={{
                            width: useBreakpointValue({ base: 30 }),
                            height: useBreakpointValue({ base: 30 }),
                          }}
                          source={require("../../assets/images/backgrounds/signup_category_icon2.png")}
                        />
                        <Text                        
                          style={{
                            fontFamily: "Poppins_500Medium",
                            fontSize: useBreakpointValue({ base: 18, lg: 20, xl: 24 }),
                            lineHeight: 29,
                            color: "#354a66",
                          }}
                        >
                          Business
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Poppins_400Regular",
                            fontSize: useBreakpointValue({ base: 12, lg: 13, xl: 15 }),
                            lineHeight: 21,
                            color: "#545454",
                            overflow: "hidden",
                            textAlign: "center",
                          }}
                        >
                          {/* <Text preset="body"> */}
                          Are you looking for an influencer?
                        </Text>
                      </VStack>
                    </Radio>
                    <Radio value="influencer" aria-label="Influencer" position="absolute" top={2} left={{ base: 5, lg: 2, xl: 5 }}>
                      <VStack
                        pt={1}
                        space={1}
                        justifyContent="center"
                        alignItems="center"
                        bg={isInfluencer ? "blue.100" : "white"}
                        shadow={2}
                        borderRadius={5}
                        width={{ base: 150, lg: 180, xl: 240 }}
                        height={{ base: 150, lg: 180 }}
                      >
                        <Image
                          alt="Influencer"
                          style={{
                            width: useBreakpointValue({ base: 30 }),
                            height: useBreakpointValue({ base: 30 }),
                          }}
                          source={require("../../assets/images/backgrounds/signup_category_icon1.png")}
                        />
                        <Text
                          style={{
                            fontFamily: "Poppins_500Medium",
                            fontSize: useBreakpointValue({ base: 18, lg: 20, xl: 24 }),
                            lineHeight: 29,
                            color: "#354a66",
                          }}
                        >
                          Influencer
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Poppins_400Regular",
                            fontSize: useBreakpointValue({ base: 12, lg: 13, xl: 15 }),
                            lineHeight: 21,
                            color: "#545454",
                            overflow: "hidden",
                            textAlign: "center",
                          }}
                        >
                          You can help brands?
                        </Text>
                      </VStack>
                    </Radio>
                  </HStack>
                </Radio.Group>
                <VStack space={3}>
                  {isBusiness && <VStack space={2}>
                    <SocialLogin />
                    <Center>
                      <Text preset="body">or sign up with</Text>
                    </Center>
                  </VStack>}
                  <VStack space={1.5} w={{ base: "100%" }} alignSelf="center">
                    {emailError && (
                      <Text style={{textAlign:"center", color: "red", marginBottom: 10 }}>{emailError}</Text>
                    )}
                    <HStack>
                      <FormControl
                        isRequired
                        style={[$textFieldPass]}
                        isInvalid={errors?.first_name ? true : false}
                      >
                        <FormControl.Label>
                          <Text
                            style={{
                              fontSize: useBreakpointValue({ base: 12, lg: 15 }),
                              color: "#9C9DA5",
                            }}
                          >
                            First Name
                          </Text>
                        </FormControl.Label>
                        <Input value={first_name} onChangeText={setFirstName} />
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                          {errors?.first_name}
                        </FormControl.ErrorMessage>
                      </FormControl>
                      <FormControl
                        isRequired
                        style={[
                          $textFieldPass,
                          { marginLeft: useBreakpointValue({ base: 23, md: 25 }) },
                        ]}
                        isInvalid={errors?.last_name ? true : false}
                      >
                        <FormControl.Label>
                          <Text
                            style={{
                              fontSize: useBreakpointValue({ base: 12, lg: 15 }),
                              color: "#9C9DA5",
                            }}
                          >
                            Last Name
                          </Text>
                        </FormControl.Label>
                        <Input value={last_name} onChangeText={setLastName} />
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                          {errors?.last_name}
                        </FormControl.ErrorMessage>
                      </FormControl>
                    </HStack>
                    <FormControl
                      isRequired
                      isInvalid={errors?.instagram || instaError.status ? true : false}
                      style={{display:isBusiness?"none":"flex"}}
                    >
                      <FormControl.Label>
                        <Text
                          style={{
                            fontSize: useBreakpointValue({ base: 12, lg: 15 }),
                            color: "#9C9DA5",
                          }}
                        >
                          Instagram ID
                        </Text>
                      </FormControl.Label>
                      <Input value={instagram} onChangeText={setInstagram} />
                      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                        {errors?.instagram || instaError.message}
                      </FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl
                      isRequired
                      isInvalid={errors?.facebook ? true : false}
                      style={{display:isBusiness?"none":"flex"}}
                    >
                      <FormControl.Label>
                        <Text
                          style={{
                            fontSize: useBreakpointValue({ base: 12, lg: 15 }),
                            color: "#9C9DA5",
                          }}
                        >
                          Facebook ID
                        </Text>
                      </FormControl.Label>
                      <Input value={facebook} onChangeText={setFacebook} />
                      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                        {errors?.facebook}
                      </FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl isRequired isInvalid={errors?.email ? true : false}>
                      <FormControl.Label>
                        <Text
                          style={{
                            fontSize: useBreakpointValue({ base: 12, lg: 15 }),
                            color: "#9C9DA5",
                          }}
                        >
                          Email
                        </Text>
                      </FormControl.Label>
                      <Input value={email} onChangeText={setEmail} />
                      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                        {errors?.email}
                      </FormControl.ErrorMessage>
                    </FormControl>
                    <HStack>
                      <FormControl
                        isRequired
                        style={[$textFieldPass]}
                        isInvalid={errors?.createPassword ? true : false}
                      >
                        <FormControl.Label>
                          <Text
                            style={{
                              fontSize: useBreakpointValue({ base: 12, lg: 15 }),
                              color: "#9C9DA5",
                            }}
                          >
                            Create Password
                          </Text>
                        </FormControl.Label>
                        <Input
                          type="password"
                          value={createPassword}
                          onChangeText={setCreatePassword}
                        />
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                          {errors?.createPassword}
                        </FormControl.ErrorMessage>
                      </FormControl>
                      <FormControl
                        isRequired
                        style={[
                          $textFieldPass,
                          { marginLeft: useBreakpointValue({ base: 23, md: 25 }), marginTop: 2 },
                        ]}
                        isInvalid={errors?.confirmPassword ? true : false}
                      >
                        <FormControl.Label>
                          <Text
                            style={{
                              fontSize: useBreakpointValue({ base: 12, lg: 15 }),
                              color: "#9C9DA5",
                            }}
                          >
                            Confirm Password
                          </Text>
                        </FormControl.Label>
                        <Input
                          type="password"
                          value={confirmPassword}
                          onChangeText={setConfirmPassword}
                          onSubmitEditing={SignUpSubmit}
                        />
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                          {errors?.confirmPassword}
                        </FormControl.ErrorMessage>
                      </FormControl>
                    </HStack>
                  </VStack>
                  <Stack direction={{ base: "column", lg: "row" }}>
                    <Button
                      testID="otp-button"
                      tx="otpScreen.submitOtp"
                      style={[
                        $tapButton2,
                        {
                          width: useBreakpointValue({ base: "100%", lg: "20%" }),
                          marginTop: useBreakpointValue({ base: 2, md: 4, lg: 0 }),
                        },
                      ]}
                      preset="reversed"
                      onPress={() => {
                        SignUpSubmit()
                      }}
                    />
                    <Button
                      testID="otp-button"
                      text="Reset"
                      style={[
                        $tapButton2,
                        {
                          width: useBreakpointValue({ base: "100%", lg: "20%" }),
                          marginTop: useBreakpointValue({ base: 2, md: 4, lg: 0 }),
                        },
                      ]}
                      preset="reversed"
                      onPress={resetFullStore}
                    />
                    <Text preset="body">
                      Already have an account?
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("Signin")
                        }}
                      >
                        <Text style={{ color: "blue", marginTop: 10, marginLeft: 2 }}>Sign In</Text>
                      </TouchableOpacity>
                    </Text>
                  </Stack>
                </VStack>
              </VStack>
            </VStack>
          </VStack>
        </Box>
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
            alt="banner"
            h={{ base: "45%", lg: "100%" }}
            w="100%"
            source={useBreakpointValue({
              base: require("../../assets/images/backgrounds/mob-login-banner.png"),
              lg: require("../../assets/images/backgrounds/signUp_illustration.png"),
            })}
            resizeMode={useBreakpointValue({ lg: "contain" })}
            position={useBreakpointValue({
              base: "fixed",
              lg: "none",
            })}
            zIndex={useBreakpointValue({
              base: 1,
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

const $signIn: TextStyle = {
  marginBottom: spacing.small,
}
const $login_with: TextStyle = {
  // alignSelf: "center",
  textAlign: "center",
}
const $textFieldPhone: ViewStyle = {
  flexDirection: "column",
  flex: 1,
  marginRight: spacing.large,
}

const $enterDetails: TextStyle = {
  marginBottom: spacing.large,
}

const $hint: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.medium,
}

const $textField: ViewStyle = {
  marginBottom: spacing.large,
  // marginLeft: 25,
  marginTop: -20,
  width: "100%",
}
const $textFieldPass: ViewStyle = {
  // marginBottom: spacing.large,
  // marginLeft: 25,
  // marginTop: -20,
  width: "47%",
}

const $tapButton: ViewStyle = {
  backgroundColor: "#127AD0",
  borderRadius: 100,
  minHeight: 0,
}
const $tapButton2: ViewStyle = {
  backgroundColor: "#127AD0",
  borderRadius: 100,
  minHeight: 0,
  // marginLeft: 20,
  marginRight: 15,
}

const $social_icons: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  // backgroundColor: colors.background,
  paddingVertical: 10,
  paddingHorizontal: 10,
  alignContent: "center",
}
const $social_icons_container: ViewStyle = {
  // flex: 1,
  // backgroundColor: colors.background,
  paddingVertical: 10,
  paddingHorizontal: 10,
  // alignContent: "center",
  alignItems: "center",
  // height: 150,
  flexDirection: "column",
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
