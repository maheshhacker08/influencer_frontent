// ---
// patch:
//   path: "app/screens/index.ts"
//   append: "export * from \"./PrivacyPolicyScreen\"\n"
//   skip:
// ---
import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, ImageBackground, Dimensions } from "react-native"
import { useStores } from "../models"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Screen, Text, Button } from "../components"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import Footer from "../components/Footer"
import { useBreakpointValue } from "native-base"
import { BottomNavigation, TopNavigation } from "../navigators/Navigation"
import { useNavigation } from "@react-navigation/native"

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `PrivacyPolicy: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const PrivacyPolicyScreen: FC<StackScreenProps<AppStackScreenProps, "PrivacyPolicy">> =
  observer(function PrivacyPolicyScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()
    const {
      authenticationStore: { logout },
    } = useStores()

    const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])
    const font_size = useBreakpointValue({
      base: 20,
      sm: 20,
      md: 24,
      lg: 38,
      xl: 40,
    })

    const navigation = useNavigation<any>()
    return (
      <Screen style={{ flex: 1 }} preset="scroll">
        <TopNavigation navigation={navigation} />
        <BottomNavigation navigation={navigation} />
        <View style={{ flex: 11, margin: windowWidth * 0.01, flexBasis: "auto" }}>
          <ImageBackground
            source={require("../../assets/images/backgrounds/Upper Layer.png")}
            resizeMode="stretch"
            style={{ margin: -15 }}
          >
            <View
              style={{ alignItems: "center", justifyContent: "center", margin: 50, padding: 50 }}
            >
              <Text
                style={{
                  fontFamily: "Poppins_700Bold",
                  fontSize: font_size,
                  lineHeight: 48,
                  color: "#062249",
                }}
              >
                Privacy Policy
              </Text>
            </View>
          </ImageBackground>
          <View
            style={{
              backgroundColor: "rgba(255,255,255, 0.6)",
              margin: windowWidth * 0.02,
              padding: windowWidth * 0.03,
            }}
          >
            {/* <Text preset="subheading">Privacy Policy</Text> */}
            <Text
              preset="subheading"
              style={{
                fontFamily: "Poppins_700Bold",
                fontSize: 15,
                lineHeight: 21,
                color: "#272626",
              }}
            >
              Last updated: Dec 18, 2022
            </Text>
            <Text
              preset="default"
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                lineHeight: 21,
                color: "#545454",
              }}
            >
              The SocioFusion (“us”, “we”, or “our”) operates the The SocioFusion website (the
              “Service”).
            </Text>
            <Text
              preset="default"
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                lineHeight: 21,
                color: "#545454",
              }}
            >
              This page informs you of our policies regarding the collection, use and disclosure of
              Personal Information when you use our Service.
            </Text>
            <Text
              preset="default"
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                lineHeight: 21,
                color: "#545454",
              }}
            >
              We will not use or share your information with anyone except as described in this
              Privacy Policy.
            </Text>
            <Text
              preset="default"
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                lineHeight: 21,
                color: "#545454",
              }}
            >
              We use your Personal Information for providing and improving the Service. By using the
              Service, you agree to the collection and use of information in accordance with this
              policy. Unless otherwise defined in this Privacy Policy, terms used in this Privacy
              Policy have the same meanings as in our Terms and Conditions, accessible at
              https://Sociofusion.com
            </Text>
            <Text
              preset="default"
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                lineHeight: 21,
                color: "#545454",
              }}
            >
              Information Collection & Use
            </Text>
            <Text
              preset="default"
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                lineHeight: 21,
                color: "#545454",
              }}
            >
              While using our Service, we may ask you to provide us with certain personally
              identifiable information that can be used to contact or identify you. Personally
              identifiable information (“Personal Information”) is any information that you provided
              to us by you during your account creation process or added to your user profile, It
              may include, but is not limited to:
            </Text>
            <Text
              preset="subheading"
              style={{
                fontFamily: "Poppins_700Bold",
                fontSize: 15,
                lineHeight: 21,
                color: "#272626",
              }}
            >
              Name
            </Text>
            <Text
              preset="subheading"
              style={{
                fontFamily: "Poppins_700Bold",
                fontSize: 15,
                lineHeight: 21,
                color: "#272626",
              }}
            >
              Email address
            </Text>
            <Text
              preset="subheading"
              style={{
                fontFamily: "Poppins_700Bold",
                fontSize: 15,
                lineHeight: 21,
                color: "#272626",
              }}
            >
              Telephone number
            </Text>
            <Text
              preset="subheading"
              style={{
                fontFamily: "Poppins_700Bold",
                fontSize: 15,
                lineHeight: 21,
                color: "#272626",
              }}
            >
              Date of Birth
            </Text>
            <Text preset="formLabel">Personal information Collection</Text>
            <Text
              preset="default"
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                lineHeight: 21,
                color: "#545454",
              }}
            >
              At this site, we only collect personal information that is necessary for us to conduct
              our business as the provider of the leading marketing platform known as "SocioFusion",
              which includes (without limitation) enabling users to:
            </Text>
            <Text
              preset="default"
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                lineHeight: 21,
                color: "#545454",
              }}
            >
              Carry out promotional, advertising and marketing related activities;
            </Text>
            <Text
              preset="default"
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                lineHeight: 21,
                color: "#545454",
              }}
            >
              Contact and enable third parties to contact users; and
            </Text>
            <Text
              preset="subheading"
              style={{
                fontFamily: "Poppins_700Bold",
                fontSize: 15,
                lineHeight: 21,
                color: "#272626",
              }}
            >
              Log Data
            </Text>
            <Text
              preset="default"
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                lineHeight: 21,
                color: "#545454",
              }}
            >
              We collect information that your browser sends whenever you visit our Service (“Log
              Data”). This Log Data may include information such as your computer’s Internet
              Protocol (“IP”) address, browser type, browser version, the pages of our Service that
              you visit, the time and date of your visit, the time spent on those pages and other
              statistics.
            </Text>
            <Text
              preset="subheading"
              style={{
                fontFamily: "Poppins_700Bold",
                fontSize: 15,
                lineHeight: 21,
                color: "#272626",
              }}
            >
              Cookies
            </Text>
            <Text
              preset="default"
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                lineHeight: 21,
                color: "#545454",
              }}
            >
              Cookies are files with small amount of data, which may include an anonymous unique
              identifier. Cookies are sent to your browser from a web site and stored on your
              computer’s hard drive.
            </Text>
            <Text
              preset="default"
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                lineHeight: 21,
                color: "#545454",
              }}
            >
              We use “cookies” to collect information. You can instruct your browser to refuse all
              cookies or to indicate when a cookie is being sent. However, if you do not accept
              cookies, you may not be able to use some portions of our Service.
            </Text>
            <Text
              preset="subheading"
              style={{
                fontFamily: "Poppins_700Bold",
                fontSize: 15,
                lineHeight: 21,
                color: "#272626",
              }}
            >
              Service Providers
            </Text>
            <Text
              preset="default"
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                lineHeight: 21,
                color: "#545454",
              }}
            >
              We may employ third party companies and individuals to facilitate our Service, to
              provide the Service on our behalf, to perform Service-related services or to assist us
              in analysing how our Service is used.
            </Text>
            <Text
              preset="default"
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                lineHeight: 21,
                color: "#545454",
              }}
            >
              These third parties have access to your Personal Information only to perform these
              tasks on our behalf and are obligated not to disclose or use it for any other purpose.
            </Text>
            <Text
              preset="subheading"
              style={{
                fontFamily: "Poppins_700Bold",
                fontSize: 15,
                lineHeight: 21,
                color: "#272626",
              }}
            >
              Security
            </Text>
            <Text
              preset="default"
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                lineHeight: 21,
                color: "#545454",
              }}
            >
              The security of your Personal Information is important to us, but remember that no
              method of transmission over the Internet, or method of electronic storage is 100%
              secure. While we strive to use commercially acceptable means to protect your Personal
              Information, we cannot guarantee its absolute security.
            </Text>
            <Text
              preset="subheading"
              style={{
                fontFamily: "Poppins_700Bold",
                fontSize: 15,
                lineHeight: 21,
                color: "#272626",
              }}
            >
              Links To Other Sites
            </Text>
            <Text
              preset="default"
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                lineHeight: 21,
                color: "#545454",
              }}
            >
              Our Service may contain links to other sites that are not operated by us. If you click
              on a third party link, you will be directed to that third party’s site. We strongly
              advise you to review the Privacy Policy of every site you visit.
            </Text>
            <Text
              preset="default"
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                lineHeight: 21,
                color: "#545454",
              }}
            >
              We have no control over, and assume no responsibility for the content, privacy
              policies or practices of any third party sites or services.
            </Text>
            <Text
              preset="subheading"
              style={{
                fontFamily: "Poppins_700Bold",
                fontSize: 15,
                lineHeight: 21,
                color: "#272626",
              }}
            >
              Children’s Privacy
            </Text>
            <Text
              preset="default"
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                lineHeight: 21,
                color: "#545454",
              }}
            >
              Our Service does not address anyone under the age of 18 (“Children”).
            </Text>
            <Text
              preset="default"
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                lineHeight: 21,
                color: "#545454",
              }}
            >
              We do not knowingly collect personally identifiable information from children under
              18. If you are a parent or guardian and you are aware that your child has provided us
              with Personal Information, please contact us. If we discover that a child under 18 has
              provided us with Personal Information, we will delete such information from our
              servers immediately.
            </Text>
            <Text
              preset="subheading"
              style={{
                fontFamily: "Poppins_700Bold",
                fontSize: 15,
                lineHeight: 21,
                color: "#272626",
              }}
            >
              Compliance With Laws
            </Text>
            <Text
              preset="default"
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                lineHeight: 21,
                color: "#545454",
              }}
            >
              We will disclose your Personal Information where required to do so by law.
            </Text>
            <Text
              preset="subheading"
              style={{
                fontFamily: "Poppins_700Bold",
                fontSize: 15,
                lineHeight: 21,
                color: "#272626",
              }}
            >
              Changes To This Privacy Policy
            </Text>
            <Text
              preset="default"
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                lineHeight: 21,
                color: "#545454",
              }}
            >
              We may update our Privacy Policy from time to time. We will notify you of any changes
              by posting the new Privacy Policy on this page.
            </Text>
            <Text
              preset="default"
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                lineHeight: 21,
                color: "#545454",
              }}
            >
              You are advised to review this Privacy Policy periodically for any changes. Changes to
              this Privacy Policy are effective when they are posted on this page.
            </Text>
            <Text
              preset="subheading"
              style={{
                fontFamily: "Poppins_700Bold",
                fontSize: 15,
                lineHeight: 21,
                color: "#272626",
              }}
            >
              Contact Us
            </Text>
            <Text
              preset="default"
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                lineHeight: 21,
                color: "#545454",
              }}
            >
              If you have any questions about this Privacy Policy, please contact us at
              admin@sociofusion.com
            </Text>
          </View>
        </View>

        <View style={{ flex: 5, backgroundColor: "white", flexBasis: "auto" }}>
          <Footer />
        </View>
      </Screen>
    )
  })

// const $screenContentContainer: ViewStyle = {
//   paddingVertical: spacing.huge,
//   paddingHorizontal: spacing.large,
// }

const $root: ViewStyle = {
  flex: 1,
}

const $container: ViewStyle = {
  flex: 1,
  // height: '150%'
}

const $image: ViewStyle = {
  flex: 10,
  // height: 1800
}

const $footer_container: ViewStyle = {
  flex: 3,
  // minHeight: 0
}

const $heading_container: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",

  // backgroundColor: colors.background,
}

const $content_container: ViewStyle = {
  flex: 9,
  marginLeft: 10,
  marginBottom: 60,
}
