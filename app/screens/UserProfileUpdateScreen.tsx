import React, { FC, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextInput } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Screen, Text, TextField, Button } from "../components"
import { View, useBreakpointValue } from "native-base"
import { useStores } from "../models"
import { spacing } from "../theme"
import Footer from "../components/Footer"

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `UserProfileUpdate: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="UserProfileUpdate" component={UserProfileUpdateScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const UserProfileUpdateScreen: FC<StackScreenProps<AppStackScreenProps, "UserProfileUpdate">> = observer(function UserProfileUpdateScreen() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const firstNameInput = useRef<TextInput>()
  const lastNameInput = useRef<TextInput>()
  const dobInput = useRef<TextInput>()
  const genderInput = useRef<TextInput>()
  const emailInput = useRef<TextInput>()
  const contactInput = useRef<TextInput>()
  const amountInput = useRef<TextInput>()
  const cityInput = useRef<TextInput>()
  const stateInput = useRef<TextInput>()
  const addressInput = useRef<TextInput>()

  // Pull in one of our MST stores
  const {
    userProfileUpdateStore: {
      first_name,
      last_name,
      dob,
      gender,
      email,
      mobile,
      price,
      city,
      state,
      country,
      setFirstName,
      setLastName,
      setDOB,
      setGender,
      setEmail,
      setMobile,
      setPrice,
      setCity,
      setState,
      setCountry,
      validationErrors,
    },
  } = useStores()

  function profileUpdateSave() {
    setIsSubmitted(true)
    if (Object.values(validationErrors).some((v) => !!v)) return
    setIsSubmitted(false)
  }

  const errors: typeof validationErrors = isSubmitted ? validationErrors : ({} as any)

  // Pull in navigation via hook
  // const navigation = useNavigation()

  return (
    <Screen style={$root} preset="scroll">
      <Text preset="heading"  style={$headingContainer}>Update Profile</Text>
      <View style={$photoContainer}>
        <View style={$photo}></View>
      </View>
      <View style={$form_container}>
      <View style={$container}>
        <TextField
          ref={firstNameInput}
          value={first_name}
          onChangeText={setFirstName}
          containerStyle={$firstName}
          autoCapitalize="none"
          // autoComplete="firstName"
          autoCorrect={false}
          // keyboardType="phone"
          labelTx="userProfileUpdateScreen.firstNameFieldLabel"
          placeholderTx="userProfileUpdateScreen.firstNameFieldPlaceholder"
          helper={errors?.firstName}
          status={errors?.firstName ? "error" : undefined}
          onSubmitEditing={() => firstNameInput.current?.focus()}
        />
        <TextField
          ref={lastNameInput}
          value={last_name}
          onChangeText={setLastName}
          containerStyle={$lastName}
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          // keyboardType="email"
          labelTx="userProfileUpdateScreen.lastNameFieldLabel"
          placeholderTx="userProfileUpdateScreen.lastNamePlaceholder"
          helper={errors?.lastName}
          status={errors?.lastName ? "error" : undefined}
          onSubmitEditing={() => lastNameInput.current?.focus()}
        />
      </View>

      <View style={$container}>
        <TextField
          ref={dobInput}
          value={dob}
          onChangeText={setDOB}
          containerStyle={$dob}
          autoCapitalize="none"
          // autoComplete="dob"
          autoCorrect={false}
          // keyboardType="phone"
          labelTx="userProfileUpdateScreen.firstNameFieldLabel"
          placeholderTx="userProfileUpdateScreen.firstNameFieldPlaceholder"
          helper={errors?.dob}
          status={errors?.dob ? "error" : undefined}
          onSubmitEditing={() => dobInput.current?.focus()}
        />

        <TextField
          ref={genderInput}
          value={gender}
          onChangeText={setGender}
          containerStyle={$gender}
          autoCapitalize="none"
          // autoComplete="email"
          autoCorrect={false}
          // keyboardType="email"
          labelTx="userProfileUpdateScreen.genderFieldLabel"
          placeholderTx="userProfileUpdateScreen.genderFieldPlaceholder"
          helper={errors?.gender}
          status={errors?.gender ? "error" : undefined}
          onSubmitEditing={() => genderInput.current?.focus()}
        />
      </View>

      <TextField
        ref={emailInput}
        value={email}
        onChangeText={setEmail}
        containerStyle={$email}
        autoCapitalize="none"
        // autoComplete="dob"
        autoCorrect={false}
        // keyboardType="phone"
        labelTx="userProfileUpdateScreen.emailFieldLabel"
        placeholderTx="userProfileUpdateScreen.emailFieldPlaceholder"
        helper={errors?.email}
        status={errors?.email ? "error" : undefined}
        onSubmitEditing={() => emailInput.current?.focus()}
      />

      <View style={$container}>
        <TextField
          ref={contactInput}
          value={mobile}
          onChangeText={setMobile}
          containerStyle={$contact}
          autoCapitalize="none"
          // autoComplete="dob"
          autoCorrect={false}
          // keyboardType="phone"
          labelTx="userProfileUpdateScreen.contactFieldLabel"
          placeholderTx="userProfileUpdateScreen.contactFieldPlaceholder"
          helper={errors?.mobile}
          status={errors?.mobile ? "error" : undefined}
          onSubmitEditing={() => contactInput.current?.focus()}
        />

        <TextField
          ref={amountInput}
          value={price.toString()}
          onChangeText={setPrice}
          containerStyle={$amount}
          autoCapitalize="none"
          // autoComplete="email"
          autoCorrect={false}
          // keyboardType="email"
          labelTx="userProfileUpdateScreen.amountFieldLabel"
          placeholderTx="userProfileUpdateScreen.amountFieldPlaceholder"
          // helper={errors?.amount}
          // status={errors?.amount ? "error" : undefined}
          onSubmitEditing={() => amountInput.current?.focus()}
        />
      </View>

      <View style={$container}>
        <TextField
          ref={cityInput}
          value={city}
          onChangeText={setCity}
          containerStyle={$city}
          autoCapitalize="none"
          // autoComplete="dob"
          autoCorrect={false}
          // keyboardType="phone"
          labelTx="userProfileUpdateScreen.cityFieldLabel"
          placeholderTx="userProfileUpdateScreen.cityFieldPlaceholder"
          // helper={errors?.contact}
          // status={errors?.contact ? "error" : undefined}
          onSubmitEditing={() => cityInput.current?.focus()}
        />

        <TextField
          ref={stateInput}
          value={state}
          onChangeText={setState}
          containerStyle={$state}
          autoCapitalize="none"
          // autoComplete="email"
          autoCorrect={false}
          // keyboardType="email"
          labelTx="userProfileUpdateScreen.stateFieldLabel"
          placeholderTx="userProfileUpdateScreen.stateFieldPlaceholder"
          // helper={errors?.amount}
          // status={errors?.amount ? "error" : undefined}
          onSubmitEditing={() => stateInput.current?.focus()}
        />
      </View>

      <TextField
        ref={addressInput}
        value={country}
        onChangeText={setCountry}
        containerStyle={$address}
        autoCapitalize="none"
        // autoComplete="message"
        autoCorrect={false}
        // keyboardType="message"
        // labelTx="contactUsScreen.messageFieldLabel"
        placeholderTx="contactUsScreen.messageFieldPlaceholder"
        // helper={errors?.address}
        // status={errors?.address ? "error" : undefined}
        multiline={true}
        onSubmitEditing={() => addressInput.current?.focus()}
      />
      </View>

      <Button
        testID="contactUs-button"
        tx="contactUsScreen.tapToSubmit"
        style={$tapButton}
        preset="reversed"
        onPress={profileUpdateSave}
      />

        <View>
         <Footer/>
        </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
const $headingContainer: ViewStyle = {
  margin: 10
}
const $photoContainer: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}
const $photo: ViewStyle = {
  width: 150,
  height: 150,
  // borderRadius: 70,
  backgroundColor: "white",
  margin: 10
}
const $form_container: ViewStyle = {
  margin: spacing.large,
}
const $container: ViewStyle = {
  flexDirection: "row",
  flex: 1,
  marginBottom: spacing.large,
}
const $firstName: ViewStyle = {
  flexDirection: "column",
  flex: 1,
  marginRight: spacing.large,
}
const $lastName: ViewStyle = {
  flexDirection: "column",
  flex: 1,
  marginRight: spacing.large,
}
const $dob: ViewStyle = {
  flexDirection: "column",
  flex: 1,
  marginRight: spacing.large,
}
const $gender: ViewStyle = {
  flexDirection: "column",
  flex: 1,
  marginRight: spacing.large,
}
const $email: ViewStyle = {
  flexDirection: "column",
  flex: 1,
  marginRight: spacing.large,
}
const $contact: ViewStyle = {
  flexDirection: "column",
  flex: 1,
  marginRight: spacing.large,
}
const $amount: ViewStyle = {
  flexDirection: "column",
  flex: 1,
  marginRight: spacing.large,
}
const $city: ViewStyle = {
  flexDirection: "column",
  flex: 1,
  marginRight: spacing.large,
}
const $state: ViewStyle = {
  flexDirection: "column",
  flex: 1,
  marginRight: spacing.large,
}
const $address: ViewStyle = {
  flexDirection: "column",
  flex: 1,
  marginRight: spacing.large,
  marginBottom: spacing.large,
}
const $tapButton: ViewStyle = {
  margin: spacing.large,
  width: 100
}
