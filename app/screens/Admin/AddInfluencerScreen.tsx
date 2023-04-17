import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TouchableOpacity, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../../navigators"
import { Screen } from "../../components"
import { BottomNavigation, TopNavigation } from "../../navigators/Navigation"
import { useNavigation } from "@react-navigation/core"
import { Box, Button, Checkbox, HStack, Image, Pressable, Stack, useBreakpointValue, View, VStack, Text } from "native-base"
import { AdminSidePannelScreen } from "./Components/AdminSidePannelScreen"
import {followersFormatter} from '../UitilityFunctions';
import { FontAwesome } from "@expo/vector-icons"

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `AddInfluencer: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="AddInfluencer" component={AddInfluencerScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const AddInfluencerScreen: FC<StackScreenProps<AppStackScreenProps, "AddInfluencer">> = observer(function AddInfluencerScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation<any>()

  const dimension = useBreakpointValue({
    base : true,
    sm : true,
    md : false,
    lg : false,
    xl : false
  })

  const InfluencerCard = () => {
    return (
      <>
    
      {/* {console.log('liked',liked, 'LikedFromApi', LikedFromApi)} */}
          {/* {displayList && displayList.length==0 ? 
          <Text>No records found</Text>
          : 
          displayList && displayList.map((influencer, i) => ( */}
            
                <Stack rounded="xl" overflow="hidden" 
                // width={['170', '250' ,"250", "350", "400"]} 
                width={['47%','47%', '33%']} 
                height={['300', "300","400", "360", "400"]} 
                shadow="1"  bg={'#F5FBFF'} padding={[3, 4, 5]} 
                marginBottom={[5]}>
                  <Box w={["100%", "100%", "100%"]} h={["45%", "45%", "50%"]} style={{flex: useBreakpointValue({base:5,sm: 4, md: 3})}}>
                    {/* {influencer.profile_verified &&  */}
                        <Image
                        w={["50","70","100"]}                          
                        h={["5","7","10"]}
                        source={require("../../../assets/images/backgrounds/Verified.png")}
                        alt="image"
                        resizeMode="contain"
                        position='absolute'
                        zIndex={1}
                        top= {0} right={0}                          
                      />
                    {/* } */}
                  
                    <View style={{position: 'absolute',zIndex: 1, padding: useBreakpointValue({base: 3, md: 5})}} accessibilityLabel='view'>
                    <Checkbox  aria-label="input"  colorScheme="blue" 
                    // value={`${influencer.id}`} 
                    value={`1`} 
                    style={{margin: 5, borderRadius: 0}} accessibilityLabel='checkbox'/>
                    
                      {/* <Checkbox colorScheme="blue" value={`${i}`} /> */}
                    </View>
                    <Pressable 
                      // onPress={()=>{setOpenProfileIndex(i); storeCardData(i); navigation.navigate("Profile Detail",{id:influencer.id})}}
                      height="100%" width="100%"
                    >
                        <Image rounded="xl" w={["100%", "100%", "100%"]} h="100%" 
                          // source={{uri: influencer && influencer.profile && influencer.profile.data && influencer.profile.data.facebook &&  influencer.profile.data.facebook.Image ? `${influencer.profile.data.facebook.Image}` : influencer && influencer.photo }} 
                          // source={{uri:`https://backend.sociofusion.com${influencer.photo}`}} 
                          source={require("../../../assets/images/user-img.png")}
                          alt="image" 
                        />
                        
                    </Pressable>
                  </Box>
                  {/* {
                    ColorRed === true ?  */}
                    
                  <Stack flex="1" p="4" space={[3, 3, 1.5]} justifyContent="space-around" style={{flex: 1}}>
                    {/*---------- add to  wishlist--------- */}                          
                    <TouchableOpacity 
                      accessibilityLabel='touch' 
                      // onPress={
                      //   ()=>{
                      //   let hearts = liked.filter((item)=>item.influencer.id === influencer.id)
                      //   if(hearts.length>0){
                      //     console.log("heartsID",hearts)
                      //     api.delete(`/favorite/${hearts[0].id}`)
                      //     .then((res)=>{
                      //       console.log(res)                                
                      //       fetchFavorites()
                      //     })
                      //     .catch((error)=> console.log(error));
                      //   }
                      //   else{
                      //     console.log("heartsID",influencer.id)
                      //     api.post('/favorite/', {influencer: influencer.id})
                      //     .then((res)=>{
                      //       console.log(res)
                      //       fetchFavorites()
                      //     })
                      //     .catch((error)=> console.log(error));
                      //   }
                      // }}                       
                      >
                          <FontAwesome
                              name="heart"
                              size={useBreakpointValue({base: 15, sm: 16, md: 18, lg: 20})}
                              style={{ 
                                color: 'rgba(50, 49, 89, 0.2)', 
                                // color: (liked && liked.filter((item)=>item.influencer.id === influencer.id)).length > 0 ? 'red' : 'rgba(50, 49, 89, 0.2)', 
                                position: 'absolute', left: -10, top: useBreakpointValue({base: 15, md: 8})}}
                            />
                      </TouchableOpacity>
                        
                          <Stack style={{alignSelf: 'center'}}>
                            
                            <Stack direction={useBreakpointValue({ base: "column", lg: "row" })}>
                            <Pressable 
                            // onPress={()=>{setOpenProfileIndex(i); storeCardData(i); navigation.navigate("Profile Detail",{id:influencer.id})}}
                            >
                              <Box overflowX={'hidden'}>
                                <Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: useBreakpointValue({base: '9', sm: '12', md: '17', lg: '18'}), lineHeight: 21, color: 'rgba(50, 49, 89, 1)', textAlign: 'center'}}>
                                  Bhavana Addania { }
                                {/* {influencer.first_name} {influencer.first_name !== influencer.last_name && influencer.last_name} */}
                                </Text>
                              </Box>
                            </Pressable>

                              <Text style={{fontFamily: 'Poppins_500Medium', fontSize: useBreakpointValue({base: '4', sm: '10', md: '13', lg: '14'}), lineHeight: 21, color: '#545454', textAlign: 'center'}}>
                                { }(Fashion)
                            {/* ({influencer.Categories}) */}
                            {/* ({ influencer.profile.data.category}) */}
                            </Text>
                            </Stack>
                          </Stack>
                  { dimension === true ? <></> :
                    <>
                      <HStack space="2" style={{alignSelf: 'center'}}>
                        <Text style={{fontFamily: 'Poppins_500Medium', fontSize: useBreakpointValue({base: '11', sm: '12', md: '13', lg: '14'}), lineHeight: 21, color: '#545454', textAlign: 'center'}}>
                          {/* Rs. {influencer.profile.data.price} */}
                          Rs. 2000
                        </Text>
                      </HStack>
                      <HStack alignItems="center" justifyContent="space-between" marginLeft={-5}>
                        <Image
                            w={{base: '2', sm: '2', md: '2', lg: '4', xl: '4'}}
                            h="10"
                            py="-3"
                            px="-6"
                            source={require("../../../assets/icons/divider.png")}
                            alt="image"
                            resizeMode="contain"
                          />
                        <VStack>
                          <Text style={{fontFamily: 'Poppins_400Regular', fontSize: useBreakpointValue({base: '11', sm: '11', md: '9', lg: '12', xl: '14'}), lineHeight: 19.5, color: '#545454'}}>Followers</Text>
                          <Text color="coolGray.600" fontWeight="400" style={{alignSelf: 'center'}}>
                            35M
                            {/* {influencer.Followers} */}
                            {/* {followersFormatter(influencer.profile.data.instagram.followers_count)} */}
                          </Text>
                        </VStack>
                        <Image
                            w={{base: '2', sm: '2', md: '2', lg: '4', xl: '4'}}
                            h="10"
                            py="-3"
                            px="-1"
                            source={require("../../../assets/icons/divider.png")}
                            alt="image"
                            resizeMode="contain"
                          />
                        <VStack>
                          <Text style={{fontFamily: 'Poppins_400Regular', fontSize: useBreakpointValue({base: '11', sm: '11', md: '9', lg: '12', xl: '14'}), lineHeight: 19.5, color: '#545454'}}>Posts</Text>
                          <Text color="coolGray.600" fontWeight="400" style={{alignSelf: 'center'}}>
                            24K
                            {/* {influencer.Posts} */}
                            {/* {influencer.profile.data.instagram.media_count} */}
                          </Text>
                        </VStack>
                        <Image
                            w={{base: '2', sm: '2', md: '2', lg: '4', xl: '4'}}
                            h="10"
                            py="-3"
                            px="-1"
                            source={require("../../../assets/icons/divider.png")}
                            alt="image"
                            resizeMode="contain"
                          />
                        <VStack>
                          <Text style={{fontFamily: 'Poppins_400Regular', fontSize: useBreakpointValue({base: '10', sm: '10', md: '9', lg: '12', xl: '14'}), lineHeight: 19.5, color: '#545454'}}>Engagements</Text>
                          <Text color="coolGray.600" fontWeight="400" style={{alignSelf: 'center'}}>
                            {/* {influencer.Engagements} */}
                            0
                          </Text>
                        </VStack>
                      </HStack>
                      </>
                  }
                  </Stack>
                </Stack>
          {/* ))} */}
        {/* </Checkbox.Group> */}
      </>
    )
  }

  return (
    <Screen style={$root} preset='scroll'>
    <TopNavigation navigation={navigation} />
    <BottomNavigation navigation={navigation} />

  
    <HStack flex='1'>
      <VStack flex='2' h={'100%'} bg='rgba(255, 255, 255, 0.5)' p={5}>
        <AdminSidePannelScreen/>
      </VStack>

      <VStack flex='8' p='10'>
        <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 24, lineHeight: 29, color: '#203655'}}> Influencer List </Text>
        <Button rounded='full' w={'15%'} m='5' alignSelf='flex-end' onPress={()=>{navigation.navigate('AddInfluencerForm')}}> Add Influencer </Button>
        <Checkbox.Group  aria-label="input"  colorScheme="green" accessibilityLabel="pick an item" w={'100%'} 
          onChange={values => {
            // setSelectedInfluencers([...values]); 
            console.log(values)}} 
          style={{flexWrap: 'wrap', flexDirection: 'row', alignContent: 'flex-start', padding: 10, justifyContent: 'space-evenly'}}>
            <InfluencerCard/>
            <InfluencerCard/>
            <InfluencerCard/>
        </Checkbox.Group>
        {/* <HStack space='5' style={{flexWrap: 'wrap', alignContent: 'flex-start'}}>
          <InfluencerCard/>
          <InfluencerCard/>
          <InfluencerCard/>
        </HStack> */}
       
      </VStack>
    </HStack>

  </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
