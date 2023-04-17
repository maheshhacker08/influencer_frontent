import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Checkbox , useBreakpointValue } from "native-base"
import { background } from "native-base/lib/typescript/theme/styled-system"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import {
  TextInput,
  TextStyle,
  ViewStyle,
  View,
  Image,
  ImageBackground,
  Platform,
  useWindowDimensions
} from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../components"
import Footer from "../components/Footer"

import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `SignUpCategory: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="SignUpCategory" component={SignUpCategoryScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const SignUpCategoryScreen: FC<StackScreenProps<AppStackScreenProps, "SignUpCategory">> =
  observer(function SignUpCategoryScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()

    const navigation = useNavigation<any>()
    const window = useWindowDimensions();
    // const [isCheckedBusiness, setIsChecked] = useState(true);
    const [isCheckedBusiness, setIsCheckedBusiness] = useState(true);
    const [isCheckedInfluencer, setIsCheckedInfluencer] = useState(false);
  

    const flex_direction = useBreakpointValue({
      base: 'column-reverse',
      sm: 'column-reverse',
      md: 'column-reverse',
      lg: 'row',
      xl: 'row',
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
    // const mobile_background_h_w = useBreakpointValue({
    //   base: 230,
    //   sm: 250,
    //   md: 350,
    //   lg: 450,
    //   xl: '',
    // })
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
      lg: 30,
      xl: 20,
    })
  
    const flex_form_height = useBreakpointValue({
      base: window.height,
      sm: window.height,
      md: window.height,
      lg: window.height,
      xl: window.height,
    })


  

    return (
      <Screen style={$root} preset="scroll">
        {/* <Image
                style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 10, opacity: .2}}
                source={require('../../assets/images/backgroundOverlays/delete.png')}
                /> */}

        <View style={{ flex: 1, flexDirection: flex_direction, height: "100%" }}>
          <View
            style={{
              flex: flex_form_size,
              backgroundColor: "white",
              height: flex_form_height,
              padding: 10,
              paddingLeft: 20,
              paddingRight: 20,
            }}
          >
            {logo_show === true && (
              <Image
                style={{ width: 160, height: 70 }}
                source={require("../../assets/images/logo_2x.png")}
              />
            )}

            <View style={{ flex: 3 }}>
              <Text
                testID="login-heading"
                tx="signUpCategoryScreen.signUp"
                preset="h1"
                style={[$signIn, { textAlign: "center", marginTop: margin , marginLeft: 65}]}
              />

              <View style={$social_icons_container}>
                <View style={{ alignItems: "center", flex: 1 , marginLeft: 65 }}>
                  <Text preset="body" style={$login_with}>
                    Please select one category
                  </Text>
                </View>
              </View>

              <View style={{flexDirection: 'row'}}>
                <View style={[$card,{height: 160, width: '30%', backgroundColor: '#EAF8FF', marginLeft: 105, marginTop: 35}]}>
                  <View style={{alignSelf: 'flex-end', padding: 5}}>
                    <Checkbox isChecked={isCheckedBusiness} colorScheme="blue" value='a' onChange={()=>{setIsCheckedBusiness(!isCheckedBusiness); setIsCheckedInfluencer(!isCheckedInfluencer);}}/>
                  </View>
                  <Image
                    style={{ width: 35, height: 35, alignSelf: 'center', margin: 10 }}
                    source={require("../../assets/images/backgrounds/signup_category_icon2.png")}
                    />
                  <Text preset="h3" style={[$login_with, {fontSize: 14}]}>Business</Text>
                  <Text preset="body" style={[$login_with, {fontSize: 13}]}>You are looking for an influencer.</Text>
                
                </View>
                <View style={{height: 160, width: '40%', marginLeft: 10, marginTop: 35}}>
                  <View style={{alignSelf: 'flex-end', padding: 5}}>
                      <Checkbox isChecked={isCheckedInfluencer} colorScheme="blue" value='a' onChange={()=>{setIsCheckedInfluencer(!isCheckedInfluencer); setIsCheckedBusiness(!isCheckedBusiness); }}/>
                  </View>
                <Image
                  style={{ width: 35, height: 35, alignSelf: 'center', margin: 10 }}
                  source={require("../../assets/images/backgrounds/signup_category_icon1.png")}
                  />
                  <Text preset="h3" style={[$login_with, {fontSize: 14}]}>Influencer</Text>
                  <Text preset="body" style={[$login_with, {fontSize: 13, paddingLeft: 20, paddingRight: 20}]}>You can help brands.</Text>
                
                </View>
              </View>

              <Button
                testID="login-button"
                tx="signUpCategoryScreen.tapToSubmit"
                style={$tapButton}
                preset="reversed"
                onPress={() => {
                  navigation.navigate("Signup")
                }}
              />
              <Text preset="body" style={{marginLeft: 95}}>
                Already have an account?
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Signin")
                  }}
                >
                  <Text style={{ color: "blue", marginTop: 10 }}>Sign In</Text>
                </TouchableOpacity>
              </Text>
              {window.height >= 700 ?<View style={{height: 400, zIndex: -1, backgroundColor: 'white', marginLeft: -25, marginRight: -25}}></View>: <></>} 
            {window.height >= 1100 ?<View style={{height: 450, zIndex: -1, backgroundColor: 'white', marginLeft: -25, marginRight: -25}}></View>: <></>} 
            </View>
          </View>

          <View style={{ flex: flex_image_size }}>
            <Image
              style={{
                width: width,
                height: height,
                marginLeft: 65,
                marginTop: 50,
                zIndex: 2,
                alignSelf: "center",
              }}
              source={require("../../assets/images/backgrounds/signUp_category_image.png")}
              resizeMode="contain"
            />
            {/* {
              mobile_background === true ?  
                <Image
                style={{ width: '100%', height: height_width, marginLeft: 10, zIndex: 2, alignSelf: 'center', backgroundColor: 'white'}}
                source={require("../../assets/images/backgrounds/mobile_background.png")}
                resizeMode="contain"
              /> : 
              <Image
              style={{ width: height_width, height: height_width, marginLeft: 10, zIndex: 2, alignSelf: 'center' }}
              source={require("../../assets/images/backgrounds/sign_in_image.png")}
              resizeMode="contain"
            />
            } */}
          </View>
        </View>
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
    textAlign: 'center'
  }
  const $textFieldPhone: ViewStyle = {
    flexDirection: 'column',
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
  }
  
  const $tapButton: ViewStyle = {
    marginTop: 10,
    marginLeft: 95,
    backgroundColor: '#127AD0',
    borderRadius: 100,
    minHeight: 10,
    width: '70%'
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
    // paddingVertical: 10,
    // paddingHorizontal: 10,
    // alignContent: "center",
    alignItems: 'center',
    // height: 150,
    flexDirection: 'column'
  }
  
  const $card: ViewStyle = {
    shadowColor: "rgba(0, 0, 0, 0.12)",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
  }
  
