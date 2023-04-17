import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Screen, Text } from "../components"
import { Box, FormControl, HStack, Image, Input, Pressable, Stack, TextArea, useBreakpointValue, View, VStack } from "native-base"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BottomNavigation, TopNavigation } from "../navigators/Navigation"
import { useNavigation } from "@react-navigation/native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Ionicons } from "@expo/vector-icons"
import { create } from 'apisauce'

// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../models"
import Footer from "../components/Footer"
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
// - Add `CampaignQueries: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="CampaignQueries" component={CampaignQueriesScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const CampaignQueriesScreen: FC<StackScreenProps<AppStackScreenProps, "CampaignQueries">> = observer(function CampaignQueriesScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const [campaignQuery, setCampaignQuery] = useState<any>([]);
  const [open, setOpen] = useState<any>(false);
  const [queryIndex, setQueryIndex] = useState<any>();
  const navigation = useNavigation<any>()

  const {
        authenticationStore: { token },
      } = useStores()

  api.addAsyncRequestTransform(request => async () => { 
    request.headers["Authorization"] = "Bearer " + token;
    console.log()
  });

  useEffect(()=>{
    // getCampaignQuery();
    
    api
    .get('/api/influencerQueries/')
    .then(response => {
      console.log('response.data', response); 
     response && response.data && setCampaignQuery(response.data); 
    })
    .then(console.log).catch((error)=> console.log(error))
  
  },[]);

  const getCampaignQuery = async () => {
    let campaign_query = undefined;
    try {
      campaign_query = await AsyncStorage.getItem('campaign_query')
      setCampaignQuery([ ...campaign_query != null ? JSON.parse(campaign_query) : null])
      console.log('campaign_query getCampaignQuery', campaignQuery);
      return campaign_query != null ? JSON.parse(campaign_query) : null
    } catch(e) {
      // error reading value
      console.log('campaign_query data not found in local host');
    }
  
  }

  const dimension = useBreakpointValue({
  base : true,
  sm : true,
  md : false,
  lg : false,
  xl : false
})

  // Pull in navigation via hook
  // const navigation = useNavigation()
  {console.log('campaignQuery', campaignQuery)}

  return (
    <Screen style={[$root, {backgroundColor: dimension && 'white'}]} preset="scroll">
        <TopNavigation navigation={navigation} />
        <BottomNavigation navigation={navigation} />
            <Stack m={10} mt={-5}>
                <HStack space={{base: 2, md: 5}} alignItems="center">
                  <Pressable onPress={() => {navigation.navigate("Find Influencer")}} flexDirection={'row'}>
                    <Ionicons name="arrow-back" size={20} color="#203655" />                    
                  </Pressable>
                  <Text style={{fontFamily: 'Poppins_700Bold',fontSize: useBreakpointValue({ base: 19, md: 24 }), lineHeight: 29, color: '#203655'}}>My Queries</Text>
                </HStack>
              <Text  style={{fontFamily: 'Poppins_600SemiBold', fontSize: 18, lineHeight: 29, color: '#354a66', margin: 20, marginLeft: 0}}>Summary</Text>
              {dimension ? 
              <>
                <VStack >
                {campaignQuery &&  campaignQuery.map((data, i)=>{
                    return(
                  <TouchableOpacity key={`qc_${i}`} onPress={()=>{
                      navigation.navigate("CampaignQueryDetail",{id: data.id});
                       setQueryIndex(i)}} style={{shadowColor: "rgba(0, 0, 0, 0.2)",shadowOffset: {width: 0, height: 2},shadowOpacity: 0.9,shadowRadius: 10, marginBottom: 15}}>
                  <HStack>
                  <Box w={'45%'}  ml={4} py={2} justifyContent={'center'}>
                    <Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: 12, lineHeight: 14, color: 'rgba(37, 87, 112, 1)'}}>
                      #ID
                    </Text>
                  </Box>
                  <Box w={'45%'} style={{alignSelf: 'center',justifyContent: 'center'}}>
                    <Text style={{fontFamily: 'Poppins_500Medium', fontSize: 12, lineHeight: 14, color: '#515466',}}>
                      {i+1} 
                    </Text>
                  </Box>
                  </HStack>
                  <HStack>
                  <Box w={'45%'}  ml={4} py={2} justifyContent={'center'}>
                    <Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: 12, lineHeight: 14, color: 'rgba(37, 87, 112, 1)'}}>
                    Campaign Name
                    </Text>
                  </Box>
                  <Box w={'45%'}  style={{alignSelf: 'center',justifyContent: 'center'}}>
                    <Text style={{fontFamily: 'Poppins_500Medium', fontSize: 12, lineHeight: 14, color: '#515466'}}>
                       {data && data.title}
                    </Text>
                  </Box>
                  </HStack>
                  <HStack>
                  <Box w={'45%'}  ml={4} py={2} justifyContent={'center'}>
                    <Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: 12, lineHeight: 14, color: 'rgba(37, 87, 112, 1)'}}>
                      Schedule
                    </Text>
                  </Box>
                  <Box w={'45%'}  style={{alignSelf: 'center',justifyContent: 'center'}}>
                    <Text style={{fontFamily: 'Poppins_500Medium', fontSize: 12, lineHeight: 14, color: '#515466'}}>
                       {data && data.when}
                    </Text>
                  </Box>
                  </HStack>
                  <HStack>
                  <Box w={'45%'}  ml={4} py={2} justifyContent={'center'}>
                    <Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: 12, lineHeight: 14, color: 'rgba(37, 87, 112, 1)'}}>
                      Amount (INR)
                    </Text>
                  </Box>
                  <Box w={'45%'}  style={{alignSelf: 'center',justifyContent: 'center'}}>
                    <Text style={{fontFamily: 'Poppins_500Medium', fontSize: 12, lineHeight: 14, color: '#515466'}}>
                       {data && data.budget}
                    </Text>
                  </Box>
                  </HStack>
                </TouchableOpacity>
                )})}
              </VStack>
            </>  
            :
            <>
                <HStack w={'100%'} alignSelf={'center'} backgroundColor={'rgba(236, 245, 253, 1)'} style={{borderRadius: 5}}>
                  <Box w={'10%'}  ml={4} py={5} justifyContent={'center'}><Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: 14, lineHeight: 14, color: 'rgba(37, 87, 112, 1)'}}>#ID</Text></Box>
                  <Box w={'30%'}  justifyContent={'center'}><Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: 14, lineHeight: 14, color: 'rgba(37, 87, 112, 1)'}}>Campaign Name</Text></Box>
                  <Box w={'30%'}  justifyContent={'center'}><Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: 14, lineHeight: 14, color: 'rgba(37, 87, 112, 1)'}}>Schedule</Text></Box>
                  <Box w={'30%'}  justifyContent={'center'}><Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: 14, lineHeight: 14, color: 'rgba(37, 87, 112, 1)'}}>Amount (INR)</Text></Box>
                </HStack>                         
              {/* navigation.navigate("Profile Detail",{id:influencer.id}) */}
                <VStack minH={100}>
                  {campaignQuery &&  campaignQuery.map((data, i)=>{
                    return(
                    <TouchableOpacity key={`q_detail_${i}`} onPress={()=>{
                      navigation.navigate("CampaignQueryDetail",{id: data.id});
                       setQueryIndex(i)}}>
                      <HStack  w={'100%'} h={'57px'} alignSelf={'center'} backgroundColor={'white'} marginTop={2} style={{borderRadius: 5}}>
                        <Box w={'10%'}  ml={4} style={{alignSelf: 'center',justifyContent: 'center'}}><Text style={{fontFamily: 'Poppins_500Medium', fontSize: 14, lineHeight: 21, color: '#515466',}}>{i+1}</Text></Box>
                        <Box w={'30%'}  style={{alignSelf: 'center',justifyContent: 'center'}}><Text style={{fontFamily: 'Poppins_500Medium', fontSize: 14, lineHeight: 21, color: '#515466'}}> {data && data.title}</Text></Box>                    
                        <Box w={'30%'}  style={{alignSelf: 'center',justifyContent: 'center'}}><Text style={{fontFamily: 'Poppins_500Medium', fontSize: 14, lineHeight: 21, color: '#515466'}}>{data && data.when}</Text></Box>                    
                        <Box w={'30%'}  style={{alignSelf: 'center',justifyContent: 'center'}}><Text style={{fontFamily: 'Poppins_500Medium', fontSize: 14, lineHeight: 21, color: '#515466'}}>{data && data.budget}</Text></Box>
                      </HStack>
                    </TouchableOpacity>
                  )})}
                </VStack>
              </>
            }
             
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
