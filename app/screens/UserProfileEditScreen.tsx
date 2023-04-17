import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Screen, Text } from "../components"
import { FormControl, HStack, Input, WarningOutlineIcon, Button, useBreakpointValue, Box, Pressable, VStack, Image } from "native-base"
import { create } from 'apisauce'
import { BottomNavigation, TopNavigation } from "../navigators/Navigation"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Config from "../config"

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

const api = create({
  baseURL: Config.baseURL,
  headers: { Accept: 'application/json' },
})
const putapi = create({
  baseURL: Config.baseURL,
  headers: { 'Content-Type' : 'multipart/form-data' },
})

type user = {
  "id":string,
  "first_name":string,
  "last_name":string,
  "email":string,
  "mobile":string,
  "gender":string,
  "city":string,
  "state":string,
  "country":string,
  "image":string,
  "is_influencer":Boolean,
  "dob": string,
  "profile":{
    "data":{
      "price":number,
      "category":string,
      "facebook":{},
      "instagram":{}
    }
  },
  "favorites":[]
}

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `UserProfileEdit: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="UserProfileEdit" component={UserProfileEditScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const UserProfileEditScreen = observer(function UserProfileEditScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const  [userInfo, setUserInfo]  = useState<user>(
    {
      "id":"",
      "first_name":"",
      "last_name":"",
      "email":"",
      "mobile":"",
      "gender":"",
      "city":"",
      "state":"",
      "country":"",
      "image":"",
      "dob": "",
      "is_influencer":false,
      "profile":{
        "data":{
          "price":0,
          "category":"General",
          "facebook":{},
          "instagram":{}
        }
      },
      "favorites":[]
    }
  )
  const getUserInfo = async () => {
    let userInfo = undefined;
    try {
      userInfo = await AsyncStorage.getItem('loggedIn_userDetails')
      setUserInfo(userInfo != null && JSON.parse(userInfo))
      console.log('userInfo: ', userInfo);
      return userInfo != null ? JSON.parse(userInfo) : null
    } catch(e) {      
      console.log('users_query data not found in local host');
    }
 
  }

  useEffect(()=>{
    getUserInfo()     
  },[])

  // Pull in navigation via hook
  const navigation = useNavigation()

  return (
    <Screen style={$root} preset="scroll">
      <TopNavigation navigation={navigation} />
      <BottomNavigation navigation={navigation} />
      <>
      <VStack bg="white" w={useBreakpointValue({ base: "100%", md: "30%" })} space={3} p={5} mb={10} mt={'-50px'}
      
      >
        <Box w="100%" h={useBreakpointValue({ base: 30})} p={2}>
          <HStack space={5} alignItems="center">
            <Pressable onPress={() => {navigation.goBack()}} flexDirection={'row'}>
              <Ionicons name="arrow-back" size={20} color="#203655" />                    
            </Pressable>
            <Text style={{fontFamily: 'Poppins_700Bold', fontSize: 24, lineHeight: 29, color: '#203655'}}>Edit Profile</Text>
          </HStack>
        </Box>
        <VStack style={{ shadowColor: "rgba(0, 0, 0, 0.12)", shadowOpacity: 0.9,shadowRadius: 10,}} m={3} p={3}>
          <Image rounded="full" w={150} h={150} alignSelf="center" borderColor="white" borderWidth={5} m={3}
            source={{uri:`${Config.baseURL}${userInfo.image}`}}               
            alt="image" 
            style={{ shadowColor: "rgba(0, 0, 0, 0.2)", shadowOpacity: 0.9,shadowRadius: 10,}}
          />
          <FormControl isInvalid={false} w="95%" m={2}>
            <FormControl.Label><Text style={{fontFamily: 'Poppins_400Regular', fontSize: 14, lineHeight: 21, color: '#9C9DA5'}}>First Name</Text></FormControl.Label>
            <Input h={'48px'} placeholder="First Name" defaultValue={userInfo.first_name} value={userInfo.first_name} onChangeText={(text)=>{      
                    setUserInfo((prevState)=>({...prevState, first_name : text}))                                     
                  }}/>
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              Enter correctly
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={false} w="95%" m={2}>
            <FormControl.Label><Text style={{fontFamily: 'Poppins_400Regular', fontSize: 14, lineHeight: 21, color: '#9C9DA5'}}>Last Name</Text></FormControl.Label>
            <Input h={'48px'} placeholder="Last Name"  defaultValue={userInfo.last_name} value={userInfo.last_name} 
              onChangeText={(text)=>{ setUserInfo((prevState)=>({...prevState, last_name : text})) }}
            />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              Enter correctly
            </FormControl.ErrorMessage>
          </FormControl>
            <FormControl isInvalid={false} w="95%" m={2}>
              <FormControl.Label><Text style={{fontFamily: 'Poppins_400Regular', fontSize: 14, lineHeight: 21, color: '#9C9DA5'}}>DOB</Text></FormControl.Label>
              <Input h={'48px'} placeholder="DOB" value={userInfo.dob} onChangeText={(text)=>{setUserInfo((prevState)=>({...prevState, dob : text}))}}/>
              <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                Enter correctly
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={false} w="95%" m={2}>
              <FormControl.Label><Text style={{fontFamily: 'Poppins_400Regular', fontSize: 14, lineHeight: 21, color: '#9C9DA5'}}>Gender</Text></FormControl.Label>
              <Input h={'48px'} placeholder="Gender" defaultValue={userInfo.gender} value={userInfo.gender} onChangeText={(text)=>{setUserInfo((prevState)=>({...prevState, gender : text}))}}/>
              <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                Enter correctly
              </FormControl.ErrorMessage>
            </FormControl>
          <FormControl isInvalid={false} w="95%" m={2}>
              <FormControl.Label><Text style={{fontFamily: 'Poppins_400Regular', fontSize: 14, lineHeight: 21, color: '#9C9DA5'}}>Email</Text></FormControl.Label>
              <Input h={'48px'} placeholder="Email" defaultValue={userInfo.email} value={userInfo.email} onChangeText={(text)=>{setUserInfo((prevState)=>({...prevState, email : text}))}}/>
              <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                Enter correctly
              </FormControl.ErrorMessage>
          </FormControl>
            <FormControl isInvalid={false} w="95%" m={2}>
              <FormControl.Label><Text style={{fontFamily: 'Poppins_400Regular', fontSize: 14, lineHeight: 21, color: '#9C9DA5'}}>Contact</Text></FormControl.Label>
              <Input h={'48px'} placeholder="Contact" defaultValue={userInfo.mobile} value={userInfo.mobile} onChangeText={(text)=>{setUserInfo((prevState)=>({...prevState, mobile : text}))}}/>
              <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                Enter correctly
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={false} w="95%" m={2}>
              <FormControl.Label><Text style={{fontFamily: 'Poppins_400Regular', fontSize: 14, lineHeight: 21, color: '#9C9DA5'}}>Amount</Text></FormControl.Label>
              <Input h={'48px'} placeholder="Amount" defaultValue={`${userInfo && userInfo.profile && userInfo.profile.data && userInfo.profile.data.price}`} value={`${userInfo && userInfo.profile && userInfo.profile.data && userInfo.profile.data.price}`} onChangeText={(text)=>{setUserInfo((prevState)=>({...prevState, price : Number(text)}))}}/>
              <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                Enter correctly
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={false} w="95%" m={2}>
              <FormControl.Label><Text style={{fontFamily: 'Poppins_400Regular', fontSize: 14, lineHeight: 21, color: '#9C9DA5'}}>City</Text></FormControl.Label>
              <Input h={'48px'} placeholder="City" defaultValue={userInfo.city} value={userInfo.city} onChangeText={(text)=>{setUserInfo((prevState)=>({...prevState, location : text}))}}/>
              <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                Enter correctly
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={false} w="95%" m={2}>
              <FormControl.Label><Text style={{fontFamily: 'Poppins_400Regular', fontSize: 14, lineHeight: 21, color: '#9C9DA5'}}>State</Text></FormControl.Label>
              <Input h={'48px'} placeholder="State"  defaultValue={userInfo.state} value={userInfo.state}/>
              <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                Enter correctly
              </FormControl.ErrorMessage>
            </FormControl>
          <FormControl isInvalid={false} w="95%" m={2}>
              <FormControl.Label><Text style={{fontFamily: 'Poppins_400Regular', fontSize: 14, lineHeight: 21, color: '#9C9DA5'}}>Country</Text></FormControl.Label>
              <Input h={'48px'} placeholder="Country"  defaultValue={userInfo.country} value={userInfo.country}/>
              <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                Enter correctly
              </FormControl.ErrorMessage>
          </FormControl>
          <HStack justifyContent="space-between" m={3}>
            <Text style={{fontFamily: 'Poppins_400Regular', fontSize: 14, lineHeight: 21, color: '#9C9DA5', textAlign:"center", alignSelf:'center'}}>
              Industries
            </Text>
            <Button
              borderRadius="full"
              colorScheme="success"
              onPress={() =>{
                console.log('Clicked to add industries'); 
                
              }}
              bg="rgba(60, 167, 221, 1)"
              w={100}
            >
              Add
            </Button>
          </HStack>
          <HStack space={2} m={5}>
            <Button
              borderRadius="full"
              variant="outline"
              bg="white"
              w={'31%'}
              color="gray.400"
              >
                 {userInfo && userInfo.profile && userInfo.profile != null ? userInfo.profile.data && userInfo.profile.data.category : 'Industry-1'}
              </Button>
            <Button
              borderRadius="full"
              variant="outline"
              bg="white"
              w={'31%'}
              color="gray.400"
              >
                Industry-2
              </Button>
            <Button
              borderRadius="full"
              variant="outline"
              bg="white"
              w={'31%'}
              color="gray.400"
              >
                Industry-3
              </Button>
          </HStack>
          <HStack justifyContent="space-between" m={3}>
            <Text style={{fontFamily: 'Poppins_400Regular', fontSize: 14, lineHeight: 21, color: '#9C9DA5', textAlign:"center", alignSelf:'center'}}>
              Trending Hashtags
            </Text>
            <Button
              borderRadius="full"
              colorScheme="success"
              onPress={() =>{
                console.log('Clicked to add industries'); 
                
              }}
              bg="rgba(60, 167, 221, 1)"
              w={100}
            >
              Add
            </Button>
          </HStack>
          <Text style={{fontSize: 14, lineHeight: 19, color: "rgba(60, 167, 221, 1)", textAlign:"left", margin: 10}}>
          #{userInfo && userInfo.profile && userInfo.profile != null ? userInfo.profile.data && userInfo.profile.data.category : 'HashTag1'}, #HashTag2, #HashTag3
          </Text>
          <HStack space={3} justifyContent="right" m={3} mb={5}>
            <Button
              borderRadius="full"
              variant="outline"
              bg="white"
              w={100}
              color="gray.400"
              >
                Cancel
              </Button>
            <Button
              borderRadius="full"
              colorScheme="success"
              onPress={() =>{
                console.log('Clicked to save profile'); 
                putapi.patch('/user', userInfo                
                ).then((res)=>{console.log(res)}).catch((error)=>{console.log(error)});
              }}
              bg="rgba(60, 167, 221, 1)"
              w={100}
            >
              Save
          </Button>
          </HStack>
        </VStack>
      </VStack>
      </>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
