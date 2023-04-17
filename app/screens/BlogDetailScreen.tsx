import React, { FC, useState, useEffect, useRef, RefObject } from "react"
import { observer } from "mobx-react-lite"
import { ScrollView, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Screen, Text } from "../components"
import { useNavigation, useRoute, useScrollToTop } from "@react-navigation/native"
import { BottomNavigation, TopNavigation } from "../navigators/Navigation"
import { useStores } from "../models"
import Footer from "../components/Footer"
import { ApiResponse, create } from 'apisauce'
import { Box, Button, Divider, HStack, Image, Link, Pressable, VStack } from "native-base"
import { Ionicons } from "@expo/vector-icons"
import Config from "../config"

const api = create({
  baseURL: Config.baseURL,
  headers: { Accept: 'application/json' },
})
// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `BlogDetail: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="BlogDetail" component={BlogDetailScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const BlogDetailScreen: FC<StackScreenProps<AppStackScreenProps, "BlogDetail">> = observer(function BlogDetailScreen() {
  // Pull in one of our MST stores  
  const { authenticationStore: { isAuthenticated } } = useStores()
  // Pull in navigation via hook
  const navigation = useNavigation<any>()  

  const route = useRoute<any>()
  
  
  const [TrendingBlogs, setTrendingBlogs] = useState<Array<any>>([])
  const [blog, setBlog] = useState<any>({})
  const mediaURI = Config.baseURL

  const ref = React.useRef<any>({});
  useScrollToTop(ref);
  
  useEffect(()=>{    
    api.get(`/blogs/${route.params.id}`)
    .then((res)=>{
      console.log(res)
      setBlog(res.data)
    })
    .catch((error)=> console.log(error));

    api.get('/blogs/?limit=3&offset=0')
    .then((res:ApiResponse<any,any>)=>{
      console.log(res)
      setTrendingBlogs(res.data.results)
    })
    .catch((error)=> console.log(error));

  },[route.params.id])

  return (    
    <ScrollView ref={ref}>
    <Screen style={$root} preset="scroll">      
      <TopNavigation navigation={navigation} />
      {isAuthenticated && 
        <BottomNavigation navigation={navigation} />
      }      
      <VStack space={10}>
        <Box w="100%" h={400} style={{display:"flex"}} bg="white">
          <Image
            style={{      
              position:"absolute", top:0,left:0,
              width: "100%",
              height:"100%",
            }}
            // source={{uri:mediaURI+blog.image}}
            source={{uri:"https://img.freepik.com/premium-photo/copy-space-girl-with-backpack_23-2148601455.jpg?w=1480"}}
          />
          <VStack space={20} alignItems="left" mt={10} ml={10}>
            <Pressable onPress={() => {navigation.goBack()}} flexDirection={'row'}>
              <Ionicons name="arrow-back" size={20} color="#203655" />                    
            </Pressable>
            <Text          
              style={{
                fontFamily: "Poppins_500Medium",
                fontSize: 30,
                lineHeight: 35,
                color: "#354a66",
                width:"40%"
              }}
            >
              {blog.title}
            </Text>
          </VStack>        
        </Box>
        <VStack space={5} alignItems="center" mx={10}>
          <Text          
            style={{
              fontFamily: "Poppins_500Medium",
              fontSize: 30,
              lineHeight: 35,
              color: "#354a66",
              width:"40%",
              textAlign:"center"
            }}            
          >
            {blog.title}
          </Text>
          <Divider w={200} bgColor="#354a66" h={1} borderRadius="full"/>
          <Text   
            style={{
              fontSize: 16,
              lineHeight: 21,
              color: "#424242",
              textAlign:"left",
              marginTop:5
            }}            
          >
            {blog.content}
          </Text>
        </VStack>
        {/* Trending Blogs */}
        <VStack space={5} alignItems="center">
          <Text                    
            style={{
              fontFamily: "Poppins_500Medium",
              fontSize: 30,
              lineHeight: 35,
              color: "#354a66",
              width:"40%",
              textAlign:"center"
            }}            
          >
            Trending Blogs
          </Text>
          <Divider w={200} bgColor="#354a66" h={1} borderRadius="full"/>
          <Box style={{flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center', margin:10}}>          
            {TrendingBlogs?.length == 0 ?
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
            : TrendingBlogs && TrendingBlogs.map((item,i)=>{
                return (
                  <VStack
                    key={`item-${i}`}
                    m={5}
                    px={5}
                    py={5}
                    space={3}
                    justifyContent="center"
                    bg="white"
                    width={{ base: "100%", md: "45%", lg:"22%" }}
                    borderRadius={20}
                  >
                    <Image
                      borderRadius={20}
                      style={{
                        width: "100%",
                        height:200,
                      }}
                      source={{uri:mediaURI+item.image}}
                    />
                    <Text
                      style={{
                        fontFamily: "Poppins_500Medium",
                        fontSize: 16,
                        lineHeight: 29,
                        color: "#354a66",
                      }}
                    >
                      {item.title}
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
                      {item.content.match(/.{1,97}/)}
                    </Text>
                    <Pressable onPress={() => {
                      navigation.navigate("BlogDetail",{id:blog.id})
                      console.log("Reading Full Blog.")
                      }}
                    >
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
                        On {item.time}
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
                )
              })
            }
          </Box>
        </VStack>
      </VStack>      
      <Footer />
    </Screen>
    </ScrollView>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
