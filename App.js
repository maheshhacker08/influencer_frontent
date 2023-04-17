// This is the entry point if you run `yarn expo:start`
// If you run `yarn ios` or `yarn android`, it'll use ./index.js instead.
import App from "./app/app.tsx"
import React from "react"
import { registerRootComponent } from "expo"
import * as SplashScreen from "expo-splash-screen"
import { NativeBaseProvider } from 'native-base';

SplashScreen.preventAutoHideAsync()

function IgniteApp() {
  return (
    <NativeBaseProvider>
      <App hideSplashScreen={SplashScreen.hideAsync} />
    </NativeBaseProvider>
  )
}

registerRootComponent(IgniteApp)
export default IgniteApp
