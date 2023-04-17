import { observer } from "mobx-react-lite"
import React, { useRef, useState } from "react"
import { Image, ImageBackground, Dimensions } from "react-native"
import { Text } from "../components"
import { useStores } from "../models" // @demo remove-current-line
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/native"
import {
  View,
  useBreakpointValue,
  Input,
  Box,
  Stack,
  VStack,
  HStack,
  Button,
  Link,
  Pressable,
} from "native-base"
import { create } from 'apisauce'
import { useToast } from 'native-base';
import { useHover } from 'react-native-web-hooks';
import Config from "../config"

// define the api
const api = create({
  baseURL: Config.baseURL,
  headers: { Accept: 'application/json' },
})

const windowWidth = Dimensions.get("window").width

const Footer = observer(function Footer(
  _props, // @demo remove-current-line
) {
  // @demo remove-block-start
  const {
    authenticationStore: { logout },
  } = useStores()

  const navigation = useNavigation<any>()
  const [email, setEmail] = useState('')
  const [submitMessage, setSubmitMessage] = useState(false)
  const toast = useToast();
  // Pass that ref to the hooks...
  const aboutRef = useRef(null);
  const termRef = useRef(null);
  const privaceRef = useRef(null);
  const faqRef = useRef(null);
  const isHovered = useHover(aboutRef);
  const ternIsHovered = useHover(termRef);
  const privacyIsHovered = useHover(privaceRef);
  const faqIsHovered = useHover(faqRef);

  // function goNext() {
  //   navigation.navigate("Demo", { screen: "DemoShowroom" })
  // }

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  const companyInfo_show = useBreakpointValue({
    base: false,
    sm: false,
    md: false,
    lg: true,
    xl: true,
  })
  const flexDir = useBreakpointValue({
    base: "column",
    sm: "column",
    md: "column",
    lg: "row",
    xl: "row",
  })
  const flexDir_mobile = useBreakpointValue({
    base: "column",
    sm: "column",
    md: "row",
    lg: "row",
    xl: "row",
  })
  const alignSelf = useBreakpointValue({
    base: "left",
    sm: "left",
    md: "left",
    lg: "center",
    xl: "center",
  })
  const icon_margin = useBreakpointValue({
    base: 3,
    sm: 3,
    md: 4,
    lg: 5,
    xl: 5,
  })

  return (
    <ImageBackground
      source={require("../../assets/images/backgrounds/footer_background.png")}
      resizeMode="stretch"
    >
      <Stack space={3}>
        <Stack
          direction={useBreakpointValue({ base: "column", lg: "row" })}
          mx={10}
          space={4}
          mt={50}
        >
          <VStack width={useBreakpointValue({ base: "100%", lg: "40%" })} space={3}>
            <Image
              style={{ width: 150, height: 60 }}
              source={require("../../assets/images/logo_2x.png")}
            />
            <Text preset="body">
            Your technology-driven partner with expertise in public relations, social media, digital marketing, influencer relations, branding and creative execution. We run successful campaigns for clients in all sectors.
            </Text>
          </VStack>
          <VStack width={useBreakpointValue({ base: "100%", lg: "20%" })} space={3}>
            <Text preset="subheading" style={{ color: "#203655" }}>
              Company
            </Text>
            <Pressable
              onPress={() => {
                navigation.navigate("About Us")
              }}
              ref={aboutRef}
            >
              <Text preset="body" style={[isHovered && {color: '#203655', textDecorationLine: 'underline'}] }>About</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                navigation.navigate("Terms & Conditions")
              }}
              ref={termRef}
            >
              <Text preset="body" style={[ternIsHovered && {color: '#203655', textDecorationLine: 'underline'}] }>User Terms & Condition</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                navigation.navigate("Privacy Policy")
              }}
              ref={privaceRef}
            >
              <Text preset="body" style={[privacyIsHovered && {color: '#203655', textDecorationLine: 'underline'}] }>Privacy Policy</Text>
            </Pressable>
          </VStack>
          <VStack width={useBreakpointValue({ base: "100%", lg: "15%" })} space={3}>
            <Text preset="subheading" style={{ color: "#203655" }}>
              Support
            </Text>
            <Pressable
              onPress={() => {
                navigation.navigate("FAQ's")
              }}
              ref={faqRef}
            >
              <Text preset="body" style={[faqIsHovered && {color: '#203655', textDecorationLine: 'underline'}] }>FAQ'S</Text>
            </Pressable>
          </VStack>
          <VStack width={useBreakpointValue({ base: "100%", lg: "25%" })} space={3}>
            <Text preset="subheading" style={{ color: "#203655" }}>
              Contact Us
            </Text>
            <HStack space={2}>
              <Image
                style={{ width: 25, height: 25, marginRight: 3 }}
                source={require("../../assets/images/backgrounds/Location_icon.png")}
              />
              <Link href="https://goo.gl/maps/qHvUPvC6f6Xfe6FA6" isExternal>
                <Text preset="body">
                  507-508, DP Metro <br/>
                  Near Vivek Vihar Metro Station <br/>
                  Rajasthan 302019
                </Text>
              </Link>
            </HStack>
            <HStack space={2}>
              <Image
                style={{ width: 25, height: 25, marginRight: 3 }}
                source={require("../../assets/images/backgrounds/Email_icon.png")}
              />
              <Link href="mailto://info@sociofusion.com">
                <Text preset="body">info@sociofusion.com</Text>
              </Link>
            </HStack>
            <HStack space={2}>
              <Image
                style={{ width: 25, height: 25, marginRight: 3 }}
                source={require("../../assets/images/backgrounds/Contact_icon.png")}
              />
              <Link href="tel://+919829268800">
                <Text preset="body">+91-9829-268-800</Text>
              </Link>
            </HStack>
          </VStack>
        </Stack>
        <Stack direction={useBreakpointValue({ base: "column", lg: "row" })} mx={10} space={4}>
          <VStack space={3} width={useBreakpointValue({ base: "100%", lg: "40%" })}>
            <Text preset="subheading" style={{ color: "#203655" }}>
              Social Media
            </Text>
            <HStack>
              <Link href="https://facebook.com" isExternal>
                <Image
                  style={{ width: 50, height: 50, marginRight: icon_margin }}
                  source={require("../../assets/images/FB.png")}
                />
              </Link>
              <Link href="https://instagram.com" isExternal>
                <Image
                  style={{ width: 50, height: 50, marginRight: icon_margin }}
                  source={require("../../assets/images/Instagram.png")}
                />
              </Link>
              <Link href="https://youtube.com" isExternal>
                <Image
                  style={{ width: 50, height: 50, marginRight: icon_margin }}
                  source={require("../../assets/images/YouTube.png")}
                />
              </Link>
              <Link href="https://telegram.com" isExternal>
                <Image
                  style={{ width: 50, height: 50, marginRight: icon_margin }}
                  source={require("../../assets/images/Tele.png")}
                />
              </Link>
              <Link href="https://twitter.com" isExternal>
                <Image
                  style={{ width: 50, height: 50, marginRight: icon_margin }}
                  source={require("../../assets/images/Twitter.png")}
                />
              </Link>
            </HStack>
          </VStack>
          {/* subscribe in the footer design */}
          {/* <View
            width={useBreakpointValue({base:"100%", lg:"60%"})}
            style={{
              flex: 2,
              flexDirection: flexDir,
              flexBasis: "auto",
              padding: 10,
              backgroundColor: "#D6E5F9",
            }}

          >
            <Stack
              direction={useBreakpointValue({ base: "column", md: "row" })}
              space={useBreakpointValue({ base: 5, md: 10 })}              
              alignItems={useBreakpointValue({base:"left",md:"center"})}
            >
              <VStack space={2} width={useBreakpointValue({ base: "100%", md: "40%" })}>
                <Text preset="subheading" style={{ color: "#203655" }}>
                  Subscribe
                </Text>
                <Text preset="body" style={{ width: "100%" }}>
                  Subscribe to our newsletter to keep you up to date.
                </Text>
              </VStack>
             
              <Input
                placeholder="Enter Email"
                height={45}
                borderRadius="4"
                px="1"
                fontSize="14"
                bg="#FFF"
                width={useBreakpointValue({ base: "100%", md: "45%" })}
                onChangeText={(value)=>{setEmail(value)}}
                value={email}
                InputRightElement={
                  <Button
                    borderRadius="full"
                    colorScheme="success"
                    onPress={() => {  
                      api.post('/api/subscriber/', 
                          {
                            email: email,
                          }).then((res)=>{setSubmitMessage(true); 
                            res.ok && toast.show({
                            // title: "Thanks for Subscribing :)",
                            placement: "top",
                            render: () => {
                              return  <Box bg="green" px="2" py="1" rounded="sm" mb={5} style={{ backgroundColor: 'green' }}>
                                        <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 14, lineHeight: 21, color: 'white'}}> Thanks for Subscribing :) </Text> 
                                      </Box>;
                            }
                          }); console.log(res)
                          }).catch((error)=> console.log(error));
                        // console.log("User Subscribed")
                    }}
                    bg="#127AD0"
                  >
                    Subscribe
                  </Button>
                }
              />
            </Stack>
          </View> */}
        </Stack>
        <View
          mt={5}
          mb={useBreakpointValue({ base: 50, lg: 0 })}
          style={{
            flex: 1,
            flexDirection: "row",
            flexBasis: "auto",
            padding: windowWidth * 0.01,
            justifyContent: "center",
            borderTopWidth: 2,
            borderTopColor: "#D6D3D3",
          }}
        >
          <Text preset="body">©2022 sociofusion.com. All rights reserved.</Text>
        </View>
      </Stack>
    </ImageBackground>
  )
})

export default Footer
