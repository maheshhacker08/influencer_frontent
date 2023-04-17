import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "../theme"
import { Text } from "./Text"
import { Box, Checkbox, HStack, Image, Pressable, Stack, useBreakpointValue, VStack } from "native-base"
import { FontAwesome } from "@expo/vector-icons"

export interface InfluencerCardProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const InfluencerCard = observer(function InfluencerCard(props: InfluencerCardProps) {
  const { style } = props
  const $styles = [$container, style]

  return (
    <View style={$styles}>
      <Stack rounded="xl" key={i} overflow="hidden" 
        width={['90%','90%','47%','33%']} 
        height={['400', "400","400", "460", "400"]} 
        shadow="1"  bg={'#F5FBFF'} padding={[3, 4, 5]} 
        marginBottom={[5]}>
        <Box w={["100%", "100%", "100%"]} h={["45%", "45%", "50%"]} style={{flex: useBreakpointValue({base:5,sm: 4, md: 3})}}>
          {influencer.profile_verified && 
              <Image
              w={["50","70","100"]}
              source={require("../../assets/images/backgrounds/Verified.png")}
              alt="image"
              resizeMode="contain"
              position='absolute'
              zIndex={1}
              top= {0} right={0}                          
            />
          }
        
          <View style={{position: 'absolute',zIndex: 1, padding: useBreakpointValue({base: 3, md: 5})}} accessibilityLabel='view'>
          <Checkbox  aria-label="input"  colorScheme="blue" value={`${influencer.id}`} style={{margin: 5, borderRadius: 0}} accessibilityLabel='checkbox'/>
          
            {/* <Checkbox colorScheme="blue" value={`${i}`} /> */}
          </View>
          <Pressable 
            onPress={()=>{setOpenProfileIndex(i); storeCardData(i); 
            navigation.navigate("ProfileDetail",{id:influencer.id})}}
            height="100%" width="100%"
          >
              <Image rounded="xl" w={["100%", "100%", "100%"]} h="100%" 
                source={{uri: influencer && influencer.profile && influencer.profile.data && influencer.profile.data.facebook &&  influencer.profile.data.facebook.Image ? `${influencer.profile.data.facebook.Image}` : influencer && influencer.image }}                              
                alt="image" 
                resizeMode="cover"
              />                          
          </Pressable>
        </Box>
        {/* {
          ColorRed === true ?  */}
          
        <Stack flex="1" p="4" space={[3, 3, 1.5]} justifyContent="space-around" style={{flex: 1}}>
          {/*---------- add to  wishlist--------- */}                          
          <TouchableOpacity
            accessibilityLabel='touch' 
            onPress={
              ()=>{
              let hearts = liked.filter((item)=>item.influencer.id === influencer.id)
              if(hearts.length>0){
                console.log("heartsID",hearts)
                api.delete(`/favorite/${hearts[0].id}`)
                .then((res)=>{
                  console.log(res)                                
                  fetchFavorites()
                })
                .catch((error)=> console.log(error));
              }
              else{
                console.log("heartsID",influencer.id)
                api.post('/favorite/', {influencer: influencer.id})
                .then((res)=>{
                  console.log(res)
                  fetchFavorites()
                })
                .catch((error)=> console.log(error));
              }
            }}                       
            >
                <FontAwesome
                    name="heart"
                    size={useBreakpointValue({base: 15, sm: 16, md: 18, lg: 20})}
                    style={{ color: (liked && liked.filter((item)=>item.influencer.id === influencer.id)).length > 0 ? 'red' : 'rgba(50, 49, 89, 0.2)', position: 'absolute', left: -10, top: useBreakpointValue({base: 15, md: 8})}}
                  />
            </TouchableOpacity>
              
                <Stack style={{alignSelf: 'center'}}>
                  
                  <Stack direction={useBreakpointValue({ base: "column", lg: "row" })}>
                  <Pressable onPress={()=>{setOpenProfileIndex(i); storeCardData(i); 
                    navigation.navigate("Profile Detail",{id:influencer.id})}}>
                    <Box overflowX={'hidden'}>
                      <Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: useBreakpointValue({base: '9', sm: '12', md: '17', lg: '18'}), lineHeight: 21, color: 'rgba(50, 49, 89, 1)', textAlign: 'center'}}>
                      {influencer.first_name} {influencer.first_name !== influencer.last_name && influencer.last_name}
                      </Text>
                    </Box>
                  </Pressable>

                    <Text style={{fontFamily: 'Poppins_500Medium', fontSize: useBreakpointValue({base: '4', sm: '10', md: '13', lg: '14'}), lineHeight: 21, color: '#545454', textAlign: 'center'}}>
                  {/* ({influencer.Categories}) */}
                  ({ influencer.profile.data.category})
                  </Text>
                  </Stack>
                </Stack>
        { dimension === true ? <></> :
          <>
            <HStack space="2" style={{alignSelf: 'center'}}>
              <Text style={{fontFamily: 'Poppins_500Medium', fontSize: useBreakpointValue({base: '11', sm: '12', md: '13', lg: '14'}), lineHeight: 21, color: '#545454', textAlign: 'center'}}>
                {influencer.profile.data.price?`INR.${influencer.profile.data.price}`:`On Demand`}
                {/* Rs. 2000 */}
              </Text>
            </HStack>
            <HStack alignItems="center" justifyContent="space-between" marginLeft={-5}>
              <Image
                  w={{base: '2', sm: '2', md: '2', lg: '4', xl: '4'}}
                  h="10"
                  py="-3"
                  px="-6"
                  source={require("../../assets/icons/divider.png")}
                  alt="image"
                  resizeMode="contain"
                />
              <VStack>
                <Text style={{fontFamily: 'Poppins_400Regular', fontSize: useBreakpointValue({base: '11', sm: '11', md: '9', lg: '12', xl: '14'}), lineHeight: 19.5, color: '#545454'}}>Followers</Text>
                <Text color="coolGray.600" fontWeight="400" style={{alignSelf: 'center'}}>
                  {/* {influencer.Followers} */}
                  {followersFormatter(influencer.profile.data.instagram.followers_count)}
                </Text>
              </VStack>
              <Image
                  w={{base: '2', sm: '2', md: '2', lg: '4', xl: '4'}}
                  h="10"
                  py="-3"
                  px="-1"
                  source={require("../../assets/icons/divider.png")}
                  alt="image"
                  resizeMode="contain"
                />
              <VStack>
                <Text style={{fontFamily: 'Poppins_400Regular', fontSize: useBreakpointValue({base: '11', sm: '11', md: '9', lg: '12', xl: '14'}), lineHeight: 19.5, color: '#545454'}}>Posts</Text>
                <Text color="coolGray.600" fontWeight="400" style={{alignSelf: 'center'}}>
                  {/* {influencer.Posts} */}
                  {influencer.profile.data.instagram.media_count}
                </Text>
              </VStack>
              <Image
                  w={{base: '2', sm: '2', md: '2', lg: '4', xl: '4'}}
                  h="10"
                  py="-3"
                  px="-1"
                  source={require("../../assets/icons/divider.png")}
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
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
}

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.palette.primary500,
}
