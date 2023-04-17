import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../../navigators"
import { Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/core"
import { BottomNavigation, TopNavigation } from "../../navigators/Navigation"
import { AdminSidePannelScreen } from "./Components/AdminSidePannelScreen"
import { Box, Button, HStack, VStack } from "native-base"
import { DashboardCardScreen } from "./Components/DashboardCardScreen"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `AdminDashboard: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />`
// Hint: Look for the 🔥!


// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const AdminDashboardScreen = observer(function AdminDashboardScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation<any>()

  return (
    <Screen style={$root} preset='scroll'>
      <TopNavigation navigation={navigation} />
      <BottomNavigation navigation={navigation} />

    
      <HStack flex='1' mt={{base: -20, lg: 0}}>
        <VStack flex='2' h={{base:'100vh', lg: '100%'}} bg='rgba(255, 255, 255, 0.5)' p={{md: '2', lg: '5'}}>
          <AdminSidePannelScreen/>
        </VStack>

        <VStack flex='8' p='10'>
          <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 24, lineHeight: 29, color: '#203655'}}> Overview </Text>
          <Button rounded='full' w={{base: '20%', lg: '15%'}} m='5' alignSelf='flex-end' onPress={()=>{navigation.navigate('AddInfluencerForm')}}> Add Influencer </Button>
          <HStack style={{flexWrap: 'wrap', alignContent: 'flex-start'}}>
            <DashboardCardScreen imageName='Vector1' name='Rejected' number='5'/>
            <DashboardCardScreen imageName='Vector2' name='Selected' number='0'/>
            <DashboardCardScreen imageName='Vector4' name='In Progress' number='15'/>
            <DashboardCardScreen imageName='Vector3' name='Total Influencer' number='20'/>
          </HStack>
         
        </VStack>
      </HStack>

    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
