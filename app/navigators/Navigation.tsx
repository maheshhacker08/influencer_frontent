import {
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  FavouriteIcon,
  HamburgerIcon,
  HStack,
  Icon,
  Image,
  Input,
  Menu,
  Pressable,
  StatusBar,
  useBreakpointValue,
  VStack,
} from "native-base"
import React, { useEffect, useState } from "react"
import { View, Text, TouchableOpacity, Dimensions, ViewStyle } from "react-native"
import { navigationRef } from "./navigationUtilities"
import { Ionicons, MaterialIcons } from "@expo/vector-icons"
import { useStores } from "../models"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { WelcomeScreen } from "../screens"
import { NavigationContainer } from "@react-navigation/native"
import { LinearGradient } from "expo-linear-gradient"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { ApiResponse, create } from 'apisauce'
import Config from "../config"

const $tapButton: ViewStyle = {
  // marginTop: spacing.extraSmall,
  marginTop: 20,
  backgroundColor: "#127AD0",
  borderRadius: 100,
  minHeight: 0,
  width: 70,
}

function TopNavigation({ navigation }) {
  const [userData,setUserData] = useState<any>()

  // define the api
  const api = create({
    baseURL: Config.baseURL,
    headers: { Accept: 'application/json' },
  })
  // bearer token--------
  const {
    authenticationStore: { token },
  } = useStores()

  api.addAsyncRequestTransform(request => async () => { 
    request.headers["Authorization"] = "Bearer " + token;
    console.log()
  });

  const [favoriteCount, setFavoriteCount] = useState(0)
  const {userProfileUpdateStore: {
    id,first_name,last_name,email,mobile,gender,city,state,country,image,is_active,is_staff,is_business,is_influencer,instagram,facebook,favorites,profile_verified,price,setFirstName,setLastName,setGender,setEmail,setMobile,setCity,setState,setCountry,setPrice,setFavorites,setInstagram,setFacebook}} = useStores()

  useEffect(()=>{
    api.get('/user')
    .then((res:ApiResponse<any,any>)=>{
      console.log((res.data.favorites).length)      
      setFavorites((res.data.favorites).length)
      setUserData(res.data)
    })
    .catch((error)=> console.log(error));
  },[token])

  const showBurger = useBreakpointValue({
    base: "flex",
    lg: "none",
  })

  const {
    authenticationStore: { isAuthenticated, setAuthToken, setAuthPassword, setAuthEmail, logout },
  } = useStores()
  const [WishlistInfluencer, setWishlistInfluencer] = useState<any>([]);

  useEffect(() => {
    console.log("Auth Status: ", isAuthenticated)
    if(!isAuthenticated){
      console.log("Logged Out")
      navigation.navigate('Home')
    }
  }, [isAuthenticated])
 

  return (
    <>
      <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
      <Box safeAreaTop bg="#FFF"></Box>
      <HStack
        justifyContent="space-between"
        alignItems="center"
        px={25}
        bg="#fff"
        zIndex={10}
        position="sticky"
        top={0}
      >
        <HStack space={5} alignItems="center">
          <Pressable onPress={() => navigation.navigate("Home")}>
            <Image
              style={{
                width: useBreakpointValue({ base: 120, lg: 160 }),
                height: useBreakpointValue({ base: 52, lg: 70 }),
              }}
              source={require("../../assets/images/logo_2x.png")}
              alt="SocioFusion Logo Image"
            />
          </Pressable>
          {/* <Input
            display={useBreakpointValue({ base: "none", md: "flex" })}
            placeholder="Search"
            height={35}
            borderRadius="4"
            px="1"
            fontSize="14"
            InputLeftElement={
              <Icon m="2" ml="3" size="4" color="gray.400" as={<MaterialIcons name="search" />} />
            }
            InputRightElement={
              <Icon m="2" mr="3" size="4" color="gray.400" as={<MaterialIcons name="mic" />} />
            }
          /> */}
        </HStack>
        <HStack alignItems="center">
          <HStack
            space={20}
            alignItems="center"
            style={{ display: showBurger === "flex" ? "none" : "flex" }}
          >
            <HStack space={2}>
              <Button
                variant="ghost"
                colorScheme="success"
                onPress={() => navigation.navigate("Home")}
                color="gray.400"
              >
                <Text style={{ color: "gray.400" }}>Home</Text>
              </Button>
              <Button
                variant="ghost"
                colorScheme="success"
                onPress={() => navigation.navigate("About Us")}
              >
                <Text>About Us</Text>
              </Button>
              <Button
                variant="ghost"
                colorScheme="success"
                onPress={() => navigation.navigate("Blog")}
              >
                <Text>Blog</Text>
              </Button>
              <Button
                variant="ghost"
                colorScheme="success"
                onPress={() => navigation.navigate("Contact Us")}
              >
                <Text>Contact Us</Text>
              </Button>
              {isAuthenticated && (
                <Button
                  variant="ghost"
                  colorScheme="success"
                  onPress={() => navigation.navigate("Find Influencer")}
                >
                  <Text>Find Influencer</Text>
                </Button>
              )}              
            </HStack>
            <HStack space={5} alignItems="center">
              {!isAuthenticated && (
                <Button
                  borderRadius="full"
                  colorScheme="success"
                  onPress={() => {
                    navigation.navigate("Signin")
                  }}
                  bg="#127AD0"
                >
                  Sign In
                </Button>
              )}
              {isAuthenticated && (
                <>
                  <VStack>
                    <TouchableOpacity> 
                      <Badge // bg="red.400"
                        colorScheme="danger"
                        rounded="full"
                        mb={-2}
                        mr={-2}
                        zIndex={1}
                        width={15}
                        height={15}
                        variant="solid"
                        alignSelf="flex-end"
                        _text={{
                          fontSize: 12,
                        }}
                      >
                        2
                      </Badge>
                      <Ionicons name="notifications-outline" size={20} color="gray" />
                    </TouchableOpacity>
                  </VStack>
                  <TouchableOpacity onPress={()=>navigation.navigate('Wishlist')}> 
                    { favorites != 0 &&
                    <Badge // bg="red.400"
                      colorScheme="danger"
                      rounded="full"
                      mb={-2}
                      mr={-2}
                      zIndex={1}
                      width={15}
                      height={15}
                      variant="solid"
                      alignSelf="flex-end"
                      _text={{
                        fontSize: 12,
                      }}
                    >
                      {favorites}
                    </Badge>
                    }
                    <Ionicons name="heart-outline" size={20} color="gray.400" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>navigation.navigate('Campaign Queries')}> 
                    <Ionicons name="people-outline" size={20} color="gray.400" />
                  </TouchableOpacity>
                  <Menu
                    w="170"
                    trigger={(triggerProps) => {
                      return (
                        <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                          <Avatar
                            size="sm"
                            bg="green.500"
                            source={{
                              uri: `${Config.baseURL}${userData && userData.image}`,
                            }}
                          >
                            {/* SF */}
                          </Avatar>
                        </Pressable>
                      )
                    }}
                  >
                    <Menu.Item onPress={()=>{navigation.navigate("UserProfile")}}>View Profile</Menu.Item>
                    <Menu.Item onPress={()=>{navigation.navigate("AdminDashboard")}}>Admin Dashboard</Menu.Item>
                    <Menu.Item onPress={()=>{navigation.navigate("BusinessDetail")}}>Business Detail</Menu.Item>
                    <Menu.Item onPress={()=>{navigation.navigate("FindBusiness")}}>Find Business</Menu.Item>
                    <Menu.Item onPress={logout}>Sign Out</Menu.Item>
                  </Menu>
                </>
              )}
            </HStack>
          </HStack>
          <HStack space={3} style={{ display: showBurger }} alignItems="center">
            <VStack>
              <Badge // bg="red.400"
                colorScheme="danger"
                rounded="full"
                mb={-2}
                mr={-1}
                zIndex={1}
                width={15}
                height={15}
                variant="solid"
                alignSelf="flex-end"
                _text={{
                  fontSize: 12,
                }}
              >
                2
              </Badge>
              <Ionicons name="notifications-outline" size={20} color="gray" />
            </VStack>

            <Box alignItems="center">
              <Menu
                w="190"
                trigger={(triggerProps) => {
                  return (
                    <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                      <HamburgerIcon />
                    </Pressable>
                  )
                }}
              >
                <Menu.Item onPress={() => navigation.navigate("Home")}>Home</Menu.Item>
                <Menu.Item onPress={() => navigation.navigate("About Us")}>About Us</Menu.Item>
                <Menu.Item onPress={() => navigation.navigate("Blog")}>Blog</Menu.Item>
                <Menu.Item onPress={() => navigation.navigate("Contact Us")}>Contact Us</Menu.Item>

                {isAuthenticated ? (
                  <>
                    <Menu.Item onPress={() => navigation.navigate("Find Influencer")}>
                      Find Influencer
                    </Menu.Item>
                    <Menu.Item onPress={() => navigation.navigate("UserProfile")}>View Profile</Menu.Item>
                    <Menu.Item onPress={() => navigation.navigate("AdminDashboard")}>Admin Dashboard</Menu.Item>
                    <Menu.Item onPress={()=>{navigation.navigate("BusinessDetail")}}>Business Detail</Menu.Item>
                    <Menu.Item onPress={()=>{navigation.navigate("FindBusiness")}}>Find Business</Menu.Item>
                    <Menu.Item onPress={logout}>Sign Out</Menu.Item>
                  </>
                ) : (
                  <>
                    <Menu.Item
                      onPress={() => navigation.navigate("Signin")}
                    >Sign In</Menu.Item>
                    {/* <Menu.Item onPress={() => navigation.navigate("Signup")}>Sign Up</Menu.Item> */}
                  </>
                )}
              </Menu>
            </Box>
          </HStack>
        </HStack>
      </HStack>
    </>
  )
}

function BottomNavigation({ navigation }) {
  const showMenu = useBreakpointValue({
    base: "flex",
    lg: "none",
  })
  const {
    authenticationStore: { isAuthenticated, token},
  } = useStores()
  const [userData,setUserData] = useState<any>()

  // define the api
  const api = create({
    baseURL: Config.baseURL,
    headers: { Accept: 'application/json' },
  })

  api.addAsyncRequestTransform(request => async () => { 
    request.headers["Authorization"] = "Bearer " + token;
    console.log()
  });
  useEffect(()=>{
   api.get('/user')
    .then((res)=>{
      setUserData(res.data)
    })
    .catch((error)=> console.log(error));
  },[token])

  return (
    <>
      {true ? (
        <LinearGradient
          colors={["rgba(172, 203, 238, 1)", "rgba(231, 240, 253, 1)"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}                    
          style={{
            display: showMenu,
            zIndex: 10,
            position: "sticky",
            // position: "fixed",
            top: Dimensions.get("screen").height - 50,
          }}
        >
          <HStack justifyContent="space-between" px={25} h={50}>
            <Button
              variant="ghost"
              colorScheme="success"
              onPress={() => navigation.navigate("Home")}
            >
              <Center color="gray">
                <Ionicons name="notifications-outline" size={20} />
                <Text>Home</Text>
              </Center>
            </Button>
            <Button
              variant="ghost"
              colorScheme="success"
              onPress={() => navigation.navigate("Campaign Queries")}
            >
              <Center>
                <Ionicons name="people-outline" size={20} />
                <Text>Checklist</Text>
              </Center>
            </Button>
            <Button
              variant="ghost"
              colorScheme="success"
              onPress={() => navigation.navigate("Wishlist")}
            >
              <Center>
                <Ionicons name="heart-outline" size={20} />
                <Text>Wishlist</Text>
              </Center>
            </Button>
            <Button
              variant="ghost"
              colorScheme="success"
              onPress={() => navigation.navigate("UserProfile")}
            >
              <Center>
                <Avatar
                  size="xs"
                  // bg="green.500"
                  source={{
                    uri: `${Config.baseURL}${userData && userData.image}`,
                  }}
                >
                  {/* AJ */}
                </Avatar>
                <Text>Account</Text>
              </Center>
            </Button>
          </HStack>
        </LinearGradient>
      ) : (
        ""
      )}
    </>
  )
}

const $gredient: ViewStyle = {
  flex: 1,
}

export { TopNavigation, BottomNavigation }
