import React, { FC, useCallback, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, ImageBackground, Platform, InteractionManager } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Screen } from "../components"
import {
  Text,
  Center,
  Box,
  HStack,
  Image,
  Stack,
  Heading,
  VStack,
  Input,
  Icon,
  Checkbox,
  useBreakpointValue,
  Button,
  Pressable,
  Select,
  CheckIcon,
  FlatList,  
} from "native-base"
// import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Footer from "../components/Footer"
import { BottomNavigation, TopNavigation } from "../navigators/Navigation"
import { useNavigation } from "@react-navigation/native"
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native-gesture-handler"
import { PlatformPressable } from "@react-navigation/elements"
import { ApiResponse, create } from 'apisauce'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons'; 
import { useToast } from 'native-base';
import { debounce } from "lodash";
// import { useNavigation } from "@react-navigation/native"
import customData from './test.json';
import { useStores } from "../models"
import {followersFormatter} from './UitilityFunctions';
import Config from "../config"
import Spinner from 'react-native-loading-spinner-overlay';

const priceFilter = [
  "Under Rs. 1,000",
  "Rs. 1,000 - 2,000",
  "Rs. 2,000 - 5,000",
  "Rs. 5,000 - 10,000",
]


const filteredInfluencerData = 1

// define the api
const api = create({
  baseURL: Config.baseURL,
  headers: { Accept: 'application/json' },
})
const instaApi = create({
  baseURL: '',
  headers: { Accept: 'application/json' },
})


export const FindInfluencerScreen =
  observer(function FindInfluencerScreen() {
    const navigation = useNavigation<any>()
    const [influencerCount, setInfluencerCount] = useState(0);
    const [LoadMore, setLoadMore] = useState(false);
    const [SearchKeyword, setSearchKeyword] = useState('');
    // const [checkedAll, setCheckedAll] = useState(false);
    
    const [filterCategories, setFilterCategories] = useState([
      "General",
      "Beauty",
      "Education",
      "Food",
      "Lifestyle",
      "Technology",
      "Fitness",
    ])
    const [SelectedInfluencers, setSelectedInfluencers] = useState<any>([]);
    const [RemoveFilter, setRemoveFilter] = useState<any>(true);
    const [openProfileIndex, setOpenProfileIndex] = useState<any>(null);
    const [filterService, setFilterService] = useState<any>();
    const [priceService, setPriceService] = useState<any>();
    const [showError, setShowError] = useState<any>(false);
    const toast = useToast();

    // Listing & Filtering Logic
    const [data, setData] = useState<any>()
    const [displayList, setDisplayList] = useState<any>([])
    const [catfilters, setCatFilters] = useState<any>([])
    const [priceFilters, setPriceFilters] = useState<any>([])
    const [priceFilterMinMax, setPriceFilterMinMax] = useState<any>([
      {key: 1, value: "Under Rs. 1,000", min: 0, max: 1000},
      {key: 2, value: "Rs. 1,000 - 5,000", min: 1000, max: 5000},
      {key: 3, value: "Rs. 5,000 - 10,000", min: 5000, max: 10000},
      {key: 4, value: "Rs. 10,000 - 20,000", min: 10000, max: 20000}
    ])
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [min, setMin] = useState<any>();
    const [max, setMax] = useState<any>();
    const [go, setGo] = useState<any>(false);
    const [liked, setLiked] = useState([]);

    // bearer token--------
    const {
      authenticationStore: { token },
    } = useStores()
    
    const {
      userProfileUpdateStore: { favorites, setFavorites },
    } = useStores()

    api.addAsyncRequestTransform(request => async () => { 
      request.headers["Authorization"] = "Bearer " + token;
      console.log()
    });    
    const [loader, setLoader] = useState<boolean>(true)
    useEffect(()=>{
      // fatch influencer list-----------
      const fetchInf = navigation.addListener('focus', () => {
        api.get('/influencer')
        .then((res:ApiResponse<any,any>)=>{
          setLoader(false)
          console.log('/influencer',res.data.results)
          setData(res.data.results)
        })
        .catch((error)=> {setLoader(false);console.log(error);});
      });  
      return fetchInf;
       
    },[navigation])

    const fetchFavorites = () => {
      api.get('/favorite/')
      .then((res:any)=>{
        console.log('/favorite/',res)
        setFavorites((res.data).length)   
        setLiked(res.data)       
      })
      .catch((error)=> console.log(error));
    }
    
    useEffect(()=>{
      fetchFavorites()
    },[data])

    useEffect(()=>{
      let result = []
      if(SearchKeyword!=""){
        result = data.filter(function(data, i) {          
          return (
            data.first_name.toLowerCase().trim() ==  SearchKeyword.toLowerCase().trim() || 
            data.profile.data.category.toLowerCase().trim() ==  SearchKeyword.toLowerCase().trim() ||
            data.location.toLowerCase().trim() ==  SearchKeyword.toLowerCase().trim() 
            );
        })
      }
      else{
        result = data
      }      
      if(catfilters.length>0){
        result = result.filter(function(data, i) {          
          return (catfilters.includes(data.profile.data.category));
        })
      }
      if(priceFilters.length>0){
        result = result.filter(function(data, i){
          let boolean;
           priceFilters.map((price,i)=>{
             boolean = data.profile.data.price >= price.min && data.profile.data.price <= price.max
          })
          return(boolean)
        })
      }
      if(go){
        if(min != undefined){
          result = result.filter(function(data, i) {
            console.log('data.rs > min',data.profile.data.price > min)
            return (data.profile.data.price >= min );
          })
        }
        if(max != undefined){
          result = result.filter(function(data, i) {
            console.log('data.rs <= max',data.profile.data.price <= max)
            return (data.profile.data.price <= max );
          })
        }
      }
      setDisplayList(result);
    },[data, catfilters, searchTerm, priceFilters,min,max, go])
    //End of Listing and Filtering Logic


    const dimension = useBreakpointValue({
      base : true,
      sm : true,
      md : false,
      lg : false,
      xl : false
    })

    const storeData = async (value) => {
      const result = data.filter(function(data, i) {      
        return (value.includes(`${data.id}`));
      })
      try {
        const jsonValue = JSON.stringify(result)
        await AsyncStorage.setItem('selected_influencer', jsonValue)
      } catch (e) {
        // saving error
      }
    }
    const storeCardData = async (cardIndex) => {
      const result = data.filter(function(data, idx) {      
        return (cardIndex === idx);
      })
      try {
        const jsonValue = JSON.stringify(result)
        await AsyncStorage.setItem('Profile_detail', jsonValue)
      } catch (e) {
        // saving error
      }
    }

   const PriceFilters = () => {
      return (
        <>
            {priceFilter.map((price, i) => (
                <HStack key={i} style={{padding: 5, paddingBottom: 0}}>
                  <Text style={{padding: 5}}>{price}</Text>
                </HStack>          
            ))}
        </>
      )
    }

  const Tag = () => {
    return (
      <>
        <Box
          flexDirection={'row'}
          justifyContent={'center'}
          alignSelf={'center'}
          p={'1'}
          style={{borderWidth: 1, borderStyle: 'solid', borderRadius: 15, borderColor: 'gray'}}
        >
          <Text style={{color: '#9C9DA5'}}>
            Beauty
          </Text>
          <TouchableOpacity onPress={()=>{setRemoveFilter(false)}} accessibilityLabel='touch'> 
              <Image
                w={'4'}
                h="4"
                m={'1'}
                source={require("../../assets/icons/close.png")}
                alt="image"
                resizeMode="cover"
              /> 
          </TouchableOpacity>
        </Box>
      </>
    )
  }

  const InfluencerCard = () => {
      return (
        <>
            {displayList && displayList.length==0 ? 
            <Text>No records found</Text>
            : 
            displayList && displayList.map((influencer, i) => (
              
                  <Stack rounded="xl" key={i} overflow="hidden" 
                    width={['90%','90%','47%','33%']} 
                    height={['400', "400","400", "460", "400"]} 
                    shadow="1"  bg={'#F5FBFF'} padding={[3, 4, 5]} 
                    marginBottom={[5]}>
                    <Box w={["100%", "100%", "100%"]} h={["45%", "45%", "50%"]} style={{flex: useBreakpointValue({base:5,sm: 4, md: 3})}}>
                      {influencer.profile_verified && 
                          <Image
                          w={["50","70","100"]}                          
                          // h={["5","7","10"]}
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
                            source={{uri: influencer && influencer.image }}                              
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
                                navigation.navigate("ProfileDetail",{id:influencer.id})}}>
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
                            <Text style={{fontFamily: 'Poppins_400Regular', fontSize: useBreakpointValue({base: '10', sm: '10', md: '9', lg: '12', xl: '14'}), lineHeight: 19.5, color: '#545454'}}>Following</Text>
                            <Text color="coolGray.600" fontWeight="400" style={{alignSelf: 'center'}}>
                              {influencer.profile.data.instagram.follows_count}
                            </Text>
                          </VStack>
                        </HStack>
                        </>
                    }
                    </Stack>
                  </Stack>
            ))}
          {/* </Checkbox.Group> */}
        </>
      )
  } 
    
    return (
      <Screen style={$root} preset="scroll">
         <TopNavigation navigation={navigation} />
         <BottomNavigation navigation={navigation} />
         {/* <Spinner
            //visibility of Overlay Loading Spinner
            visible={loader}
            //Text with the Spinner
            textContent={'Loading...'}
            //Text style of the Spinner Text
            textStyle={{color:'#FFF'}}
          /> */}
        <VStack
          overflow="hidden"
          // width={["100%"]}
          // height={["100%"]}
          mt={-12}
        >
          <HStack w={["100%"]} h={['500']}>
            <Box
              w={["100%",]}
              h={["100%"]}
              style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
            >
              <Image
                w={["100%"]}
                h="100%"
                source={require("../../assets/images/backgrounds/find_influencer_hero_image.png")}
                alt="image"
                resizeMode="cover"
              />
              <Box w={{base: '90%', md:"70%"}} bg="rgba(34, 55, 83, 0)" position="absolute">
                <Text
                  style={{
                    fontFamily: "Poppins_700Bold",
                    fontSize: useBreakpointValue({base: '30px',sm: '40px', md: '48px'}),
                    lineHeight: useBreakpointValue({base: '40px',sm: '50px', md: '58px'}),
                    color: "#223753",
                    textAlign: "center",
                  }}
                >
                  Find the right Influencer for your business.
                </Text>
                <VStack w="80%" space={5} alignSelf="center" style={{ padding: 16 }}>
                  {/* <Handler/> */}
                  <Input
                    placeholder="Search here"
                    bg="rgba(255, 255, 255, 0.7)"
                    width="100%"
                    borderRadius="4"
                    py="3"
                    px="3"
                    fontSize="14"
                    InputRightElement={
                      <TouchableOpacity onPress={()=>{
                        setSearchTerm(SearchKeyword);
                        api.get(`/searchInsta/${SearchKeyword}/`)
                        .then((res)=>{console.log('instagram api-->',res)}).catch((error)=>{console.log(error)})
                        }}>
                      <Image
                        w={["50", "50", "50", "50", "50"]}
                        h="50"
                        py="-3"
                        px="-1"
                        source={require("../../assets/images/backgrounds/Search.png")}
                        alt="image"
                        resizeMode="contain"
                      />
                      </TouchableOpacity>
                    }
                    aria-label="input" 
                    accessibilityLabel='input'
                    onChangeText={(text)=>{
                     setSearchKeyword(text)
                    }}
                    value={SearchKeyword}
                  />
                </VStack>
              </Box>
            </Box>
          </HStack>

          <HStack style={{flex: 1}}>
          { dimension ? <></> : <VStack w={["30%", "40%"]} h="100%" bg= 'rgba(255, 255, 255, 0.5)' padding={5} style={{flex: useBreakpointValue({base: 3, lg: 2})}}>
                <HStack alignItems="bottom" justifyContent="space-between">
                  <Text style={{fontFamily: 'Poppins_700Bold', fontSize: 24, lineHeight: 29, color: 'rgba(32, 54, 85, 1)'}}>Filters</Text>
                  <Pressable
                    onPress={()=>{
                      setCatFilters([])
                      setPriceFilters([])
                      setSearchKeyword("")
                    }}
                  >
                    <Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: 10, lineHeight: 14, color: 'rgba(32, 54, 85, 1)'}} justifyContent="bottom">Reset Filter</Text>
                  </Pressable>
                </HStack>
                <Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: 17, lineHeight: 28, color: 'rgba(66, 79, 85, 1)', marginTop: 10, marginBottom: 5}}>Categories</Text>
                
                <Checkbox.Group  aria-label="input" colorScheme="green" accessibilityLabel="pick an item" 
                  onChange={setCatFilters} value={catfilters}
                  > {filterCategories.map((category, i) => (
                    <HStack key={`cat-${i}`} style={{padding: 5, paddingBottom: 0}}>
                      <Checkbox  aria-label="input"  colorScheme="blue" value={category} style={{margin: 5, borderRadius: 0}} accessibilityLabel='checkbox'                       
                      // isChecked={catfilters.includes(category)}
                      >
                        <Text style={{fontFamily: 'Poppins_400Regular', fontSize: 14, lineHeight: 21, color: '#545454'}}>{category}</Text>
                      </Checkbox>
                    </HStack>
                    ))}
                </Checkbox.Group>

                <Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: 17, lineHeight: 28, color: 'rgba(66, 79, 85, 1)', marginTop: 10, marginBottom: 5}}>Price</Text>
                <Checkbox.Group  aria-label="input" colorScheme="green" accessibilityLabel="pick an item"                       
                  onChange={setPriceFilters} value={priceFilters}                  
                > 
                  {priceFilterMinMax.map((price,i) => (
                    <HStack key={`price-${i}`} style={{padding: 5, paddingBottom: 0}}>                      
                      <Checkbox  aria-label="input"  colorScheme="blue" value={price} style={{margin: 5, borderRadius: 0}} accessibilityLabel='checkbox'                           
                      // isChecked={priceFilter.includes(price)}
                      >
                        <Text style={{paddingBottom: 5,fontFamily: 'Poppins_400Regular', fontSize: 14, lineHeight: 21, color: '#545454'}}>{price.value}</Text>
                      </Checkbox>                          
                    </HStack>          
                  ))}
                </Checkbox.Group>

                <Box  w={["100%", "100%"]} style={{flexDirection: useBreakpointValue({base:'column', lg: 'row'})}}>
                  <Box w={["100%", "60%"]} style={{flexDirection: 'row'}}>
                  <Input w={{ base: "80%", lg: '40%'}} 
                    m= '2'
                    InputLeftElement={
                      <Image
                      w={"3"}
                      h="3"
                      py="-3"
                      // px="-1"
                      // mr={'-3'}
                      source={require("../../assets/icons/rs_icon.png")}
                      alt="image"
                      resizeMode="contain"/>
                    } 
                    value={min}
                    placeholder="Min" 
                    accessibilityLabel='input'
                    onChangeText={(value)=>{setMin(value);}}
                    />
                  <Input w={{ base: "80%", lg: '40%'}} 
                    m= '2'
                    ml= '-1'
                    InputLeftElement={<Image
                      w={"3"}
                      h="3"
                      py="-3"
                      // px="-1"
                      // mr={'-3'}
                      source={require("../../assets/icons/rs_icon.png")}
                      alt="image"
                      resizeMode="contain"
                    />} 
                    placeholder="Max" 
                    accessibilityLabel='input'
                    value={max}
                    onChangeText={(value)=>{setMax(value);}}
                    />
                  </Box>
                  <Button
                    borderRadius="full"
                    colorScheme="success"
                    onPress={() =>{(min != undefined || max != undefined )&& setGo(true); console.log('filter applied',go, min, max)}}
                    bg="rgba(60, 167, 221, 1)"
                    w={{base:'100%', md: '70'}}
                    h={'8'}
                    // justifyContent={''}
                    alignSelf={useBreakpointValue({lg:'center'})}
                    fontSize={'12'}
                    // ml={{base: '-25', md: '0'}}
                  >
                    Go
                  </Button>
                </Box>
            </VStack>
          }
          <Box style={{flex: 8}}>
            {/* ------------------- navigation--------------------------------------- */}
            {/* <HStack style={{margin: 10, marginLeft: 10}}>
              <Pressable onPress={() => navigation.goBack()} flexDirection={'row'}>
                <Ionicons name="arrow-back" size={20} color="#203655" />
                <Text style={{fontFamily: 'Poppins_700Bold', fontSize: 24, lineHeight: 29, color: '#203655'}}>Beauty</Text>
              </Pressable>
            </HStack> */}
              <Box style={{flexDirection: 'row', justifyContent: dimension ? 'space-between': 'flex-end', margin: 10, width: useBreakpointValue({base:'90%',sm: '85%', md:'80%'}), alignSelf: 'center'}}>
              { dimension ? 
              <>
                  <Select  aria-label="input"  selectedValue={filterService} minWidth={[100, 120, 200]} accessibilityLabel="Filters" placeholder="Category Filter" 
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
                 
                 </>
                  : <></> }
                  {/* <Input 
                  display={useBreakpointValue({base:"flex"})}        
                  placeholder="Enter location" 
                  height={35} 
                  width= {[150, 200 , 300]}
                  borderRadius="4" 
                  overflow={'hidden'}
                  px="1" fontSize="14" 
                  backgroundColor={'white'}
                  InputLeftElement={ <Image
                    width="5"
                    height="5"
                    source={require("../../assets/icons/Location on.png")}
                  />}  
                  aria-label="input" 
                  accessibilityLabel='input'
                /> */}
              </Box>
              {/* ------------------------------- Tag --------------------------------------- */}
              {/* { RemoveFilter && 
              <HStack ml={'2'} style={{flexDirection: 'row', justifyContent: 'flex-start', margin: 10, width: '80%', alignSelf: 'center'}}>
                <Tag/>
              </HStack>} */}
              <Box  style={{flexDirection: 'row', justifyContent: 'flex-end', margin: 10, width: '80%', alignSelf: 'center'}}>
                  <Text alignSelf={'center'} ml={5}>{SelectedInfluencers.length} Influencer Selected </Text>
                  <Button
                    borderRadius="full"
                    colorScheme="success"
                    onPress={() =>{
                      console.log('SelectedInfluencers...........,,,',SelectedInfluencers); 
                      SelectedInfluencers.length === 0 && setShowError(true)
                      // toast.show({
                      //   title: "Please select at least one influencer",
                      //   placement: "top"
                      // })
                      SelectedInfluencers.length != 0 && storeData(SelectedInfluencers); 
                      SelectedInfluencers.length != 0 && navigation.navigate("Selected Influencer");
                    }}
                    bg="rgba(60, 167, 221, 1)"
                  >
                    Check Out
                  </Button>
              </Box>
              { showError && <Box style={{alignSelf: 'flex-start', margin: 10, marginLeft: '7vw'}}>
                    <Text style={{fontFamily: 'Poppins_300Light', fontSize: 15, lineHeight: 15, color: 'red'}}>*Please select at least one Influencer</Text>
                 </Box>}
              <Box style={{flexDirection: 'row', justifyContent: 'space-between', width: '90%', alignSelf: 'center'}}>
                 <Box>
                    <Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: 20, lineHeight: 28, color: 'rgba(23, 33, 38, 1)'}}>Most Popular</Text>
                 </Box>
                 {/* <Box>
                    <Text style={{fontFamily: 'Poppins_400Regular', fontSize: 14, lineHeight: 21, color: 'rgba(60, 167, 221, 1)'}}>View all</Text>
                 </Box> */}
              </Box>
              {/* <Box style={{flexWrap: 'wrap', flexDirection: 'row', alignContent: 'flex-start', padding: 10, justifyContent: 'space-evenly'}}> */}
              <Checkbox.Group  aria-label="input"  colorScheme="green" accessibilityLabel="pick an item" w={'100%'} 
              onChange={values => {setSelectedInfluencers([...values]); console.log(SelectedInfluencers)}} 
              style={{flexWrap: 'wrap', flexDirection: 'row', alignContent: 'flex-start', padding: 10, justifyContent: 'space-evenly'}}>
                <InfluencerCard/>
                {LoadMore }
              </Checkbox.Group>
              {LoadMore === true ? 
               <Checkbox.Group  aria-label="input"  colorScheme="green" accessibilityLabel="pick an item" w={'100%'} 
               onChange={values => {setSelectedInfluencers([...values]); console.log(SelectedInfluencers)}} 
               style={{flexWrap: 'wrap', flexDirection: 'row', alignContent: 'flex-start', padding: 10, justifyContent: 'space-evenly'}}>
                 <InfluencerCard/>
               </Checkbox.Group>
               : <></>}
              {/* <Button
                borderRadius="full"
                colorScheme="success"
                onPress={() => setLoadMore(true)}
                bg="rgba(60, 167, 221, 1)"
                w={'85%'}
                alignSelf={'center'}
              >
                Load More
              </Button> */}
              {/* </Box> */}
          </Box>
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