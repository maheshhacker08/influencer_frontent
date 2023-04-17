import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { TouchableOpacity, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../../navigators"
import { Screen } from "../../components"
import { useNavigation } from "@react-navigation/core"
import { BottomNavigation, TopNavigation } from "../../navigators/Navigation"
import { Box, Checkbox, CheckIcon, HStack, Pressable, Select, useBreakpointValue, VStack, Text } from "native-base"
import { AdminSidePannelScreen } from "./Components/AdminSidePannelScreen"
import { AntDesign, Ionicons } from "@expo/vector-icons"
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
// - Add `AllQueries: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="AllQueries" component={AllQueriesScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const SupportScreen: FC<StackScreenProps<AppStackScreenProps, "Support">> = observer(function SupportScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const [service, setService] = useState("");
  const [supportData, setSupportData] = useState<any>();

  const dimension = useBreakpointValue({
    base : true,
    sm : true,
    md : false,
    lg : false,
    xl : false
  })

  // Pull in navigation via hook
  const navigation = useNavigation<any>()


  useEffect(()=>{
     api.get("/api/websiteQueries/")
      .then((res:ApiResponse<any,any>) => {
        console.log('support------>',res.data.results);
        setSupportData(res.data.results)
      })
      .catch((error) => { console.log(error)})

  },[])


  return (
    <Screen style={$root} preset='scroll'>
    <TopNavigation navigation={navigation} />
    <BottomNavigation navigation={navigation} />

  
    <HStack flex='1'>
      <VStack flex='2' h={'100vh'} bg='rgba(255, 255, 255, 0.5)' p={5}>
        <AdminSidePannelScreen/>
      </VStack>

      <VStack flex='8' p='10'>
        {/* <HStack space={{base: 2, md: 5}} alignItems="center"> */}
          {/* <Pressable onPress={() => {navigation.navigate("AllQueries")}} flexDirection={'row'}>
            <Ionicons name="arrow-back" size={20} color="#203655" />                    
          </Pressable> */}
          <Text style={{fontFamily: 'Poppins_700Bold', fontSize: useBreakpointValue({ base: 19, md: 24 }), lineHeight: 29, color: '#203655', marginBottom: 10}}>
            Support
          </Text>
        {/* </HStack> */}

          <HStack m={5} space={2} justifyContent='flex-end'>
            <Text style={{fontFamily: 'Poppins_400Regular', fontSize: 13, lineHeight: 19, color: '#9C9DA5', marginBottom: 10, alignSelf: 'center'}} >
              Category:
            </Text>
            <Box maxW="200" bg='white' rounded={2}>
              <Select selectedValue={service} minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />
                }} onValueChange={itemValue => setService(itemValue)}>
                <Select.Item label="Health" value="Health" />
                <Select.Item label="Food" value="Food" />
                <Select.Item label="Fitness" value="Fitness" />
                <Select.Item label="Entertainment" value="Entertainment" />
                <Select.Item label="Lifestyle" value="Lifestyle" />
              </Select>
            </Box>
            <Text style={{fontFamily: 'Poppins_400Regular', fontSize: 13, lineHeight: 19, color: '#9C9DA5', marginBottom: 10, alignSelf: 'center'}} >
              Filter:
            </Text>
            <Box maxW="200" bg='white' rounded={2}>
              <Select selectedValue={service} minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />
                }} onValueChange={itemValue => setService(itemValue)}>
                <Select.Item label="Health" value="Health" />
                <Select.Item label="Food" value="Food" />
                <Select.Item label="Fitness" value="Fitness" />
                <Select.Item label="Entertainment" value="Entertainment" />
                <Select.Item label="Lifestyle" value="Lifestyle" />
              </Select>
            </Box>
              <AntDesign name="export" size={30} color="black" justifyContent='center'/>
          </HStack>
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
                      First Name:
                    </Text>
                  </Box>
                  <Box w={'45%'} style={{alignSelf: 'center',justifyContent: 'center'}}>
                    <Text style={{fontFamily: 'Poppins_500Medium', fontSize: 12, lineHeight: 14, color: '#515466',}}>
                      {/* {i+1}  */}
                      Bhavana
                    </Text>
                  </Box>
                  </HStack>
                  <HStack>
                  <Box w={'45%'}  ml={4} py={2} justifyContent={'center'}>
                    <Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: 12, lineHeight: 14, color: 'rgba(37, 87, 112, 1)'}}>
                      Last Name:
                    </Text>
                  </Box>
                  <Box w={'45%'}  style={{alignSelf: 'center',justifyContent: 'center'}}>
                    <Text style={{fontFamily: 'Poppins_500Medium', fontSize: 12, lineHeight: 14, color: '#515466'}}>
                       {/* {data && data.title} */}
                       Addania

                    </Text>
                  </Box>
                  </HStack>
                  <HStack>
                  <Box w={'45%'}  ml={4} py={2} justifyContent={'center'}>
                    <Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: 12, lineHeight: 14, color: 'rgba(37, 87, 112, 1)'}}>
                       Email:
                    </Text>
                  </Box>
                  <Box w={'45%'}  style={{alignSelf: 'center',justifyContent: 'center'}}>
                    <Text style={{fontFamily: 'Poppins_500Medium', fontSize: 12, lineHeight: 14, color: '#515466'}}>
                       {/* {data && data.when} */}
                       xyz@gmail.com
                    </Text>
                  </Box>
                  </HStack>

                  <HStack>
                  <Box w={'45%'}  ml={4} py={2} justifyContent={'center'}>
                    <Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: 12, lineHeight: 14, color: 'rgba(37, 87, 112, 1)'}}>
                       Mobile:
                    </Text>
                  </Box>
                  <Box w={'45%'}  style={{alignSelf: 'center',justifyContent: 'center'}}>
                    <Text style={{fontFamily: 'Poppins_500Medium', fontSize: 12, lineHeight: 14, color: '#515466'}}>
                       {/* {data && data.when} */}
                       1111111111
                    </Text>
                  </Box>
                  </HStack>

                  <HStack>
                  <Box w={'45%'}  ml={4} py={2} justifyContent={'center'}>
                    <Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: 12, lineHeight: 14, color: 'rgba(37, 87, 112, 1)'}}>
                       Role:
                    </Text>
                  </Box>
                  <Box w={'45%'}  style={{alignSelf: 'center',justifyContent: 'center'}}>
                    <Text style={{fontFamily: 'Poppins_500Medium', fontSize: 12, lineHeight: 14, color: '#515466'}}>
                       {/* {data && data.when} */}
                      Influencer
                    </Text>
                  </Box>
                  </HStack>

                  <HStack>
                  <Box w={'45%'}  ml={4} py={2} justifyContent={'center'}>
                    <Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: 12, lineHeight: 14, color: 'rgba(37, 87, 112, 1)'}}>
                       Status:
                    </Text>
                  </Box>
                  <Box w={'45%'}  style={{alignSelf: 'center',justifyContent: 'center'}}>
                    <Text style={{fontFamily: 'Poppins_500Medium', fontSize: 12, lineHeight: 14, color: '#515466'}}>
                       {/* {data && data.when} */}
                      Active
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
                      <Pressable onPress={()=>{console.log('view')}}>
                        <Text style={{fontFamily: 'Poppins_500Medium', fontSize: 12, lineHeight: 14, color: '#515466',textDecorationStyle: 'solid', textDecorationLine: 'underline', textDecorationColor: '#515466'}}>
                        {/* {data && data.budget} */}
                        View
                        </Text> 
                      </Pressable>
                      | 
                      <Pressable onPress={()=>{console.log('Delete')}}>
                        <Text style={{fontFamily: 'Poppins_500Medium', fontSize: 12, lineHeight: 14, color: '#515466',textDecorationStyle: 'solid', textDecorationLine: 'underline', textDecorationColor: '#515466'}}>
                        {/* {data && data.budget} */}
                        Delete
                        </Text>
                      </Pressable>
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
                  <Box w={'16%'} ml={4} py={5} justifyContent={'center'}><Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: 14, lineHeight: 14, color: 'rgba(37, 87, 112, 1)'}}>Name</Text></Box>
                  <Box w={'25%'}  justifyContent={'center'}><Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: 14, lineHeight: 14, color: 'rgba(37, 87, 112, 1)'}}>Email</Text></Box>
                  <Box w={'25%'}  justifyContent={'center'}><Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: 14, lineHeight: 14, color: 'rgba(37, 87, 112, 1)'}}>Message</Text></Box>
                  <Box w={'20%'}  justifyContent={'center'}><Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: 14, lineHeight: 14, color: 'rgba(37, 87, 112, 1)'}}>Query Date</Text></Box>
                  <Box w={'12%'}  justifyContent={'center'}><Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: 14, lineHeight: 14, color: 'rgba(37, 87, 112, 1)'}}>Action</Text></Box>
                </HStack>                         
              {/* navigation.navigate("Profile Detail",{id:influencer.id}) */}
              
                  
                <VStack minH={100}>
                {/* <Checkbox.Group  aria-label="input"  colorScheme="green" accessibilityLabel="pick an item" w={'100%'}
                onChange={values => {
                  // setSelectedInfluencers([...values]); 
                  console.log(values)}} 
                > */}
                  {supportData &&  supportData.map((data, i)=>{
                    return(
                    <TouchableOpacity key={i}
                    //  onPress={()=>{
                    //   navigation.navigate("CampaignQueryDetail",{id: data.id});
                    //    setQueryIndex(i)}}
                    >
                      <HStack  w={'100%'} h={'57px'} alignSelf={'center'} backgroundColor={'white'} marginTop={2} style={{borderRadius: 5}}>
                        <Box w={'2%'}>
                          <Checkbox  aria-label="input"  colorScheme="blue" 
                            // value={`${influencer.id}`} 
                            value={`1`} 
                            style={{margin: 5,marginTop: 16, borderRadius: 0}} accessibilityLabel='checkbox'/>
                        </Box>
                        <Box w={'16%'}  ml={4} style={{alignSelf: 'center',justifyContent: 'center'}}><Text style={{fontFamily: 'Poppins_500Medium', fontSize: 12, lineHeight: 21, color: '#515466',}}>
                          {data && data.name}
                          {/* Bhavana */}
                          </Text></Box>
                        <Box w={'25%'}  style={{alignSelf: 'center',justifyContent: 'center'}}><Text style={{fontFamily: 'Poppins_500Medium', fontSize: 12, lineHeight: 21, color: '#515466'}}>
                          {data && data.email}
                          {/* xyz@gmail.com */}
                          </Text></Box>                    
                        <Box w={'25%'} pr='2' style={{alignSelf: 'center',justifyContent: 'center'}}>
                          <Text isTruncated style={{fontFamily: 'Poppins_500Medium', fontSize: 12, lineHeight: 21, color: '#515466'}}>
                          {data && data.message}
                          {/* Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus, optio?Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, vero. */}
                          </Text></Box>                    
                        <Box w={'20%'}  style={{alignSelf: 'center',justifyContent: 'center'}}><Text style={{fontFamily: 'Poppins_500Medium', fontSize: 12, lineHeight: 21, color: '#515466'}}>
                          {data && data.created_at && data.created_at.split('T')[0]} {  }
                          {data && data.created_at && data.created_at.split('T')[1].split('.')[0]}
                          {/* Feb. 16, 2023, 12:35 p.m. */}
                          </Text></Box>                    
                        <Box w={'12%'}  style={{alignSelf: 'center',justifyContent: 'center'}}>
                          <HStack>
                            <Pressable onPress={()=>{console.log("View")}}>
                              <Text style={{fontFamily: 'Poppins_500Medium', fontSize: 12, lineHeight: 21, color: '#515466',textDecorationStyle: 'solid', textDecorationLine: 'underline', textDecorationColor: '#515466'}}>
                              {/* {data && data.budget} */}
                              View 
                              </Text>
                            </Pressable> 
                            { } | { }
                            <Pressable onPress={()=>{console.log("Delete")}}>
                              <Text style={{fontFamily: 'Poppins_500Medium', fontSize: 12, lineHeight: 21, color: '#515466',textDecorationStyle: 'solid', textDecorationLine: 'underline', textDecorationColor: '#515466'}}>
                              {/* {data && data.budget} */}
                                Delete
                              </Text>
                            </Pressable> 
                          </HStack>
                        </Box>
                      </HStack>
                    </TouchableOpacity>
                   )})} 
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
