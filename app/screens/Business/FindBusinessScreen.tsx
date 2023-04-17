import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../../navigators"
import { Screen} from "../../components"
import { Box, HStack, Image, Input, Pressable, useBreakpointValue, VStack, Text, Checkbox, Select, CheckIcon, View  } from "native-base"
import { useNavigation } from "@react-navigation/native"
import { BottomNavigation, TopNavigation } from "../../navigators/Navigation"
import { BusinessCardScreen } from "./Components/BusinessCardScreen"
import Footer from "../../components/Footer"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `FindBusiness: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="FindBusiness" component={FindBusinessScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const FindBusinessScreen: FC<StackScreenProps<AppStackScreenProps, "FindBusiness">> = observer(function FindBusinessScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const [catfilters, setCatFilters] = useState<any>([])
  const [filterService, setFilterService] = useState<any>();



  const dimension = useBreakpointValue({
    base : true,
    sm : true,
    md : false,
    lg : false,
    xl : false
  })

  const [filterCategories, setFilterCategories] = useState([
    "General",
    "Beauty",
    "Education",
    "Food",
    "Lifestyle",
    "Technology",
    "Fitness",
  ])

  // Pull in navigation via hook
  const navigation = useNavigation<any>()
  return (
    <Screen style={[$root, { backgroundColor: dimension && "white" }]} preset="scroll">
      <TopNavigation navigation={navigation} />
      <BottomNavigation navigation={navigation} />
    
      <VStack overflow="hidden" mt={-12}>
         <HStack h={{base: '350', md: '500'}}>
            <Box w='100%' style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
              <Image
                w='100%'
                h='100%'
                source={require("../../../assets/images/backgrounds/find_influencer_hero_image.png")}
                alt="image"
                resizeMode="cover"
              />
              <Box w={{base: '90%', md:"70%"}} bg="rgba(34, 55, 83, 0)" position="absolute">
                <Text
                  fontSize={{base: '30px',sm: '40px', md: '48px'}}
                  lineHeight={{base: '40px',sm: '50px', md: '58px'}}
                  style={{
                    fontFamily: "Poppins_700Bold",
                    color: "#223753",
                    textAlign: "center",
                  }}
                >
                  Find businesses, Who needs Influencers.
                </Text>
                <VStack w="100%" space={5} p={{base : 7, md: 16}} alignSelf="center">
                  <Input
                    placeholder="Search here"
                    bg="rgba(255, 255, 255, 0.7)"
                    width="100%"
                    borderRadius="4"
                    py="3"
                    px="3"
                    fontSize="14"
                    InputRightElement={
                      <Pressable>
                      <Image
                        w={["50", "50", "50", "50", "50"]}
                        h="50"
                        py="-3"
                        px="-1"
                        source={require("../../../assets/images/backgrounds/Search.png")}
                        alt="image"
                        resizeMode="contain"
                      />
                      </Pressable>
                    }
                    aria-label="input" 
                    accessibilityLabel='input'
                    onChangeText={(text)=>{
                      console.log('searchKeyword', text)
                    }}
                    // value={SearchKeyword}
                  />
                </VStack>
              </Box>
            </Box>
          </HStack>

          <HStack flex={1}>
            { dimension ? <></> :
              <VStack flex={2} minH='60vh' h='100%' bg= 'rgba(255, 255, 255, 0.5)' padding={5}>
                <Text style={{fontFamily: 'Poppins_700Bold', fontSize: 24, lineHeight: 29, color: 'rgba(32, 54, 85, 1)'}}>
                  Filters
                </Text>

                <Checkbox.Group  aria-label="input" colorScheme="green" accessibilityLabel="pick an item" 
                  onChange={setCatFilters} value={catfilters}> 
                  {filterCategories.map((category, i) => (
                    <HStack key={`cat-${i}`} style={{padding: 5, paddingBottom: 0}}>
                      <Checkbox  aria-label="input"  colorScheme="blue" value={category} style={{margin: 5, borderRadius: 0}} accessibilityLabel='checkbox'                       
                      >
                        <Text style={{fontFamily: 'Poppins_400Regular', fontSize: 14, lineHeight: 21, color: '#545454'}}>{category}</Text>
                      </Checkbox>
                    </HStack>
                    ))}
                </Checkbox.Group>
              </VStack>
            }
            <VStack flex={10} p={{base: 5, md: 8, lg: 10}}>
            { dimension ? 
              <>
              <Box maxWidth={200} bg='white' rounded={2} mb='5'>
                <Select  aria-label="input"  selectedValue={filterService} maxWidth={200} accessibilityLabel="Filters" placeholder="Category Filter" 
                  _selectedItem={{
                  bg: "white",
                    endIcon: <CheckIcon size="5" style={{backgroundColor: 'white'}}/>
                  }} 
                  onValueChange={dropdownCatFilter => {
                    console.log('dropdown', dropdownCatFilter);
                    setFilterService(dropdownCatFilter);
                    setCatFilters([dropdownCatFilter]);
                  }}
                  style={{backgroundColor: 'white'}}
                  >
                      {filterCategories.map((filter, i) => (
                        <Select.Item label={filter} value={filter} ml={1} accessibilityLabel='input'/>
                      ))}
                  </Select>
                </Box>
                 </>
                  : <></> }
                  <HStack justifyContent={'space-between'} mb='5' flexWrap={'wrap'}>

                    <BusinessCardScreen companyLogo='company_logo' category='Beauty' baseWidth='48%' mdWidth='24%' lgWidth='24%'/>
                    <BusinessCardScreen companyLogo='company_logo' category='Beauty' baseWidth='48%' mdWidth='24%' lgWidth='24%'/>
                    <BusinessCardScreen companyLogo='company_logo' category='Beauty' baseWidth='48%' mdWidth='24%' lgWidth='24%'/>
                    <BusinessCardScreen companyLogo='company_logo' category='Beauty' baseWidth='48%' mdWidth='24%' lgWidth='24%'/>

                  </HStack>
            </VStack>
          </HStack>
      </VStack>

      <View accessibilityLabel='view'>
        <Footer />
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
