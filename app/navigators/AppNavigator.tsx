/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigatorScreenParams, // @demo remove-current-line
  useNavigation,
  useNavigationContainerRef,
} from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { useEffect, useState } from "react"
import { Image, useColorScheme, Platform, TouchableOpacity } from "react-native"
import Config from "../config"
import { useStores } from "../models" // @demo remove-current-line
import {
  AddBlogsScreen,
  AddInfluencerFormScreen,
  AddInfluencerScreen,
  AdminDashboardScreen,
  AllQueriesScreen,
  AllusersListScreen,
  BlogDetailScreen,
  BlogsScreenMain,
  BusinessDetailScreen,
  CampaignQueriesScreen,
  CampaignQueryDetailScreen,
  FindBusinessScreen,
  FindInfluencerScreen,
  HowItWorksScreen,
  IndividualQueryScreen,
  LoginScreen,
  OtpScreen,
  PageNotFoundScreen,
  ProfileDetailScreen,
  SelectedInfluencerScreen,
  SignUpCategoryScreen,
  SignUpScreen,
  SocialLoginTestScreen,
  SummaryOfConversationScreen,
  SupportScreen,
  UserPolicyScreen,
  UserProfileEditScreen,
  UserProfileScreen,
  UserRegistrationScreen, // @demo remove-current-line
  WelcomeScreen,
  WishlistScreen,
} from "../screens"
import { DemoNavigator, DemoTabParamList } from "./DemoNavigator" // @demo remove-current-line
import { useBackButtonHandler } from "./navigationUtilities"
// import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { AboutUsScreenMain } from "../screens/AboutUsScreen"
import { FaQsScreen } from "../screens/FaQsScreen"
import { ContactUsScreen } from "../screens/ContactUsScreen"
import { PrivacyPolicyScreen } from "../screens/PrivacyPolicyScreen"
import { TnCScreen } from "../screens/TnCScreen"
import { NativeBaseProvider, Menu, Pressable, View, Text, useBreakpointValue } from "native-base"
import { Button } from "../components"
import AppLoading from "expo-app-loading"
import {
  useFonts,
  Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black,
} from "@expo-google-fonts/poppins"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Ionicons from "@expo/vector-icons/Ionicons"
import { ApiResponse, create } from 'apisauce'
import AsyncStorage from "@react-native-async-storage/async-storage"


// define the api
const api = create({
  baseURL: Config.baseURL,
  headers: { Accept: 'application/json' },
})

export type AppStackParamList = {
  Welcome: undefined
  Signin: undefined 
  Signup: undefined 
  SignupCategory: undefined 
  Home: undefined 
  Blog: undefined 
  BlogDetail: undefined 
  "About Us": undefined 
  "FAQ's": undefined 
  "Contact Us": undefined 
  "Privacy Policy": undefined 
  "Terms & Conditions": undefined 
  "User Registration": undefined 
  "How It Works": undefined 
  "User Policy": undefined 
  "otp": undefined 
  "Find Influencer": undefined 
  "Selected Influencer": undefined 
  "login with google": undefined 
  "Campaign Queries": undefined
  "CampaignQueryDetail": undefined
  "ProfileDetail" : undefined
  Wishlist : undefined
  UserProfile : undefined
  UserProfileEdit : undefined
  pageNotFound : undefined
  // otpScreen: undefined 
  Demo: NavigatorScreenParams<DemoTabParamList> 
  // 🔥 Your screens go here

  BusinessDetail : undefined
  FindBusiness : undefined

  // admin-----
  AdminDashboard : undefined
  AllQueries : undefined
  IndividualQuery : undefined
  AddInfluencer : undefined
  AddInfluencerForm : undefined
  SummaryOfConversation : undefined
  AllusersList : undefined
  Support : undefined
  AddBlogs : undefined

}



/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

function LogoTitle(props: any) {
  return (
    <Image style={{ width: 160, height: 70 }} source={require("../../assets/images/logo_2x.png")} />
  )
}

export type AppStackScreenProps<T extends keyof AppStackParamList> = StackScreenProps<
  AppStackParamList,
  T
>
const Stack = createNativeStackNavigator<AppStackParamList>()
const Drawer = createDrawerNavigator()

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {

  const [userData, setUserData] = useState<any>([]);

  const colorScheme = useColorScheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))
  
 // bearer token--------
  const {
    authenticationStore: { isAuthenticated,  token  },
  } = useStores()

 

  api.addAsyncRequestTransform(request => async () => { 
    request.headers["Authorization"] = "Bearer " + token;
    console.log()
  });

 

  // const navigation = useNavigation<any>();
  const navigationRef = useNavigationContainerRef<any>()

  // const header_show_hide = useBreakpointValue({
  //   base: 280,
  //   sm: 290,
  //   md: 380,
  //   lg: 500,
  //   xl: 550,
  // })
  const drawer_show = useBreakpointValue({
    base: true,
    sm: true,
    md: true,
    lg: false,
    xl: false,
  })

  let [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,
  })

  useEffect(()=>{
    isAuthenticated && api.post('/dj-rest-auth/token/verify/', {
      token : token,
    }).then((res:ApiResponse<any,any>)=>{
      console.log(res);
      res.ok != true && navigationRef.navigate('Signin');
    }).catch((error)=> console.log(error));
    // navigation.navigate('Signin');}}

    //get user details---------->and save it to local storage----->
    isAuthenticated && api.get('/user').then((res)=>{setUserData(res?.data); console.log('## App navigation user api called ', res)})
    .catch((error)=>{console.log(error)});
  },[isAuthenticated])

  const storeLoggedInUserData = async (userData) => {
    try {
      const jsonValue = JSON.stringify(userData)
      await AsyncStorage.setItem('loggedIn_userDetails', jsonValue)
    } catch (e) {
      // saving error
    }
  }

  useEffect(()=>{
    
    storeLoggedInUserData(userData); 

  },[userData])


  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <NavigationContainer
        ref={navigationRef}
        theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        {...props}
      >
        <NativeBaseProvider>                  
            <Stack.Navigator
              screenOptions={{
                headerShown:false,
                headerStyle: {
                  backgroundColor: "#fff",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "bold",
                },                
              }}
              initialRouteName="Home" // @demo remove-current-line
            >
              <Stack.Screen name="Home" component={WelcomeScreen} />
              <Stack.Screen name="About Us" component={AboutUsScreenMain} />
              <Stack.Screen name="FAQ's" component={FaQsScreen} />
              <Stack.Screen name="Contact Us" component={ContactUsScreen} />
              <Stack.Screen name="Privacy Policy" component={PrivacyPolicyScreen} />
              <Stack.Screen name="Terms & Conditions" component={TnCScreen} />
              <Stack.Screen name="User Registration" component={UserRegistrationScreen} />
              <Stack.Screen name="How It Works" component={HowItWorksScreen} />
              <Stack.Screen name="User Policy" component={UserPolicyScreen} />
              <Stack.Screen name="Blog" component={BlogsScreenMain} />                           
              <Stack.Screen name="BlogDetail" component={BlogDetailScreen} />                           
              <Stack.Screen name="Signin" component={LoginScreen} />                           
              <Stack.Screen name="Signup" component={SignUpScreen} /> 
              <Stack.Screen name="otp" component={OtpScreen} /> 
              <Stack.Screen name="login with google" component={SocialLoginTestScreen} />
              <Stack.Screen name="pageNotFound" component={PageNotFoundScreen} />

              {isAuthenticated && 
                <>
                  <Stack.Screen name="Find Influencer" component={FindInfluencerScreen}/>
                  <Stack.Screen name="Selected Influencer" component={SelectedInfluencerScreen}/>
                  <Stack.Screen name="Campaign Queries" component={CampaignQueriesScreen}/>
                  <Stack.Screen name="CampaignQueryDetail" component={CampaignQueryDetailScreen}/>
                  <Stack.Screen name="Wishlist" component={WishlistScreen}/>
                  <Stack.Screen name="ProfileDetail" component={ProfileDetailScreen}/>  
                  <Stack.Screen name="UserProfile" component={UserProfileScreen}/>
                  <Stack.Screen name="UserProfileEdit" component={UserProfileEditScreen}/>

                 {/* Business routes */}
                 <Stack.Screen name="BusinessDetail" component={BusinessDetailScreen}/>
                 <Stack.Screen name="FindBusiness" component={FindBusinessScreen}/>

                  {/* admin routes  */}
                  {userData.is_staff && 
                    <>
                      <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen}/>
                      <Stack.Screen name="AllQueries" component={AllQueriesScreen}/>
                      <Stack.Screen name="IndividualQuery" component={IndividualQueryScreen}/>
                      <Stack.Screen name="AddInfluencer" component={AddInfluencerScreen}/>
                      <Stack.Screen name="AddInfluencerForm" component={AddInfluencerFormScreen}/>
                      <Stack.Screen name="SummaryOfConversation" component={SummaryOfConversationScreen}/>
                      <Stack.Screen name="AllusersList" component={AllusersListScreen}/>
                      <Stack.Screen name="Support" component={SupportScreen}/>
                      <Stack.Screen name="AddBlogs" component={AddBlogsScreen}/>
                    </>
                  }
                </>
              }
             
            </Stack.Navigator>             
        </NativeBaseProvider>
      </NavigationContainer>
    )
  }
})
