import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Screen } from "../components"
import {
  Box,
  HStack,
  Image,
  Pressable,
  Stack,
  useBreakpointValue,
  VStack,
  Text,
  View,
} from "native-base"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Ionicons, MaterialIcons } from "@expo/vector-icons"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { FontAwesome5, AntDesign } from "@expo/vector-icons"
import { BottomNavigation, TopNavigation } from "../navigators/Navigation"
import Footer from "../components/Footer"
import { useStores } from "../models"
import { followersFormatter } from "./UitilityFunctions"

import { ApiResponse, create } from "apisauce"
import Config from "../config"

// define the api
const api = create({
  baseURL: Config.baseURL,
  headers: {
    Accept: "application/json",
  },
})

// @ts-ignore
export const ProfileDetailScreen: FC<StackScreenProps<AppStackScreenProps, "ProfileDetail">> =
  observer(function ProfileDetailScreen() {
    const route = useRoute<any>()        
    const [profileDetailAll, setProfileDetailAll] = useState<any>()
    const [media, setMedia] = useState<any>([])
    const mediaDomain = Config.baseURL.substring(0,Config.baseURL.length-1)
    const {
      authenticationStore: { token },
    } = useStores()

    api.addAsyncRequestTransform((request) => async () => {
      request.headers["Authorization"] = "Bearer " + token
    })

    useEffect(() => {        
      api          
        .get(`/influencer/${route.params.id}`)
        .then((response:ApiResponse<any,any>) => {            
          setProfileDetailAll(response.data)            
          setMedia(response?.data?.profile?.data.instagram.media.data.filter((media)=>{return (media.media_type==="IMAGE" || media.media_type==="CAROUSEL_ALBUM")}))            
        })
        .catch((error) => console.log(error))
    }, [])

    const InfluencerCard = () => {
      return (
        <>
          <Stack
            rounded="xl"
            overflow="hidden"
            width={{ base: "100%", lg: "350", xl: "400" }}
            height={{ base: 400, lg: "100%" }}
            direction={{ base: "column", md: "row", lg: "column" }}
            shadow="1"
            bg={"#F5FBFF"}
            padding={[3, 4, 5]}
            marginBottom={[5, 10]}
          >
            <Box
              w={["100%", "100%", "100%"]}
              h={["45%", "45%", "50%"]}
              style={{ flex: useBreakpointValue({ base: 2, sm: 2, md: 2, lg: 3 }) }}
            >
              {console.log("profileDetailAll", profileDetailAll)}
              {profileDetailAll && profileDetailAll.profile_verified && (
                <Image
                  w={["50", "70", "100"]}
                  h={["5", "7", "10"]}
                  source={require("../../assets/images/backgrounds/Verified.png")}
                  alt="image"
                  resizeMode="contain"
                  position="absolute"
                  zIndex={1}
                  top={0}
                  right={0}
                />
              )}
              <Image
                rounded="xl"
                w={["100%", "100%", "100%"]}
                h="100%"
                source={{uri:profileDetailAll && mediaDomain+profileDetailAll?.image}}
                alt="image"
              />
            </Box>
            <Stack
              flex="1"
              maxH={{ md: "40%" }}
              p={{ base: 4, md: 8, lg: 4 }}
              space={[3, 3, 2, 1.5]}
              justifyContent="space-around"
              style={{ flex: useBreakpointValue({ base: 1, sm: 1, md: 2, lg: 1 }) }}
            >
              <Stack
                direction={useBreakpointValue({ base: "column", lg: "row" })}
                justifyContent="center"
              >
                <Text
                  style={{
                    fontFamily: "Poppins_600SemiBold",
                    fontSize: useBreakpointValue({ base: "9", sm: "12", md: "17", lg: "18" }),
                    lineHeight: 21,
                    color: "rgba(50, 49, 89, 1)",
                    textAlign: "center",
                  }}
                >
                  {/* {influencer.first_name} {influencer.last_name} */}
                  {profileDetailAll && profileDetailAll.first_name}{" "}
                  {profileDetailAll && profileDetailAll.last_name} {}
                </Text>

                <Text
                  style={{
                    fontFamily: "Poppins_500Medium",
                    fontSize: useBreakpointValue({ base: "4", sm: "10", md: "13", lg: "14" }),
                    lineHeight: 21,
                    color: "#545454",
                    textAlign: "center",
                  }}
                >                  
                  {profileDetailAll?.profile.data.category}
                </Text>
              </Stack>
              <>
                <HStack space="2" style={{ alignSelf: "center" }}>
                  <Text
                    style={{
                      fontFamily: "Poppins_500Medium",
                      fontSize: useBreakpointValue({ base: "11", sm: "12", md: "13", lg: "14" }),
                      lineHeight: 21,
                      color: "#545454",
                      textAlign: "center",
                    }}
                  >                   
                    {profileDetailAll?.profile.data.price?`INR.${profileDetailAll?.profile.data.price}`:`On Demand`}                    
                  </Text>
                </HStack>
                <HStack alignItems="center" justifyContent="space-between" marginLeft={-5}>
                  <Image
                    w={{ base: "2", sm: "2", md: "2", lg: "4", xl: "4" }}
                    h="10"
                    py="-3"
                    px="-6"
                    source={require("../../assets/icons/divider.png")}
                    alt="image"
                    resizeMode="contain"
                  />
                  <VStack>
                    <Text
                      style={{
                        fontFamily: "Poppins_400Regular",
                        fontSize: useBreakpointValue({
                          base: "11",
                          sm: "11",
                          md: "9",
                          lg: "12",
                          xl: "14",
                        }),
                        lineHeight: 19.5,
                        color: "#545454",
                      }}
                    >
                      Followers
                    </Text>
                    <Text color="coolGray.600" fontWeight="400" style={{ alignSelf: "center" }}>
                      {followersFormatter(profileDetailAll?.profile.data.instagram.followers_count || 0)}
                    </Text>
                  </VStack>
                  <Image
                    w={{ base: "2", sm: "2", md: "2", lg: "4", xl: "4" }}
                    h="10"
                    py="-3"
                    px="-6"
                    source={require("../../assets/icons/divider.png")}
                    alt="image"
                    resizeMode="contain"
                  />
                  <VStack>
                    <Text
                      style={{
                        fontFamily: "Poppins_400Regular",
                        fontSize: useBreakpointValue({
                          base: "11",
                          sm: "11",
                          md: "9",
                          lg: "12",
                          xl: "14",
                        }),
                        lineHeight: 19.5,
                        color: "#545454",
                      }}
                    >
                      Posts
                    </Text>
                    <Text color="coolGray.600" fontWeight="400" style={{ alignSelf: "center" }}>
                      {/* {influencer.Posts} */}
                      {profileDetailAll?.profile.data.instagram.media_count || 0}
                    </Text>
                  </VStack>
                  <Image
                    w={{ base: "2", sm: "2", md: "2", lg: "4", xl: "4" }}
                    h="10"
                    py="-3"
                    px="-6"
                    source={require("../../assets/icons/divider.png")}
                    alt="image"
                    resizeMode="contain"
                  />
                  <VStack>
                    <Text
                      style={{
                        fontFamily: "Poppins_400Regular",
                        fontSize: useBreakpointValue({
                          base: "11",
                          sm: "11",
                          md: "9",
                          lg: "12",
                          xl: "14",
                        }),
                        lineHeight: 19.5,
                        color: "#545454",
                      }}
                    >
                      Following
                    </Text>
                    <Text color="coolGray.600" fontWeight="400" style={{ alignSelf: "center" }}>
                      {profileDetailAll?.profile.data.instagram.follows_count || 0}
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

    const AllPostCard = (props) => {
      return (
        <>
          <Stack
            rounded="xl"
            overflow="hidden"
            width={["47%","47%","24%","24%"]}
            height="300"
            shadow="1"
            padding={useBreakpointValue({ base: 2, sm: 2, md: 5 })}
            paddingBottom={-5}
            bg="#F5FBFF"
            m={1}
            mb={useBreakpointValue({ base: 2, md: 10 })}
          >
            <Box w={["100%"]} h={["90%"]} style={{ flex: useBreakpointValue({ base: 8 }) }}>
              <Image
                w={["100%"]}
                h="100%"
                source={props.media_url}
                resizeMode="stretch"
                alt="image"
              />
            </Box>

            <HStack justifyContent="space-between" p={2}>
              <HStack space={2}>
                <AntDesign
                  name="hearto"
                  size={useBreakpointValue({ base: 18, md: 24 })}
                  color="black"
                />
                <Text style={{ marginTop: 2, fontSize: useBreakpointValue({ base: 14, md: 18 }) }}>
                  {followersFormatter(props.like_count)}
                </Text>
              </HStack>
              <HStack space={2}>
                <MaterialIcons
                  name="insert-comment"
                  size={useBreakpointValue({ base: 18, md: 24 })}
                  color="black"
                  mt={3}
                />
                <Text style={{ marginTop: 2, fontSize: useBreakpointValue({ base: 14, md: 18 }) }}>
                  {followersFormatter(props.comments_count)}
                </Text>
              </HStack>
            </HStack>
            {/* </Stack> */}
          </Stack>
          {/* </Checkbox.Group> */}
        </>
      )
    }

    const navigation = useNavigation()
    return (
      <>
        <Screen style={$root} preset="scroll">
          <TopNavigation navigation={navigation} />
          <BottomNavigation navigation={navigation} />
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
            <Stack bg="white" direction={{ base: "column", lg: "row" }}>
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
                  w={{ base: "95%", md: "60%" }}
                  style={{
                    fontFamily: "Poppins_400Regular",
                    fontSize: 13,
                    lineHeight: 21,
                    padding: 10,
                    color: "#9C9DA5",
                  }}
                >
                  First Name:
                  <Text
                    style={{
                      fontFamily: "Poppins_400Regular",
                      fontSize: 12,
                      lineHeight: 21,
                      padding: 10,
                      color: "#747474",
                    }}
                  >
                    {profileDetailAll?.first_name || ""}
                  </Text>
                </Text>
                <Text
                  w={{ base: "95%", md: "40%" }}
                  style={{
                    fontFamily: "Poppins_400Regular",
                    fontSize: 13,
                    lineHeight: 21,
                    padding: 10,
                    color: "#9C9DA5",
                  }}
                >
                  Last Name:
                  <Text
                    style={{
                      fontFamily: "Poppins_400Regular",
                      fontSize: 12,
                      lineHeight: 21,
                      padding: 10,
                      color: "#747474",
                    }}
                  >
                    {profileDetailAll?.last_name || ""}
                  </Text>
                </Text>
                <Text
                  w={{ base: "95%", md: "60%" }}
                  style={{
                    fontFamily: "Poppins_400Regular",
                    fontSize: 13,
                    lineHeight: 21,
                    padding: 10,
                    color: "#9C9DA5",
                  }}
                >
                  DOB:
                  <Text
                    style={{
                      fontFamily: "Poppins_400Regular",
                      fontSize: 12,
                      lineHeight: 21,
                      padding: 10,
                      color: "#747474",
                    }}
                  >
                    {profileDetailAll?.dob || "Not Available"}
                  </Text>
                </Text>
                <Text
                  w={{ base: "95%", md: "40%" }}
                  style={{
                    fontFamily: "Poppins_400Regular",
                    fontSize: 13,
                    lineHeight: 21,
                    padding: 10,
                    color: "#9C9DA5",
                  }}
                >
                  Gender:
                  <Text
                    style={{
                      fontFamily: "Poppins_400Regular",
                      fontSize: 12,
                      lineHeight: 21,
                      padding: 10,
                      color: "#747474",
                    }}
                  >
                    {profileDetailAll?.gender || ""}
                  </Text>
                </Text>
                <Text
                  w={{ base: "95%", md: "60%" }}
                  style={{
                    fontFamily: "Poppins_400Regular",
                    fontSize: 13,
                    lineHeight: 21,
                    padding: 10,
                    color: "#9C9DA5",
                  }}
                >
                  City:
                  <Text
                    style={{
                      fontFamily: "Poppins_400Regular",
                      fontSize: 12,
                      lineHeight: 21,
                      padding: 10,
                      color: "#747474",
                    }}
                  >
                    {profileDetailAll?.city || "Not Available"}
                  </Text>
                </Text>
                <Text
                  w={{ base: "95%", md: "40%" }}
                  style={{
                    fontFamily: "Poppins_400Regular",
                    fontSize: 13,
                    lineHeight: 21,
                    padding: 10,
                    color: "#9C9DA5",
                  }}
                >
                  State:
                  <Text
                    style={{
                      fontFamily: "Poppins_400Regular",
                      fontSize: 12,
                      lineHeight: 21,
                      padding: 10,
                      color: "#747474",
                    }}
                  >
                    {profileDetailAll?.state || "Not Available"}
                  </Text>
                </Text>
                <Text
                  w={{ base: "95%", md: "60%" }}
                  style={{
                    fontFamily: "Poppins_400Regular",
                    fontSize: 13,
                    lineHeight: 21,
                    padding: 10,
                    color: "#9C9DA5",
                  }}
                >
                  Country:
                  <Text
                    style={{
                      fontFamily: "Poppins_400Regular",
                      fontSize: 11,
                      lineHeight: 21,
                      padding: 10,
                      color: "#747474",
                    }}
                  >
                    {profileDetailAll?.country || "Not Available"}
                  </Text>
                </Text>
                <Text
                  w={{ base: "95%", md: "40%" }}
                  style={{
                    fontFamily: "Poppins_400Regular",
                    fontSize: 13,
                    lineHeight: 21,
                    padding: 10,
                    color: "#9C9DA5",
                  }}
                >
                  Status:
                  <Text
                    style={{
                      fontFamily: "Poppins_400Regular",
                      fontSize: 12,
                      lineHeight: 21,
                      padding: 10,
                      color: "#747474",
                    }}
                  >
                    {profileDetailAll?.profile_verified? "VERIFIED": "NOT VERIFIED"}
                  </Text>
                </Text>
                <Text
                  w={{ base: "95%", md: "60%" }}
                  style={{
                    fontFamily: "Poppins_400Regular",
                    fontSize: 13,
                    lineHeight: 21,
                    padding: 10,
                    color: "#9C9DA5",
                  }}
                >
                  Amount:
                  <Text
                    style={{
                      fontFamily: "Poppins_400Regular",
                      fontSize: 12,
                      lineHeight: 21,
                      padding: 10,
                      color: "#747474",
                    }}
                  >
                    {profileDetailAll &&
                      profileDetailAll.profile &&
                      profileDetailAll.profile.data &&
                      profileDetailAll.profile.data.price}
                  </Text>
                </Text>
                <Text
                  w={"100%"}
                  style={{
                    fontFamily: "Poppins_400Regular",
                    fontSize: 13,
                    lineHeight: 21,
                    padding: 10,
                    color: "#9C9DA5",
                  }}
                >
                  Category:
                  <Text
                    style={{
                      fontFamily: "Poppins_400Regular",
                      fontSize: 12,
                      lineHeight: 21,
                      padding: 10,
                      color: "#747474",
                    }}
                  >
                    {profileDetailAll?.profile.data.category || "Not Available"}
                  </Text>
                </Text>
                <Text
                  w={"100%"}
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
                      fontSize: 13,
                      lineHeight: 21,
                      padding: 10,
                      color: "#3C7CDD",
                    }}
                  >                    
                    {`#${profileDetailAll?.profile.data.category || "Not Available"}`}
                  </Text>
                </Text>
                {/* facebook details---- */}
                <Text
                  w={"100%"}
                  style={{
                    fontFamily: "Poppins_600SemiBold",
                    fontSize: 13,
                    lineHeight: 21,
                    padding: 10,
                    color: "#9C9DA5",
                  }}
                >
                  Facebook Details :
                </Text>
                <Text
                  w={{ base: "95%", md: "50%" }}
                  style={{
                    fontFamily: "Poppins_400Regular",
                    fontSize: 13,
                    lineHeight: 21,
                    padding: 10,
                    color: "#9C9DA5",
                  }}
                >
                  Followers:{" "}
                  <Text
                    style={{
                      fontFamily: "Poppins_400Regular",
                      fontSize: 13,
                      lineHeight: 21,
                      padding: 10,
                      color: "#747474",
                    }}
                  >
                    {followersFormatter(profileDetailAll?.profile.data.facebook.Followers) || "Not Available"}
                  </Text>
                </Text>
                <Text
                  w={{ base: "95%", md: "50%" }}
                  style={{
                    fontFamily: "Poppins_400Regular",
                    fontSize: 13,
                    lineHeight: 21,
                    padding: 10,
                    color: "#9C9DA5",
                  }}
                >
                  Following:{" "}
                  <Text
                    style={{
                      fontFamily: "Poppins_400Regular",
                      fontSize: 13,
                      lineHeight: 21,
                      padding: 10,
                      color: "#747474",
                    }}
                  >
                    {profileDetailAll?.profile.data.facebook.Following || "Not Available"}
                  </Text>
                </Text>
                {/* Instagram details---- */}
                <Text
                  w={"100%"}
                  style={{
                    fontFamily: "Poppins_600SemiBold",
                    fontSize: 13,
                    lineHeight: 21,
                    padding: 10,
                    color: "#9C9DA5",
                  }}
                >
                  Instagram Details :
                </Text>
                <Text
                  w={{ base: "95%", md: "50%" }}
                  style={{
                    fontFamily: "Poppins_400Regular",
                    fontSize: 13,
                    lineHeight: 21,
                    padding: 10,
                    color: "#9C9DA5",
                  }}
                >
                  Followers:{" "}
                  <Text
                    style={{
                      fontFamily: "Poppins_400Regular",
                      fontSize: 13,
                      lineHeight: 21,
                      padding: 10,
                      color: "#747474",
                    }}
                  >
                    {followersFormatter(profileDetailAll?.profile.data.instagram.followers_count) || "Not Available"}
                  </Text>
                </Text>
                <Text
                  w={{ base: "95%", md: "50%" }}
                  style={{
                    fontFamily: "Poppins_400Regular",
                    fontSize: 13,
                    lineHeight: 21,
                    padding: 10,
                    color: "#9C9DA5",
                  }}
                >
                  Following:{" "}
                  <Text
                    style={{
                      fontFamily: "Poppins_400Regular",
                      fontSize: 13,
                      lineHeight: 21,
                      padding: 10,
                      color: "#747474",
                    }}
                  >
                    {profileDetailAll?.profile.data.instagram.follows_count || "Not Available"}
                  </Text>
                </Text>
              </Box>
            </Stack>
          </VStack>
          <VStack bg="blue" w={"100%"} space={3} p={5}>
            <Text
              style={{
                fontFamily: "Poppins_600SemiBold",
                fontSize: 20,
                color: "#203655",
                padding: 10,
              }}
            >
              All Post
            </Text>
            {(media && media.length) ?
              <Box
                flexWrap="wrap"
                flexDirection="row"
                padding={10}
                justifyContent="left"
              >                
                {media && media.map((item,i)=>{
                  return (
                    <AllPostCard {...item} />
                  )
                })}
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
                  }}
                >
                  Not Available
                </Text>
              </Box>
            }
            <Text
              style={{
                fontFamily: "Poppins_600SemiBold",
                fontSize: 20,
                color: "#203655",
                padding: 10,
              }}
            >
              Insights
            </Text>
            {profileDetailAll?.isActive && false ?
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
                <Box w={["100%"]} h={["90%"]} style={{ flex: useBreakpointValue({ base: 8 }) }}>
                  <Image
                    w={["100%", "100%", "100%"]}
                    h="100%"
                    source={require("../../assets/images/backgrounds/insights.png")}
                    resizeMode="stretch"
                    alt="image"
                  />
                </Box>
              </Stack>
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
                  Not Available
                </Text>
              </Box>
            }
          </VStack>
          <View accessibilityLabel="view">
            <Footer />
          </View>
        </Screen>
      </>
    )
  })

const $root: ViewStyle = {
  flex: 1,
}
