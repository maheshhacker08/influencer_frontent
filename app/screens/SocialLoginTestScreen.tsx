import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Screen } from "../components"
import * as WebBrowser from "expo-web-browser"
import * as Google from "expo-auth-session/providers/google"
import { Button } from "react-native"
import { useNavigation } from "@react-navigation/native"
import * as Facebook from "expo-auth-session/providers/facebook"
import { ResponseType } from "expo-auth-session"
import { create } from "apisauce"
import { HStack, Image, Pressable, useBreakpointValue, VStack, Text, Stack, Box } from "native-base"
import { Ionicons } from "@expo/vector-icons"

WebBrowser.maybeCompleteAuthSession()

// // define the api
// const api = create({
//   baseURL: 'https://buntybook.com',
//   headers: { Accept: ' application/json' },
// })

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `SocialLoginTest: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="SocialLoginTest" component={SocialLoginTestScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const SocialLoginTestScreen = observer(function SocialLoginTestScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  React.useEffect(() => {
    // start making calls
    // api
    // .get('/sports/master')
    // .then(response => console.log('responseeeeeeeeee', response))
    // .then(console.log)
  }, [])

  const navigation = useNavigation<any>()

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "339665384098-6k5vcs13bm5qq2it18h2pb9csvftoqoo.apps.googleusercontent.com",
    // iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    // androidClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    // webClientId: '339665384098-56chlgth79aasd5vke3ean2t5ungaded.apps.googleusercontent.com',
    webClientId: "339665384098-6k5vcs13bm5qq2it18h2pb9csvftoqoo.apps.googleusercontent.com",
  })

  // expo start --https
  const [FBrequest, FBresponse, promptFBAsync] = Facebook.useAuthRequest({
    clientId: "587342083217084",
    webClientId: "587342083217084",
    responseType: ResponseType.Code,
  })

  React.useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response
      console.log("raaaaaaaaaaa", authentication)
    } else {
      console.log("error")
    }
    if (FBresponse?.type === "success") {
      const { code } = FBresponse.params
      console.log("facebook,,,,", code)
    } else {
      console.log("facebook error")
    }
  }, [response, FBresponse])
  // console.log('rendered')

  const InfluencerCard = () => {
    return (
      <>       
        <Stack
          overflow="hidden"
          width={["170", "250", "250", "350", "400"]}
          height={["200", "200", "350", "400"]}
          shadow="1"
          padding={[3, 4, 5]}
        >
          <Box
            w={["100%", "100%", "100%"]}
            h={["45%", "45%", "50%"]}
            style={{ flex: useBreakpointValue({ base: 5, sm: 4, md: 3 }) }}
          >
            <Image
              w={["100%", "100%", "100%"]}
              h="100%"
              source={require("../../assets/images/backgrounds/photo2.png")}
              alt="image"
            />
          </Box>
          {/* {
                  ColorRed === true ?  */}

          <Stack
            flex="1"
            p="4"
            space={[3, 3, 1.5]}
            justifyContent="space-around"
            style={{ flex: 1 }}
          >
            <Stack
              direction={["column", "column", "row"]}
              space="2"
              style={{ alignSelf: "center" }}
            >
              <Text
                style={{
                  fontFamily: "Poppins_600SemiBold",
                  fontSize: useBreakpointValue({ base: "16", sm: "16", md: "17", lg: "18" }),
                  lineHeight: 24,
                  color: "rgba(50, 49, 89, 1)",
                  textAlign: "center",
                }}
              >
                {/* {influencer.first_name} {influencer.last_name} */}
                Name
              </Text>

              <Text
                style={{
                  fontFamily: "Poppins_500Medium",
                  fontSize: useBreakpointValue({ base: "11", sm: "11", md: "13", lg: "14" }),
                  lineHeight: 24,
                  color: "#545454",
                  textAlign: "center",
                }}
              >
                {/* ({influencer.Categories}) */}
                {/* ({influencer.profile.data.category}) */}
                category
              </Text>
            </Stack>
            <>
              <HStack space="2" style={{ alignSelf: "center" }}>
                <Text
                  style={{
                    fontFamily: "Poppins_500Medium",
                    fontSize: useBreakpointValue({ base: "11", sm: "12", md: "13", lg: "14" }),
                    lineHeight: 24,
                    color: "#545454",
                    textAlign: "center",
                  }}
                >
                  {/* Rs. {influencer.profile.data.price} */}
                  Rs. 2000
                </Text>
              </HStack>
              <HStack alignItems="center" space={["1", "2", "4"]} justifyContent="space-between">
                <Image
                  w={["4"]}
                  h="10"
                  py="-3"
                  px="-6"
                  source={require("../../assets/icons/divider.png")}
                  alt="image"
                  resizeMode="contain"
                />
                <VStack>
                  <Text>Followers</Text>
                  <Text color="coolGray.600" fontWeight="400" textAlign="center">
                    {/* {influencer.Followers} */}0
                  </Text>
                </VStack>
                <Image
                  w={["4"]}
                  h="10"
                  py="-3"
                  px="-1"
                  source={require("../../assets/icons/divider.png")}
                  alt="image"
                  resizeMode="contain"
                />
                <VStack>
                  <Text>Posts</Text>
                  <Text color="coolGray.600" fontWeight="400" style={{ alignSelf: "center" }}>
                    {/* {influencer.Posts} */}0
                  </Text>
                </VStack>
                <Image
                  w={["4"]}
                  h="10"
                  py="-3"
                  px="-1"
                  source={require("../../assets/icons/divider.png")}
                  alt="image"
                  resizeMode="contain"
                />
                <VStack>
                  <Text>Engagements</Text>
                  <Text color="coolGray.600" fontWeight="400" style={{ alignSelf: "center" }}>
                    {/* {influencer.Engagements} */}0
                  </Text>
                </VStack>
              </HStack>
            </>
          </Stack>
        </Stack>
        {/* </Checkbox.Group> */}
      </>
    )
  }

  return (
    <Screen style={$root} preset="scroll">
      {/* <Button
          disabled={!request}
          title="Login with google"
          onPress={() => {
            promptAsync();
            console.log('login with google');
          }}
        />
        <Button
          disabled={!FBrequest}
          title="Login With Facebook"
          onPress={() => {
            promptFBAsync();}}
        />
        <Button
          // disabled={!request}
          // style={{margin: 10}}
          title="go to home page"
          onPress={() => {
            navigation.navigate("Home")
          }}
        /> */}
      <VStack
        mt={useBreakpointValue({ base: 5, lg: 10 })}
        mx={useBreakpointValue({ base: 5, lg: 10 })}
      >
        <HStack
          // width={'100%'}
          height={100}
          space={5}
          bg="rgba(142, 197, 252, 0.5) 100%)"
          style={{
            // justifyContent: 'center',
            alignItems: "center",
          }}
        >
          {/* <Pressable style={{marginTop: 20, marginLeft: 20}} onPress={() => navigation.goBack()}> */}
          <Pressable style={{ marginLeft: 20 }} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={20} color="gray.400" width="8.5%" />
          </Pressable>
          <Text
            style={{
              width: "91.5%",
              color: "#022F46",
              fontFamily: "Poppins_600SemiBold",
              fontSize: 24,
              lineHeight: 29,
              // marginTop: 17,
            }}
          >
            Profile Details
          </Text>
        </HStack>
        <HStack bg="white">
          <InfluencerCard />
          <Box
            style={{
              flex: 1,
              flexWrap: "wrap",
              flexDirection: "row",
              alignContent: "flex-start",
              padding: 10,
            }}
          >
            <Text
              w={"33%"}
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                lineHeight: 21,
                padding: 10,
                color: "#9C9DA5",
              }}
            >
              First Name:{" "}
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 14,
                  lineHeight: 21,
                  padding: 10,
                  color: "#747474",
                }}
              >
                Test
              </Text>
            </Text>
            <Text
              w={"33%"}
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                lineHeight: 21,
                padding: 10,
                color: "#9C9DA5",
              }}
            >
              Last Name:{" "}
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 14,
                  lineHeight: 21,
                  padding: 10,
                  color: "#747474",
                }}
              >
                Test
              </Text>
            </Text>
            <Text
              w={"33%"}
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                lineHeight: 21,
                padding: 10,
                color: "#9C9DA5",
              }}
            >
              DOB:{" "}
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 14,
                  lineHeight: 21,
                  padding: 10,
                  color: "#747474",
                }}
              >
                Oct-13-1980
              </Text>
            </Text>
            <Text
              w={"33%"}
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                lineHeight: 21,
                padding: 10,
                color: "#9C9DA5",
              }}
            >
              Gender:{" "}
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 14,
                  lineHeight: 21,
                  padding: 10,
                  color: "#747474",
                }}
              >
                Female
              </Text>
            </Text>
            <Text
              w={"33%"}
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                lineHeight: 21,
                padding: 10,
                color: "#9C9DA5",
              }}
            >
              City:{" "}
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 14,
                  lineHeight: 21,
                  padding: 10,
                  color: "#747474",
                }}
              >
                Jaipur
              </Text>
            </Text>
            <Text
              w={"33%"}
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                lineHeight: 21,
                padding: 10,
                color: "#9C9DA5",
              }}
            >
              State:{" "}
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 14,
                  lineHeight: 21,
                  padding: 10,
                  color: "#747474",
                }}
              >
                Rajasthan
              </Text>
            </Text>
            <Text
              w={"33%"}
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                lineHeight: 21,
                padding: 10,
                color: "#9C9DA5",
              }}
            >
              Email:{" "}
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 14,
                  lineHeight: 21,
                  padding: 10,
                  color: "#747474",
                }}
              >
                test@technoace.in
              </Text>
            </Text>
            <Text
              w={"33%"}
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                lineHeight: 21,
                padding: 10,
                color: "#9C9DA5",
              }}
            >
              Contact Number:{" "}
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 14,
                  lineHeight: 21,
                  padding: 10,
                  color: "#747474",
                }}
              >
                8989898989
              </Text>
            </Text>
            <Text
              w={"33%"}
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                lineHeight: 21,
                padding: 10,
                color: "#9C9DA5",
              }}
            >
              Amount:{" "}
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 14,
                  lineHeight: 21,
                  padding: 10,
                  color: "#747474",
                }}
              >
                2,000
              </Text>
            </Text>
            <Text
              w={"33%"}
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                lineHeight: 21,
                padding: 10,
                color: "#9C9DA5",
              }}
            >
              Address:{" "}
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 14,
                  lineHeight: 21,
                  padding: 10,
                  color: "#747474",
                }}
              >
                Bhamasha techno hub
              </Text>
            </Text>
            <Text
              w={"33%"}
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                lineHeight: 21,
                padding: 10,
                color: "#9C9DA5",
              }}
            >
              Category:{" "}
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 14,
                  lineHeight: 21,
                  padding: 10,
                  color: "#747474",
                }}
              >
                Beauty
              </Text>
            </Text>
            <Text
              w={"33%"}
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                lineHeight: 21,
                padding: 10,
                color: "#9C9DA5",
              }}
            >
              Trending Hastags:{" "}
              <Text
                style={{
                  fontFamily: "Poppins_500Medium",
                  fontSize: 14,
                  lineHeight: 21,
                  padding: 10,
                  color: "#3C7CDD",
                }}
              >
                #Beauty
              </Text>
            </Text>
          </Box>
        </HStack>
      </VStack>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
