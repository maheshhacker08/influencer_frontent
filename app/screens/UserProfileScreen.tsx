import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Screen } from "../components"
import { create } from "apisauce"
import { BottomNavigation, TopNavigation } from "../navigators/Navigation"
import Footer from "../components/Footer"
import { useStores } from "../models"
import { useNavigation } from "@react-navigation/native"
import {
  Box,
  Button,
  FormControl,
  HStack,
  Image,
  Input,
  Pressable,
  Stack,
  useBreakpointValue,
  View,
  VStack,
  WarningOutlineIcon,
  Text,
} from "native-base"
import { AntDesign, FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Config from "../config"
import {followersFormatter} from './UitilityFunctions';
import { SocialLogin } from "./SocialLogin"

// define the api
const api = create({
  baseURL: Config.baseURL,
  headers: { Accept: "application/json" },
})
const putapi = create({
  baseURL: Config.baseURL,
  headers: { "Content-Type": "application/json" },
})
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `UserProfile: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="UserProfile" component={UserProfileScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
type user = {
  id: string
  first_name: string
  last_name: string
  email: string
  mobile: string
  gender: string
  location: string
  image: string
  is_influencer: Boolean
  dob: string
  profile: {
    data: {
      price: number
      category: string
      facebook: {}
      instagram: {}
    }
  }
  favorites: []
}
export const UserProfileScreen = observer(function UserProfileScreen() {
  const [userInfo, setUserInfo] = useState<any>({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    gender: "",
    city: "",
    state: "",
    country: "",
    image: "",
    dob: "",
    is_active: false,
    is_business: false,
    is_staff: false,
    is_influencer: false,
    instagram: "",
    facebook: "",  
    profile_verified: false,
    profile: {
      data: {
        price: 0,
        category: "General",
        facebook: {},
        instagram: {},
      },
    },
    favorites: [],
  })

  const dimension = useBreakpointValue({
    base: true,
    sm: true,
    md: false,
    lg: false,
    xl: false,
  })
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const getUserInfo = async () => {
    let userInfo = undefined
    try {
      userInfo = await AsyncStorage.getItem("loggedIn_userDetails")
      setUserInfo(userInfo != null && JSON.parse(userInfo))
      console.log("userInfo userInfo", userInfo)
      return userInfo != null ? JSON.parse(userInfo) : null
    } catch (e) {
      // error reading value
      console.log("loggedIn_userDetails data not found in local host")
    }
  }

  useEffect(() => {
    getUserInfo()
  },[])

  // Pull in navigation via hook
  const navigation = useNavigation<any>()
  // bearer token--------
  const {
    authenticationStore: { token },
  } = useStores()

  api.addAsyncRequestTransform((request) => async () => {
    request.headers["Authorization"] = "Bearer " + token
    console.log()
  })

  putapi.addAsyncRequestTransform((request) => async () => {
    request.headers["Authorization"] = "Bearer " + token
    console.log()
  })

  const AllPostCard = (props) => {
    return (
      <>
        <Stack
          rounded="xl"
          overflow="hidden"
          width={"47%"}
          height={{ base: "150", md: "300" }}
          shadow="1"
          padding={{ base: 2, sm: 2, md: 5 }}
          paddingBottom={-5}
          bg="#F5FBFF"
          m={1}          
          mb={{ base: 2, md: 10 }}
        >
          <Box w={["100%"]} h={["90%"]} flex={8}>
            <Image
              w={["100%"]}
              h="100%"
              source={props.productPhoto}
              resizeMode="stretch"
              alt="image"
            />
          </Box>
          <HStack justifyContent="space-between" p={2}>
            <HStack space={2}>
              <AntDesign
                name="hearto"
                size={useBreakpointValue({base: 18, md: 24})}
                color="black"
              />
              <Text marginTop= {2} fontSize= {[14,14,14,18,18] }>
                50K
              </Text>
            </HStack>
            <HStack space={2}>
              <MaterialIcons
                name="insert-comment"
                size={useBreakpointValue({ base: 18, md: 24 })}
                color="black"
                mt={3}
              />
              <Text marginTop={2} fontSize={[14,14,14,18,18] }>
                500
              </Text>
            </HStack>
          </HStack>
        </Stack>
      </>
    )
  }
  const mediaDomain = Config.baseURL.substring(0,Config.baseURL.length-1)
  return (
    <Screen style={[$root, { backgroundColor: dimension && "white" }]} preset="scroll">
      <TopNavigation navigation={navigation} />
      <BottomNavigation navigation={navigation} />
      {/* Profile Details */}
      <VStack
        m={useBreakpointValue({ base: 0, md: 10 })}
        mt={useBreakpointValue({ base: -50, md: 1 })}
      >
        <Box
          w="100%"
          h={useBreakpointValue({ base: 90, md: 185 })}
          style={{ backgroundColor: dimension && "white" }}
          mb={{ base: -2, md: 0 }}
        >
          {dimension === false && (
            <Box
              w="100%"
              h="100%"
              bg={["red.400", "blue.400"]}
              opacity={0.2}
              position="absolute"
              top={0}
              left={0}
            ></Box>
          )}
          <HStack space={5} alignItems="center" p={useBreakpointValue({ base: 5, md: 10 })}>
            <Pressable
              onPress={() => {
                navigation.goBack()
              }}
              flexDirection={"row"}
            >
              <Ionicons name="arrow-back" size={20} color="#203655" />
            </Pressable>
            <Text
              style={{
                fontFamily: "Poppins_700Bold",
                fontSize: 24,
                lineHeight: 29,
                color: "#203655",
              }}
            >
              Profile {dimension === false && "Details"}
            </Text>
          </HStack>
        </Box>
        <Stack direction={useBreakpointValue({ base: "column", md: "row" })}>
          <VStack bg="white" w={useBreakpointValue({ base: "100%", md: "30%" })} space={3} p={5}>
            <Image
              rounded="full"
              w={100}
              h={100}
              alignSelf="center"
              mt={-55}
              borderColor="white"
              borderWidth={5}
              source={{ uri: mediaDomain+userInfo?.image}}
              alt="image"
            />
            <HStack justifyContent="center" space={2}>
              <Text
                style={{
                  fontFamily: "Poppins_700Bold",
                  fontSize: 18,
                  lineHeight: 19,
                  color: "#203655",
                  textAlign: "center",
                }}
              >
                {userInfo?.first_name}
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins_400",
                  fontSize: 18,
                  lineHeight: 19,
                  color: "#203655",
                  textAlign: "center",
                }}
              >
                {userInfo?.profile != null && `(${userInfo?.profile?.data.category})`}
              </Text>
            </HStack>
            <Text
              style={{
                fontFamily: "Poppins_600Bold",
                fontSize: 18,
                lineHeight: 19,
                color: "#203655",
                textAlign: "center",
              }}
            >
              {userInfo?.is_influencer != false && `Rs. ${userInfo?.profile?.data.price}`}
            </Text>
            {userInfo.is_influencer != false && (
              <HStack alignItems="center" alignSelf="center">
                <Image
                  w={{ base: "2", md: "3", lg: "4" }}
                  h="10"
                  py="-3"
                  px="-6"
                  source={require("../../assets/icons/divider.png")}
                  alt="image"
                  resizeMode="contain"
                />
                <VStack>
                  <Text
                    fontFamily= "Poppins_400Regular"
                    fontSize= {["11","11","9","12","14"]}
                    lineHeight= {19.5}
                    color= "#545454"
                  >
                    Followers
                  </Text>
                  <Text
                    alignSelf="center"
                    style={{
                      fontFamily: "Poppins_700Bold",
                      fontSize: 16,
                      lineHeight: 19.5,
                      color: "#545454",
                    }}
                  >
                    {followersFormatter(userInfo?.profile?.data.instagram.followers_count) || 0}
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
                  <Text
                    fontFamily= "Poppins_400Regular"
                    fontSize= {["11","11","9","12","14"]}
                    lineHeight= {19.5}
                    color= "#545454"
                  >
                    Posts
                  </Text>
                  <Text
                    alignSelf="center"
                    style={{
                      fontFamily: "Poppins_700Bold",
                      fontSize: 16,
                      lineHeight: 19.5,
                      color: "#545454",
                    }}
                  >
                    {userInfo.profile?.data.instagram.media_count || 0}
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
                  <Text
                    fontSize={["11","11","9","12","14",]}
                    fontFamily="Poppins_400Regular"
                    lineHeight={19.5}
                    color="#545454"
                  >
                    Engagements
                  </Text>
                  <Text
                    alignSelf="center"
                    style={{
                      fontFamily: "Poppins_700Bold",
                      fontSize: 16,
                      lineHeight: 19.5,
                      color: "#545454",
                    }}
                  >
                    {userInfo?.profile?.data.instagram.follows_count || 0}
                  </Text>
                </VStack>
              </HStack>
            )}

            {dimension ? (
              <>
                <Button
                  borderRadius="full"
                  colorScheme="success"
                  onPress={() => {
                    console.log("Clicked to Edit Profile")
                    navigation.navigate("UserProfileEdit")
                  }}
                  bg="rgba(60, 167, 221, 1)"
                  w={"90%"}
                  alignSelf="center"
                >
                  Edit Profile
                </Button>
              </>
            ) : (
              <>
                <HStack alignItems="center" space={2}>
                  <FormControl isInvalid={false} w="50%">
                    <FormControl.Label>
                      <Text
                        style={{
                          fontFamily: "Poppins_400Regular",
                          fontSize: 14,
                          lineHeight: 21,
                          color: "#9C9DA5",
                        }}
                      >
                        First Name
                      </Text>
                    </FormControl.Label>
                    <Input
                      placeholder="First Name"
                      value={userInfo.first_name}
                      onChangeText={text => {
                        console.log(text)
                        setUserInfo({ ...userInfo, first_name: text })}}
                    />
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                      Enter correctly
                    </FormControl.ErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={false} w="50%">
                    <FormControl.Label>
                      <Text
                        style={{
                          fontFamily: "Poppins_400Regular",
                          fontSize: 14,
                          lineHeight: 21,
                          color: "#9C9DA5",
                        }}
                      >
                        Last Name
                      </Text>
                    </FormControl.Label>
                    <Input
                      placeholder="Last Name"                      
                      value={userInfo?.last_name}
                      onChangeText={text => setUserInfo({...userInfo, last_name: text})
                      }
                    />
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                      Enter correctly
                    </FormControl.ErrorMessage>
                  </FormControl>
                </HStack>
                <HStack alignItems="center" space={2}>
                  <FormControl isInvalid={false} w="50%">
                    <FormControl.Label>
                      <Text
                        style={{
                          fontFamily: "Poppins_400Regular",
                          fontSize: 14,
                          lineHeight: 21,
                          color: "#9C9DA5",
                        }}
                      >
                        DOB
                      </Text>
                    </FormControl.Label>
                    <Input
                      placeholder="YYYY-MM-DD"
                      value={userInfo?.dob}
                      onChangeText={(text) => {
                        setUserInfo({ ...userInfo, dob: text })
                      }}
                    />
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                      Enter correctly
                    </FormControl.ErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={false} w="50%">
                    <FormControl.Label>
                      <Text
                        style={{
                          fontFamily: "Poppins_400Regular",
                          fontSize: 14,
                          lineHeight: 21,
                          color: "#9C9DA5",
                        }}
                      >
                        Gender
                      </Text>
                    </FormControl.Label>
                    <Input
                      placeholder="Gender"                                         
                      value={userInfo?.gender}
                      onChangeText={(text) => {
                        setUserInfo({ ...userInfo, gender: text })
                      }}
                    />
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                      Enter correctly
                    </FormControl.ErrorMessage>
                  </FormControl>
                </HStack>
                <FormControl isInvalid={false} w="100%">
                  <FormControl.Label>
                    <Text
                      style={{
                        fontFamily: "Poppins_400Regular",
                        fontSize: 14,
                        lineHeight: 21,
                        color: "#9C9DA5",
                      }}
                    >
                      Email
                    </Text>
                  </FormControl.Label>
                  <Input
                    placeholder="Email"                                     
                    value={userInfo?.email}
                    onChangeText={(text) => {
                      setUserInfo({ ...userInfo, email: text })
                    }}
                  />
                  <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    Enter correctly
                  </FormControl.ErrorMessage>
                </FormControl>
                <HStack alignItems="center" space={2}>
                  <FormControl isInvalid={false} w="50%">
                    <FormControl.Label>
                      <Text
                        style={{
                          fontFamily: "Poppins_400Regular",
                          fontSize: 14,
                          lineHeight: 21,
                          color: "#9C9DA5",
                        }}
                      >
                        Contact
                      </Text>
                    </FormControl.Label>
                    <Input
                      placeholder="Contact"                                          value={userInfo?.mobile}
                      onChangeText={(text) => {
                        setUserInfo({ ...userInfo, mobile: text })
                      }}
                    />
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                      Enter correctly
                    </FormControl.ErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={false} w="50%">
                    <FormControl.Label>
                      <Text
                        style={{
                          fontFamily: "Poppins_400Regular",
                          fontSize: 14,
                          lineHeight: 21,
                          color: "#9C9DA5",
                        }}
                      >
                        Amount
                      </Text>
                    </FormControl.Label>
                    <Input
                      placeholder="Amount"
                      value={userInfo?.profile?.data.price || 0}
                      onChangeText={text =>setUserInfo({ ...userInfo, price: Number(text) })}
                    />
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                      Enter correctly
                    </FormControl.ErrorMessage>
                  </FormControl>
                </HStack>
                <HStack alignItems="center" space={2}>
                  <FormControl isInvalid={false} w="50%">
                    <FormControl.Label>
                      <Text
                        style={{
                          fontFamily: "Poppins_400Regular",
                          fontSize: 14,
                          lineHeight: 21,
                          color: "#9C9DA5",
                        }}
                      >
                        City
                      </Text>
                    </FormControl.Label>
                    <Input
                      placeholder="City"                                        
                      value={userInfo?.city}
                      onChangeText={text =>setUserInfo({ ...userInfo, city: text })}
                    />
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                      Enter correctly
                    </FormControl.ErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={false} w="50%">
                    <FormControl.Label>
                      <Text
                        style={{
                          fontFamily: "Poppins_400Regular",
                          fontSize: 14,
                          lineHeight: 21,
                          color: "#9C9DA5",
                        }}                        
                      >
                        State
                      </Text>
                    </FormControl.Label>
                    <Input 
                      placeholder="State"                                          
                      value={userInfo?.state}
                      onChangeText={text =>setUserInfo({ ...userInfo, state: text })}/>
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                      Enter correctly
                    </FormControl.ErrorMessage>
                  </FormControl>
                </HStack>
                <FormControl isInvalid={false} w="100%">
                  <FormControl.Label>
                    <Text
                      style={{
                        fontFamily: "Poppins_400Regular",
                        fontSize: 14,
                        lineHeight: 21,
                        color: "#9C9DA5",
                      }}
                    >
                      Country
                    </Text>
                  </FormControl.Label>
                  <Input 
                    placeholder="Country"                                        
                    value={userInfo?.country}
                    onChangeText={text =>setUserInfo({ ...userInfo, country: text })}
                  />
                  <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    Enter correctly
                  </FormControl.ErrorMessage>
                </FormControl>

                {userInfo && userInfo?.is_influencer != false && (
                  <>
                    <HStack justifyContent="space-between">
                      <Text
                        fontFamily= "Poppins_600SemiBold" 
                        fontSize= {["17","17","17","18","18",]}
                        lineHeight={19}
                        color= "#203655"
                        textAlign= "center"
                        alignSelf="center"
                      >
                        Industries
                      </Text>
                      <Button
                        borderRadius="full"
                        colorScheme="success"
                        onPress={() => {
                          console.log("Clicked to add industries")
                        }}
                        bg="rgba(60, 167, 221, 1)"
                        w={"29%"}
                      >
                        Add
                      </Button>
                    </HStack>
                    <HStack space={["1", "2", "3"]}>
                      <Button
                        borderRadius="full"
                        variant="outline"
                        bg="white"
                        w={"29%"}
                        color="gray.400"
                      >
                        {userInfo && userInfo?.profile && userInfo?.profile != null
                          ? userInfo?.profile?.data && userInfo?.profile?.data.category
                          : "Industry-1"}
                      </Button>
                      <Button
                        borderRadius="full"
                        variant="outline"
                        bg="white"
                        w={"29%"}
                        color="gray.400"
                      >
                        Industry-2
                      </Button>
                      <Button
                        borderRadius="full"
                        variant="outline"
                        bg="white"
                        w={100}
                        color="gray.400"
                      >
                        Industry-3
                      </Button>
                    </HStack>
                    <HStack justifyContent="space-between">
                      <Text
                        fontFamily= "Poppins_600SemiBold"
                        fontSize= {["17","17","17","18","18",]}
                        lineHeight={19}
                        color= "#203655"
                        textAlign= "center"
                        alignSelf="center"                        
                      >
                        Trending Hashtags
                      </Text>
                      <Button
                        borderRadius="full"
                        colorScheme="success"
                        onPress={() => {
                          console.log("Clicked to add industries")
                        }}
                        bg="rgba(60, 167, 221, 1)"
                        w={100}
                      >
                        Add
                      </Button>
                    </HStack>
                    <Text
                      style={{
                        fontSize: 14,
                        lineHeight: 19,
                        color: "rgba(60, 167, 221, 1)",
                        textAlign: "left",
                      }}
                    >
                      #
                      {userInfo && userInfo?.profile && userInfo?.profile != null
                        ? userInfo?.profile?.data && userInfo?.profile?.data.category
                        : "HashTag1"}
                      , #HashTag2, #HashTag3
                    </Text>
                  </>
                )}

                <HStack space={{ base: 1, lg: 3 }} justifyContent="right">
                  <Button
                    borderRadius="full"
                    variant="outline"
                    bg="white"
                    w={{ base: 70, lg: 100 }}
                    color="gray.400"
                  >
                    Cancel
                  </Button>
                  <Button
                    borderRadius="full"
                    colorScheme="success"
                    onPress={() => {
                      console.log("Clicked to save profile")

                      const form = new FormData()
                      form.append("first_name",userInfo?.first_name)                      
                      form.append("email",userInfo?.email)                      
                      form.append("mobile",userInfo?.mobile)                      
                      form.append("last_name",userInfo?.first_name)                      
                      form.append("dob",userInfo?.dob)                      
                      form.append("city",userInfo?.city)                      
                      form.append("state",userInfo?.state)                      
                      form.append("country",userInfo?.country) 
                      form.append("gender",userInfo?.gender)
                      // form.append("image", userInfo?.image)
                      // form.append("is_active", userInfo?.is_active)
                      // form.append("is_business", userInfo?.is_business)
                      // form.append("is_staff", userInfo?.is_staff)
                      // form.append("is_influencer", userInfo?.is_influencer)
                      // form.append("instagram", userInfo?.instagram)
                      // form.append("facebook", userInfo?.facebook)  
                      // form.append("profile_verified", userInfo?.profile_verified) 

                      putapi.patch("/user",form)
                        .then((res) => {
                          console.log(res)
                        })
                        .catch((error) => {
                          console.log(error)
                        })
                    }}
                    bg="rgba(60, 167, 221, 1)"
                    w={{ base: 70, lg: 100 }}
                  >
                    Save
                  </Button>
                </HStack>
              </>
            )}
          </VStack>

          <VStack bg="blue" w={{ base: "100%", md: "70%" }} space={3} p={5}>
            <Text
              style={{
                fontFamily: "Poppins_600SemiBold",
                fontSize: 20,
                lineHeight: 28,
                color: "#203655",
                padding: 10,
              }}
            >
              Insights
            </Text>
            { false ?
              <>                
                <Stack
                  rounded="xl"
                  overflow="hidden"
                  width="100%"
                  height={500}
                  shadow="1"
                  padding={[5]}
                  paddingBottom={-5}
                  bg="#F5FBFF"
                >
                  <Text
                    style={{
                      fontFamily: "Poppins_600SemiBold",
                      fontSize: 20,
                      lineHeight: 28,
                      color: "#203655",
                      padding: 10,
                    }}
                  >
                    Followers Growth
                  </Text>
                  <Box
                    w={["100%", "100%", "100%"]}
                    h={["90%"]}
                    flex={8}
                  >
                    <Image
                      w={["100%", "100%", "100%"]}
                      h="100%"
                      source={require("../../assets/images/backgrounds/insights.png")}
                      resizeMode="stretch"
                      alt="image"
                    />
                  </Box>
                </Stack>
              </>
            :
              <Box 
                w="100%" 
                h="300" 
                display="flex" 
                justifyContent="center" 
                alignItems="center"               
              >
                <Box position="absolute" zIndex={-1}
                display="flex" w="100%" h="100%"  
                bg="#000" opacity={0.2} top={0} left={0}/>
                <Text
                  style={{
                    fontFamily: "Poppins_600SemiBold",
                    fontSize: 16,
                    lineHeight: 28,
                    color: "#FFF",
                    padding: 10,
                  }}
                >
                  Add Facebook/Instagram Account To See Insights
                </Text>
                <SocialLogin/>
              </Box>
            }
            <Text
              style={{
                fontFamily: "Poppins_600SemiBold",
                fontSize: 20,
                lineHeight: 28,
                color: "#203655",
                padding: 10,
              }}
            >
              All Post
            </Text>
            {false ?
              <Box
                // style={{flex: 1, flexWrap: 'wrap', flexDirection: 'row', alignContent: 'space-between', padding: 5}}
                style={{
                  flexWrap: "wrap",
                  flexDirection: "row",
                  alignContent: "flex-start",
                  padding: 10,
                  justifyContent: "space-evenly",
                }}
              >
                <AllPostCard productPhoto={require("../../assets/images/backgrounds/product1.png")} />
                <AllPostCard productPhoto={require("../../assets/images/backgrounds/product2.png")} />
                <AllPostCard productPhoto={require("../../assets/images/backgrounds/product3.png")} />
                <AllPostCard productPhoto={require("../../assets/images/backgrounds/product1.png")} />
              </Box>
            :
              <Box 
                w="100%" 
                h="300" 
                display="flex" 
                justifyContent="center" 
                alignItems="center"
              >
                <Box position="absolute" zIndex={-1}
                display="flex" w="100%" h="100%"  
                bg="#000" opacity={0.2} top={0} left={0}/>
                <Text
                  style={{
                    fontFamily: "Poppins_600SemiBold",
                    fontSize: 16,
                    lineHeight: 28,
                    color: "#FFF",
                    padding: 10,
                  }}
                >
                  Add Facebook/Instagram Account to See Posts
                </Text>
                <SocialLogin/>
              </Box>
            }
          </VStack>
        </Stack>
      </VStack>
      {/* END of Profile Details */}
      <View accessibilityLabel="view">
        <Footer />
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
