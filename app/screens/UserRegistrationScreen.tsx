import React, { FC, useState, useRef, useMemo } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TextInput, TextStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Button, Screen, Text, TextField, TextFieldAccessoryProps, Icon } from "../components"
import Footer from "../components/Footer"
import { useStores } from "../models"
import { colors, spacing } from "../theme"


// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `UserRegistration: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="UserRegistration" component={UserRegistrationScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const UserRegistrationScreen: FC<StackScreenProps<AppStackScreenProps, "UserRegistration">> = observer(function UserRegistrationScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)

  const fullNameInput = useRef<TextInput>()
  const phoneInput = useRef<TextInput>()
  const emailInput = useRef<TextInput>()
  const createPasswordInput = useRef<TextInput>()
  const confirmPasswordInput = useRef<TextInput>()

  const {
    userRegistrationStore: {
      fullName,
      phone,
      email,
      createPassword,
      confirmPassword,
      setFullName,
      setPhone,
      setEmail,
      setCreatePassword,
      setConfirmPassword,
      validationErrors,
    },
  } = useStores()

  function contactUsSubmit() {
    setIsSubmitted(true)
    if (Object.values(validationErrors).some((v) => !!v)) return
    setIsSubmitted(false)
  }

  const errors: typeof validationErrors = isSubmitted ? validationErrors : ({} as any)

  function login() {
    setIsSubmitted(true)

    if (Object.values(validationErrors).some((v) => !!v)) return

    // Make a request to your server to get an authentication token.
    // If successful, reset the fields and set the token.
    setIsSubmitted(false)
    setCreatePassword("")
    setEmail("")

    // We'll mock this with a fake token.
    // setAuthToken(String(Date.now()))
  }

  const PasswordRightAccessory = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        )
      },
    [isAuthPasswordHidden],
  )



  return (
    <Screen style={$root} preset="scroll">
      <View style={$form_container}>
        <Text
          testID="contactUs-heading"
          tx="userRegistrationScreen.contactUs"
          preset="heading"
          style={$contactUs}
        />
        {/* <Text
          testID="contactUs_para-heading"
          tx="userRegistrationScreen.contactUs_para"
          preset="subheading"
          style={$contactUs}
        /> */}

        <TextField
          ref={fullNameInput}
          value={fullName}
          onChangeText={setFullName}
          containerStyle={$textField}
          autoCapitalize="none"
          // autoComplete="fullName"
          autoCorrect={false}
          // keyboardType="fullName"
          labelTx="userRegistrationScreen.fullNameFieldLabel"
          placeholderTx="userRegistrationScreen.fullNameFieldPlaceholder"
          helper={errors?.fullName}
          status={errors?.fullName ? "error" : undefined}
          onSubmitEditing={() => fullNameInput.current?.focus()}
        />

        <View style={$container}>
        <TextField
          ref={phoneInput}
          value={phone}
          onChangeText={setPhone}
          containerStyle={$textFieldPhone}
          autoCapitalize="none"
          // autoComplete="phone"
          autoCorrect={false}
          // keyboardType="phone"
          labelTx="userRegistrationScreen.phoneFieldLabel"
          placeholderTx="userRegistrationScreen.phoneFieldPlaceholder"
          helper={errors?.phone}
          status={errors?.phone ? "error" : undefined}
          onSubmitEditing={() => phoneInput.current?.focus()}
        />

        <TextField
          ref={emailInput}
          value={email}
          onChangeText={setEmail}
          containerStyle={$textFieldEmail}
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          // keyboardType="email"
          labelTx="userRegistrationScreen.emailFieldLabel"
          placeholderTx="userRegistrationScreen.emailFieldPlaceholder"
          helper={errors?.email}
          status={errors?.email ? "error" : undefined}
          onSubmitEditing={() => emailInput.current?.focus()}
        />
        </View>

        <TextField
        ref={createPasswordInput}
        value={createPassword}
        onChangeText={setCreatePassword}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isAuthPasswordHidden}
        labelTx="userRegistrationScreen.createPasswordFieldLabel"
        placeholderTx="userRegistrationScreen.createPasswordPlaceholder"
        helper={errors?.createPassword}
        status={errors?.createPassword ? "error" : undefined}
        onSubmitEditing={login}
        RightAccessory={PasswordRightAccessory}
      />

      <TextField
        ref={confirmPasswordInput}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isAuthPasswordHidden}
        labelTx="userRegistrationScreen.confirmPasswordFieldLabel"
        placeholderTx="userRegistrationScreen.confirmPasswordPlaceholder"
        helper={errors?.confirmPassword}
        status={errors?.confirmPassword ? "error" : undefined}
        onSubmitEditing={login}
        RightAccessory={PasswordRightAccessory}
      />
      </View>
        <Button
          testID="contactUs-button"
          tx="userRegistrationScreen.tapToSubmit"
          style={$tapButton}
          preset="reversed"
          onPress={contactUsSubmit}
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

const $form_container: ViewStyle = {
  margin: spacing.large,
}

const $contactUs: TextStyle = {
  marginBottom: spacing.small,
}

const $textField: ViewStyle = {
  marginBottom: spacing.large,
}

const $container: ViewStyle = {
  flexDirection: 'row',
  flex: 1,
  marginBottom: spacing.large,

}

const $textFieldPhone: ViewStyle = {
  flexDirection: 'column',
  flex: 1,
  marginRight: spacing.large,

}

const $textFieldEmail: ViewStyle = {
  flexDirection: 'column',
  flex: 1
}


const $tapButton: ViewStyle = {
  margin: spacing.large,
  width: 100
 
}