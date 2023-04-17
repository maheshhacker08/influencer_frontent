import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../../navigators"
import { Screen } from "../../components"
import { BottomNavigation, TopNavigation } from "../../navigators/Navigation"
import { useNavigation } from "@react-navigation/core"
import { HStack, Pressable, VStack, Text, Image, FormControl, Input, Box } from "native-base"
import { AdminSidePannelScreen } from "./Components/AdminSidePannelScreen"
import { Ionicons } from "@expo/vector-icons"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `SummaryOfConversation: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="SummaryOfConversation" component={SummaryOfConversationScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const SummaryOfConversationScreen: FC<StackScreenProps<AppStackScreenProps, "SummaryOfConversation">> = observer(function SummaryOfConversationScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const [input, setInput] = useState<any>()
  const [chatHistory, setChatHistory] = useState<any>([])
 

  // Pull in navigation via hook
  const navigation = useNavigation<any>()

  return (
    <Screen style={$root} preset='scroll'>
    <TopNavigation navigation={navigation} />
    <BottomNavigation navigation={navigation} />

  
    <HStack flex='1'>
      <VStack flex='2' h={'100%'} bg='rgba(255, 255, 255, 0.5)' p={5}>
        <AdminSidePannelScreen/>
      </VStack>

      <VStack flex='8' p='10'>
        <HStack space={{base: 2, md: 5}}>
          <Pressable onPress={() => {navigation.navigate("AllQueries")}} flexDirection={'row'} justifyContent='center'>
            <Ionicons name="arrow-back" size={20} color="#203655"/>                    
          </Pressable>
          <Text justifyContent='center' fontSize={{base: 19, md: 24}} style={{fontFamily: 'Poppins_700Bold', lineHeight: 29, color: '#203655', marginBottom: 10}}>
            Add Influencer
          </Text>
        </HStack>
        <VStack bg='white'>
          <HStack style={{shadowColor: 'black', shadowOffset: {width: 0, height: 2}, shadowOpacity: .3, shadowRadius: 5}}>
            <Image rounded="full" w={50} h={50} borderColor="white" borderWidth={5} m={2}
                // source={{uri:`${Config.baseURL}${userInfo.photo}`}}               
                source={require("../../../assets/images/backgrounds/deletePhoto.png")}               
                alt="image" 
                // style={{ shadowColor: "rgba(0, 0, 0, 0.2)", shadowOpacity: 0.9,shadowRadius: 10,}}
              />
              <Text fontSize={16} alignSelf= 'center' style={{fontFamily: 'Poppins_500Medium', lineHeight: 29, color: '#585252', }}>
                Bhavana Addania
              </Text>
          </HStack>
          <VStack h={'80vh'} justifyContent='flex-end' p={2}>
            {chatHistory.map((chat,i)=>(
              // <Box key={i}  borderColor='black' style={{}}>
              <>
                <Text fontSize={14} pl='5' pr='5' pt='1.5' pb='1.5' bg='#EAEFFE' alignSelf= 'flex-end' style={{fontFamily: 'Poppins_500Medium', lineHeight: 29, color: '#585252',shadowColor: 'black', shadowOffset: {width: 0, height: 2}, shadowOpacity: .3, shadowRadius: 5, borderColor: 'black'}}>
                  {chat.input}
                </Text>

                <Text fontSize={11} p='1' mb='5' alignSelf= 'flex-end' style={{fontFamily: 'Poppins_500Medium', lineHeight: 19, color: '#585252'}}>
                  {chat.time}
                </Text>
              </>
                // </Box> 
            ))}
            <HStack>
            <FormControl isInvalid={false} w="92%" m={2} >
              <Input h={'30px'}
                value={input}
                // value={userInfo.last_name} 
                onChangeText={setInput}
                onSubmitEditing={()=>{setChatHistory([...chatHistory,{input : input, time : new Date().toLocaleString()}]); setInput('')}}
              />
            </FormControl>
            <Pressable onPress={()=>{setChatHistory([...chatHistory,{input : input, time : new Date().toLocaleString()}]); setInput('')}}>
              <Image rounded="full" w={50} h={50} borderColor="white" borderWidth={5}
                  // source={{uri:`${Config.baseURL}${userInfo.photo}`}}               
                  source={require("../../../assets/images/backgrounds/sendMessage.png")}               
                  alt="image" 
                  // style={{ shadowColor: "rgba(0, 0, 0, 0.2)", shadowOpacity: 0.9,shadowRadius: 10,}}
                />
            </Pressable>
            </HStack>
            
          </VStack>


        </VStack>
       
      </VStack>
    </HStack>

  </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
