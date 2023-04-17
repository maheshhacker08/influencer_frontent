import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, StyleSheet } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps, navigationRef } from "../navigators"
import { Screen, Text } from "../components"
import { useStores } from "../models"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import Footer from "../components/Footer"
import { View, useBreakpointValue, VStack, Pressable, Link, Button, List } from "native-base"
import { Card, CardImage, CardTitle, CardContent, CardAction } from "react-native-card-view"
import { Center, Box, HStack, Image, Stack, Heading, NativeBaseProvider } from "native-base"
import { useNavigation } from "@react-navigation/native"
import { BottomNavigation, TopNavigation } from "../navigators/Navigation"
import { Ionicons } from "@expo/vector-icons"
import { ApiResponse, create } from 'apisauce'
import Config from "../config"
// import { useStores } from "../models"

// define the api
const api = create({
  baseURL: Config.baseURL,
  headers: { Accept: 'application/json' },
})
// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `Blogs: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="Blogs" component={BlogsScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const BlogsScreenHome = observer(function BlogsScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const [blogList, setBlogList] = useState<Array<any>>([])

  const mediaURI = Config.baseURL
  
  useEffect(()=>{
    api.get('/blogs/?limit=2&offset=0')
    .then((res:ApiResponse<any,any>)=>{
      console.log(res.data?.results)
      setBlogList(res.data?.results)
    })
    .catch((error)=> console.log(error));
  },[])

  const flexDir_parent = useBreakpointValue({
    base: "row",
    sm: "row",
    md: "row",
    lg: "column",
    xl: "column",
  })
  const flexDir = useBreakpointValue({
    base: "column",
    sm: "column",
    md: "column",
    lg: "row",
    xl: "row",
  })

  const marginLeft = useBreakpointValue({
    base: 0,
    sm: 0,
    md: 0,
    lg: -50,
    xl: -50,
  })
  const padding = useBreakpointValue({
    base: 0,
    sm: 0,
    md: 0,
    lg: 20,
    xl: 20,
  })
  const margin_between_blogs = useBreakpointValue({
    base: 0,
    sm: 0,
    md: 0,
    lg: 50,
    xl: 50,
  })
  const border_radius_web = useBreakpointValue({
    base: 0,
    sm: 0,
    md: 0,
    lg: 30,
    xl: 30,
  })
  const border_radius_mobile = useBreakpointValue({
    base: 50,
    sm: 50,
    md: 50,
    lg: 0,
    xl: 0,
  })
  const margin_right_tab = useBreakpointValue({
    base: "auto",
    sm: "auto",
    md: "auto",
    lg: 0,
    xl: 0,
  })
  const second_blog_show = useBreakpointValue({
    base: false,
    sm: false,
    md: true,
    lg: true,
    xl: true,
  })
  const background_color_mobile = useBreakpointValue({
    base: "rgba(252,234,255,0.6)",
    sm: "rgba(252,234,255,0.6)",
    md: "rgba(252,234,255,0.6)",
    lg: "rgba(252,234,255,0)",
    xl: "rgba(252,234,255,0)",
  })
  const background_color_web = useBreakpointValue({
    base: "rgba(252,234,255,0)",
    sm: "rgba(252,234,255,0)",
    md: "rgba(252,234,255,0)",
    lg: "rgba(252,234,255,0.6)",
    xl: "rgba(252,234,255,0.6)",
  })
  const navigation = useNavigation<any>()
  return (
    <VStack mx={10}>
      <Text
        style={[
          $heading_blog,
          { fontFamily: "Poppins_700Bold", fontSize: 37, lineHeight: 52, color: "#022f46" },
        ]}
      >
        Blogs
      </Text>
      <Stack
        direction={["row", "row", "row", "column", "column"]}
        style={{ marginTop: 50 }}
        justifyContent="center"
      >
         <Pressable onPress={() => {
            navigation.navigate("BlogDetail",{id:blogList[1]?.id})
            console.log("Reading Full Blog.")
            }}>
        <Stack
          direction={["column", "column", "column", "row", "row"]}
          // rounded="lg"
          overflow="hidden"
          width={["350", "350", "350", "6/6", "6/6"]}
          height={["400", "400", "400", "450", "450"]}
          // shadow="1"
          _light={{
            backgroundColor: background_color_mobile,
          }}
          _dark={{
            backgroundColor: "gray.700",
          }}
          style={{
            borderTopLeftRadius: border_radius_mobile,
            borderBottomRightRadius: border_radius_mobile,
            marginRight: margin_right_tab,
            marginLeft: "auto",
          }}
        >
          <Box w={["100%", "100%", "100%", "450", "450"]} h={["50%", "50%", "50%", "450", "450"]}>
            <Image
              w={["100%", "100%", "100%", "450", "450"]}
              h="100%"
              source={{uri:"https://img.freepik.com/free-photo/little-school-girl-with-book-home_1303-32068.jpg?w=1380&t=st=1675536312~exp=1675536912~hmac=a77f5d05d83f1708bff92677f34681724cd2fa77120a42a0c8d15b391b2ac972"}}
              alt="image"
              style={{ borderRadius: 25 }}
            />
          </Box>
          <Stack flex="1" p="4" space={[3, 3, 1.5]} justifyContent="space-around">
            <View
              style={{
                backgroundColor: background_color_web,
                marginLeft: marginLeft,
                padding: padding,
                borderTopRightRadius: border_radius_web,
                borderBottomLeftRadius: border_radius_web,
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins_500Medium",
                  fontSize: 24,
                  lineHeight: 29,
                  color: "#354a66",
                }}
              >
                {blogList && blogList[0]?.title}
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 15,
                  lineHeight: 21,
                  color: "#545454",
                  overflow: "hidden",
                }}
              >
                {/* <Text preset="body"> */}
                {blogList && blogList[0]?.content.match(/.{1,500}/)}
              </Text>
            </View>
          </Stack>
        </Stack>
        </Pressable>
        {second_blog_show && (
          <Pressable onPress={() => {
            navigation.navigate("BlogDetail",{id:blogList[1]?.id})
            console.log("Reading Full Blog.")
            }}>
          <Stack            
            direction={["column-reverse", "column-reverse", "column-reverse", "row", "row"]}
            // rounded="lg"
            overflow="hidden"
            width={["350", "350", "350", "6/6", "6/6"]}
            height={["400", "400", "400", "450", "450"]}
            // shadow="1"
            _light={{
              backgroundColor: background_color_mobile,
            }}
            _dark={{
              backgroundColor: "gray.700",
            }}
            style={{
              borderTopRightRadius: border_radius_mobile,
              borderBottomLeftRadius: border_radius_mobile,
              marginTop: margin_between_blogs,
              marginRight: margin_right_tab,
              marginLeft: "auto",
            }}
          >
            <Stack flex="1" p="4" space={[3, 3, 1.5]} justifyContent="space-around">
              <View
                style={{
                  backgroundColor: background_color_web,
                  marginRight: marginLeft,
                  padding: padding,
                  borderTopRightRadius: border_radius_web,
                  borderBottomLeftRadius: border_radius_web,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Poppins_500Medium",
                    fontSize: 24,
                    lineHeight: 29,
                    color: "#354a66",
                  }}
                >
                  {blogList && blogList[1]?.title}
                </Text>
                <Text
                  style={{
                    fontFamily: "Poppins_400Regular",
                    fontSize: 15,
                    lineHeight: 21,
                    color: "#545454",
                    overflow: "hidden",
                  }}
                >
                  {/* <Text preset="body"> */}
                  {blogList && blogList[1]?.content.match(/.{1,500}/)}
                </Text>
              </View>
            </Stack>
            <Box
              w={["100%", "100%", "100%", "450", "450"]}
              h={["50%", "50%", "50%", "450", "450"]}
              zIndex={-1}
            >
              <Image
                w={["100%", "100%", "100%", "450", "450"]}
                h="100%"
                source={{uri:"https://img.freepik.com/free-photo/excited-kid-drawing-with-smile-indoor-shot-brunette-child-with-pen-notebook_197531-13655.jpg?w=1380&t=st=1675536273~exp=1675536873~hmac=d1fa819da96a5d9ecfa3169bd113bca7df891ab2bde30a7db41c4d04b948d90f"}}
                alt="image"
                style={{ borderRadius: 25 }}
              />
            </Box>
          </Stack>
          </Pressable>
        )}
      </Stack>      
      <Button testID="login-button" style={$tapButton} onPress={()=>navigation.navigate("Blog")}>
        More Blogs →
      </Button>
    </VStack>
  )
})

const $blogContainer: ViewStyle = {
  flex: 1,
  // backgroundColor: '#F0ECFD',
  height: 150,
  paddingVertical: 10,
  paddingHorizontal: 10,
  // flexDirection: 'lg'?'row':'column',
  margin: 10,
}

const $heading_blog: TextStyle = {
  flex: 1,
  textDecorationLine: "underline",
  textDecorationStyle: "solid",
  textDecorationColor: "#022F46",
  // TextDecoder: "underline",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
}


const $tapButton: ViewStyle = {
  // marginTop: spacing.extraSmall,
  marginTop: 20,
  marginBottom: 30,
  backgroundColor: "#127AD0",
  borderRadius: 100,
  minHeight: 0,
  width: 200,
  alignSelf: "center",
}

export const BlogsScreenMain = observer(function BlogsScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook  

  const [blogList, setBlogList] = useState<Array<any>>([])
  const navigation = useNavigation<any>()
  const { authenticationStore: { isAuthenticated } } = useStores()
  const mediaURI = Config.baseURL
  
  useEffect(()=>{
    api.get('/blogs')
    .then((res:ApiResponse<any,any>)=>{
      console.log(res.data.results)
      setBlogList(res.data.results)
    })
    .catch((error)=> console.log(error));
  },[])
  return (
    <Screen style={$root} preset="scroll">
      <TopNavigation navigation={navigation} />
      {isAuthenticated && 
        <BottomNavigation navigation={navigation} />
      }
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
              width: "91.5%",
              color: "#022F46",
              textDecorationLine: useBreakpointValue({ base: "none", md: "underline" }),
              textAlign: useBreakpointValue({ base: "left", md: "center" }),
              marginLeft: useBreakpointValue({ base: 10, md: 0 }),
            }}
          >
            Blogs
          </Text>
        </HStack>
        <Box style={{flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center', margin:10}}>
          {blogList?.length == 0 ?
          <Text
            style={{
              fontFamily: "Poppins_500Medium",
              fontSize: 16,
              lineHeight: 29,
              color: "#354a66",
            }}
          >
            No records available.
          </Text>
          : blogList?.map((blog,i)=>
           
              <VStack
                key={`blog-${i}`}
                m={5}
                px={5}
                py={5}
                space={3}
                justifyContent="center"
                bg="white"
                width={{ base: "100%", md: "33%", lg:"22%" }}
                borderRadius={20}
              >
                 <Image
                  borderRadius={20}
                  style={{
                    width: "100%",
                    height:200,
                  }}
                  source={{uri:mediaURI+blog.image}}
                />
                <Text
                  style={{
                    fontFamily: "Poppins_500Medium",
                    fontSize: 16,
                    lineHeight: 29,
                    color: "#354a66",
                  }}
                >
                  {blog.title}
                </Text>
                <Text
                  style={{
                    fontFamily: "Poppins_400Regular",
                    fontSize: 15,
                    lineHeight: 21,
                    color: "#545454",
                    overflow: "hidden",
                    textAlign: "left",
                  }}
                >
                  {blog.content.match(/.{1,97}/)}
                </Text>
                <Pressable onPress={() => {
                  navigation.navigate("BlogDetails/",{id:blog.id})                  
                  }}>
                    <Text
                      style={{
                        fontFamily: "Poppins_400Regular",
                        fontSize: 15,
                        lineHeight: 21,
                        color: "#545454",
                        overflow: "hidden",
                        textAlign: "left",
                        textDecorationLine:"underline"
                      }}
                    >
                      Read full...
                    </Text>
                  </Pressable>
                <HStack alignItems="center" justifyContent="space-between">
                  <Text
                    style={{
                      fontFamily: "Poppins_400Regular",
                      fontSize: 12,
                      lineHeight: 21,
                      color: "#545454",
                      overflow: "hidden",
                      textAlign: "left",
                    }}
                  >
                    On {blog.time}
                  </Text>
                  <HStack space={1}>
                    <Button
                      variant="ghost"
                      leftIcon={<Ionicons name="heart-outline" size={20} color="gray.400" />}
                    >
                      Add
                    </Button>
                    <Button
                      variant="ghost"
                      leftIcon={<Ionicons name="share-outline" size={20} color="gray.400" />}
                    >
                      Share
                    </Button>
                  </HStack>
                </HStack>
              </VStack>           
          )}
        </Box>
        {/* <Button testID="login-button" style={$tapButton}>
          Load More →
        </Button> */}
        <Footer />
      </VStack>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const styles = StyleSheet.create({
  title: {
    fontSize: 38,
    backgroundColor: "transparent",
  },
  button: {
    marginRight: 10,
  },
})
