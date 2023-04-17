import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TouchableOpacity, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../../navigators"
import { Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/core"
import { BottomNavigation, TopNavigation } from "../../navigators/Navigation"
import { Box, Checkbox, CheckIcon, HStack, Pressable, Select, useBreakpointValue, VStack } from "native-base"
import { AdminSidePannelScreen } from "./Components/AdminSidePannelScreen"
import { AntDesign, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `AllQueries: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="AllQueries" component={AllQueriesScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const IndividualQueryScreen: FC<StackScreenProps<AppStackScreenProps, "IndividualQuery">> = observer(function IndividualQueryScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const [service, setService] = React.useState("");

  const dimension = useBreakpointValue({
    base : true,
    sm : true,
    md : false,
    lg : false,
    xl : false
  })

  // Pull in navigation via hook
  const navigation = useNavigation<any>()

  return (
    <Screen style={$root} preset='scroll'>
    <TopNavigation navigation={navigation} />
    <BottomNavigation navigation={navigation} />

  
    <HStack flex='1'>
      <VStack flex='2' h={'100vh'} bg='rgba(255, 255, 255, 0.5)' p={5}>
        <AdminSidePannelScreen/>
      </VStack>

      <VStack flex='8' p='10'>
        <HStack space={{base: 2, md: 5}} alignItems="center">
          <Pressable onPress={() => {navigation.navigate("AllQueries")}} flexDirection={'row'}>
            <Ionicons name="arrow-back" size={20} color="#203655" />                    
          </Pressable>
          <Text style={{fontFamily: 'Poppins_700Bold', fontSize: useBreakpointValue({ base: 19, md: 24 }), lineHeight: 29, color: '#203655', marginBottom: 10}}>
            Queries
          </Text>
        </HStack>

        <VStack bg='white' p='5' rounded={5} mb={2}>
          <Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: 16, lineHeight: 20, color: '#585252', marginBottom: 10}}>
            Query Title
          </Text>
          <Text style={{fontFamily: 'Poppins_400Regular', fontSize: 14, lineHeight: 20, color: '#585252', marginBottom: 10}}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni voluptates veniam harum pariatur autem ullam sint accusamus, laudantium recusandae? Nulla neque magnam eaque mollitia quaerat vero officia qui maiores suscipit!
          </Text>
        </VStack>

        {dimension ? 
              <>
            {/* for mobile */}

                <VStack >
                {/* {campaignQuery &&  campaignQuery.map((data, i)=>{
                    return( */}
                  <TouchableOpacity 
                  // onPress={()=>{
                  //     navigation.navigate("CampaignQueryDetail",{id: data.id});
                  //      setQueryIndex(i)}} 
                       style={{shadowColor: "rgba(0, 0, 0, 0.2)",shadowOffset: {width: 0, height: 2},shadowOpacity: 0.9,shadowRadius: 10, marginBottom: 15}}>
                  <HStack>
                  <Box w={'45%'}  ml={4} py={2} justifyContent={'center'}>
                    <Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: 12, lineHeight: 14, color: 'rgba(37, 87, 112, 1)'}}>
                      Enquiry No.
                    </Text>
                  </Box>
                  <Box w={'45%'} style={{alignSelf: 'center',justifyContent: 'center'}}>
                    <Text style={{fontFamily: 'Poppins_500Medium', fontSize: 12, lineHeight: 14, color: '#515466',}}>
                      {/* {i+1}  */}
                      1
                    </Text>
                  </Box>
                  </HStack>
                  <HStack>
                  <Box w={'45%'}  ml={4} py={2} justifyContent={'center'}>
                    <Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: 12, lineHeight: 14, color: 'rgba(37, 87, 112, 1)'}}>
                      Date & Time
                    </Text>
                  </Box>
                  <Box w={'45%'}  style={{alignSelf: 'center',justifyContent: 'center'}}>
                    <Text style={{fontFamily: 'Poppins_500Medium', fontSize: 12, lineHeight: 14, color: '#515466'}}>
                       {/* {data && data.title} */}
                       12/02/2022, 1:23 pm

                    </Text>
                  </Box>
                  </HStack>
                  <HStack>
                  <Box w={'45%'}  ml={4} py={2} justifyContent={'center'}>
                    <Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: 12, lineHeight: 14, color: 'rgba(37, 87, 112, 1)'}}>
                       Details:
                    </Text>
                  </Box>
                  <Box w={'45%'}  style={{alignSelf: 'center',justifyContent: 'center'}}>
                    <Text style={{fontFamily: 'Poppins_500Medium', fontSize: 12, lineHeight: 14, color: '#515466'}}>
                       {/* {data && data.when} */}
                       Health
                    </Text>
                  </Box>
                  </HStack>
                  <HStack>
                  <Box w={'45%'}  ml={4} py={2} justifyContent={'center'}>
                    <Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: 12, lineHeight: 14, color: 'rgba(37, 87, 112, 1)'}}>
                      Action:
                    </Text>
                  </Box>
                  <Box w={'45%'}  style={{alignSelf: 'center',justifyContent: 'center'}}>
                    <HStack>
                      <Text style={{fontFamily: 'Poppins_500Medium', fontSize: 12, lineHeight: 14, color: '#515466',textDecorationStyle: 'solid', textDecorationLine: 'underline', textDecorationColor: '#515466'}}>
                       {/* {data && data.budget} */}
                       View
                      </Text>
                      <AntDesign name="right" size={24} color="black" />
                    </HStack>
                  </Box>
                  </HStack>
                </TouchableOpacity>
                {/* )})} */}
              </VStack>
            </>  
            :
            // for web and tab
            <>
                <HStack w={'100%'} alignSelf={'center'} backgroundColor={'rgba(236, 245, 253, 1)'} style={{borderRadius: 5}}>
                  <Box w={'2%'} justifyContent={'center'}></Box>
                  <Box w={'9%'} ml={4} py={5} justifyContent={'center'}><Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: 12, lineHeight: 14, color: 'rgba(37, 87, 112, 1)'}}>Enquiry No.</Text></Box>
                  <Box w={'15%'}  justifyContent={'center'}><Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: 12, lineHeight: 14, color: 'rgba(37, 87, 112, 1)'}}>Date & Time</Text></Box>
                  <Box w={'25%'}  justifyContent={'center'}><Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: 12, lineHeight: 14, color: 'rgba(37, 87, 112, 1)'}}>Name</Text></Box>
                  <Box w={'15%'}  justifyContent={'center'}><Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: 12, lineHeight: 14, color: 'rgba(37, 87, 112, 1)'}}>Details</Text></Box>
                 <Box w={'20%'}  justifyContent={'center'}><Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: 12, lineHeight: 14, color: 'rgba(37, 87, 112, 1)'}}>Status</Text></Box>
                  <Box w={'15%'}  justifyContent={'center'}><Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: 12, lineHeight: 14, color: 'rgba(37, 87, 112, 1)'}}>Action</Text></Box>
                </HStack>                         
              {/* navigation.navigate("Profile Detail",{id:influencer.id}) */}
              
                  
                <VStack minH={100}>
                {/* <Checkbox.Group  aria-label="input"  colorScheme="green" accessibilityLabel="pick an item" w={'100%'}
                onChange={values => {
                  // setSelectedInfluencers([...values]); 
                  console.log(values)}} 
                > */}
                  {/* {campaignQuery &&  campaignQuery.map((data, i)=>{
                    return( */}
                    <TouchableOpacity
                    //  onPress={()=>{
                    //   navigation.navigate("CampaignQueryDetail",{id: data.id});
                    //    setQueryIndex(i)}}
                    >
                      <HStack  w={'100%'} h={'57px'} alignSelf={'center'} backgroundColor={'white'} marginTop={2} style={{borderRadius: 5}}>
                        <Box w={'3%'}>
                          <Checkbox  aria-label="input"  colorScheme="blue" 
                            // value={`${influencer.id}`} 
                            value={`1`} 
                            style={{margin: 5,marginTop: 16, borderRadius: 0}} accessibilityLabel='checkbox'/>
                        </Box>
                        <Box w={'8%'}  ml={4} style={{alignSelf: 'center',justifyContent: 'center'}}><Text style={{fontFamily: 'Poppins_500Medium', fontSize: 12, lineHeight: 21, color: '#515466',}}>
                          {/* {i+1} */}
                          89102
                          </Text></Box>
                        <Box w={'15%'}  style={{alignSelf: 'center',justifyContent: 'center'}}><Text style={{fontFamily: 'Poppins_500Medium', fontSize: 12, lineHeight: 21, color: '#515466'}}>
                           {/* {data && data.title} */}
                           12/02/2022, 1:23 pm
                        </Text></Box>                    
                        <Box w={'25%'}  style={{alignSelf: 'center',justifyContent: 'center'}}><Text style={{fontFamily: 'Poppins_500Medium', fontSize: 12, lineHeight: 21, color: '#515466'}}>
                           {/* {data && data.title} */}
                           Bhavana Addania
                        </Text></Box>                    
                        <Box w={'12%'}  style={{alignSelf: 'center',justifyContent: 'center'}}><Text style={{fontFamily: 'Poppins_500Medium', fontSize: 12, lineHeight: 21, color: '#515466'}}>
                          {/* {data && data.when} */}
                          Health
                          </Text></Box>                    
                        <Box w={'25%'} maxW="150" bg='white' rounded={2} style={{alignSelf: 'center',justifyContent: 'center'}} >
                            <Select selectedValue={service} minWidth="150" accessibilityLabel="Choose Service" placeholder="Status" _selectedItem={{
                                bg: "teal.600",
                                endIcon: <CheckIcon size="3" />
                              }} onValueChange={itemValue => setService(itemValue)}>
                              <Select.Item label="Selected" value="Selected" />
                              <Select.Item label="In Progress" value="Progress" />
                              <Select.Item label="Rejected" value="Rejected" />
                            </Select>
                        </Box>
                        <Box w={'20%'}  style={{alignItems: 'center', justifyContent: 'center'}}>
                          <HStack space={2} alignItems='center'>
                            <MaterialCommunityIcons name="phone" size={30} color="black" />
                            <MaterialCommunityIcons name="email-outline" size={30} color="black" />
                            <MaterialCommunityIcons name="message-processing-outline" size={30} color="black" onPress={()=>{navigation.navigate('SummaryOfConversation')}}/>
                            <AntDesign name="right" size={14} color="#696C80"/>
                          </HStack>
                        </Box>
                        
                      </HStack>
                    </TouchableOpacity>
                  {/* )})} */}
                  {/* </Checkbox.Group> */}
                </VStack>
                

              </>
            }
      </VStack>
    </HStack>

  </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
