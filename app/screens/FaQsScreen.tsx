import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle, ImageBackground, Dimensions } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Screen, Text, Button } from "../components"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { ListItem } from "@rneui/themed"
import Icon from "react-native-vector-icons/MaterialIcons"
import Accordian from "../components/Accordian"
import Footer from "../components/Footer"
import { useBreakpointValue } from "native-base"
import { BottomNavigation, TopNavigation } from "../navigators/Navigation"
import { useNavigation } from "@react-navigation/native"

// import { Icon } from "@rneui/base"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `PrivacyPolicy: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore

export const FaQsScreen: FC<StackScreenProps<AppStackScreenProps, "FAQs">> = observer(
  function FaQsScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()

    const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])
    const [expanded, setExpanded] = useState(false)
    const list = [
      {
        id: 0,
        ques: "What is influencer marketing?",
        ans: "Choosing influencer marketing to reach your target audience means putting your products or ideas into the hands of selected social media superstars or ‘influencers’ to help spread your message. It  involves influencers who promote a brand or product to a target or niche audience. The marketing strategy helps brands reach their end goals, like building brand awareness, increasing sales, inviting traffic and leads, and more.",
      },
      {
        id: 1,
        ques: "What is content creation?",
        ans: "Influencers who have worked to grow their own audience do this by becoming very good at creating content that people will respond to. Another technique that you can choose to engage your audience is having custom content created which you then publish across your own networks.",
      },
      {
        id: 2,
        ques: "What are the key benefits of influencer marketing?",
        ans: "A 2022 research shows that influencer marketing is practiced by more than 75% of marketers who believe it is more effective than other marketing methods. It helps you:",
        isbullets: [
          "• Increase engagement on social media ",
          "• Improve sales and conversions ",
          "• Attain warmer leads ",
          "• Improve the return on investment",
          "• Build authentic relationships with the audience ",
          "• Win the audience/'s trust",
          "• Acquire loyal fans for your business",
        ],
      },
      {
        id: 3,
        ques: "Is influencer marketing affordable for small businesses?",
        ans: "Influencer marketing is a strategy that can be adopted by every type of business, whether you're a multinational corporation or a startup with a small budget. The cost of your campaign depends on the type of influencer you choose to collaborate with. If you partner with micro and nano influencers like gamers, photographers, videographers, bloggers, etc., you can generate more engagement and loyalty for your product at less cost. Some may even promote branded content for rewards, free products, or event invites.",
      },
      {
        id: 4,
        ques: "What do you need to consider to begin influencer marketing?",
        ans: "To begin influencer marketing, the most important thing is to match influencers with your message. SocioFusion works personally with influencers to make sure that campaigns are built from influencers who are a good fit for the message. The influencers that we work with go through an extensive vetting process before being accepted.",
      },
      {
        id: 5,
        ques: "What kinds of brands can use influencer marketing?",
        ans: "Influencer marketing is a great match for all kinds of brands simply because there are so many different influencers out there. Whether your brand is a social cause, a consumer product or a B2B, there will be a group of influencers with an audience ready for your message. See brands SocioFusion has worked with",
      },
      {
        id: 6,
        ques: "What are the alternatives to running an influencer campaign?",
        ans: "The influencer marketing landscape has become a lot more sophisticated in the last five years. In the past, brands could reach out to influencers directly and this would sometimes result in product placement or endorsement. Professional influencers will now look to work with talent managers and agencies like SocioFusion who will help them to leverage their audience in a meaningful way, while taking care of complex campaign elements like rights management and content reuse arrangement. The way that brands use social media has also evolved. Rather than using platforms to make updates, savvy brands are using them to engage their audience and have a conversation. But this only allows brands to reach out to their existing audience. Influencer marketing means that the campaign reach is the combined audience of every influencer that is selected.",
      },
      {
        id: 7,
        ques: "How can agencies create influencer marketing campaigns?",
        ans: "SocioFusion is India’s leading digital agency for influencer marketing, content, social media and data. Agencies can partner with SocioFusion to offer influencer marketing to clients. This means collaborating to build a brief and decide on a budget, and SocioFusion identifying influencers who are appropriate for the brand and campaign goals, considering factors like core audience, location, platform and existing brand affiliations. Learn more about running campaigns with SocioFusion",
      },
      {
        id: 8,
        ques: "What campaign elements can SocioFusion influencers contribute?",
        ans: "As well as running an end to end influencer marketing campaign for agency clients, SocioFusion also works with content creators, who can craft bespoke social media content for clients across platforms. This gives agencies more flexibility in suggesting social media solutions to clients at varying price points.",
      },
      {
        id: 9,
        ques: "Can I repurpose influencer campaign content for other channels?",
        ans: "In a SocioFusion brief, content usage is negotiated at the beginning of the campaign development process. Influencer content is briefed with the overall marketing mix in mind. If a campaign or project requires use of existing content, we can negotiate rights.  ",
      },
      {
        id: 10,
        ques: "Can I license existing influencer content for my brand?",
        ans: "Maybe you have a site to populate, or social channels to fill, or want images that use real people instead of stock images. In these cases, our exclusive library of existing social content, images and videos, can be a simple and cost-effective solution.",
      },
      {
        id: 11,
        ques: "What’s the best way to become a social media influencer?",
        ans: "Being a social media influencer can be a great way to create an income stream while doing something that you love. Once you have built an audience and refined your style, the next step is building brand partnerships. Working with an agency like SocioFusion means that you can preserve your authentic voice while working with brands that meet your style, outlook and values.  ",
      },
      {
        id: 12,
        ques: "What’s the difference between an influencer and a content creator?",
        ans: "You can apply to work with SocioFusion as either an influencer or a content creator. Generally, an influencer has a larger and more established audience, with the ability to clearly define demographics and core areas of influencer. This means that we can better match them with the brands that suit their audience. A content creator might be a bit earlier in their career as an influencer. Applying to work as a content creator means that you can use your expertise in creating images, video or other types of posts, for different brands.  ",
      },
      {
        id: 13,
        ques: "How many types of influencers are there?",
        ans: "Influencers can be divided into categories based on their level of expertise, niche, follower count, location, and more. ",
        isbullets: [
          "• Nano influencers: 1K to 10K followers ",
          "• Micro-influencers: 10K to 50K followers",
          "• Mid-tier influencers: 50K to 500K",
          "• Macro influencers: 500K to 1M followers",
          "• Mega or celebrity influencers: Above 1M followers",
          "• Mega or celebrity influencers: Above 1M followers",
        ],
      },
      {
        id: 14,
        ques: "Is influencer marketing effective?",
        ans: "Absolutely! Influencer marketing is an effective strategy used by more than 70% of marketers today. Consumers trust influencer recommendations and follow them to get information on new products, learn tips and tricks about a subject, and more.",
      },
    ]

    const font_size = useBreakpointValue({
      base: 17,
      sm: 20,
      md: 24,
      lg: 38,
      xl: 40,
    })

    // const line_height = useBreakpointValue({
    //   base: 350,
    //   sm: 400,
    //   md: 28.8,
    //   lg: 250,
    //   xl: 350
    // })
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
                Frequently Asked Question
              </Text>
            </View>
          </ImageBackground>
          <View style={{ margin: windowWidth * 0.02, padding: windowWidth * 0.03 }}>
            {list.map((l, i) => (
              <Accordian
                title={l.ques}
                data={l.ans}
                isbullets={l.isbullets}
                key={`accr_${i}`}
              />
            ))}
          </View>
        </View>

        <View style={{ flex: 5, backgroundColor: "white", flexBasis: "auto" }}>
          <Footer />
        </View>
      </Screen>
    )
  },
)

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
