import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../../navigators"
import { Screen } from "../../components"
import { BottomNavigation, TopNavigation } from "../../navigators/Navigation"
import { useNavigation } from "@react-navigation/core"
import { Button, HStack, Pressable, VStack, Text, Image, FormControl, Input, WarningOutlineIcon } from "native-base"
import { AdminSidePannelScreen } from "./Components/AdminSidePannelScreen"
import { Ionicons } from "@expo/vector-icons"
import { useStores } from "../../models"
import { ApiResponse, create } from "apisauce"

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
export const AddInfluencerFormScreen: FC<StackScreenProps<AppStackScreenProps, "AddInfluencerForm">> = observer(function AddInfluencerFormScreen() {

  // Pull in one of our MST stores
  const { AddInfluencerStore: {
    firstName,
    lastName,
    gender,
    dob,
    email,
    phone,
    address,
    city,
    state,
    facebookURl,
    instaURl,
    industries,
    linkedin,
    maxAmount,
    minAmount,
    setFirstName,
    setLastName,
    setGender,
    setDob,
    setEmail,
    setPhone,
    setAddress,
    setCity,
    setState,
    setFacebookURl,
    setInstaURl,
    setIndustries,
    setLinkedinURl,
    setMaxAmount,
    setMinAmount,
    resetStore,
    validationErrors
  } } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation<any>()
 const [isSubmitted, setIsSubmitted] = useState(false)


 const errors: typeof validationErrors = isSubmitted ? validationErrors : ({} as any)


  function AddInfluencerSubmit() {
    setIsSubmitted(true)

    if (Object.values(validationErrors).some((v) => !!v)) return

    // If successful, reset the fields and.
    setIsSubmitted(false)
    resetStore()
   

    
    // api
    //   .post("/dj-rest-auth/registration/", {        
    //     email: email,
    //     password1: createPassword,
    //     password2: confirmPassword,        
    //     first_name: first_name,
    //     last_name: last_name,
    //     is_business: isBusiness,
    //     is_influencer: isInfluencer,
    //     instagram:instagram,
    //     facebook:facebook
    //   })
    //   .then((res:ApiResponse<any,any>) => {
    //     console.log(res)
    //     setIsSubmitted(false)
    //   })
    //   .catch(
    //     (error) => { 
    //    console.log(error)    
    //     }
    //   )

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
            <HStack space={2} alignItems={'center'}>
              <Image rounded="full" w={150} h={150} borderColor="white" borderWidth={5} m={3}
                // source={{uri:`${Config.baseURL}${userInfo.photo}`}}               
                source={require("../../../assets/images/backgrounds/deletePhoto.png")}               
                alt="image" 
                // style={{ shadowColor: "rgba(0, 0, 0, 0.2)", shadowOpacity: 0.9,shadowRadius: 10,}}
              />
              <Button
                borderRadius="full"
                colorScheme="success"
                onPress={() => navigation.goBack()}
                bg="rgba(60, 167, 221, 1)"
                w={{base:'100', md: '100'}}
                h={'8'}
                fontSize={'12'}
              >
                Change
              </Button>
              <Button
                    borderRadius="full"
                    borderWidth={1}
                    borderColor='rgba(60, 167, 221, 1)'
                    colorScheme='rgba(60, 167, 221, 1)'
                    _text={{
                      color: 'rgba(60, 167, 221, 1)'
                    }} 
                    _hover={{
                      _text: { color: 'white' },
                    }}
                    bg="rgba(60, 167, 221, 0)"
                    w={{base:'100', md: '100'}}
                    h={'8'}
                    fontSize={'12'}
                    onPress={()=>{}}
                  >
                    Remove
                  </Button>
            </HStack>
            <HStack>
              <FormControl isInvalid={errors?.firstName ? true : false} w="25%" m={2}>
              <FormControl.Label><Text style={{fontFamily: 'Poppins_400Regular', fontSize: 14, lineHeight: 21, color: '#9C9DA5'}}>First Name</Text></FormControl.Label>
              <Input h={'48px'} placeholder="First Name" 
                value={firstName}
                // value={userInfo.last_name} 
                onChangeText={setFirstName}
              />
              <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                {errors?.firstName}
              </FormControl.ErrorMessage>
            </FormControl>
              <FormControl isInvalid={errors?.lastName ? true : false} w="25%" m={2}>
                <FormControl.Label><Text style={{fontFamily: 'Poppins_400Regular', fontSize: 14, lineHeight: 21, color: '#9C9DA5'}}>Last Name</Text></FormControl.Label>
                <Input h={'48px'} placeholder="Last Name" 
                  value={lastName}
                // value={userInfo.dob} 
                onChangeText={setLastName}
                />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                 {errors?.lastName}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors?.gender ? true : false} w="22%" m={2}>
                <FormControl.Label><Text style={{fontFamily: 'Poppins_400Regular', fontSize: 14, lineHeight: 21, color: '#9C9DA5'}}>Gender</Text></FormControl.Label>
                <Input h={'48px'} placeholder="Gender" 
                  value={gender}
                // value={userInfo.dob} 
                onChangeText={setGender}
                />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                 {errors?.gender}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors?.dob ? true : false} w="21%" m={2}>
                <FormControl.Label><Text style={{fontFamily: 'Poppins_400Regular', fontSize: 14, lineHeight: 21, color: '#9C9DA5'}}>Dob</Text></FormControl.Label>
                <Input h={'48px'} placeholder="Dob" 
                  value={dob}
                // value={userInfo.dob} 
                onChangeText={setDob}
                />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                 {errors?.dob}
                </FormControl.ErrorMessage>
              </FormControl>
            </HStack>
            <HStack>
              <FormControl isInvalid={errors?.email ? true : false} w="25%" m={2}>
              <FormControl.Label><Text style={{fontFamily: 'Poppins_400Regular', fontSize: 14, lineHeight: 21, color: '#9C9DA5'}}>Email</Text></FormControl.Label>
              <Input h={'48px'} placeholder="Email" 
                value={email}
                // value={userInfo.last_name} 
                onChangeText={setEmail}
              />
              <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                {errors?.email}
              </FormControl.ErrorMessage>
            </FormControl>
              <FormControl isInvalid={errors?.phone ? true : false} w="25%" m={2}>
                <FormControl.Label><Text style={{fontFamily: 'Poppins_400Regular', fontSize: 14, lineHeight: 21, color: '#9C9DA5'}}>Contact Number</Text></FormControl.Label>
                <Input h={'48px'} placeholder="Contact Number" 
                  value={phone}
                // value={userInfo.dob} 
                onChangeText={setPhone}
                />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                 {errors?.phone}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors?.address ? true : false} w="45%" m={2}>
                <FormControl.Label><Text style={{fontFamily: 'Poppins_400Regular', fontSize: 14, lineHeight: 21, color: '#9C9DA5'}}>Address</Text></FormControl.Label>
                <Input h={'48px'} placeholder="Address" 
                  value={address}
                // value={userInfo.dob} 
                onChangeText={setAddress}
                />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                 {errors?.address}
                </FormControl.ErrorMessage>
              </FormControl>
            </HStack>
            <HStack>
            <FormControl isInvalid={errors?.city ? true : false} w="22%" m={2}>
                <FormControl.Label><Text style={{fontFamily: 'Poppins_400Regular', fontSize: 14, lineHeight: 21, color: '#9C9DA5'}}>City</Text></FormControl.Label>
                <Input h={'48px'} placeholder="City" 
                  value={city}
                // value={userInfo.dob} 
                onChangeText={setCity}
                />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                 {errors?.city}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors?.state ? true : false} w="21%" m={2}>
                <FormControl.Label><Text style={{fontFamily: 'Poppins_400Regular', fontSize: 14, lineHeight: 21, color: '#9C9DA5'}}>State</Text></FormControl.Label>
                <Input h={'48px'} placeholder="State" 
                  value={state}
                // value={userInfo.dob} 
                onChangeText={setState}
                />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                 {errors?.state}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors?.facebookURl ? true : false} w="25%" m={2}>
              <FormControl.Label><Text style={{fontFamily: 'Poppins_400Regular', fontSize: 14, lineHeight: 21, color: '#9C9DA5'}}>Enter Facebook Url</Text></FormControl.Label>
              <Input h={'48px'} placeholder="Facebook URl" 
                value={facebookURl}
                // value={userInfo.last_name} 
                onChangeText={setFacebookURl}
              />
              <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                {errors?.facebookURl}
              </FormControl.ErrorMessage>
            </FormControl>
              <FormControl isInvalid={errors?.instaURl ? true : false} w="25%" m={2}>
                <FormControl.Label><Text style={{fontFamily: 'Poppins_400Regular', fontSize: 14, lineHeight: 21, color: '#9C9DA5'}}>Enter Instagram Url</Text></FormControl.Label>
                <Input h={'48px'} placeholder="Instagram Url" 
                  value={instaURl}
                // value={userInfo.dob} 
                onChangeText={setInstaURl}
                />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                 {errors?.instaURl}
                </FormControl.ErrorMessage>
              </FormControl>

            </HStack>
            <HStack>
              <FormControl isInvalid={errors?.industries ? true : false} w="25%" m={2}>
              <FormControl.Label><Text style={{fontFamily: 'Poppins_400Regular', fontSize: 14, lineHeight: 21, color: '#9C9DA5'}}>Industries (max 10 limit)</Text></FormControl.Label>
              <Input h={'48px'} placeholder="Industries" 
                value={industries}
                // value={userInfo.last_name} 
                onChangeText={setIndustries}
              />
              <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                {errors?.industries}
              </FormControl.ErrorMessage>
            </FormControl>
              <FormControl isInvalid={errors?.linkedin ? true : false} w="25%" m={2}>
                <FormControl.Label><Text style={{fontFamily: 'Poppins_400Regular', fontSize: 14, lineHeight: 21, color: '#9C9DA5'}}>Enter Linkedin Url</Text></FormControl.Label>
                <Input h={'48px'} placeholder="Linkedin URL" 
                  value={linkedin}
                // value={userInfo.dob} 
                onChangeText={setLinkedinURl}
                />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                 {errors?.linkedin}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors?.maxAmount ? true : false} w="22%" m={2}>
                <FormControl.Label><Text style={{fontFamily: 'Poppins_400Regular', fontSize: 14, lineHeight: 21, color: '#9C9DA5'}}>Amount Max in Rs.</Text></FormControl.Label>
                <Input h={'48px'} placeholder="Amount Max in Rs." 
                  value={maxAmount}
                // value={userInfo.dob} 
                onChangeText={setMaxAmount}
                />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                 {errors?.maxAmount}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors?.minAmount ? true : false} w="21%" m={2}>
                <FormControl.Label><Text style={{fontFamily: 'Poppins_400Regular', fontSize: 14, lineHeight: 21, color: '#9C9DA5'}}>Amount Min. in Rs.</Text></FormControl.Label>
                <Input h={'48px'} placeholder="Amount Min. in Rs." 
                  value={minAmount}
                // value={userInfo.dob} 
                onChangeText={setMinAmount}
                />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                 {errors?.minAmount}
                </FormControl.ErrorMessage>
              </FormControl>
            </HStack>
            <Button
                borderRadius="full"
                colorScheme="success"
                onPress={() => {AddInfluencerSubmit()}}
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
