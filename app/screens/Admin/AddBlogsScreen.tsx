import React, { FC, useCallback, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../../navigators"
import { Screen } from "../../components"
import { BottomNavigation, TopNavigation } from "../../navigators/Navigation"
import { useNavigation } from "@react-navigation/core"
import { Button, HStack, Pressable, VStack, Text, Image, FormControl, Input, WarningOutlineIcon, TextArea } from "native-base"
import { AdminSidePannelScreen } from "./Components/AdminSidePannelScreen"
import { Ionicons } from "@expo/vector-icons"
import { useStores } from "../../models"
import Config from "../../config"
import { ApiResponse, create } from "apisauce"

const api = create({
  baseURL: Config.baseURL,
  headers: { Accept: 'application/json' },
})

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `AddInfluencerForm: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="AddInfluencerForm" component={AddInfluencerFormScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const AddBlogsScreen: FC<StackScreenProps<AppStackScreenProps, "AddBlogs">> = observer(function AddBlogsScreen() {

  // Pull in one of our MST stores
  const { AddBlogStore: {
    title,
    slug,
    tag,
    content,
    // image,
    setTitle,
    setSlug,
    setTag,
    setContent,
    // setImage,
    resetStore,
    validationErrors
  } } = useStores()


  // Pull in navigation via hook
  const navigation = useNavigation<any>()
 const [isSubmitted, setIsSubmitted] = useState(false)


 const errors: typeof validationErrors = isSubmitted ? validationErrors : ({} as any)



  function AddBlogSubmit() {
    setIsSubmitted(true)

    // api.post("/api/websiteQueries/", {        
    //   title : title,
    //   slug : slug,
    //   tag : tag,
    //   content : content,
    //   })
    //   .then((res:ApiResponse<any,any>) => {
    //     console.log(res)
    //     setIsSubmitted(false)
    //   })
    //   .catch((error) => { console.log(error)})

    if (Object.values(validationErrors).some((v) => !!v)) return

    // If successful, reset the fields and.
    setIsSubmitted(false)
    resetStore()

    

  } 


  return (
    <Screen style={$root} preset='scroll'>
      <TopNavigation navigation={navigation} />
      <BottomNavigation navigation={navigation} />

    
      <HStack flex='1'>
        <VStack flex='2' h={'100vh'} bg='rgba(255, 255, 255, 0.5)' p={5}>
          <AdminSidePannelScreen/>
        </VStack>

        <VStack flex='8' p='10'>
          <HStack space={{base: 2, md: 5}}>
            <Pressable onPress={() => {navigation.navigate("AllQueries")}} flexDirection={'row'} justifyContent='center'>
              <Ionicons name="arrow-back" size={20} color="#203655"/>                    
            </Pressable>
            <Text justifyContent='center' fontSize={{base: 19, md: 24}} style={{fontFamily: 'Poppins_700Bold', lineHeight: 29, color: '#203655', marginBottom: 10}}>
              Add Influencer
            </Text>
          </HStack>
          <VStack bg='white' p={5}>
          
            <FormControl isInvalid={errors?.title ? true : false} w="90%" m={2}>
              <FormControl.Label><Text style={{fontFamily: 'Poppins_400Regular', fontSize: 14, lineHeight: 21, color: '#9C9DA5'}}>Title</Text></FormControl.Label>
              <Input h={'48px'}
                value={title}
                // value={userInfo.last_name} 
                onChangeText={setTitle}
              />
              <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                {errors?.title}
              </FormControl.ErrorMessage>
            </FormControl>
              <FormControl isInvalid={errors?.slug ? true : false} w="90%" m={2}>
                <FormControl.Label><Text style={{fontFamily: 'Poppins_400Regular', fontSize: 14, lineHeight: 21, color: '#9C9DA5'}}>Slug</Text></FormControl.Label>
                <Input h={'48px'}
                  value={slug}
                // value={userInfo.dob} 
                onChangeText={setSlug}
                />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                 {errors?.slug}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors?.tag ? true : false} w="90%" m={2}>
                <FormControl.Label><Text style={{fontFamily: 'Poppins_400Regular', fontSize: 14, lineHeight: 21, color: '#9C9DA5'}}>Tag</Text></FormControl.Label>
                <Input h={'48px'}
                  value={tag}
                // value={userInfo.dob} 
                onChangeText={setTag}
                />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                 {errors?.tag}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors?.content ? true : false} w="90%" m={2}>
                <FormControl.Label><Text style={{fontFamily: 'Poppins_400Regular', fontSize: 14, lineHeight: 21, color: '#9C9DA5'}}>Content</Text></FormControl.Label>
                <TextArea h={'100px'}
                autoCompleteType
                  value={content}
                // value={userInfo.dob} 
                onChangeText={setContent}
                />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                 {errors?.content}
                </FormControl.ErrorMessage>
              </FormControl>
              {/* <FormControl isInvalid={errors?.image ? true : false} w="90%" m={2}>
              <FormControl.Label><Text style={{fontFamily: 'Poppins_400Regular', fontSize: 14, lineHeight: 21, color: '#9C9DA5'}}>Image</Text></FormControl.Label>
              <Input h={'48px'}
                value={image}
                // value={userInfo.last_name} 
                onChangeText={setImage}
              />
              <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                {errors?.image}
              </FormControl.ErrorMessage>
            </FormControl> */}
             
            <Button
                borderRadius="full"
                colorScheme="success"
                onPress={() => {AddBlogSubmit()}}
                bg="rgba(60, 167, 221, 1)"
                w={{base:'100', md: '100'}}
                h={'8'}
                fontSize={'12'}
              >
                Submit
              </Button>
          </VStack>
        </VStack>
      </HStack>

    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
