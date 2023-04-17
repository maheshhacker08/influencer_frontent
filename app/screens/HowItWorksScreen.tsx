import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, ImageBackground, Image } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Screen, Text } from "../components"
import { useBreakpointValue, View } from "native-base"
import Footer from "../components/Footer"
import { spacing } from "../theme"
import { SliderBox } from "react-native-image-slider-box";

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `HowItWorks: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="HowItWorks" component={HowItWorksScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const HowItWorksScreen = observer(function HowItWorksScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const smallScreen_images = useBreakpointValue({
    base: true,
    sm: true,
    md: false,
    lg: false,
    xl: false
  })
  const midScreen_images = useBreakpointValue({
    base: false,
    sm: false,
    md: true,
    lg: false,
    xl: false
  })
  const largeScreen_images = useBreakpointValue({
    base: false,
    sm: false,
    md: false,
    lg: true,
    xl: true
  })
  // const xlargeScreen_images = useBreakpointValue({
  //   base: false,
  //   sm: false,
  //   md: false,
  //   lg: false,
  //   xl: true
  // })
  const blog_card_width = useBreakpointValue({
    // base: 270,
    // sm: 280,
    // md: 350,
    lg: 380,
    xl: 500
  })
  // const blog_card_width = useBreakpointValue({
  //   base: 350,
  //   sm: 400,
  //   md: 400,
  //   lg: 250,
  //   xl: 350
  // }) 
  const blog_smallScreen_images = [
    require('../../assets/images/backgrounds/Search For Influencer.png'),
    require('../../assets/images/backgrounds/Shortlisted Influencer.png'),
    require('../../assets/images/backgrounds/Connect With Them.png'),
    require('../../assets/images/backgrounds/Plan Your Shoot.png'),
    require('../../assets/images/backgrounds/Get Your Advertisement Done.png'),
    require('../../assets/images/backgrounds/Post On Your Social Media.png'),
  ]
  const blog_midScreen_images = [
    require('../../assets/images/backgrounds/group_1.png'),
    require('../../assets/images/backgrounds/group_2.png'),
    require('../../assets/images/backgrounds/group_3.png'),
  ]
  const blog_largeScreen_images = [
    require('../../assets/images/backgrounds/all.png'),
  ]

  return (
    <View style={$container}>
      <View style={{ alignItems: "center", marginTop: 30 }}>
        <Text preset="h1" style={{ color:'#022F46' }}>How It Works</Text>
        <Text preset="h3" >(For Business)</Text>
      </View>
      <View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          margin: 20,
        }}
      >
          {smallScreen_images === true && 
               <SliderBox 
               images={blog_smallScreen_images}
               ImageComponentStyle={{ width: '50%', marginTop: 15}}
               resizeMode={'contain'}
              //  dotColor="#FFEE58"
               inactiveDotColor="#90A4AE"
              //  paginationBoxVerticalPadding={20}
              //  sliderBoxHeight={blog_card_width}
               dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 0,
                marginVertical: 5,
                padding: 0,
                marginTop: 50,
                backgroundColor: "rgba(128, 128, 128, 0.92)"
              }}
              imageLoadingColor="#2196F3"
               />
          }
          {midScreen_images === true && 
          // <View style={[$cards, {width: blog_card_width}]}>
               <SliderBox 
               images={blog_midScreen_images}
               ImageComponentStyle={{ width: '80%', marginTop: 15}}
               resizeMode={'contain'}
              //  dotColor="#FFEE58"
               inactiveDotColor="#90A4AE"
              //  paginationBoxVerticalPadding={20}
              //  sliderBoxHeight={blog_card_width}
               dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 0,
                marginVertical: 5,
                padding: 0,
                marginTop: 50,
                backgroundColor: "rgba(128, 128, 128, 0.92)"
              }}
              imageLoadingColor="#2196F3"
               />
          // </View>
          }
          
          {largeScreen_images === true && 
          // <View style={[$cards, {width: blog_card_width}]}>
               <SliderBox 
               images={blog_largeScreen_images}
              //  ImageComponentStyle={{ width: 700, marginTop: 15}}
               resizeMode={'contain'}
              //  dotColor="#FFEE58"
               inactiveDotColor="#90A4AE"
              //  paginationBoxVerticalPadding={20}
               sliderBoxHeight={blog_card_width}
               dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 0,
                marginVertical: 5,
                padding: 0,
                marginTop: 50,
                backgroundColor: "rgba(128, 128, 128, 0.92)"
              }}
              imageLoadingColor="#2196F3"
               />
          // </View>
          }
          {/* {xlargeScreen_images === true && 
          // <View style={[$cards, {width: blog_card_width}]}>
               <SliderBox 
               images={blog_largeScreen_images}
               ImageComponentStyle={{ width: '90%', marginTop: 15}}
               resizeMode={'contain'}
              //  dotColor="#FFEE58"
               inactiveDotColor="#90A4AE"
              //  paginationBoxVerticalPadding={20}
               sliderBoxHeight={blog_card_width}
               dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 0,
                marginVertical: 5,
                padding: 0,
                marginTop: 50,
                backgroundColor: "rgba(128, 128, 128, 0.92)"
              }}
              imageLoadingColor="#2196F3"
               />
          // </View>
          } */}
          

      </View>
      {/* {blog_row_3 === true && 
            <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              margin: 20,
            }}
          >
            <View style={[$cards, {width: blog_card_width}]}>
              <View>
                <Image
                  style={{ width: 45, height: 45, margin: 2, alignSelf: "center" }}
                  source={require("../../assets/images/backgrounds/icon1.png")}
                />
                <Text preset="body" style={{ alignSelf: "center", fontWeight: 'bold', color: '#15253C', marginTop: 5, marginBottom: 5  }}>Plan Your Shoot</Text>
                <Text preset="body" style={{ alignSelf: "center" , textAlign: 'center'}}>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus deleniti.
                </Text>
              </View>
            </View>
            <View style={[$cards, {width: blog_card_width}]}>
              <View>
                <Image
                  style={{ width: 45, height: 45, margin: 2, alignSelf: "center" }}
                  source={require("../../assets/images/backgrounds/icon1.png")}
                />
                <Text preset="body" style={{ alignSelf: "center", fontWeight: 'bold', color: '#15253C', marginTop: 5, marginBottom: 5  }}>Get Your Advertisement Done</Text>
                <Text preset="body" style={{ alignSelf: "center", textAlign: 'center' }}>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus deleniti.
                </Text>
              </View>
            </View>
            <View style={[$cards, {width: blog_card_width}]}>
              <View>
                <Image
                  style={{ width: 45, height: 45, margin: 2, alignSelf: "center" }}
                  source={require("../../assets/images/backgrounds/icon1.png")}
                />
                <Text preset="body" style={{ alignSelf: "center", fontWeight: 'bold', color: '#15253C', marginTop: 5, marginBottom: 5  }}>Post On Your Social Media</Text>
                <Text preset="body" style={{ alignSelf: "center", textAlign: 'center' }}>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus deleniti.
                </Text>
              </View>
            </View>
          </View>
      } */}


        {/* <Text>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam suscipit quasi doloremque id aliquam debitis dicta atque placeat, nemo doloribus molestias dolores ea. Nihil magni maxime quidem aperiam aspernatur vero optio. Vel natus eveniet at deserunt, aperiam voluptatum repellat, voluptatem accusamus rem dignissimos ab eum ullam. Voluptas voluptatem minima eligendi eum dolor quidem illo, aspernatur repellat placeat maiores consequuntur perferendis excepturi, corporis voluptate dolore libero exercitationem optio eveniet alias ut commodi. Eum modi doloremque labore, quas vero dolorum reprehenderit et. Quasi quibusdam natus recusandae ratione nulla porro voluptatibus inventore iure officia, vel, dolorem quam maiores libero! Aperiam repellat impedit aliquam consequuntur at vel assumenda, expedita, eius eaque possimus, sunt sapiente nihil nesciunt tenetur quisquam similique reiciendis quam porro libero nobis placeat! Eaque asperiores fugiat quaerat assumenda provident amet quos soluta debitis animi non quod, temporibus unde quibusdam aspernatur consequatur aliquid ipsa dolore aliquam voluptate. Sequi impedit quam voluptate cum. At odio cum reprehenderit magnam ducimus velit repudiandae hic repellendus atque aliquid ipsum ex consectetur facilis, laudantium facere excepturi qui, officiis fugiat eos quam sequi in neque illo aperiam! Aperiam quo officiis beatae? Aperiam, facere voluptatibus rerum error cupiditate obcaecati accusamus animi accusantium, iure qui ex deserunt inventore, doloremque doloribus maxime!</Text> */}
      </View>
    </View>
  )
})

// export default HowItWorksScreen;

// const $root: ViewStyle = {
//   flex: 1,
// }
const $container: ViewStyle = {
  margin: 15,
  marginTop: 60
  // height: 700
  // marginBottom: 50
}
const $cards: ViewStyle = {
  backgroundColor: "#ECF4FF",
  padding: 20,
  borderTopRightRadius: 30,
  borderBottomLeftRadius: 30,
  shadowColor: "rgba(0, 0, 0, 0.12)",
  shadowOffset: { width: -2, height: 4 },
  shadowOpacity: 0.9,
  shadowRadius: 3,
}
