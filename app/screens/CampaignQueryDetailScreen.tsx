import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Screen, Text } from "../components"
import { BottomNavigation, TopNavigation } from "../navigators/Navigation"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Box, FormControl, HStack, Image, Input, Pressable, Stack, TextArea, useBreakpointValue, View, VStack } from "native-base"
import Footer from "../components/Footer"
import { EvilIcons, Ionicons, MaterialIcons } from "@expo/vector-icons"

import { create } from 'apisauce'
import { useStores } from "../models"
import Config from "../config"

// define the api
const api = create({
  baseURL: Config.baseURL,
  headers: { 
    Accept: 'application/json', 
  }
})


// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `CampaignQueryDetail: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="CampaignQueryDetail" component={CampaignQueryDetailScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const CampaignQueryDetailScreen = observer(function CampaignQueryDetailScreen() {

  const [ queryDetail ,setQueryDetail] = useState<any>();
  const dimension = useBreakpointValue({
    base : true,
    sm : true,
    md : false,
    lg : false,
    xl : false
  })
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const route = useRoute<any>()
  console.log("route", route.params.id)
 

  // Pull in navigation via hook
  const navigation = useNavigation<any>()

  const {
    authenticationStore: { token },
  } = useStores()

  api.addAsyncRequestTransform(request => async () => { 
    request.headers["Authorization"] = "Bearer " + token;
    console.log()
  });

  useEffect(() => {
    api
    .get(`/api/influencerQueries/${route.params.id}`)
    .then(response => {
      console.log('/api/influencerQueries/${route.params.id}', response.data); 
      setQueryDetail(response.data);
    })
    .then(console.log).catch((error)=> console.log(error))
  }, [route.params.id])

  

  return (
    <Screen style={[$root, {backgroundColor: dimension && 'white'}]} preset="scroll">
       <TopNavigation navigation={navigation} />
       <BottomNavigation navigation={navigation} />
            <Stack mt={-12} m={10}>
                <HStack style={{marginBottom: 20}}>
                  <Pressable onPress={() => {navigation.navigate("Campaign Queries")}} flexDirection={'row'}>
                    <Ionicons name="arrow-back" size={20} color="#203655" />
                    <Text style={{fontFamily: 'Poppins_700Bold', fontSize: 24, lineHeight: 29, color: '#203655'}}>Back to Queries</Text>
                  </Pressable>
                </HStack>
               <Text  style={{fontFamily: 'Poppins_600SemiBold', fontSize: 20, lineHeight: 29, color: '#354a66', marginTop: 20}}>Detail Page</Text>
               <Box style={{flexWrap: 'wrap', flexDirection: 'row', alignContent: 'flex-start', padding: 5}}>
               
               {queryDetail && queryDetail.selection.map((influencer, i) => (
                <HStack rounded="xl" overflow="hidden" width={{base:'95%' ,md: '32%' ,lg: '23%'}} height={["100"]} shadow="1"  bg={'#F5FBFF'} mt={2} mb={2} mr={2}
                style={{shadowColor: "rgba(0, 0, 0, 0.2)",shadowOffset: {width: 0, height: 2},shadowOpacity: 0.9,shadowRadius: 10}}
                key={`qc2_${i}`}
                >
                   {influencer.profile_verified && 
                  <Image
                  w={"50"}                          
                  h={"12"}
                  source={require("../../assets/images/backgrounds/verified_circular.png")}
                  alt="image"
                  resizeMode="contain"
                  position='absolute'
                  zIndex={1}
                  top= {0} right={0}                          
                    />
                  }
                <Image
                    w={["30%"]}
                    h="100%"
                    // py="-3"
                    // px="-1"
                    // source={require("../../assets/images/backgrounds/Ellipse 2.png")}
                    source={{uri: influencer && influencer.profile && influencer.profile.data && influencer.profile.data.facebook &&  influencer.profile.data.facebook.Image ? `${influencer.profile.data.facebook.Image}` : influencer && influencer.image }}
                    alt="image"
                    // m={10}
                  />
                 
                  <VStack ml={{base: 2}} style={{ justifyContent: 'center'}}>
                    <Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: 12, lineHeight: 18, color: '#444E53'}}>
                      {influencer.first_name}
                      </Text>
                      <Text style={{fontFamily: 'Poppins_400Regular', fontSize: 12, lineHeight: 18, color: '#444E53'}}>
                      {influencer.profile.data.category}
                      </Text>
                  </VStack>
                  </HStack>
              ))} 
              </Box>
              <Box style={{flexWrap: 'wrap', flexDirection: 'row', alignContent: 'flex-start', justifyContent: 'space-between'}}>
                
                <FormControl isRequired isInvalid w={{base: "97%",md: "48%" ,lg: "24%"}}>
                  <FormControl.Label>Query Title</FormControl.Label>
                  <Input h={'48px'} isDisabled placeholder="Enter Campaign title" backgroundColor={'white'} 
                    value={queryDetail?.title}
                    InputRightElement={
                      <EvilIcons name="pencil" size={24} color="black" />
                     
                    }
                    />
                  </FormControl>
                
                <FormControl isInvalid w={{base: "97%",md: "48%" ,lg: "24%"}}>
                  <FormControl.Label>Budget</FormControl.Label>
                  <Input h={'48px'} isDisabled placeholder="10,000"  backgroundColor={'white'} 
                    value={queryDetail?.budget}
                    InputRightElement={
                      <MaterialIcons name="attach-money" size={24} color="black" />
                     
                    }
                  />
                </FormControl>
                <FormControl isRequired isInvalid w={{base: "97%",md: "48%" ,lg: "24%"}}>
                  <FormControl.Label>Schedule</FormControl.Label>
                  <Input h={'48px'} isDisabled placeholder="Within Week"  backgroundColor={'white'} 
                  value={queryDetail?.when}
                  />
                </FormControl>
                <FormControl isRequired isInvalid w={{base: "97%",md: "48%" ,lg: "24%"}}>
                  <FormControl.Label>Phone No.</FormControl.Label>
                  <Input h={'48px'} isDisabled placeholder="9876543210" backgroundColor={'white'} 
                  value={queryDetail?.mobile}
                  InputRightElement={
                    <MaterialIcons name="phone-android" size={24} color="black" />
                  }
                  />
                </FormControl>

              </Box>
              <Box alignItems="center" w={'100%'}>
                <FormControl w={'100%'} isInvalid alignItems="center">
                  <FormControl.Label isRequired alignSelf="start"> Project Descriptions</FormControl.Label>
                    <TextArea isDisabled isRequired aria-label="input" h={100} placeholder="Text Area Placeholder" w={'100%'} autoCompleteType backgroundColor={'white'}
                    value={queryDetail?.job_description}
                    
                    />
                </FormControl>
              </Box>
            
            </Stack>
       <View accessibilityLabel='view'>
        <Footer />
       </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
