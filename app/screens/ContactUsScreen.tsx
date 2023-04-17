// ---
// patch:
//   path: "app/screens/index.ts"
//   append: "export * from \"./ContactUsScreen\"\n"
//   skip:
// ---
import React, { FC, useState, useEffect, useRef } from "react"
import { observer } from "mobx-react-lite"
import {
  TextStyle,
  ViewStyle,
  TextInput,
  ImageBackground,
  Dimensions,
  Image,
  Platform,
} from "react-native"
import { useStores } from "../models"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Screen, Text, Button, TextField } from "../components"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import Footer from "../components/Footer"
import { View, useBreakpointValue, HStack, Pressable, VStack, Box, Link, FormControl, Input, WarningOutlineIcon, TextArea } from "native-base"
import { BottomNavigation, TopNavigation } from "../navigators/Navigation"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import { create } from 'apisauce'
import Config from "../config"


// define the api
const api = create({
  baseURL: Config.baseURL,
  headers: { Accept: 'application/json' },
})

// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `ContactUs: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="ContactUs" component={ContactUsScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const ContactUsScreen: FC<StackScreenProps<AppStackScreenProps, "ContactUs">> = observer(
  function ContactUsScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [submitMessage, setSubmitMessage] = useState(false)
    const fullNameInput = useRef<TextInput>()
    const phoneInput = useRef<TextInput>()
    const emailInput = useRef<TextInput>()
    const messageInput = useRef<TextInput>()

        // bearer token--------
        // const {
        //   authenticationStore: { token },
        // } = useStores()
    
        // api.addAsyncRequestTransform(request => async () => { 
        //   request.headers["Authorization"] = "Bearer " + token;
        //   console.log()
        // });

    const {
      contactUsStore: {
        fullName,
        phone,
        email,
        message,
        setFullName,
        setPhone,
        setEmail,
        setMessage,
        validationErrors,
        // websiteQueriesApi
      },
    } = useStores()

    useEffect(() => {
      setFullName("")
      setPhone("")
      setEmail("")
      setMessage("")
    }, [])

    function contactUsSubmit() {
      setIsSubmitted(true)
      if (Object.values(validationErrors).some((v) => !!v)){return setIsSubmitted(false)}
      if(isSubmitted){
      setFullName('');
      setMessage('');
      setPhone('');
      setEmail('')
    
    }
    
    }

    const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])
    const errors: typeof validationErrors = isSubmitted ? validationErrors : ({} as any)
    const height = useBreakpointValue({
      base: 25,
    })




 
    const { authenticationStore: { isAuthenticated } } = useStores()
    const navigation = useNavigation<any>()
    return (
      <Screen style={$root} preset="scroll">
        <TopNavigation navigation={navigation} />
        {isAuthenticated && <BottomNavigation navigation={navigation} />}
        <ImageBackground
          source={require("../../assets/images/backgrounds/contactUs.png")}
          resizeMode="cover"
        >
          <VStack space={5} mt={useBreakpointValue({ base: -50, lg: 0 })}>
            <HStack
              width="100%"
              alignItems="center"
              mt={useBreakpointValue({ base: 5, lg: 10 })}
              mx={useBreakpointValue({ base: 5, lg: 10 })}
            >
              <Pressable onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={20} color="gray.400"  width="8.5%"/>
              </Pressable>
              <Text
                preset={useBreakpointValue({ base: "h4", md: "h3", lg: "h1" })}
                style={{
                  width: "91.5%",
                  color: "#022F46",
                  textDecorationLine: useBreakpointValue({ base: "none", md: "underline" }),
                  textAlign: useBreakpointValue({ base: "left", md: "center" }),
                  marginLeft: useBreakpointValue({ base: 10, md: 0 }),
                }}
              >
                Contact Us
              </Text>
            </HStack>
            <VStack mx={10} width={useBreakpointValue({ base: "80%", md: "60%", lg: "35%" })}>
              <Text
                testID="contactUs_para-heading"
                tx="contactUsScreen.contactUs_para"
                preset="body"
                style={[$contactUs]}
              />
              <FormControl isRequired style={[$textField]} isInvalid={errors?.fullName ? true : false}>
                {/* <FormControl.Label><Text style={{fontSize: useBreakpointValue({ base: 12 , lg: 15}), color: '#9C9DA5'}}>Confirm Password</Text></FormControl.Label> */}
                <Input h={'48px'} bg='white' placeholder="Enter your name" value={fullName} onChangeText={setFullName}/>
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                  {errors?.fullName}
                </FormControl.ErrorMessage>
              </FormControl>
              {/* <TextField
                ref={fullNameInput}
                value={fullName}
                onChangeText={setFullName}
                containerStyle={$textField}
                autoCapitalize="none"
                // autoComplete="fullName"
                autoCorrect={false}
                // keyboardType="fullName"
                // labelTx="contactUsScreen.fullNameFieldLabel"
                placeholderTx="contactUsScreen.fullNameFieldPlaceholder"
                helper={errors?.fullName}
                status={errors?.fullName ? "error" : undefined}
                onSubmitEditing={() => fullNameInput.current?.focus()}
              /> */}

              {/* <View style={$container}> */}
              <FormControl isRequired style={[$textFieldPhone]} isInvalid={errors?.phone ? true : false}>
                {/* <FormControl.Label><Text style={{fontSize: useBreakpointValue({ base: 12 , lg: 15}), color: '#9C9DA5'}}>Confirm Password</Text></FormControl.Label> */}
                <Input h={'48px'} bg='white' placeholder="Mobile No." value={phone} onChangeText={setPhone}/>
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                  {errors?.phone}
                </FormControl.ErrorMessage>
              </FormControl>
              {/* <TextField
                ref={phoneInput}
                value={phone}
                onChangeText={setPhone}
                containerStyle={$textFieldPhone}
                autoCapitalize="none"
                // autoComplete="phone"
                autoCorrect={false}
                // keyboardType="phone"
                // labelTx="contactUsScreen.phoneFieldLabel"
                placeholderTx="contactUsScreen.phoneFieldPlaceholder"
                helper={errors?.phone}
                status={errors?.phone ? "error" : undefined}
                onSubmitEditing={() => phoneInput.current?.focus()}
              /> */}
              <FormControl isRequired style={[$textFieldEmail]} isInvalid={errors?.email ? true : false}>
                {/* <FormControl.Label><Text style={{fontSize: useBreakpointValue({ base: 12 , lg: 15}), color: '#9C9DA5'}}>Confirm Password</Text></FormControl.Label> */}
                <Input h={'48px'} bg='white' placeholder="Enter your email address" value={email} onChangeText={setEmail}/>
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                  {errors?.email}
                </FormControl.ErrorMessage>
              </FormControl>
              {/* <TextField
                ref={emailInput}
                value={email}
                onChangeText={setEmail}
                containerStyle={$textFieldEmail}
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
                // keyboardType="email"
                // labelTx="contactUsScreen.emailFieldLabel"
                placeholderTx="contactUsScreen.emailFieldPlaceholder"
                helper={errors?.email}
                status={errors?.email ? "error" : undefined}
                onSubmitEditing={() => emailInput.current?.focus()}
              /> */}
              {/* </View> */}
              <FormControl isRequired style={[$textFieldEmail]} isInvalid={errors?.message ? true : false}>
                {/* <FormControl.Label><Text style={{fontSize: useBreakpointValue({ base: 12 , lg: 15}), color: '#9C9DA5'}}>Confirm Password</Text></FormControl.Label> */}
                <TextArea bg='white' h={159} placeholder="Go ahead, we are listening.........."  autoCompleteType value={message} onChangeText={setMessage}/>
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                  {errors?.message}
                </FormControl.ErrorMessage>
              </FormControl>
              {/* <TextField
                ref={messageInput}
                value={message}
                onChangeText={setMessage}
                containerStyle={$textField}
                autoCapitalize="none"
                // autoComplete="message"
                autoCorrect={false}
                // keyboardType="message"
                // labelTx="contactUsScreen.messageFieldLabel"
                placeholderTx="contactUsScreen.messageFieldPlaceholder"
                helper={errors?.message}
                status={errors?.message ? "error" : undefined}
                multiline={true}
                onSubmitEditing={() => messageInput.current?.focus()}
              /> */}
              {submitMessage && <Text style={{color: 'green', margin: 5}}>Form Submitted, Our team will revert you soon :) </Text>}
              <Button
                testID="contactUs-button"
                tx="contactUsScreen.tapToSubmit"
                style={$tapButton}
                preset="reversed"
                onPress={()=>{
                  contactUsSubmit();    
                  api.post('/api/websiteQueries/', 
                    {
                      name: fullName,
                      email: email,
                      message: message,
                      // assigned_to: null,
                  }).then((res)=>{ setSubmitMessage(true); console.log(res)}).catch((error)=> console.log(error))
                }}
              />
              <View style={{ marginTop: 10, marginBottom: 60 }}>
                {/* <Text preset="subheading">Contact Information</Text> */}
                <View style={{ flex: 1, flexDirection: "row", padding: 6, flexBasis: "auto" }}>
                  <Image
                    style={{ width: height, height: height, marginRight: 3 }}
                    source={require("../../assets/images/backgrounds/Location_icon.png")}
                  />
                  <Link href="https://goo.gl/maps/qHvUPvC6f6Xfe6FA6" isExternal>
                    <Text preset="body">
                      507-508, DP Metro <br />
                      Near Vivek Vihar Metro Station <br />
                      Rajasthan 302019
                    </Text>
                  </Link>
                </View>
                <View style={{ flex: 1, flexDirection: "row", padding: 6, flexBasis: "auto" }}>
                  <Image
                    style={{ width: height, height: height, marginRight: 3 }}
                    source={require("../../assets/images/backgrounds/Email_icon.png")}
                  />
                  <Link href="mailto://info@sociofusion.com">
                    <Text preset="body">info@sociofusion.com</Text>
                  </Link>
                </View>
                <View style={{ flex: 1, flexDirection: "row", padding: 6, flexBasis: "auto" }}>
                  <Image
                    style={{ width: height, height: height, marginRight: 3 }}
                    source={require("../../assets/images/backgrounds/Contact_icon.png")}
                  />
                  <Link href="tel://+919829268800">
                    <Text preset="body">+91-9829-268-800</Text>
                  </Link>
                </View>
              </View>
            </VStack>
            <Box height={200}></Box>
          </VStack>
        </ImageBackground>

        <Footer />
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
  flexBasis: "auto",
}

const $contactUs: TextStyle = {
  marginBottom: spacing.small,
  flexBasis: "auto",
}

const $textField: ViewStyle = {
  marginBottom: spacing.large,
  flexBasis: "auto",
}

const $container: ViewStyle = {
  flexDirection: "row",
  flex: 1,
  marginBottom: spacing.large,
  flexBasis: "auto",
}

const $textFieldPhone: ViewStyle = {
  flexDirection: "column",
  flex: 1,
  marginBottom: spacing.large,
  flexBasis: "auto",
}

const $textFieldEmail: ViewStyle = {
  flexDirection: "column",
  flex: 1,
  marginBottom: spacing.large,
  flexBasis: "auto",
}

const $tapButton: ViewStyle = {
  // marginLeft: 25,
  backgroundColor: "#127AD0",
  borderRadius: 100,
  minHeight: 0,
  width: "95%",
}
