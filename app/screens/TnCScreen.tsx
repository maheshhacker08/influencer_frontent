import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, ImageBackground, Dimensions } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Screen, Text, Button } from "../components"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import Footer from "../components/Footer"
import { View, useBreakpointValue } from "native-base"
import { useNavigation } from "@react-navigation/native"
import { BottomNavigation, TopNavigation } from "../navigators/Navigation"
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
export const TnCScreen: FC<StackScreenProps<AppStackScreenProps, "TnC">> = observer(
  function TnCScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    const navigation = useNavigation()
    const font_size = useBreakpointValue({
      base: 20,
      sm: 20,
      md: 24,
      lg: 38,
      xl: 40,
    })

    const subHeading_style = {
      fontFamily: "Poppins_700Bold",
      fontSize: 15,
      lineHeight: 21,
      color: "#272626",
    }
    const default_style = {
      fontFamily: "Poppins_400Regular",
      fontSize: 14,
      lineHeight: 21,
      color: "#545454",
    }
    const form_label = {
      fontFamily: "Poppins_400Regular",
      fontSize: 13,
      lineHeight: 21,
      color: "#545454",
    }

    const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

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
                User Terms & Condition
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
            <Text preset="subheading" style={subHeading_style}>
              1. Introduction
            </Text>
            <Text preset="default" style={default_style}>
              1.1 These terms and conditions shall govern your use of our website.
            </Text>
            <Text preset="default" style={default_style}>
              1.2 By using our website, you accept these terms and conditions in full; accordingly,
              if you disagree with these terms and conditions or any part of these terms and
              conditions, you must not use our website.
            </Text>
            <Text preset="default" style={default_style}>
              1.3 If you submit any material to our website or use any of our website services, we
              will ask you to expressly agree to these terms and conditions.
            </Text>
            <Text preset="default" style={default_style}>
              {" "}
              1.4 Our website uses cookies; by using our website or agreeing to these terms and
              conditions, you consent to our use of cookies in accordance with the terms of our
              privacy and cookies policy.
            </Text>
            <Text preset="subheading" style={subHeading_style}>
              2. Copyright notice
            </Text>
            <Text preset="default" style={default_style}>
              2.1 Copyright (c)2022 SocioFusion.
            </Text>
            <Text preset="default" style={default_style}>
              2.2 Subject to the express provisions of these terms and conditions:
            </Text>
            <Text preset="formLabel" style={form_label}>
              (a) we, together with our licensors, own and control all the copyright and other
              intellectual property rights in our website and the material on our website; and
            </Text>
            <Text preset="formLabel" style={form_label}>
              (b) all the copyright and other intellectual property rights in our website and the
              material on our website are reserved.
            </Text>
            <Text preset="subheading" style={subHeading_style}>
              3. Licence to use website
            </Text>
            <Text preset="default" style={default_style}>
              3.1 You may:
            </Text>
            <Text preset="formLabel" style={form_label}>
              (a) view pages from our website in a web browser;
            </Text>
            <Text preset="formLabel" style={form_label}>
              (b) download pages from our website for caching in a web browser;
            </Text>
            <Text preset="formLabel" style={form_label}>
              (c) print pages from our website;
            </Text>
            <Text preset="formLabel" style={form_label}>
              (d) stream audio and video files from our website;
            </Text>
            <Text preset="default" style={default_style}>
              subject to the other provisions of these terms and conditions.
            </Text>
            <Text preset="default" style={default_style}>
              3.2 Except as expressly permitted by Section 3.1 or the other provisions of these
              terms and conditions, you must not download any material from our website or save any
              such material to your computer.
            </Text>
            <Text preset="default" style={default_style}>
              3.3 You may only use our website for your own personal and business purposes, and you
              must not use our website for any other purposes.
            </Text>
            <Text preset="default" style={default_style}>
              3.4 Except as expressly permitted by these terms and conditions, you must not edit or
              otherwise modify any material on our website.
            </Text>
            <Text preset="default" style={default_style}>
              3.5 Unless you own or control the relevant rights in the material, you must not:
            </Text>
            <Text preset="formLabel" style={form_label}>
              (a) republish material from our website (including republication on another website);
            </Text>
            <Text preset="formLabel" style={form_label}>
              (b) sell, rent or sub-license material from our website;
            </Text>
            <Text preset="formLabel" style={form_label}>
              (c) show any material from our website in public;
            </Text>
            <Text preset="formLabel" style={form_label}>
              (d) exploit material from our website for a commercial purpose; or
            </Text>
            <Text preset="formLabel" style={form_label}>
              (e) redistribute material from our website.
            </Text>
            <Text preset="default" style={default_style}>
              3.6 Notwithstanding Section 3.5, you may redistribute our newsletter in print and
              electronic form to any person.
            </Text>
            <Text preset="default" style={default_style}>
              3.7 We reserve the right to restrict access to areas of our website, or indeed our
              whole website, at our discretion; you must not circumvent or bypass, or attempt to
              circumvent or bypass, any access restriction measures on our website.
            </Text>
            <Text preset="subheading" style={subHeading_style}>
              4. Acceptable use
            </Text>
            <Text preset="default" style={default_style}>
              4.1 You must not:
            </Text>
            <Text preset="formLabel" style={form_label}>
              (a) use our website in any way or take any action that causes, or may cause, damage to
              the website or impairment of the performance, availability or accessibility of the
              website;
            </Text>
            <Text preset="formLabel" style={form_label}>
              (b) use our website in any way that is unlawful, illegal, fraudulent or harmful, or in
              connection with any unlawful, illegal, fraudulent or harmful purpose or activity;
            </Text>
            <Text preset="formLabel" style={form_label}>
              (c) use our website to copy, store, host, transmit, send, use, publish or distribute
              any material which consists of (or is linked to) any spyware, computer virus, Trojan
              horse, worm, keystroke logger, rootkit or other malicious computer software;
            </Text>
            <Text preset="formLabel" style={form_label}>
              (d) conduct any systematic or automated data collection activities (including without
              limitation scraping, data mining, data extraction and data harvesting) on or in
              relation to our website without our express written consent;
            </Text>
            <Text preset="formLabel" style={form_label}>
              (e) access or otherwise interact with our website using any robot, spider or other
              automated means, except for the purpose of search engine indexing;
            </Text>
            <Text preset="formLabel" style={form_label}>
              (f) violate the directives set out in the robots.txt file for our website; or
            </Text>
            <Text preset="formLabel" style={form_label}>
              (g) use data collected from our website for any direct marketing activity (including
              without limitation email marketing, SMS marketing, telemarketing and direct mailing).
            </Text>
            <Text preset="default" style={default_style}>
              4.2 You must not use data collected from our website to contact individuals, companies
              or other persons or entities.
            </Text>
            <Text preset="default" style={default_style}>
              4.3 You must ensure that all the information you supply to us through our website, or
              in relation to our website, is true, accurate, current, complete and non-misleading.
            </Text>
            <Text preset="subheading" style={subHeading_style}>
              8. Your content: licence
            </Text>
            <Text preset="default" style={default_style}>
              8.1 In these terms and conditions, “your content” means all works and materials
              (including without limitation text, graphics, images, audio material, video material,
              audio-visual material, scripts, software and files) that you submit to us or our
              website for storage or publication on, processing by, or transmission via, our
              website.
            </Text>
            <Text preset="default" style={default_style}>
              8.2 You grant to us a worldwide, irrevocable, non-exclusive, royalty-free licence to
              use, reproduce, store, adapt, publish, translate and distribute your content in any
              existing or future media.
            </Text>
            <Text preset="default" style={default_style}>
              8.3 You grant to us the right to sub-license the rights licensed under Section 8.2.
            </Text>
            <Text preset="default" style={default_style}>
              8.4 You grant to us the right to bring an action for infringement of the rights
              licensed under Section 8.2.
            </Text>
            <Text preset="default" style={default_style}>
              8.5 You hereby waive all your moral rights in your content to the maximum extent
              permitted by applicable law; and you warrant and represent that all other moral rights
              in your content have been waived to the maximum extent permitted by applicable law.
            </Text>
            <Text preset="default" style={default_style}>
              8.6 You may edit your content to the extent permitted using the editing functionality
              made available on our website.
            </Text>
            <Text preset="default" style={default_style}>
              8.7 Without prejudice to our other rights under these terms and conditions, if you
              breach any provision of these terms and conditions in any way, or if we reasonably
              suspect that you have breached these terms and conditions in any way, we may delete,
              unpublish or edit any or all of your content.
            </Text>
            <Text preset="subheading" style={subHeading_style}>
              9. Your content: rules
            </Text>
            <Text preset="default" style={default_style}>
              9.1 You warrant and represent that your content will comply with these terms and
              conditions.
            </Text>
            <Text preset="default" style={default_style}>
              9.2 Your content must not be illegal or unlawful, must not infringe any person’s legal
              rights, and must not be capable of giving rise to legal action against any person (in
              each case in any jurisdiction and under any applicable law).
            </Text>
            <Text preset="default" style={default_style}>
              9.3 Your content, and the use of your content by us in accordance with these terms and
              conditions, must not:
            </Text>
            <Text preset="formLabel" style={form_label}>
              (a) be libellous or maliciously false;
            </Text>
            <Text preset="formLabel" style={form_label}>
              (b) be obscene or indecent;
            </Text>
            <Text preset="formLabel" style={form_label}>
              (c) infringe any copyright, moral right, database right, trade mark right, design
              right, right in passing off, or other intellectual property right;
            </Text>
            <Text preset="formLabel" style={form_label}>
              (d) infringe any right of confidence, right of privacy or right under data protection
              legislation;
            </Text>
            <Text preset="formLabel" style={form_label}>
              (e) constitute negligent advice or contain any negligent statement;
            </Text>
            <Text preset="formLabel" style={form_label}>
              (f) constitute an incitement to commit a crime[, instructions for the commission of a
              crime or the promotion of criminal activity];
            </Text>
            <Text preset="formLabel" style={form_label}>
              (g) be in contempt of any court, or in breach of any court order;
            </Text>
            <Text preset="formLabel" style={form_label}>
              (h) be in breach of racial or religious hatred or discrimination legislation;
            </Text>
            <Text preset="formLabel" style={form_label}>
              (i) be blasphemous;
            </Text>
            <Text preset="formLabel" style={form_label}>
              (j) be in breach of official secrets legislation;
            </Text>
            <Text preset="formLabel" style={form_label}>
              (k) be in breach of any contractual obligation owed to any person;
            </Text>
            <Text preset="formLabel" style={form_label}>
              (l) depict violence in an explicit, graphic or gratuitous manner;
            </Text>
            <Text preset="formLabel" style={form_label}>
              (m) be pornographic, lewd, suggestive or sexually explicit;
            </Text>
            <Text preset="formLabel" style={form_label}>
              (n) be untrue, false, inaccurate or misleading;
            </Text>
            <Text preset="formLabel" style={form_label}>
              (o) consist of or contain any instructions, advice or other information which may be
              acted upon and could, if acted upon, cause illness, injury or death, or any other loss
              or damage;
            </Text>
            <Text preset="formLabel" style={form_label}>
              (p) constitute spam;
            </Text>
            <Text preset="formLabel" style={form_label}>
              (q) be offensive, deceptive, fraudulent, threatening, abusive, harassing, anti-social,
              menacing, hateful, discriminatory or inflammatory; or
            </Text>
            <Text preset="formLabel" style={form_label}>
              (r) cause annoyance, inconvenience or needless anxiety to any person.
            </Text>
            <Text preset="subheading" style={subHeading_style}>
              10. Limited warranties
            </Text>
            <Text preset="default" style={default_style}>
              10.1 We do not warrant or represent:
            </Text>
            <Text preset="formLabel" style={form_label}>
              (a) the completeness or accuracy of the information published on our website;
            </Text>
            <Text preset="formLabel" style={form_label}>
              (b) that the material on the website is up to date; or
            </Text>
            <Text preset="formLabel" style={form_label}>
              (c) that the website or any service on the website will remain available.
            </Text>
            <Text preset="default" style={default_style}>
              10.2 We reserve the right to discontinue or alter any or all of our website services,
              and to stop publishing our website, at any time in our sole discretion without notice
              or explanation; and save to the extent expressly provided otherwise in these terms and
              conditions, you will not be entitled to any compensation or other payment upon the
              discontinuance or alteration of any website services, or if we stop publishing the
              website.
            </Text>
            <Text preset="default" style={default_style}>
              10.3 To the maximum extent permitted by applicable law and subject to Section 11.1, we
              exclude all representations and warranties relating to the subject matter of these
              terms and conditions, our website and the use of our website.
            </Text>
            <Text preset="subheading" style={subHeading_style}>
              11. Limitations and exclusions of liability
            </Text>
            <Text preset="default" style={default_style}>
              11.1 Nothing in these terms and conditions will:
            </Text>
            <Text preset="formLabel" style={form_label}>
              (a) limit or exclude any liability for death or personal injury resulting from
              negligence;
            </Text>
            <Text preset="formLabel" style={form_label}>
              (b) limit or exclude any liability for fraud or fraudulent misrepresentation;
            </Text>
            <Text preset="formLabel" style={form_label}>
              (c) limit any liabilities in any way that is not permitted under applicable law; or
            </Text>
            <Text preset="formLabel" style={form_label}>
              (d) exclude any liabilities that may not be excluded under applicable law.
            </Text>
            <Text preset="default" style={default_style}>
              11.2 The limitations and exclusions of liability set out in this Section 11 and
              elsewhere in these terms and conditions:
            </Text>
            <Text preset="formLabel" style={form_label}>
              (a) are subject to Section 11.1; and
            </Text>
            <Text preset="formLabel" style={form_label}>
              (b) govern all liabilities arising under these terms and conditions or relating to the
              subject matter of these terms and conditions, including liabilities arising in
              contract, in tort (including negligence) and for breach of statutory duty, except to
              the extent expressly provided otherwise in these terms and conditions.
            </Text>
            <Text preset="default" style={default_style}>
              11.3 To the extent that our website and the information and services on our website
              are provided free of charge, we will not be liable for any loss or damage of any
              nature.
            </Text>
            <Text preset="default" style={default_style}>
              11.4 We will not be liable to you in respect of any losses arising out of any event or
              events beyond our reasonable control.
            </Text>
            <Text preset="default" style={default_style}>
              11.5 We will not be liable to you in respect of any business losses, including
              (without limitation) loss of or damage to profits, income, revenue, use, production,
              anticipated savings, business, contracts, commercial opportunities or goodwill.
            </Text>
            <Text preset="default" style={default_style}>
              11.6 We will not be liable to you in respect of any loss or corruption of any data,
              database or software.
            </Text>
            <Text preset="default" style={default_style}>
              11.7 We will not be liable to you in respect of any special, indirect or consequential
              loss or damage.
            </Text>
            <Text preset="default" style={default_style}>
              11.8 You accept that we have an interest in limiting the personal liability of our
              officers and employees and, having regard to that interest, you acknowledge that we
              are a limited liability entity; you agree that you will not bring any claim personally
              against our officers or employees in respect of any losses you suffer in connection
              with the website or these terms and conditions (this will not, of course, limit or
              exclude the liability of the limited liability entity itself for the acts and
              omissions of our officers and employees).
            </Text>
            <Text preset="subheading" style={subHeading_style}>
              12. Breaches of these terms and conditions
            </Text>
            <Text preset="default" style={default_style}>
              12.1 Without prejudice to our other rights under these terms and conditions, if you
              breach these terms and conditions in any way, or if we reasonably suspect that you
              have breached these terms and conditions in any way, we may:
            </Text>
            <Text preset="formLabel" style={form_label}>
              (a) send you one or more formal warnings;
            </Text>
            <Text preset="formLabel" style={form_label}>
              (b) temporarily suspend your access to our website;
            </Text>
            <Text preset="formLabel" style={form_label}>
              (c) permanently prohibit you from accessing our website;
            </Text>
            <Text preset="formLabel" style={form_label}>
              (d) block computers using your IP address from accessing our website;
            </Text>
            <Text preset="formLabel" style={form_label}>
              (e) contact any or all of your internet service providers and request that they block
              your access to our website;
            </Text>
            <Text preset="formLabel" style={form_label}>
              (f) commence legal action against you, whether for breach of contract or otherwise;
              and/or
            </Text>
            <Text preset="default" style={default_style}>
              12.2 Where we suspend or prohibit or block your access to our website or a part of our
              website, you must not take any action to circumvent such suspension or prohibition or
              blocking.
            </Text>
            <Text preset="subheading" style={subHeading_style}>
              13. Variation
            </Text>
            <Text preset="default" style={default_style}>
              13.1 We may revise these terms and conditions from time to time.
            </Text>
            <Text preset="default" style={default_style}>
              13.2 The revised terms and conditions shall apply to the use of our website from the
              date of publication of the revised terms and conditions on the website, and you hereby
              waive any right you may otherwise have to be notified of, or to consent to, revisions
              of these terms and conditions.
            </Text>
            <Text preset="default" style={default_style}>
              13.3 If you have given your express agreement to these terms and conditions, we will
              ask for your express agreement to any revision of these terms and conditions; and if
              you do not give your express agreement to the revised terms and conditions within such
              period as we may specify, we will disable or delete your account on the website, and
              you must stop using the website.
            </Text>
            <Text preset="subheading" style={subHeading_style}>
              14. Assignment
            </Text>
            <Text preset="default" style={default_style}>
              14.1 You hereby agree that we may assign, transfer, sub-contract or otherwise deal
              with our rights and/or obligations under these terms and conditions.
            </Text>
            <Text preset="default" style={default_style}>
              14.2 You may not without our prior written consent assign, transfer, sub-contract or
              otherwise deal with any of your rights and/or obligations under these terms and
              conditions.
            </Text>
            <Text preset="subheading" style={subHeading_style}>
              15. Severability
            </Text>
            <Text preset="default" style={default_style}>
              15.1 If a provision of these terms and conditions is determined by any court or other
              competent authority to be unlawful and/or unenforceable, the other provisions will
              continue in effect.
            </Text>
            <Text preset="default" style={default_style}>
              15.2 If any unlawful and/or unenforceable provision of these terms and conditions
              would be lawful or enforceable if part of it were deleted, that part will be deemed to
              be deleted, and the rest of the provision will continue in effect.
            </Text>
            <Text preset="subheading" style={subHeading_style}>
              16. Third party rights
            </Text>
            <Text preset="default" style={default_style}>
              16.1 A contract under these terms and conditions is for our benefit and your benefit,
              and is not intended to benefit or be enforceable by any third party.
            </Text>
            <Text preset="default" style={default_style}>
              16.2 The exercise of the parties’ rights under a contract under these terms and
              conditions is not subject to the consent of any third party.
            </Text>
            <Text preset="subheading" style={subHeading_style}>
              17. Entire agreement
            </Text>
            <Text preset="default" style={default_style}>
              17.1 Subject to Section 11.1, these terms and conditions, together with [our privacy
              and cookies policy, shall constitute the entire agreement between you and us in
              relation to your use of our website and shall supersede all previous agreements
              between you and us in relation to your use of our website.
            </Text>
            <Text preset="subheading" style={subHeading_style}>
              18. Law and jurisdiction
            </Text>
            <Text preset="default" style={default_style}>
              18.1 These terms and conditions shall be governed by and construed in accordance with
              Indian law.
            </Text>
            <Text preset="default" style={default_style}>
              18.2 Any disputes relating to these terms and conditions shall be subject to the
              non-exclusive jurisdiction of the courts of India.
            </Text>
            <Text preset="subheading" style={subHeading_style}>
              19. Our details
            </Text>
            <Text preset="default" style={default_style}>
              19.1 This website is owned and operated by SocioFusion.
            </Text>
          </View>
        </View>

        <View style={{ flex: 5, backgroundColor: "white", flexBasis: "auto" }}>
          <Footer />
        </View>
      </Screen>
    )
  },
)