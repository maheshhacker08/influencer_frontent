import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../../navigators"
import { Screen} from "../../components"
import { BottomNavigation, TopNavigation } from "../../navigators/Navigation"
import { useNavigation } from "@react-navigation/native"
import { HStack, Image, Pressable, useBreakpointValue, VStack, Text, Box, Stack, View  } from "native-base"
import { Entypo, Ionicons } from "@expo/vector-icons"
import { BusinessCardScreen } from "./Components/BusinessCardScreen"
import Footer from "../../components/Footer"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `BusinessDetail: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="BusinessDetail" component={BusinessDetailScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const BusinessDetailScreen: FC<StackScreenProps<AppStackScreenProps, "BusinessDetail">> = observer(function BusinessDetailScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

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
    <Screen style={[$root, { backgroundColor: dimension && "white" }]} preset="scroll">
      <TopNavigation navigation={navigation} />
      <BottomNavigation navigation={navigation} />
      <VStack m={{base: 5, md:'10'}} mt={{base: -35, md: -5, lg: 10 }} bg='white' p='3' rounded={'5'}>
        <HStack space={{base: 2, md: 5}} alignItems="center" mt='5' mb='5'>
          <Pressable onPress={() => {navigation.navigate("AllQueries")}} flexDirection={'row'}>
            <Ionicons name="arrow-back" size={20} color="#203655" />                    
          </Pressable>
          <Text style={{fontFamily: 'Poppins_700Bold', fontSize: useBreakpointValue({ base: 19, md: 24 }), lineHeight: 29, color: '#203655'}}>
            Business Detail
          </Text>
        </HStack>
        {/* business_detail_background */}
        <Image
          w={'100%'}
          h={266}
          alignSelf="center"
          source={require("../../../assets/images/backgrounds/business_detail_background.png")}
          alt="image"
        />
        <Image
          rounded="full"
          w={232}
          h={232}
          alignSelf="center"
          mt={-232/2}
          borderColor="white"
          borderWidth={5}
          // source={{ uri: `${Config.baseURL}${userInfo.image}` }}
          source={require("../../../assets/images/backgrounds/business_logo.png")}
          alt="image"
        />
        <Text textAlign='center' mt='2'  fontSize= {{ base: 19, md: 24 }} style={{fontFamily: 'Poppins_700Bold', lineHeight: 29, color: '#203655'}}>
          Dove Pvt. Lmt
        </Text>
    {/* company categories */}
        <HStack justifyContent={'center'}>
          <Text rounded='3' bg='#D9D4FB' m='1' p='1' fontSize='12' style={{fontFamily: 'Poppins_400Regular', lineHeight: 18, color: '#203655'}}>
            Beauty
          </Text>
          <Text rounded='3' bg='#D9D4FB' m='1' p='1' fontSize='12' style={{fontFamily: 'Poppins_400Regular', lineHeight: 18, color: '#203655'}}>
            Care
          </Text>
        </HStack>

    {/* Business Description box -------------> */}
        <Box mt='3' p='5' bg='#FAF7FF' w='100%' rounded='5' borderColor='#7128ED' borderWidth='1'>
          <Text mb='2' fontSize='20' style={{fontFamily: 'Poppins_600SemiBold', lineHeight: 28, color: '#464848'}}>
            Business Description
          </Text>
          <Text fontSize='14' mb='5' style={{fontFamily: 'Poppins_400Regular', lineHeight: 21, color: '#545454'}}>
            Lorem ipsum dolor sit amet consectetur. Sed arcu nunc in aliquam tristique sagittis in morbi. Aliquet volutpat sed fermentum arcu turpis. Pellentesque scelerisque suspendisse adipiscing purus malesuada. Quisque et vulputate ut malesuada praesent maecenas consectetur. liquet volutpat sed fermentum arcu turpis. Pellentesque scelerisque suspendisse adipiscing purus malesuada. Quisque et vulputate ut malesuada praesent
          </Text>

          <Text mb='2' fontSize='20' style={{fontFamily: 'Poppins_600SemiBold', lineHeight: 28, color: '#464848'}}>
            Headquarter
          </Text>

          <Stack mt='2' direction={{base: 'column' , md: 'row'}}>
            <HStack minW='150' space='2' alignItems={'center'}>
              <Text fontSize='16' style={{fontFamily: 'Poppins_600SemiBold', lineHeight: 24, color: '#464848'}}>
                City:
              </Text>
              <Text fontSize='14' style={{fontFamily: 'Poppins_400Regular', lineHeight: 21, color: '#545454'}}>
                Lorem 
              </Text>
            </HStack>
            
            <HStack minW='150' space='2' alignItems={'center'}>
              <Text fontSize='16' style={{fontFamily: 'Poppins_600SemiBold', lineHeight: 24, color: '#464848'}}>
                State:
              </Text>
              <Text fontSize='14' style={{fontFamily: 'Poppins_400Regular', lineHeight: 21, color: '#545454'}}>
                Lorem 
              </Text>
            </HStack>
            
            <HStack minW='150' space='2' alignItems={'center'}>
              <Text fontSize='16' style={{fontFamily: 'Poppins_600SemiBold', lineHeight: 24, color: '#464848'}}>
                Country:
              </Text>
              <Text fontSize='14' style={{fontFamily: 'Poppins_400Regular', lineHeight: 21, color: '#545454'}}>
                Lorem 
              </Text>
            </HStack>

          </Stack>
        </Box>

    {/* Similar categories ------------------>*/}
        <Box mt='3'>
          <Text mb='2' fontSize='20' style={{fontFamily: 'Poppins_600SemiBold', lineHeight: 28, color: '#464848'}}>
            Similar categories
          </Text>

          <HStack justifyContent={'space-between'} mb='5' flexWrap={'wrap'}>

            <BusinessCardScreen companyLogo='company_logo' category='Beauty' baseWidth='48%' mdWidth='24%' lgWidth='24%'/>
            <BusinessCardScreen companyLogo='company_logo' category='Beauty' baseWidth='48%' mdWidth='24%' lgWidth='24%'/>
            <BusinessCardScreen companyLogo='company_logo' category='Beauty' baseWidth='48%' mdWidth='24%' lgWidth='24%'/>
            <BusinessCardScreen companyLogo='company_logo' category='Beauty' baseWidth='48%' mdWidth='24%' lgWidth='24%'/>

          </HStack>
        </Box>
      </VStack>
      <View>
        <Footer />
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
