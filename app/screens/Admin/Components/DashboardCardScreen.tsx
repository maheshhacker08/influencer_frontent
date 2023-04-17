import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, StyleSheet } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../../../navigators"
import { Screen, Text } from "../../../components"
import { Box, HStack, Image, View } from "native-base"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `DashboardCard: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="DashboardCard" component={DashboardCardScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const DashboardCardScreen: React.FC<Props> = observer(function DashboardCardScreen({imageName, name, number}) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  const TriangleCorner = (props) => {
    return <View style={[styles.triangleCorner, props.style]} />;
  };

  const TriangleCornerBottomRight = () => {
    return <TriangleCorner style={styles.triangleCornerBottomRight} />;
  };
  
 

  return (
    <HStack display='flex' bg='white' w={{base: '47%', lg: '31%'}} h='225' mb='5' mr='3'>
      <Box flex='1' pl={5}  justifyContent='center'>
        <Text style={{fontFamily: 'Poppins_700Bold', fontSize: 40, lineHeight: 48, color: '#030246'}}>{number}</Text>
        <Text style={{fontFamily: 'Poppins_400Regular', fontSize: 12, lineHeight: 19.5, color: '#9C9DA5'}}>{name}</Text>
      </Box>
      <Box flex='2' justifyContent='flex-end' alignItems='flex-end' position='relative'>
        <TriangleCornerBottomRight/>
        <Image
          w={"60"}
          h={"60"}
          source={require(`../../../../assets/images/backgrounds/${imageName}.png`)}
          resizeMode="contain"
          position='absolute'
          top='140'
          left={{base: '60%', lg: '50%'}}
          // alignSelf={'center'}
          />
      </Box>
    </HStack>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const styles = StyleSheet.create({
  triangleCornerBottomRight: {
    transform: [{ rotate: "180deg" }],
  },
  triangleCorner: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderRightWidth: 200,
    borderTopWidth: 200,
    borderRightColor: "transparent",
    borderTopColor: "#F2F0FF",
  },
});