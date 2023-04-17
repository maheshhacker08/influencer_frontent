// ---
// patch:
//   path: "app/screens/index.ts"
//   append: "export * from \"./AboutUsScreen\"\n"
//   skip:
// ---
import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, Pressable } from "react-native"
import { useStores } from "../models"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Screen, Text } from "../components"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import Footer from "../components/Footer"
import { View, useBreakpointValue, VStack, Stack, Image, HStack, Button, Box } from "native-base"
import { LinearGradient } from "expo-linear-gradient"
import { BottomNavigation, TopNavigation } from "../navigators/Navigation"

import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
// import { useStores } from "../models"

export const AboutUsScreenHome = observer(function AboutUsScreen() {
  const {
    authenticationStore: { logout },
  } = useStores()

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])
  const navigation = useNavigation<any>()
  const flexDir = useBreakpointValue({
    base: "column",
    sm: "column",
    md: "row",
    lg: "row",
    xl: "row",
  })

  const about_image_size = useBreakpointValue({
    base: 300,
    sm: 300,
    md: 350,
    lg: 400,
    xl: 400,
  })
  const flex_ratio = useBreakpointValue({
    base: 2,
    sm: 3,
    md: 2,
    lg: 2,
    xl: 2,
  })
  const align_self = useBreakpointValue({
    base: "center",
    sm: "center",
  })

  return (
    <VStack space={useBreakpointValue({ base: 5, md: 10 })}>
      <Text preset="h1" style={$heading_about}>
        About Us
      </Text>
      <Stack
        space={useBreakpointValue({ base: 10, md: 20 })}
        mx={20}
        direction={useBreakpointValue({ base: "column", md: "row" })}
      >
        <Image
          width={useBreakpointValue({ base: "100%", md: "40%" })}
          style={{
            height: about_image_size,
            alignSelf: align_self,
          }}
          source={require("../../assets/images/backgrounds/about_image.png")}
          resizeMode="contain"
        />
        <VStack space={3} width={useBreakpointValue({ base: "100%", md: "50%" })}>
          <Text preset="body" style={{ textAlign: "justify" }}>
            <p>
              Headquartered in Jaipur, India, SocioFusion is one of the largest independent
              marketing agencies that provides results-driven, full-funnel digital marketing
              solutions to companies in the Asia Pacific region. we have thousands of clients from
              small and medium enterprises (SMEs) to multinational corporations (MNCs) and large
              government agencies.
            </p>
            <p>
              We create custom, fully integrated celebrity-driven social media campaigns through the
              power of strategic influencer marketing and communication strategies.Our other digital
              services like creative strategy, performance marketing, community management, app
              store and search engine optimization let us execute campaigns across countries.
            </p>
            <p>
              We provide 360 degree marketing solutions in facebook,Instagram,linked in marketing.
              other than that we provide youtube marketing and community management service.
            </p>
          </Text>
          <Button
            testID="login-button"
            style={$tapButton}
            onPress={() => {
              navigation.navigate("About Us")
            }}
          >
            More info →
          </Button>
        </VStack>
      </Stack>
    </VStack>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: 0,
  paddingHorizontal: 0,
  marginTop: 20,
}

const $aboutContainer: ViewStyle = {
  flex: 1,
  // backgroundColor: '#F0ECFD',
  // height: 150,
  paddingVertical: 10,
  paddingHorizontal: 10,
  // flexDirection: 'lg'?'row':'column',
  margin: 10,
}

const $heading_about: TextStyle = {
  flex: 1,
  textDecorationLine: "underline",
  textDecorationStyle: "solid",
  textDecorationColor: "#022F46",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  color: "#022F46",
}

const $innerContainer_about: ViewStyle = {
  flex: 1,
  // flexDirection: 'row',
  paddingVertical: 10,
  paddingHorizontal: 10,
  margin: 10,
}

const $innerContainer1_about: ViewStyle = {
  // flex: 2,
  flexDirection: "column",
  margin: 10,
  // backgroundColor: colors.background,
}

const $content_container: ViewStyle = {
  flex: 3,
  flexDirection: "column",
  // backgroundColor: 'white',
  margin: 10,
}
const $tapButton: ViewStyle = {
  // marginTop: spacing.extraSmall,
  marginTop: 20,
  backgroundColor: "#127AD0",
  borderRadius: 100,
  minHeight: 0,
  width: 200,
}

//--------------About page----------

export const AboutUsScreenMain = observer(function AboutUsScreen() {
  const {
    authenticationStore: { logout },
  } = useStores()

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  const flexDir_1_container = useBreakpointValue({
    base: "column-reverse",
    sm: "column-reverse",
    md: "row",
    lg: "row",
    xl: "row",
  })
  const flexDir_2_container = useBreakpointValue({
    base: "column",
    sm: "column",
    md: "row",
    lg: "row",
    xl: "row",
  })
  const flex_ratio_image = useBreakpointValue({
    base: 1,
    sm: 1,
    md: 2,
    lg: 2,
    xl: 2,
  })
  const margin_top_container1 = useBreakpointValue({
    base: -90,
    sm: -90,
    md: 1,
    lg: 1,
    xl: 1,
  })
  const margin_top = useBreakpointValue({
    base: -150,
    sm: -150,
    md: 1,
    lg: 1,
    xl: 1,
  })
  const content_image_container_mt = useBreakpointValue({
    base: 1,
    sm: 1,
    md: -120,
    lg: -120,
    xl: -120,
  })

  const image_size = useBreakpointValue({
    base: 200,
    sm: 250,
    md: 300,
    lg: 450,
    xl: 450,
  })
  const horizontal_image_size = useBreakpointValue({
    base: 350,
    sm: 430,
    md: 400,
    lg: 550,
    xl: 550,
  })
  const about_image3_horizontal = useBreakpointValue({
    base: true,
    sm: true,
    md: false,
    lg: false,
    xl: false,
  })
  const about_image3_ml = useBreakpointValue({
    md: -60,
    lg: -30,
    xl: 30,
  })
  const signUp_mt = useBreakpointValue({
    base: 800,
    sm: 700,
    md: 350,
    lg: 60,
    xl: 10,
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

  const navigation = useNavigation<any>()
  const {
    authenticationStore: { isAuthenticated },
  } = useStores()
  return (
    <Screen style={$root} preset="scroll">
      <TopNavigation navigation={navigation} />
      {isAuthenticated && <BottomNavigation navigation={navigation} />}
      <VStack space={10} mt={useBreakpointValue({ base: -50, lg: 0 })}>
        <HStack
          width="100%"
          alignItems="center"
          mt={useBreakpointValue({ base: 5, lg: 10 })}
          mx={useBreakpointValue({ base: 5, lg: 10 })}
        >
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={20} color="gray.400" width="8.5%"/>
          </Pressable>
          <Text
            preset={useBreakpointValue({ base: "h4", md: "h3", lg: "h1" })}
            style={{              
              width:"91.5%",
              color: "#022F46",
              textDecorationLine: useBreakpointValue({ base: "none", md: "underline" }),
              textAlign: useBreakpointValue({ base: "left", md: "center" }),
              marginLeft: useBreakpointValue({ base: 10, md: 0 }),
            }}
          > About Us
          </Text>
           
        </HStack>
        <Stack
          mx={10}
          direction={useBreakpointValue({ base: "column-reverse", md: "row" })}
          space={useBreakpointValue({ base: 5, md: 15 })}
        >
          <VStack width={useBreakpointValue({ base: "100%", md: "50%" })}>
            <Text
              preset="h2"
              style={{
                flexBasis: "auto",
                justifyContent: "center",
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              Our Story
            </Text>
            <Text preset="body" style={{ justifyContent: "center", textAlign: "justify" }}>
              <p>
                Headquartered in Jaipur, India, SocioFusion is one of the largest independent
                marketing agencies that provides results-driven, full-funnel digital marketing
                solutions to companies in the Asia Pacific region. we have thousands of clients from
                small and medium enterprises (SMEs) to multinational corporations (MNCs) and large
                government agencies.
              </p>

              <p>
                We create custom, fully integrated celebrity-driven social media campaigns through
                the power of strategic influencer marketing and communication strategies.Our other
                digital services like creative strategy, performance marketing, community
                management, app store and search engine optimization let us execute campaigns across
                countries.
              </p>

              <p>
                We provide 360 degree marketing solutions in facebook,Instagram,linked in marketing.
                other than that we provide youtube marketing and community management service.
              </p>
            </Text>
          </VStack>
          <Image
            style={{ width: image_size, height: image_size, marginLeft: 30, zIndex: 2 }}
            source={require("../../assets/images/backgrounds/about_image1.png")}
            resizeMode="contain"
            alignSelf="center"
          />
        </Stack>
        <Stack
          mx={10}
          direction={useBreakpointValue({ base: "column", md: "row" })}
          space={useBreakpointValue({ base: 5, md: 15 })}
        >
          <Image
            style={{ width: image_size, height: image_size, marginLeft: 30, zIndex: 2 }}
            source={require("../../assets/images/backgrounds/about_image2.png")}
            resizeMode="contain"
            alignSelf="center"
          />
          <VStack width={useBreakpointValue({ base: "100%", md: "50%" })}>
            <Text
              preset="h2"
              style={{
                flexBasis: "auto",
                justifyContent: "center",
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              Our Approach/Skills
            </Text>
            <Text preset="body" style={{ justifyContent: "center", textAlign: "justify" }}>
              <p>
                We have a proven record of successful influencer marketing campaigns and we know how to make any influencer campaign work. Our process is simple and effective and our team is passionate and looking to bring your company to the next level.
              </p>

              <p>
                Our in-house team manages everything from creating the content strategy to profiling influencers across multiple social media platforms, managing them, and analysing the campaign. They define posting strategies such as social media takeovers and giveaways to build hype around the brand. And also helping clients engage influencers, so they turn out to be brand advocates.
              </p>

              <p>
                Our Team has worked across all aspects of marketing, social media, digital, and media industries.
              </p>

              <p>
                The core TR team has been working together for a sustained amount of time and internally we are an agency that consistently works on projects together, spends time in conjunction with each other. We feed off of each other and have built a staff of like-minded individuals who thrive on executing as a team and working on a variety of different projects within the entertainment space.
              </p>

              <p>
                Technology have remained our main focus area of our business. we build our own software and database. Our team constantly engaged in updating database of influencers in each state and country.
              </p>
            </Text>
          </VStack>
        </Stack>
        <Stack
          mx={10}
          direction={useBreakpointValue({ base: "column-reverse", md: "row" })}
          space={useBreakpointValue({ base: 5, md: 15 })}
        >
          <VStack width={useBreakpointValue({ base: "100%", md: "50%" })}>
            <Text
              preset="h2"
              style={{
                flexBasis: "auto",
                justifyContent: "center",
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              Our Process
            </Text>
            <View>
              <Image
                style={{ width: 45, height: 45, marginLeft: 10, zIndex: 2 }}
                source={require("../../assets/images/backgrounds/one.png")}
                resizeMode="contain"
              />
              <Text preset="body" style={{ justifyContent: "center" }}>
                Register with Us. First register in our site and add some basic details.
              </Text>
            </View>
            <View>
              <Image
                style={{ width: 45, height: 45, marginLeft: 10, zIndex: 2 }}
                source={require("../../assets/images/backgrounds/two.png")}
                resizeMode="contain"
              />
              <Text preset="body" style={{ justifyContent: "center", textAlign:"justify" }}>
                Locate Influencers Relevant to Your Business, Search and find influencers in India based on categories, topics, hashtags, bio mentions, interests, professions and more, across 5 major platforms: Instagram, YouTube, Facebook, Twitter & Blog.
              </Text>
            </View>
            <View>
              <Image
                style={{ width: 45, height: 45, marginLeft: 10, zIndex: 2 }}
                source={require("../../assets/images/backgrounds/three.png")}
                resizeMode="contain"
              />
              <Text preset="body" style={{ justifyContent: "center", textAlign:"justify" }}>
                Add to wishlist Influencers within your budget Narrow down the right influencers using flexible filters ranging from influence spectrum, to audience distribution.Add influencers to wishlist. They will be in your cart.
              </Text>
            </View>
            <View>
              <Image
                style={{ width: 45, height: 45, marginLeft: 10, zIndex: 2 }}
                source={require("../../assets/images/backgrounds/four.png")}
                resizeMode="contain"
              />
              <Text preset="body" style={{ justifyContent: "center", textAlign:"justify" }}>
                Save additional details for your search. It's important to have it clearly established before you begin working together. Failing to do this could lead to a lot of miscommunication further down the line. Here you can add your details for this campaigns and answers few questions.
              </Text>
            </View>
            <View>
              <Image
                style={{ width: 45, height: 45, marginLeft: 10, zIndex: 2 }}
                source={require("../../assets/images/backgrounds/five.png")}
                resizeMode="contain"
              />
              <Text preset="body" style={{ justifyContent: "center", textAlign:"justify" }}>
                ReachOut & Connect. These individuals are likely to receive hundreds of brand propositions every day, so it's important to stand out. So our team will connect with shortlisted  candidates in a most professional way and hire them for you.
              </Text>
            </View>
          </VStack>
          <Image
            width={useBreakpointValue({ base: "100%", md: "40%" })}
            height={useBreakpointValue({ base: 200, md: "100%" })}
            source={useBreakpointValue({
              base: require("../../assets/images/backgrounds/about_image3_horizontal.png"),
              md: require("../../assets/images/backgrounds/about_image3.png"),
            })}
            resizeMode="contain"
            alignSelf="center"
          />
        </Stack>
        {/* START SEARCH */}
        <LinearGradient
          colors={["rgba(172, 203, 238, 1)", "rgba(231, 240, 253, 1)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            backgroundColor: "#ACCBEE",
            width: signUpNow_container_width,
            height: 100,
            marginBottom: 10,
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
              onPress={() => {
                navigation.navigate("Signin")
              }}
              testID="login-button"
              style={[$signUpNowButton, { width: signUpNow_button_size }]}
            >
              <Text style={{ fontSize: signUpNow_button_fontsize, color: "white" }}>
                Sign In Now
              </Text>
            </Button>
          </Stack>
        </LinearGradient>
        <View>
          <Footer />
        </View>
      </VStack>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $heading_about_main: TextStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
}
const $content_image_container: ViewStyle = {
  flex: 1,
  // backgroundColor: '#F0ECFD',
  height: 150,
  paddingVertical: 10,
  paddingHorizontal: 10,
  // flexDirection: 'lg'?'row':'column',
  margin: 10,
}
const $signUpNowButton: ViewStyle = {
  // marginTop: spacing.extraSmall,
  marginLeft: 20,
  backgroundColor: "#127AD0",
  borderRadius: 100,
  minHeight: 0,
  // width: 150
}
