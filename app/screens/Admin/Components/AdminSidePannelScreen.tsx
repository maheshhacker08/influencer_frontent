import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../../../navigators"
import { Screen } from "../../../components"
import { HStack, Image, Pressable, VStack, Text } from "native-base"
import { useNavigation } from "@react-navigation/core"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `AdminSidePannel: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="AdminSidePannel" component={AdminSidePannelScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const AdminSidePannelScreen = observer(function AdminSidePannelScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation<any>()
  return (
      <VStack mt={10}>
          <Pressable onPress={()=>navigation.navigate('AdminDashboard')}>
          {({
            isHovered,
          }) => {
            return (
            <HStack p={{lg: 2}} m={2} space={2} style={{backgroundColor: isHovered && '#5342D6'}}>
              <Image
                w={"30"}
                h={"30"}
                source={require("../../../../assets/images/backgrounds/Dashboard.png")}
                resizeMode="contain"
                />
              <Text alignSelf='center' style={{color: isHovered ? 'white' : '#545454'}}>Dashboard</Text>
            </HStack>)
          }}
            
          </Pressable>
          <Pressable onPress={()=>navigation.navigate('AllQueries')}>
          {({
            isHovered,
          }) => {
            return (
            <HStack p={{lg: 2}} m={2} space={2} style={{backgroundColor: isHovered && '#5342D6'}}>
              <Image
                w={"30"}
                h={"30"}
                source={require("../../../../assets/images/backgrounds/Shortlisted.png")}
                resizeMode="contain"
                />
              <Text alignSelf='center' style={{color: isHovered ? 'white' : '#545454'}}>Queries</Text>
            </HStack>)
          }}
            
          </Pressable> 
          <Pressable onPress={()=>navigation.navigate('AddInfluencer')}>
          {({
            isHovered,
          }) => {
            return (
            <HStack p={{lg: 2}} m={2} space={2} style={{backgroundColor: isHovered && '#5342D6'}}>
              <Image
                w={"30"}
                h={"30"}
                source={require("../../../../assets/images/backgrounds/Add_influencer.png")}
                resizeMode="contain"
                />
              <Text alignSelf='center' style={{color: isHovered ? 'white' : '#545454'}}>Influencer List</Text>
            </HStack>)
          }}
          </Pressable> 

          <Pressable onPress={()=>navigation.navigate('AllusersList')}>
          {({
            isHovered,
          }) => {
            return (
            <HStack p={{lg: 2}} m={2} space={2} style={{backgroundColor: isHovered && '#5342D6'}}>
              <Image
                w={"30"}
                h={"30"}
                source={require("../../../../assets/images/backgrounds/User.png")}
                resizeMode="contain"
                />
              <Text alignSelf='center' style={{color: isHovered ? 'white' : '#545454'}}>Users</Text>
            </HStack>)
          }}
          </Pressable>

          <Pressable onPress={()=>navigation.navigate('Support')}>
          {({
            isHovered,
          }) => {
            return (
            <HStack p={{lg: 2}} m={2} space={2} style={{backgroundColor: isHovered && '#5342D6'}}>
              <Image
                w={"30"}
                h={"30"}
                source={require("../../../../assets/images/backgrounds/customer-support.png")}
                resizeMode="contain"
                />
              <Text alignSelf='center' style={{color: isHovered ? 'white' : '#545454'}}>Support</Text>
            </HStack>)
          }}
          </Pressable>

          <Pressable onPress={()=>navigation.navigate('AddBlogs')}>
          {({
            isHovered,
          }) => {
            return (
            <HStack p={{lg: 2}} m={2} space={2} style={{backgroundColor: isHovered && '#5342D6'}}>
              <Image
                w={"30"}
                h={"30"}
                source={require("../../../../assets/images/backgrounds/Blog.png")}
                resizeMode="contain"
                />
              <Text alignSelf='center' style={{color: isHovered ? 'white' : '#545454'}}>Add Blogs</Text>
            </HStack>)
          }}
          </Pressable>

          <Pressable onPress={()=>navigation.navigate('AddInfluencerForm')}>
          {({
            isHovered,
          }) => {
            return (
            <HStack p={{lg: 2}} m={2} space={2} style={{backgroundColor: isHovered && '#5342D6'}}>
              <Image
                w={"30"}
                h={"30"}
                source={require("../../../../assets/images/backgrounds/Logout.png")}
                resizeMode="contain"
                />
              <Text alignSelf='center' style={{color: isHovered ? 'white' : '#545454'}}>Logout</Text>
            </HStack>)
          }}
          </Pressable>

         
      </VStack>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
