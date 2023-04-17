import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { TouchableOpacity, ViewStyle } from "react-native"
import { Screen } from "../components"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {
  Box,
  HStack,
  Image,
  Stack,
  useBreakpointValue,
  View,
  VStack,
  Text,
  Input,
  Checkbox,
  Button,
  Pressable,
  Select,
  CheckIcon,
} from "native-base"

import { FontAwesome, Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"
import { create } from "apisauce"
import { BottomNavigation, TopNavigation } from "../navigators/Navigation"
import Footer from "../components/Footer"
import { useStores } from "../models"
import { followersFormatter } from "./UitilityFunctions"
import Config from "../config"
import Spinner from 'react-native-loading-spinner-overlay';

// define the api
const api = create({
  baseURL: Config.baseURL,
  headers: { Accept: "application/json" },
})

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `Wishlist: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="Wishlist" component={WishlistScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const WishlistScreen = observer(function WishlistScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const [WishlistInfluencer, setWishlistInfluencer] = useState<any>([])
  const [openProfileIndex, setOpenProfileIndex] = useState<any>(null)
  const [liked, setLiked] = useState([])
  const [catfilters, setCatFilters] = useState<any>([])
  const [filterCategories, setFilterCategories] = useState([
    "Beauty",
    "Education",
    "Food",
    "Lifestyle",
    "Technology",
    "Fitness",
  ])
  const [priceFilterMinMax, setPriceFilterMinMax] = useState<any>([
    { key: 1, value: "Under Rs. 1,000", min: 0, max: 1000 },
    { key: 2, value: "Rs. 1,000 - 2,000", min: 1000, max: 2000 },
    { key: 3, value: "Rs. 2,000 - 5,000", min: 2000, max: 5000 },
    { key: 4, value: "Rs. 5,000 - 10,000", min: 5000, max: 10000 },
  ])
  const [SelectedCategories, setSelectedCategories] = useState<any>([])
  const [priceFilters, setPriceFilters] = useState<any>([])
  const [min, setMin] = useState<any>()
  const [max, setMax] = useState<any>()
  const [go, setGo] = useState<any>(false)
  const [service, setService] = useState<any>()
  const [SelectedInfluencers, setSelectedInfluencers] = useState<any>([])
  const [showError, setShowError] = useState<any>(false)

  // bearer token--------
  const {
    authenticationStore: { token },
  } = useStores()

  api.addAsyncRequestTransform((request) => async () => {
    request.headers["Authorization"] = "Bearer " + token
    console.log()
  })

  const dimension = useBreakpointValue({
    base: true,
    sm: true,
    md: false,
    lg: false,
    xl: false,
  })

  // Pull in navigation via hook
  const navigation = useNavigation<any>()
  const [loader,setLoader] = useState<boolean>(true)
  useEffect(() => {
    // ---------get wishlist from api----------->
    api
      .get("/favorite/")
      .then((res: any) => {
        console.log("/favorite/", res.data)
        setLiked(res.data)
        setLoader(false)
      })
      .catch((error) => {setLoader(false);console.log(error);})
  }, [])

  const storeData = async (value) => {
    const result = liked.filter(function (data, i) {
      return value.includes(`${data.id}`)
    })
    try {
      const jsonValue = JSON.stringify(result)
      await AsyncStorage.setItem("selected_influencer", jsonValue)
    } catch (e) {
      // saving error
    }
  }

  const storeCardData = async (cardIndex) => {
    const result = WishlistInfluencer.filter(function (data, idx) {
      return cardIndex === idx
    })
    try {
      const jsonValue = JSON.stringify(result)
      await AsyncStorage.setItem("Profile_detail", jsonValue)
    } catch (e) {
      // saving error
    }
  }

  useEffect(() => {
    let result = []
    console.log("catfilters", catfilters)
    if (liked) result = liked

    if (catfilters.length > 0) {
      result = result.filter(function (data, i) {
        // return (catfilters.some(item=>data.profile.data.category.split(",").indexOf(item)>0));
        return catfilters.includes(data.influencer.profile.data.category)
      })
    }
    if (priceFilters.length > 0) {
      result = result.filter(function (data, i) {
        let boolean
        priceFilters.map((price, i) => {
          boolean =
            data.influencer.profile.data.price >= price.min &&
            data.influencer.profile.data.price <= price.max
        })
        return boolean
      })
    }
    if (go) {
      if (min != undefined) {
        result = result.filter(function (data, i) {
          console.log("data.rs > min", data.influencer.profile.data.price > min)
          return data.influencer.profile.data.price >= min
        })
      }
      if (max != undefined) {
        result = result.filter(function (data, i) {
          console.log("data.rs <= max", data.influencer.profile.data.price <= max)
          return data.influencer.profile.data.price <= max
        })
      }
    }
    console.log("RESULT:", result)
    setWishlistInfluencer(result)
  }, [liked, catfilters, priceFilters, min, max, go])
  //End of Listing and Filtering Logic]

  useEffect(() => {
    if (WishlistInfluencer) console.log(WishlistInfluencer)
  }, [WishlistInfluencer])

  const {userProfileUpdateStore:{favorites, setFavorites}} = useStores()
  const fetchFavorites = () => {
    api
      .get("/favorite/")
      .then((res: any) => {
        console.log("/favorite/", res)
        setFavorites((res.data).length)
        setLiked(res.data)
      })
      .catch((error) => console.log(error))
  }

  const InfluencerCard = () => {
    return (
      <>
        {/* {console.log('liked',liked, 'LikedFromApi', LikedFromApi)} */}
        {liked.length === 0 ? (
          <Text>No records found</Text>
        ) : (
          WishlistInfluencer &&
          WishlistInfluencer.map((item, i) => (
            <Stack
              rounded="xl"
              overflow="hidden"
              key={`wlist_${i}`}
              width={["90%","90%","47%","33%"]}
              height={["400", "400", "400", "400", "400"]}
              shadow="1"
              bg={"#F5FBFF"}
              padding={[3, 4, 5]}
              marginBottom={[5]}
            >
              <Box
                w={["100%", "100%", "100%"]}
                h={["45%", "45%", "50%"]}
                style={{ flex: useBreakpointValue({ base: 5, sm: 4, md: 3 }) }}
              >
                {item.influencer.profile_verified && (
                  <Image
                    w={["50", "70", "100"]}
                    // h={["5", "7", "10"]}
                    source={require("../../assets/images/backgrounds/Verified.png")}
                    alt="image"
                    resizeMode="contain"
                    position="absolute"
                    zIndex={1}
                    top={0}
                    right={0}
                  />
                )}

                <View
                  style={{
                    position: "absolute",
                    zIndex: 1,
                    padding: useBreakpointValue({ base: 3, md: 5 }),
                  }}
                  accessibilityLabel="view"
                >
                  <Checkbox
                    aria-label="input"
                    colorScheme="blue"
                    value={`${item.influencer.id}`}
                    style={{ margin: 5, borderRadius: 0 }}
                    accessibilityLabel="checkbox"
                  />
                </View>
                <Pressable
                  onPress={() => {
                    setOpenProfileIndex(i)
                    storeCardData(i)
                    navigation.navigate("Profile Detail", { id: item.influencer.id })
                  }}
                  height="100%"
                  width="100%"
                >
                  <Image
                    rounded="xl"
                    w={["100%", "100%", "100%"]}
                    h="100%"
                    source={{
                      uri:
                        item.influencer &&
                        item.influencer.profile &&
                        item.influencer.profile.data &&
                        item.influencer.profile.data.facebook &&
                        item.influencer.profile.data.facebook.Image
                          ? `${item.influencer.profile.data.facebook.Image}`
                          : item.influencer && item.influencer.image,
                    }}
                    alt="image"
                  />
                </Pressable>
              </Box>
              <Stack
                flex="1"
                p="4"
                space={[3, 3, 1.5]}
                justifyContent="space-around"
                style={{ flex: 1 }}
              >
                <TouchableOpacity
                  onPress={() => {
                    api
                      .delete(`/favorite/${item.id}`)
                      .then((res) => {
                        console.log(res)
                        fetchFavorites()
                      })
                      .catch((error) => console.log(error))
                  }}
                  accessibilityLabel="touch"
                >
                  <FontAwesome
                    name="heart"
                    size={20}
                    style={{
                      color: true ? "red" : "rgba(50, 49, 89, 0.2)",
                      position: "absolute",
                      left: -10,
                      top: 5,
                    }}
                  />
                </TouchableOpacity>
                <Stack style={{ alignSelf: "center" }}>
                  <Stack direction={useBreakpointValue({ base: "column", lg: "row" })}>
                    <Pressable
                      onPress={() => {
                        setOpenProfileIndex(i)
                        storeCardData(i)
                        navigation.navigate("Profile Detail", { id: item.influencer.id })
                      }}
                    >
                      <Box overflowX={"hidden"}>
                        <Text
                          style={{
                            fontFamily: "Poppins_600SemiBold",
                            fontSize: useBreakpointValue({
                              base: "9",
                              sm: "12",
                              md: "17",
                              lg: "18",
                            }),
                            lineHeight: 21,
                            color: "rgba(50, 49, 89, 1)",
                            textAlign: "center",
                          }}
                        >
                          {item.influencer.first_name}{" "}
                          {item.influencer.first_name !== item.influencer.last_name &&
                            item.influencer.last_name}
                        </Text>
                      </Box>
                    </Pressable>

                    <Text
                      style={{
                        fontFamily: "Poppins_500Medium",
                        fontSize: useBreakpointValue({ base: "4", sm: "10", md: "13", lg: "14" }),
                        lineHeight: 21,
                        color: "#545454",
                        textAlign: "center",
                      }}
                    >
                      {/* ({influencer.Categories}) */}({item.influencer.profile.data.category})
                    </Text>
                  </Stack>
                </Stack>
                {dimension === true ? (
                  <></>
                ) : (
                  <>
                    <HStack space="2" style={{ alignSelf: "center" }}>
                      <Text
                        style={{
                          fontFamily: "Poppins_500Medium",
                          fontSize: useBreakpointValue({
                            base: "11",
                            sm: "12",
                            md: "13",
                            lg: "14",
                          }),
                          lineHeight: 21,
                          color: "#545454",
                          textAlign: "center",
                        }}
                      >
                        Rs. {item.influencer.profile.data.price}
                        {/* Rs. 2000 */}
                      </Text>
                    </HStack>
                    <HStack alignItems="center" justifyContent="space-between" marginLeft={-5}>
                      <Image
                        w={{ base: "2", sm: "2", md: "2", lg: "4", xl: "4" }}
                        h="10"
                        py="-3"
                        px="-6"
                        source={require("../../assets/icons/divider.png")}
                        alt="image"
                        resizeMode="contain"
                      />
                      <VStack>
                        <Text
                          style={{
                            fontFamily: "Poppins_400Regular",
                            fontSize: useBreakpointValue({
                              base: "11",
                              sm: "11",
                              md: "9",
                              lg: "12",
                              xl: "14",
                            }),
                            lineHeight: 19.5,
                            color: "#545454",
                          }}
                        >
                          Followers
                        </Text>
                        <Text color="coolGray.600" fontWeight="400" style={{ alignSelf: "center" }}>
                          {/* {influencer.Followers} */}
                          {followersFormatter(
                            item.influencer.profile.data.instagram.followers_count,
                          )}
                        </Text>
                      </VStack>
                      <Image
                        w={{ base: "2", sm: "2", md: "2", lg: "4", xl: "4" }}
                        h="10"
                        py="-3"
                        px="-1"
                        source={require("../../assets/icons/divider.png")}
                        alt="image"
                        resizeMode="contain"
                      />
                      <VStack>
                        <Text
                          style={{
                            fontFamily: "Poppins_400Regular",
                            fontSize: useBreakpointValue({
                              base: "11",
                              sm: "11",
                              md: "9",
                              lg: "12",
                              xl: "14",
                            }),
                            lineHeight: 19.5,
                            color: "#545454",
                          }}
                        >
                          Posts
                        </Text>
                        <Text color="coolGray.600" fontWeight="400" style={{ alignSelf: "center" }}>
                          {/* {influencer.Posts} */}
                          {item.influencer.profile.data.instagram.media_count}
                        </Text>
                      </VStack>
                      <Image
                        w={{ base: "2", sm: "2", md: "2", lg: "4", xl: "4" }}
                        h="10"
                        py="-3"
                        px="-1"
                        source={require("../../assets/icons/divider.png")}
                        alt="image"
                        resizeMode="contain"
                      />
                      <VStack>
                        <Text
                          style={{
                            fontFamily: "Poppins_400Regular",
                            fontSize: useBreakpointValue({
                              base: "10",
                              sm: "10",
                              md: "9",
                              lg: "12",
                              xl: "14",
                            }),
                            lineHeight: 19.5,
                            color: "#545454",
                          }}
                        >
                          Engagements
                        </Text>
                        <Text color="coolGray.600" fontWeight="400" style={{ alignSelf: "center" }}>
                          {/* {influencer.Engagements} */}0
                        </Text>
                      </VStack>
                    </HStack>
                  </>
                )}
              </Stack>
            </Stack>
          ))
        )}
        {/* </Checkbox.Group> */}
      </>
    )
  }

  return (
    <Screen style={$root} preset="scroll">
      <TopNavigation navigation={navigation} />
      <BottomNavigation navigation={navigation} />
      <Spinner
        //visibility of Overlay Loading Spinner
        visible={loader}
        //Text with the Spinner
        textContent={'Loading...'}
        //Text style of the Spinner Text
        textStyle={{color:'#FFF'}}
      />      
      <HStack style={{ flex: 1 }}>
        {/*start side bar with filters------------ */}
        {dimension ? (
          <></>
        ) : (
          <VStack
            w={["30%", "40%"]}
            h="100%"
            bg="rgba(255, 255, 255, 0.5)"
            padding={5}
            style={{ flex: useBreakpointValue({ base: 3, lg: 2 }) }}
          >
            <Text
              style={{
                fontFamily: "Poppins_700Bold",
                fontSize: 24,
                lineHeight: 29,
                color: "rgba(32, 54, 85, 1)",
              }}
            >
              Filters
            </Text>
            <Text
              style={{
                fontFamily: "Poppins_600SemiBold",
                fontSize: 17,
                lineHeight: 28,
                color: "rgba(66, 79, 85, 1)",
                marginTop: 10,
                marginBottom: 5,
              }}
            >
              Categories
            </Text>
            {/* <FilterCategories /> */}
            {/* <HStack style={{padding: 5, paddingBottom: 0,marginBottom: -20}}>
                        <Checkbox  aria-label="input"  colorScheme="blue" value={'All'} style={{margin: 5, borderRadius: 0}} accessibilityLabel='checkbox' 
                          onChange={()=>{setCheckedAll(!checkedAll); console.log('checkedAll', checkedAll)}} 
                        >
                          All
                        </Checkbox>
                      </HStack> */}
            <Checkbox.Group
              aria-label="input"
              colorScheme="green"
              accessibilityLabel="pick an item"
              onChange={(values) => {
                setCatFilters([...values])
                // checkedAll != true &&  setCatFilters([...values]);
                // checkedAll && setCatFilters([...filterCategories])
                // console.log('setCatFilters', catfilters);
              }}
            >
              {" "}
              {filterCategories.map((category, i) => (
                <HStack key={`Wlist1_${i}`} style={{ padding: 5, paddingBottom: 0 }}>
                  <Checkbox
                    aria-label="input"
                    colorScheme="blue"
                    value={category}
                    style={{ margin: 5, borderRadius: 0 }}
                    accessibilityLabel="checkbox"
                    // onChange={(value)=>toggleCheckbox(value)}
                    isChecked={SelectedCategories && SelectedCategories.includes(category)}
                  >
                    <Text
                      style={{
                        fontFamily: "Poppins_400Regular",
                        fontSize: 16,
                        lineHeight: 21,
                        color: "#545454",
                      }}
                    >
                      {category}
                    </Text>
                  </Checkbox>
                </HStack>
              ))}
            </Checkbox.Group>

            <Text
              style={{
                fontFamily: "Poppins_600SemiBold",
                fontSize: 17,
                lineHeight: 28,
                color: "rgba(66, 79, 85, 1)",
                marginTop: 10,
                marginBottom: 5,
              }}
            >
              Price
            </Text>
            {/* <PriceFilters/> */}
            <Checkbox.Group
              aria-label="input"
              colorScheme="green"
              accessibilityLabel="pick an item"
              onChange={(values) => {
                setPriceFilters([...values])
                // checkedAll != true &&  setCatFilters([...values]);
                // checkedAll && setCatFilters([...filterCategories])
                console.log("priceFilters", priceFilters)
              }}
            >
              {priceFilterMinMax.map((data) => (
                <HStack key={data.key} style={{ padding: 5, paddingBottom: 0 }}>
                  {/* <Checkbox  aria-label="input"  colorScheme="blue" value={category} style={{margin: 5, borderRadius: 0}} accessibilityLabel='checkbox' 
                          // onChange={(value)=>toggleCheckbox(value)} 
                          // isChecked={SelectedCategories && SelectedCategories.includes(category)}
                          > */}
                  <Checkbox
                    aria-label="input"
                    colorScheme="blue"
                    value={data}
                    style={{ margin: 5, borderRadius: 0, display: "none" }}
                    accessibilityLabel="checkbox"
                    // onChange={(value)=>toggleCheckbox(value)}
                    // isChecked={SelectedCategories && SelectedCategories.includes(category)}
                  >
                    <Text
                      style={{
                        paddingBottom: 5,
                        fontFamily: "Poppins_400Regular",
                        fontSize: 16,
                        lineHeight: 21,
                        color: "#545454",
                      }}
                    >
                      {data.value}
                    </Text>
                  </Checkbox>
                  {/* <Text style={{padding: 5}}>{price}</Text> */}
                </HStack>
              ))}
            </Checkbox.Group>

            <Box
              w={["100%", "100%"]}
              style={{ flexDirection: useBreakpointValue({ base: "column", lg: "row" }) }}
            >
              <Box w={["100%", "60%"]} style={{ flexDirection: "row" }}>
                <Input
                  w={{ base: "80%", lg: "40%" }}
                  m="2"
                  InputLeftElement={
                    <Image
                      w={"3"}
                      h="3"
                      py="-3"
                      // px="-1"
                      // mr={'-3'}
                      source={require("../../assets/icons/rs_icon.png")}
                      alt="image"
                      resizeMode="contain"
                    />
                  }
                  value={min}
                  placeholder="Min"
                  accessibilityLabel="input"
                  onChangeText={(value) => {
                    setMin(value)
                  }}
                />
                <Input
                  w={{ base: "80%", lg: "40%" }}
                  m="2"
                  ml="-1"
                  InputLeftElement={
                    <Image
                      w={"3"}
                      h="3"
                      py="-3"
                      // px="-1"
                      // mr={'-3'}
                      source={require("../../assets/icons/rs_icon.png")}
                      alt="image"
                      resizeMode="contain"
                    />
                  }
                  placeholder="Max"
                  accessibilityLabel="input"
                  value={max}
                  onChangeText={(value) => {
                    setMax(value)
                  }}
                />
              </Box>
              <Button
                borderRadius="full"
                colorScheme="success"
                onPress={() => {
                  ;(min != undefined || max != undefined) && setGo(true)
                  console.log("filter applied", go, min, max)
                }}
                bg="rgba(60, 167, 221, 1)"
                w={{ base: "100%", md: "70" }}
                h={"8"}
                // justifyContent={''}
                alignSelf={useBreakpointValue({ lg: "center" })}
                fontSize={"12"}
                // ml={{base: '-25', md: '0'}}
              >
                Go
              </Button>
            </Box>
          </VStack>
        )}
        {/*end side bar with filters------------ */}
        {/* start wishlist card ---------------- */}
        <Box style={{ flex: 8 }}>
          {/* go back button----------- */}
          <HStack
            space={2}
            mt={useBreakpointValue({ base: 5, lg: 10 })}
            mx={useBreakpointValue({ base: 5, lg: 10 })}
            // bg="rgba(142, 197, 252, 0.5) 100%)"
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Pressable onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={20} color="gray.400" width="8.5%" />
            </Pressable>
            <Text
              style={{
                width: "91.5%",
                color: "#022F46",
                fontFamily: "Poppins_600SemiBold",
                fontSize: 24,
                lineHeight: 29,
                // textDecorationLine: useBreakpointValue({ base: "none", md: "underline" }),
                // textAlign: useBreakpointValue({ base: "left"}),
                marginLeft: useBreakpointValue({ base: 10, md: 0 }),
              }}
            >
              Wishlist
            </Text>
          </HStack>
          {/* small screen filter dropdown------ and --- location search input--- */}
          <Box
            style={{
              flexDirection: "row",
              justifyContent: dimension ? "space-between" : "flex-end",
              margin: 10,
              width: useBreakpointValue({ base: "90%", sm: "85%", md: "80%" }),
              alignSelf: "center",
            }}
          >
            {dimension ? (
              <Select
                aria-label="input"
                selectedValue={service}
                minWidth={[100, 150, 200]}
                accessibilityLabel="Filters"
                placeholder="Filters"
                _selectedItem={{
                  bg: "white",
                  endIcon: <CheckIcon size="5" bg={"white"} />,
                }}
                onValueChange={(itemValue) => setService(itemValue)}
                style={{ backgroundColor: "white" }}
              >
                {filterCategories.map((filter, i) => (
                  <Select.Item
                    label={filter}
                    value={filter}
                    ml={1}
                    accessibilityLabel="input"
                    key={`select1_${i}`}
                  />
                ))}
              </Select>
            ) : (
              <></>
            )}            
          </Box>
          {/* Influencer selected ------ and check out button-------- */}
          <Box
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              margin: 10,
              width: "80%",
              alignSelf: "center",
            }}
          >
            <Text alignSelf={"center"} ml={5}>
              {SelectedInfluencers.length} Influencer Selected{" "}
            </Text>
            <Button
              borderRadius="full"
              colorScheme="success"
              onPress={() => {                
                SelectedInfluencers.length === 0 && setShowError(true)                
                SelectedInfluencers.length != 0 && storeData(SelectedInfluencers)
                SelectedInfluencers.length != 0 && navigation.navigate("Selected Influencer")
              }}
              bg="rgba(60, 167, 221, 1)"
            >
              Check Out
            </Button>
          </Box>
          {/* no influencer selected error ------ */}
          {showError && (
            <Box style={{ alignSelf: "flex-start", margin: 10, marginLeft: "7vw" }}>
              <Text
                style={{
                  fontFamily: "Poppins_300Light",
                  fontSize: 15,
                  lineHeight: 15,
                  color: "red",
                }}
              >
                *Please select at least one Influencer
              </Text>
            </Box>
          )}
          {/* most popular and view all text------- */}
          <Box
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "80%",
              alignSelf: "center",
            }}
          >            
            {/* <Box>
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 14,
                  lineHeight: 21,
                  color: "rgba(60, 167, 221, 1)",
                }}
              >
                View all
              </Text>
            </Box> */}
          </Box>
          <Checkbox.Group
            aria-label="input"
            colorScheme="green"
            accessibilityLabel="pick an item"
            w={"100%"}
            onChange={(values) => {
              setSelectedInfluencers([...values])
              console.log(SelectedInfluencers)
            }}
            style={{
              flexWrap: "wrap",
              flexDirection: "row",
              alignContent: "flex-start",
              padding: 10,
              justifyContent: "space-evenly",
            }}
          >
            <InfluencerCard />
          </Checkbox.Group>
        </Box>
      </HStack>
      <View accessibilityLabel="view">
        <Footer />
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
