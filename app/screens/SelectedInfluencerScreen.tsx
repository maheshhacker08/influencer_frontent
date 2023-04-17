import React, { FC, useEffect, useState,  useRef } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Screen, TextField} from "../components"
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
  FormControl,
  WarningOutlineIcon,
  TextArea,
  View
} from "native-base"
import { useNavigation } from "@react-navigation/native"
import { EvilIcons, Ionicons } from "@expo/vector-icons"
import { ProgressSteps, ProgressStep } from "react-native-progress-steps"
import AsyncStorage from '@react-native-async-storage/async-storage';
import customData from './test.json';
// import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { BottomNavigation, TopNavigation } from "../navigators/Navigation"
import { MaterialIcons } from '@expo/vector-icons';
import { create } from 'apisauce'
import { useStores } from "../models"
import { useHover } from "react-native-web-hooks"
import Footer from "../components/Footer"
import Config from "../config"


// define the api
const api = create({
  baseURL: Config.baseURL,
  headers: { Accept: 'application/json' },
})




// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `SelectedInfluencer: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="SelectedInfluencer" component={SelectedInfluencerScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const SelectedInfluencerScreen: FC<StackScreenProps<AppStackScreenProps, "SelectedInfluencer">> = observer(function SelectedInfluencerScreen() {
 

 

  interface QueryData {
    query: {
      id? : number,
      selection : any,
      budget? : number,
      schedule? : string,
      phone? : number,
      projectDescription? : string,
      queryTitle? : string
    }
   
  }
 
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const navigation = useNavigation<any>()
  const [influencerCount, setInfluencerCount] = useState(0);
  const [SelectedInfluencer, setSelectedInfluencer] = useState([]);
  const [step, setStep] = useState(0);
  const [query, setQuery] = useState<QueryData['query']>();
  const [budget, setBudget] = useState<any>();
  const [schedule, setSchedule] = useState<any>();
  const [phone, setPhone] = useState<any>();
  const [projectDescription, setProjectDescription] = useState<string>();
  const [queryTitle, setQueryTitle] = useState<string>();
  const [campaignQuery, setCampaignQuery] = useState<any>([]);
  const [showError, setShowError] = useState<boolean>();
  // const [isChecked, setIsChecked] = useState(false);
  const NextRef = useRef(null);
  const isHovered = useHover(NextRef);


  // token--------
  const {
    authenticationStore: { token },
  } = useStores()

  api.addAsyncRequestTransform(request => async () => { 
    request.headers["Authorization"] = "Bearer " + token;
  });


// console.log('query',query,'budget',budget,'schedule',schedule,'phone',phone,'projectDescription',projectDescription,'queryTitle',queryTitle);

  const onNextStep = () => {
    console.log("called next step")
  }

  const defaultScrollViewProps = {
    keyboardShouldPersistTaps: "handled",
    contentContainerStyle: {
      flex: 1,
      justifyContent: "center",
    },
  }

  const progressStepsStyle = {
    borderWidth:0.5,
    activeStepIconBorderColor: "green",
    activeStepNumColor: "white",
    activeStepIconColor: "green",
    completedStepIconColor: "green",
    completedProgressBarColor: "green",
    completedCheckColor: "white",
    marginBottom: 0,
    topOffset: 0,
    
  }

  const dimension = useBreakpointValue({
    base : true,
    sm : true,
    md : false,
    lg : false,
    xl : false
  })

  const priceFilter = [
    "Under Rs. 1,000",
    "Rs. 1,000 - 2,000",
    "Rs. 2,000 - 5,000",
    "Rs. 5,000 - 10,000",
  ]


  const [filterCategories, setFilterCategories] = useState([
    "All",
    "Beauty",
    "Education",
    "Food",
    "Lifestyle",
    "Technology",
    "Fitness",
  ])


  const onSubmitSteps = () => {
    navigation.navigate("Home")
  }


  const getData = async () => {
    let selected_influencer = undefined;
    try {
      selected_influencer = await AsyncStorage.getItem('selected_influencer')
     setSelectedInfluencer([...selected_influencer != null ? JSON.parse(selected_influencer) : null])
      return selected_influencer != null ? JSON.parse(selected_influencer) : null
    } catch(e) {
      // error reading value
      console.log('selected_influencer data not found in local host');
    }
  
  }
  
  const storeCampaignQuery = async (query) => {
    // console.log('data stored', query);
    if(campaignQuery != undefined){
      console.log(' not undefined')
      try {
        const jsonValue = JSON.stringify([query,...campaignQuery])
        await AsyncStorage.setItem('campaign_query', jsonValue)
      } catch (e) {
        // saving error
      }
    }else{
      console.log('undefined')
      try {
        const jsonValue = JSON.stringify([query])
        await AsyncStorage.setItem('campaign_query', jsonValue)
      } catch (e) {
        // saving error
      }
    }

  }

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

  useEffect(()=>{getData();getCampaignQuery();},[]);
  // console.log('SelectedInfluencer', SelectedInfluencer);

  useEffect(()=>{
    storeCampaignQuery(query);
    query &&  getCampaignQuery(); console.log('getCampaignQuery called')   
    },[query]);


  const FilterCategories = () => {
      return (
        <>
         <Checkbox.Group colorScheme="green" accessibilityLabel="pick an item" 
         onChange={values => {
          // setSelectedCategories([...values]); 
          console.log(values);}}>
            {filterCategories.map((category, i) => (
                <HStack key={`selct_${i}`} style={{padding: 5, paddingBottom: 0}}>
                  <Checkbox aria-label="input" colorScheme="blue" value={category} style={{margin: 5, borderRadius: 0}}>{category}</Checkbox>
                  {/* <Checkbox colorScheme="blue" value="a" style={{margin: 5, borderRadius: 0}} onChange={(e)=>{handlefilter(e , category)}}/> */}
                  {/* <Text style={{padding: 5}}>{category}</Text> */}
                  {/* <Checkbox isChecked={isCheckedBusiness} colorScheme="blue" value='a' onChange={()=>{setIsCheckedBusiness(!isCheckedBusiness); setIsCheckedInfluencer(!isCheckedInfluencer);}}/> */}
                </HStack>
             ))}
      </Checkbox.Group>
        </>
      )
    }

 const PriceFilters = () => {
    return (
      <>
          {priceFilter.map((price, i) => (
              <HStack style={{padding: 5, paddingBottom: 0}} key={`select2_${i}`}>
                <Text style={{padding: 5}}>{price}</Text>
              </HStack>
          ))}
      </>
    )
  }
 

  const InfluencerCard = () => {
    return (
      <>
      {console.log('SelectedInfluencer', SelectedInfluencer)}
          {SelectedInfluencer && SelectedInfluencer.map((influencer, i) => (
             <HStack overflow="hidden" 
            key={`select3_${i}`}
             width={{base:'95%' ,md: '32%' ,lg: '23.5%'}} 
             height={["100"]} 
             shadow="1"  
            //  bg={}  
             backgroundColor= {dimension ? 'white' : '#F5FBFF'}
             marginTop={4} marginRight={{base: 2 }} marginLeft={0}
             style={dimension &&  {shadowColor: "rgba(0, 0, 0, 0.2)",shadowOffset: {width: 0, height: 2},shadowOpacity: 0.9,shadowRadius: 10}}
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
                source={{uri: influencer && influencer.profile && influencer.profile.data && influencer.profile.data.facebook &&  influencer.profile.data.facebook.Image ? `${influencer.profile.data.facebook.Image}` : influencer && influencer.image }}
                // source={require("../../assets/images/backgrounds/Ellipse 2.png")}
                alt="image"
                // resizeMode="contain"
              />
              <VStack style={{marginLeft: useBreakpointValue({ base: 15, md : 5}), justifyContent: 'center'}}>
                <Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: useBreakpointValue({ base: 18, md: 13,lg: 14 }), lineHeight: useBreakpointValue({ base: 20, md: 17 ,lg: 18 }), color: '#444E53'}}>{influencer.first_name}</Text>
                <Text style={{fontFamily: 'Poppins_400Regular', fontSize: useBreakpointValue({ base: 18, md: 13,lg: 14 }), lineHeight: useBreakpointValue({ base: 20, md: 17 ,lg: 18 }), color: '#444E53'}}>{influencer.profile.data.category}</Text>
              </VStack>
              </HStack>
           ))} 
      </>
    )
  }



  console.log('campaignQuery : ' , campaignQuery);
  const [errors, setErrors] = useState({
    title:{
      status:false,
      message:""
    },
    budget:{
      status:false,
      message:""
    },
    schedule:{
      status:false,
      message:""
    },
    phone:{
      status:false,
      message:""
    },
    description:{
      status:false,
      message:""
    }
  })

  const resetField = () => {
    setErrors({
      title:{
        status:false,
        message:""
      },
      budget:{
        status:false,
        message:""
      },
      schedule:{
        status:false,
        message:""
      },
      phone:{
        status:false,
        message:""
      },
      description:{
        status:false,
        message:""
      }
    })
  }
  const validateForm = () => {   
    let temp = {}     
    if([undefined,""].includes(queryTitle)){
      temp["title"] ={
          status:true,
          message:"Name cannot be blank"
        }
    }
    if([undefined,""].includes(schedule)){
      temp["schedule"] ={
          status:true,
          message:"schedule cannot be blank"
        }
    }
    if([undefined,""].includes(budget)){
      temp["budget"] ={
          status:true,
          message:"schedule cannot be blank"
        }
    }
    if([undefined,"",0].includes(phone) || phone<=999999999){
      temp["phone"] ={
          status:true,
          message:"Invalid Phone Number"
        }
    }
    if([undefined,""].includes(projectDescription)){
      temp["description"] ={
          status:true,
          message:"Description cannot be blank"
        }
    }
    setErrors({
      ...errors,
      ...temp
    })
    if(Object.keys(temp).length===0){
      setStep(2)
    }
    // queryTitle === undefined || projectDescription === undefined || schedule === undefined || (phone === undefined || phone.toString().length<10) ? setShowError(true) : 
    // 
  }
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={[$root, {backgroundColor: dimension && 'white'}]} preset="scroll">
        <TopNavigation navigation={navigation} />
         <BottomNavigation navigation={navigation} />
        <Stack
          overflow="hidden"
          width={"6/6"}
          mt={{base: -10, lg: 0}}
        >
          <HStack style={{flex: 1}}>
          <Box style={{flex: 8, margin: 25, marginTop: useBreakpointValue({ base: 0, md: 25 })}}>
            <HStack style={{margin: 20 , marginTop: useBreakpointValue({ base: 0, md: 20 }), marginLeft: 0}}>
              <Pressable onPress={() => navigation.goBack()} flexDirection={'row'}>
                <Ionicons name="arrow-back" size={20} color="#203655" />
                
                <Text style={{fontFamily: 'Poppins_700Bold', fontSize: useBreakpointValue({ base: 19, md: 24 }), lineHeight: 29, color: '#203655'}}>
                {step === 0 ? 'Selected Influencer' : step === 1 ? 'Business Details' : 'Review' } 
                </Text>
              </Pressable>
            </HStack>
            <ProgressSteps activeStep={step} {...progressStepsStyle}>
            <ProgressStep
              onNext={onNextStep}
              scrollViewProps={defaultScrollViewProps}
              removeBtnRow={true}
            >
           
              <Text style={{fontFamily: 'Poppins_500Medium', fontSize: 18, lineHeight: 29, color: '#203655'}}>Influencer Summary</Text>
              <Box style={{flexWrap: 'wrap', flexDirection: 'row', alignContent: 'flex-start', marginLeft: -2}}>
                <InfluencerCard/>
              </Box>
              <HStack style={{marginTop: 30}}>
                <Button
                      borderRadius="full"
                      colorScheme="success"
                      onPress={() => navigation.goBack()}
                      bg="rgba(60, 167, 221, 1)"
                      w={{base:'100', md: '100'}}
                      h={'8'}
                      // justifyContent={''}
                      // alignSelf={useBreakpointValue({lg:'center'})}
                      fontSize={'12'}
                      
                    >
                      Back
                    </Button>
                    <Button
                    borderRadius="full"
                    borderWidth={1}
                    borderColor='rgba(60, 167, 221, 1)'
                    colorScheme='rgba(60, 167, 221, 1)'
                    _text={{
                      color: 'rgba(60, 167, 221, 1)'
                    }} 
                    _hover={{
                      _text: { color: 'white' },
                    }}
                    bg="rgba(60, 167, 221, 0)"
                    w={{base:'100', md: '100'}}
                    h={'8'}
                    // justifyContent={''}
                    // alignSelf={useBreakpointValue({lg:'center'})}
                    fontSize={'12'}
                    ml={'10'}
                    onPress={()=>{setStep(1)}}

                  >
                    Next
                    {/* <Text>
                      Next
                    </Text> */}
                  </Button>
              </HStack>
            </ProgressStep>
            {/* --------------second step-------------------------------- */}
            <ProgressStep
              onSubmit={onSubmitSteps}
              scrollViewProps={defaultScrollViewProps}
              previousBtnDisabled={true}
              removeBtnRow={true}
            >
              <Text mt={5} style={{fontFamily: 'Poppins_600SemiBold', fontSize: useBreakpointValue({ base: 17, md: 20 }), lineHeight: 29, color: '#354a66'}}>
                Fill Form
              </Text>                              
              <Box style={{flexWrap: 'wrap', flexDirection: 'row', alignContent: 'flex-start', justifyContent: 'space-between'}}>
                
                <FormControl isRequired isInvalid={errors.title.status} w={{base: "97%",md: "48%" ,lg: "24%"}} >
                  <FormControl.Label>Query Title</FormControl.Label>
                  <Input placeholder="Enter Campaign title" backgroundColor={'white'} value={queryTitle} h={'48px'}
                    InputRightElement={
                      <EvilIcons name="pencil" size={24} color="black" />
                    }
                    onFocus={resetField}
                    onChangeText={(text)=>{      
                      setQueryTitle(text)                                     
                    }}
                    />
                  <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.title.message}</FormControl.ErrorMessage>
                  </FormControl>
                
                <FormControl isInvalid={errors.budget.status} w={{base: "97%",md: "48%" ,lg: "24%"}} >
                  <FormControl.Label>Budget</FormControl.Label>
                  <Input placeholder="10,000"  backgroundColor={'white'} value={budget} h={'48px'}
                    InputRightElement={
                      <MaterialIcons name="attach-money" size={24} color="black" />
                    }
                    onFocus={resetField}
                    onChangeText={(text)=>{      
                      setBudget(Number(text))                                     
                    }}
                  />
                  <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.budget.message}</FormControl.ErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={errors.schedule.status} w={{base: "97%",md: "48%" ,lg: "24%"}}>
                  <FormControl.Label>Schedule</FormControl.Label>
                  <Input placeholder="Within Week"  backgroundColor={'white'} value={schedule} h={'48px'}
                    onFocus={resetField}
                    onChangeText={(text)=>{      
                      setSchedule(text)                                     
                    }}
                  />
                  <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.schedule.message}</FormControl.ErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={errors.phone.status} w={{base: "97%",md: "48%" ,lg: "24%"}} >
                  <FormControl.Label>Phone No.</FormControl.Label>
                  <Input placeholder="10-Digits" backgroundColor={'white'}
                   h={'48px'}
                    onFocus={resetField}
                    onChangeText={(text)=>{setPhone(Number(text))}} value={phone}
                    InputRightElement={
                      <MaterialIcons name="phone-android" size={24} color="black" />
                    }
                  />
                   <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.phone.message}</FormControl.ErrorMessage>
                </FormControl>

              </Box>
              <Box alignItems="center">
                <FormControl isInvalid={errors.description.status} w={{base: "100%"}} alignItems="center">
                  <FormControl.Label isRequired alignSelf="start"> Project Descriptions</FormControl.Label>
                    <TextArea isRequired aria-label="input" h={100} placeholder="Text Area Placeholder" w={'100%'} autoCompleteType backgroundColor={'white'}
                    value={projectDescription}
                    onFocus={resetField}
                    onChangeText={(text)=>{
                      setProjectDescription(text)
                    }}
                    />
                  <FormControl.ErrorMessage alignSelf="flex-start" leftIcon={<WarningOutlineIcon size="xs" />}>{errors.description.message}</FormControl.ErrorMessage>
                </FormControl>
              </Box>

              <Button
                  // isDisabled = {queryTitle === undefined && projectDescription === undefined && schedule === undefined ?  true : false }
                  borderRadius="full"
                  colorScheme="success"
                  onPress={validateForm}
                  bg="rgba(60, 167, 221, 1)"
                  w={{base:'100', md: '100'}}
                  h={'8'}
                  fontSize={'12'}
                  mt={'5'}
                >
                  Next
              </Button>
            </ProgressStep>
             {/* --------------third step-------------------------------- */}

              <ProgressStep
              onSubmit={onSubmitSteps}
              scrollViewProps={defaultScrollViewProps}
              previousBtnDisabled={true}
              removeBtnRow={true}
              >
              <Text style={{fontFamily: 'Poppins_500Medium', fontSize: 18, lineHeight: 29, color: '#203655'}}>Review Influencer & Details</Text>
              <Box style={{flexWrap: 'wrap', flexDirection: 'row', alignContent: 'flex-start', padding: 5,}}>
                <InfluencerCard/>
              </Box>
              <Box style={{flexWrap: 'wrap', flexDirection: 'row', alignContent: 'flex-start', justifyContent: 'space-between'}}>
                
                <FormControl isRequired isInvalid w={{base: "97%",md: "48%" ,lg: "24%"}}>
                  <FormControl.Label>Query Title</FormControl.Label>
                  <Input h={'48px'} isDisabled placeholder="Enter Campaign title" backgroundColor={'white'} value={queryTitle}
                    InputRightElement={
                      <EvilIcons name="pencil" size={24} color="black" />
                     
                    }
                   
                    onChangeText={(text)=>{      
                      setQueryTitle(text)                                     
                    }}
                    />
                  { showError &&  <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    This field may not be blank.
                  </FormControl.ErrorMessage>}
                  </FormControl>
                
                <FormControl isInvalid w={{base: "97%",md: "48%" ,lg: "24%"}}>
                  <FormControl.Label>Budget</FormControl.Label>
                  <Input h={'48px'} isDisabled placeholder="10,000"  backgroundColor={'white'} value={budget}
                    InputRightElement={
                      <MaterialIcons name="attach-money" size={24} color="black" />
                     
                    }
                    onChangeText={(text)=>{      
                      setBudget(Number(text))                                     
                    }}
                  />
                </FormControl>
                <FormControl isRequired isInvalid w={{base: "97%",md: "48%" ,lg: "24%"}}>
                  <FormControl.Label>Schedule</FormControl.Label>
                  <Input h={'48px'} isDisabled placeholder="Within Week"  backgroundColor={'white'} value={schedule}
                    
                    onChangeText={(text)=>{      
                      setSchedule(text)                                     
                    }}
                  />
                  { showError &&  <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    This field may not be blank.
                  </FormControl.ErrorMessage>}
                </FormControl>
                <FormControl isRequired isInvalid w={{base: "97%",md: "48%" ,lg: "24%"}}>
                  <FormControl.Label>Phone No.</FormControl.Label>
                  <Input h={'48px'} isDisabled placeholder="9876543210" backgroundColor={'white'} 
                  onChangeText={(text)=>{setPhone(Number(text))}} value={phone}
                  InputRightElement={
                    <MaterialIcons name="phone-android" size={24} color="black" />
                  }
                  />
                   { showError &&  <FormControl.ErrorMessage alignSelf="start" ml={'7'} leftIcon={<WarningOutlineIcon size="xs" />}>
                    This field may not be blank.
                  </FormControl.ErrorMessage>}
                </FormControl>

              </Box>
              <Box alignItems="center">
                <FormControl w={'100%'} isInvalid alignItems="center">
                  <FormControl.Label isRequired alignSelf="start"> Project Descriptions</FormControl.Label>
                    <TextArea isDisabled isRequired aria-label="input" h={100} placeholder="Text Area Placeholder" w={'100%'} autoCompleteType backgroundColor={'white'}
                    value={projectDescription}
                    onChangeText={(text)=>{
                      setProjectDescription(text)
                    }}
                    />
                  { showError &&  <FormControl.ErrorMessage alignSelf="start"  leftIcon={<WarningOutlineIcon size="xs" />}>
                    This field may not be blank.
                  </FormControl.ErrorMessage>}
                </FormControl>
              </Box>

              <HStack mt={5}>
                    <Button
                    borderRadius="full"
                    borderWidth={1}
                    borderColor='rgba(60, 167, 221, 1)'
                    colorScheme="rgba(60, 167, 221, 1)"
                    bg="rgba(60, 167, 221, 0)"
                    w={{base:'100', md: '100'}}
                    h={'8'}
                    fontSize={'12'}
                    
                    onPress={()=>{setStep(1)}}
                  >
                    <Text style={{color: 'rgba(60, 167, 221, 1)'}}>
                      Back
                    </Text>
                  </Button>
                  <Button
                      borderRadius="full"
                      colorScheme="success"
                      bg="rgba(60, 167, 221, 1)"
                      w={{base:'100', md: '100'}}
                      h={'8'}
                      fontSize={'12'}
                      ml={'10'}
                      onPress={()=>{
                        setQuery({
                          'id' : 1,
                          "selection" : SelectedInfluencer, 
                          'budget': budget, 
                          'schedule': schedule, 
                          'phone' : phone, 
                          'projectDescription' : projectDescription,
                          'queryTitle' : queryTitle
                        }); 
                        storeCampaignQuery(query);
                        api.post('/api/influencerQueries/', 
                        {
                          title: queryTitle,
                          selection: SelectedInfluencer,
                          job_description: projectDescription,
                          when: schedule,
                          budget: budget,
                          mobile: phone,
                          conversation: null,
                      }).then((res)=>console.log(res)).catch((error)=> console.log(error));
                        navigation.navigate('Campaign Queries');}}
                    >
                      Submit
                    </Button>
              </HStack>             
              </ProgressStep>
            </ProgressSteps>
          </Box>
          </HStack>
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

const $textField: ViewStyle = {
  // marginBottom: ,
  flexBasis: "auto",
  width: '93s%',
  alignSelf: 'center'
}