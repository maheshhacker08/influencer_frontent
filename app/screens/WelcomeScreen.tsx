import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { ViewStyle, ImageBackground, Image } from "react-native"
import { Screen, Text, Button } from "../components"
import { useStores } from "../models" // @demo remove-current-line
import { AppStackScreenProps } from "../navigators" // @demo remove-current-line
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { AboutUsScreenHome } from "./AboutUsScreen"
import Footer from "../components/Footer"
import { View, useBreakpointValue, Stack, Box, VStack, Divider, HStack } from "native-base"
import { HowItWorksScreen } from "./HowItWorksScreen"
import { BlogsScreenHome } from "./BlogsScreen"
import { LinearGradient } from "expo-linear-gradient"
import { SliderBox } from "react-native-image-slider-box"
import { useNavigation } from "@react-navigation/native"
import { BottomNavigation, TopNavigation } from "../navigators/Navigation"

export const CarouselContainer = observer(function CarouselContainer(
  _props, // @demo remove-current-line
) {


  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])
  const flexDir_hero = useBreakpointValue({
    base: "column-reverse",
    sm: "column-reverse",
    md: "row",
    lg: "row",
    xl: "row",
  })
  const align_self = useBreakpointValue({
    base: "center",
    sm: "center",
  })
  const hero_heading_font_size = useBreakpointValue({
    base: 30,
    sm: 30,
    md: 40,
    lg: 56,
    xl: 56,
  })
  const hero_heading_line_height = useBreakpointValue({
    base: 45,
    sm: 45,
    md: 50,
    lg: 56,
    xl: 67,
  })
  const hero_heading_marginTop = useBreakpointValue({
    // base: -65,
    // sm: -65,
  })
  const hero_image_marginRight = useBreakpointValue({
    base: 0,
    sm: 0,
    md: 20,
    lg: 20,
    xl: 20,
  })
  const hero_image_marginLeft = useBreakpointValue({
    base: 0,
    sm: 0,
    md: -20,
    lg: 0,
    xl: 0,
  })
  const flex_ratio = useBreakpointValue({
    base: 3,
    sm: 2,
    lg: 2,
  })

  const hero_image_size = useBreakpointValue({
    base: 300,
    sm: 350,
    md: 350,
    lg: 450,
    xl: 500,
  })

  const images = [
    // "https://source.unsplash.com/1024x768/?nature",
    // "https://source.unsplash.com/1024x768/?water",
    // "https://source.unsplash.com/1024x768/?girl",
    // "https://source.unsplash.com/1024x768/?tree", // Network image
    // require('../../assets/images/backgrounds/hero_image.png'),          // Local image
  ]


  return (
    <View style={[$container, { flexDirection: flexDir_hero }]}>
      <View style={[$innerContainer1, { flex: flex_ratio, justifyContent: "center" }]}>
        <Text
          preset="heroH1"
          style={{
            fontSize: hero_heading_font_size,
            lineHeight: hero_heading_line_height,
            marginTop: hero_heading_marginTop,
          }}
        >
          Find the right Influencer for your business.
        </Text>
        <Text preset="body">
          An Influencer Marketing Platform is a software solution designed to assist brands with
          their Influencer Marketing Campaigns. Influencer Marketing Platforms provide influencer
          discovery tools for brands and agencies.
        </Text>

        {/* <Button testID="login-button" style={$tapButton} preset="reversed">
          As a Business
        </Button> */}
      </View>
      <View style={[$innerContainer2, { flex: 2, margin: 10 }]}>
        {/* <SliderBox images={images} /> */}
        <Image
          style={{
            width: hero_image_size,
            height: hero_image_size,
            zIndex: 2,
            marginRight: hero_image_marginRight,
            marginLeft: hero_image_marginLeft,
            alignSelf: align_self,
          }}
          source={require("../../assets/images/backgrounds/hero_image.png")}
          resizeMode="contain"
        />
        {/* hero_image */}
      </View>
    </View>
  )
})


interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {} // @demo remove-current-line

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen(
  _props, // @demo remove-current-line
) {
  // @demo remove-block-start
  // const { navigation } = _props
  const {
    authenticationStore: { logout },
  } = useStores()

  const carousel_container_height = useBreakpointValue({
    base: 800,
    sm: 750,
    md: 550,
    lg: 550,
    xl: 550,
  })

  const about_container_height = useBreakpointValue({
    base: 900,
    sm: 800,
    md: 500,
    lg: 450,
    xl: 450,
  })
  const signUpNow_marginTop = useBreakpointValue({
    base: -550,
    sm: -500,
    md: -200,
    lg: 20,
    xl: 100,
  })
  const signUpNow_fontSize = useBreakpointValue({
    base: 18,
    sm: 20,
    md: 25,
    lg: 32,
    xl: 32,
  })
  const signUpNow_button_size = useBreakpointValue({
    base: 120,
    sm: 130,
    md: 140,
    lg: 150,
    xl: 150,
  })
  const signUpNow_button_fontsize = useBreakpointValue({
    base: 12,
    sm: 12,
    md: 13,
    lg: 14,
    xl: 14,
  })
  const signUpNow_container_width = useBreakpointValue({
    base: "90%",
    sm: "90%",
    md: 600,
    lg: 650,
    xl: 700,
  })

  // function goNext() {
  //   navigation.navigate("Demo", { screen: "DemoShowroom" })
  // }

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])
  const navigation = useNavigation<any>()
  const { authenticationStore: { isAuthenticated } } = useStores()
  return (
    <Screen style={$root} preset="scroll">
      <TopNavigation navigation={navigation} />
      {isAuthenticated && 
        <BottomNavigation navigation={navigation} />
      }
      <VStack space={50} mt={useBreakpointValue({ base: -50, lg: 0 })}>
        {/* TOP SLIDER SECTION */}
        <View        
          style={{
            height: carousel_container_height,
            marginBottom: 10,
            backgroundColor: "#F0ECFD",
          }}
        >
          <ImageBackground
            source={require("../../assets/images/backgrounds/home_banner.png")}
            resizeMode="stretch"
          >
            <CarouselContainer />
          </ImageBackground>
        </View>      
        {/* ABOUT US */}
        <AboutUsScreenHome />
        {/* HOW IT WORKS */}
        <VStack space={3} mx={10}>
          <View style={{ alignItems: "center", marginTop: 50 }}>
            <Text preset="h1" style={{ color: "#022F46" }}>
              How It Works
            </Text>
            <Text preset="h3" style={{textDecorationLine:"underline"}}>(For Business)</Text>
          </View>
          <Stack direction={useBreakpointValue({ base: "column", md: "row" })} space={3}>
            <VStack
              px={5}
              py={5}
              space={3}
              justifyContent="center"
              alignItems="center"
              bg="white"
              width={useBreakpointValue({ base: "100%", md: "33%" })}
              borderTopRightRadius={50}
              borderBottomLeftRadius={50}
            >
              <Image
                style={{
                  width: useBreakpointValue({ base: 50 }),
                  height: useBreakpointValue({ base: 50 }),
                }}
                source={require("../../assets/images/backgrounds/icon1.png")}
              />
              <Text
                style={{
                  fontFamily: "Poppins_500Medium",
                  fontSize: 24,
                  lineHeight: 29,
                  color: "#354a66",
                }}
              >
                Register with Us
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 15,
                  lineHeight: 21,
                  color: "#545454",
                  overflow: "hidden",
                  textAlign: "center",
                }}
              >
                {/* <Text preset="body"> */}
                Do the easy signup as a business using your existing social media accounts. other interesting options are also available on signup page. Just click on Sign in and you will get all about it.
              </Text>
            </VStack>
            <VStack
              px={5} 
              py={5}
              space={3}
              justifyContent="center"
              alignItems="center"
              bg="white"
              width={useBreakpointValue({ base: "100%", md: "33%" })}
              borderTopRightRadius={50}
              borderTopLeftRadius={50}
            >
              <Image
                style={{
                  width: useBreakpointValue({ base: 50 }),
                  height: useBreakpointValue({ base: 50 }),
                }}
                source={require("../../assets/images/backgrounds/icon2.png")}
              />
              <Text
                style={{
                  fontFamily: "Poppins_500Medium",
                  fontSize: 24,
                  lineHeight: 29,
                  color: "#354a66",
                }}
              >
                Search Influencers
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 15,
                  lineHeight: 21,
                  color: "#545454",
                  overflow: "hidden",
                  textAlign: "center",
                }}
              >
                {/* <Text preset="body"> */}
                Search Influencers Relevant to Your Business, Search and find influencers in India based on categories, topics, hashtags, bio mentions, interests, professions and more, across 5 major platforms: Instagram, YouTube, Facebook, Twitter & Blog.
              </Text>
            </VStack>
            <VStack
              px={5}
              py={5}
              space={3}
              justifyContent="center"
              alignItems="center"
              bg="white"
              width={useBreakpointValue({ base: "100%", md: "33%" })}
              borderBottomRightRadius={50}
              borderTopLeftRadius={50}
            >
              <Image
                style={{
                  width: useBreakpointValue({ base: 50 }),
                  height: useBreakpointValue({ base: 50 }),
                }}
                source={require("../../assets/images/backgrounds/icon4.png")}
              />
              <Text
                style={{
                  fontFamily: "Poppins_500Medium",
                  fontSize: 24,
                  lineHeight: 29,
                  color: "#354a66",
                }}
              >
                Add to wishlist
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 15,
                  lineHeight: 21,
                  color: "#545454",
                  overflow: "hidden",
                  textAlign: "center",
                }}
              >
                {/* <Text preset="body"> */}
                Add to wishlist Influencers within your budget Narrow down the right influencers using flexible filters ranging from influence spectrum, to audience distribution.Add influencers to wishlist. They will be in your cart.
              </Text>
            </VStack>
          </Stack>
          <Stack direction={useBreakpointValue({ base: "column", md: "row" })} space={3}>
            <VStack
              px={5}
              py={5}
              space={3}
              justifyContent="center"
              alignItems="center"
              bg="white"
              width={useBreakpointValue({ base: "100%", md: "33%" })}
              borderBottomRightRadius={50}
              borderTopLeftRadius={50}
            >
              <Image
                style={{
                  width: useBreakpointValue({ base: 50 }),
                  height: useBreakpointValue({ base: 50 }),
                }}
                source={require("../../assets/images/backgrounds/icon5.png")}
              />
              <Text
                style={{
                  fontFamily: "Poppins_500Medium",
                  fontSize: 24,
                  lineHeight: 29,
                  color: "#354a66",
                }}
              >
                Create Campaign
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 15,
                  lineHeight: 21,
                  color: "#545454",
                  overflow: "hidden",
                  textAlign: "center",
                }}
              >
                {/* <Text preset="body"> */}
                Save additional details for your search. It's important to have it clearly established before you begin working together. Failing to do this could lead to a lot of miscommunication further down the line. Here you can add your details for this campaigns and answers few questions.
              </Text>
            </VStack>
            <VStack
              px={5}
              py={5}
              space={3}
              justifyContent="center"
              alignItems="center"
              bg="white"
              width={useBreakpointValue({ base: "100%", md: "33%" })}
              borderBottomRightRadius={50}
              borderBottomLeftRadius={50}
            >
              <Image
                style={{
                  width: useBreakpointValue({ base: 50 }),
                  height: useBreakpointValue({ base: 50 }),
                }}
                source={require("../../assets/images/backgrounds/icon6.png")}
              />
              <Text
                style={{
                  fontFamily: "Poppins_500Medium",
                  fontSize: 24,
                  lineHeight: 29,
                  color: "#354a66",
                }}
              >
                Submit Query
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 15,
                  lineHeight: 21,
                  color: "#545454",
                  overflow: "hidden",
                  textAlign: "center",
                }}
              >
                {/* <Text preset="body"> */}
                ReachOut & Connect. These individuals are likely to receive hundreds of brand propositions every day, so it's important to stand out. So our team will connect with shortlisted  candidates in a most professional way and hire them for you.
              </Text>
            </VStack>
            <VStack
              px={5}
              py={5}
              space={3}
              justifyContent="center"
              alignItems="center"
              bg="white"
              width={useBreakpointValue({ base: "100%", md: "33%" })}
              borderTopRightRadius={50}
              borderBottomLeftRadius={50}
            >
              <Image
                style={{
                  width: useBreakpointValue({ base: 60 }),
                  height: useBreakpointValue({ base: 50 }),
                }}
                source={require("../../assets/images/backgrounds/icon3.png")}
              />
              <Text
                style={{
                  fontFamily: "Poppins_500Medium",
                  fontSize: 24,
                  lineHeight: 29,
                  color: "#354a66",
                }}
              >
                Work with Experts
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 15,
                  lineHeight: 21,
                  color: "#545454",
                  overflow: "hidden",
                  textAlign: "center",
                }}
              >
                {/* <Text preset="body"> */}
                We will help you exectuing your campaign with finalized influencer with all the required agreemnts and copyrights in place, along with studio work which includes shooting, dubbing, editing and recording.
              </Text>
            </VStack>
          </Stack>
        </VStack>
        {/* START SEARCH */}
        <LinearGradient
          colors={["rgba(172, 203, 238, 1)", "rgba(231, 240, 253, 1)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            backgroundColor: "#ACCBEE",
            width: signUpNow_container_width,
            height: 100,
            marginBottom: 50,
            margin: 10,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            shadowColor: "rgba(0, 0, 0, 0.12)",
            shadowOffset: { width: -2, height: 4 },
            shadowOpacity: 0.9,
            shadowRadius: 3,
          }}
        >
          <Stack direction={useBreakpointValue({ base: "column", md: "row" })} alignItems="center">
            <Text preset="h2" style={{ fontSize: signUpNow_fontSize }}>
              Start Search for Influencer{" "}
            </Text>
            <Button
              onPress={()=>{
                navigation.navigate("Signin")
              }}
              testID="login-button"
              style={[$signUpNowButton, { width: signUpNow_button_size }]}
              preset="reversed"
            >
              <Text style={{ fontSize: signUpNow_button_fontsize, color: "white" }}>
                Sign In Now
              </Text>
            </Button>
          </Stack>
        </LinearGradient>
        {/* BLOG SECTION */}
        <BlogsScreenHome />
      </VStack>
      {/* FOOTER SECTION */}
      <Footer />
    </Screen>
  )
})

// const $screenContentContainer: ViewStyle = {
//   paddingVertical: 0,
//   paddingHorizontal: 0,
//   marginTop: 20,

// }

const $root: ViewStyle = {
  flex: 1,
}

const $container: ViewStyle = {
  // flex: 1,
  // flexDirection: 'row',
  // backgroundColor: colors.background,
  height: "100%",
  paddingVertical: 10,
  paddingHorizontal: 10,
  margin: 10,
}

const $innerContainer1: ViewStyle = {
  flex: 3,
  flexDirection: "column",
  // backgroundColor: colors.background,
  paddingVertical: 20,
  paddingHorizontal: 20,
  margin: 20,
}
const $innerContainer2: ViewStyle = {
  flex: 2,
  flexDirection: "column",
  // backgroundColor: 'white',
}

const $tapButton: ViewStyle = {
  // marginTop: spacing.extraSmall,
  marginTop: 20,
  backgroundColor: "#127AD0",
  borderRadius: 100,
  minHeight: 0,
  width: 200,
}
const $signUpNowButton: ViewStyle = {
  // marginTop: spacing.extraSmall,
  marginLeft: 20,
  backgroundColor: "#127AD0",
  borderRadius: 100,
  minHeight: 0,
  // width: 150
}
