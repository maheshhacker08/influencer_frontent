const en = {
  common: {
    ok: "OK!",
    cancel: "Cancel",
    back: "Back",
    logOut: "Log Out", // @demo remove-current-line
  },
  welcomeScreen: {
    postscript:
      "psst  — This probably isn't what your app looks like. (Unless your designer handed you these screens, and in that case, ship it!)",
    readyForLaunch: "Welcome, To INFLUENCERS.COM!",
    aboutUs: "This is About Us Page. Comming Soon...",
    contactUs: "This is Contact Us Page. Comming Soon...",
    faqs: "This is FAQ's Us Page. Coming Soon...",
    privacyPolicy: "This is Privacy Policies Page. Coming Soon...",
    tnc: "This is Terms & Conditions Page. Coming Soon...",
    exciting: "(ohh, this is exciting!)",
    letsGo: "Let's go!", // @demo remove-current-line
  },
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: "RESET APP",
    traceTitle: "Error from %{name} stack", // @demo remove-current-line
  },
  emptyStateComponent: {
    generic: {
      heading: "So empty... so sad",
      content: "No data found yet. Try clicking the button to refresh or reload the app.",
      button: "Let's try this again",
    },
  },
  // @demo remove-block-start
  errors: {
    invalidEmail: "Invalid email address.",
  },
  menu: {
    signIn: 'Sign In',
    signUp: 'Sign Up'
  },
  loginScreen: {
    signIn: "Sign In",
    enterDetails:
      "Enter your details below to unlock top secret info. You'll never guess what we've got waiting. Or maybe you will; it's not rocket science here.",
    // emailFieldLabel: "Enter Mobile/Email",
    emailFieldLabel: "Enter Email",
    passwordFieldLabel: "Enter Password",
    // tapToSignIn: "Request OTP ",
    tapToSignIn: "Sign In ",
    hint: "Hint: you can use any email address and your favorite password :)",
  },
  otpScreen: {
    submitOtp: "Submit",
  },
  userRegistrationScreen: {
    contactUs: "Sign Up",
    contactUs_para: "We’d love to hear from you!",
    fullNameFieldLabel: "Enter Full Name*",
    emailMobileFieldLabel: "Enter Mobile/Email",
    fullNameFieldPlaceholder: "-------------",
    firstNameFieldPlaceholder: "First Name",
    lastNameFieldPlaceholder: "Last Name",
    emailMobileFieldPlaceholder: "-------------",
    phoneFieldLabel: "Phone number*",
    phoneFieldPlaceholder: "Enter your phone number",
    emailFieldLabel: "Email*",
    emailFieldPlaceholder: "Enter your email address",
    createPasswordFieldLabel: "Create Password*",
    createPasswordPlaceholder: "Enter your password",
    confirmPasswordFieldLabel: "Confirm Password*",
    confirmPasswordPlaceholder: "Confirm Password",
    tapToSubmit: "Submit",
  },
  signUpScreen: {
    signUp: "Sign Up",
    fullNameFieldLabel: "Enter Full Name",
    fullNameFieldPlaceholder: "Enter Full Name",
    phoneFieldLabel: "Enter Phone/ Email",
    phoneFieldPlaceholder: "Enter Mobile/Email ",
    // emailFieldLabel: "Email*",
    // emailFieldPlaceholder: "Enter your email address",
    tapToSubmit: "Request OTP",
    hint: "Hint: you can use any email address and your favorite password :)",

  },
  signUpCategoryScreen: {
    signUp: "Sign Up",
    tapToSubmit: "Next",
  },
  contactUsScreen: {
    contactUs: "Contact Us",
    contactUs_para: "We are here for you! How can we help?",
    // fullNameFieldLabel: "Full Name*",
    fullNameFieldPlaceholder: "Enter your name",
    // phoneFieldLabel: "Phone number*",
    phoneFieldPlaceholder: "Mobile No.",
    // emailFieldLabel: "Email*",
    emailFieldPlaceholder: "Enter your email address",
    // messageFieldLabel: "Message*",
    messageFieldPlaceholder: "Go ahead, we are listening..........",
    tapToSubmit: "Send",
  },
  userProfileUpdateScreen: {
    contactUs: "Contact Us",
    contactUs_para: "We’d love to hear from you!",
    firstNameFieldLabel: "First Name*",
    firstNameFieldPlaceholder: "Enter your First Name",
    lastNameFieldLabel: "Last Name*",
    lastNamePlaceholder: "Enter your Last Name",
    dobFieldLabel: "DOB*",
    dobFieldPlaceholder: "Enter your Date of birth",
    genderFieldLabel: "Gender*",
    genderFieldPlaceholder: "Enter your Gender",
    emailFieldLabel: "Email*",
    emailFieldPlaceholder: "Enter your Email",
    contactFieldLabel: "Contact*",
    contactFieldPlaceholder: "Enter your Contact",
    amountFieldLabel: "Amount*",
    amountFieldPlaceholder: "Enter your Amount",
    cityFieldLabel: "City*",
    cityFieldPlaceholder: "Enter your City",
    stateFieldLabel: "State*",
    stateFieldPlaceholder: "Enter your State",
    tapToSubmit: "Submit",
  },
  demoNavigator: {
    componentsTab: "Components",
    debugTab: "Debug",
    communityTab: "Community",
    podcastListTab: "Podcast",
  },
  demoCommunityScreen: {
    title: "Connect with the community",
    tagLine:
      "Plug in to Infinite Red's community of React Native engineers and level up your app development with us!",
    joinUsOnSlackTitle: "Join us on Slack",
    joinUsOnSlack:
      "Wish there was a place to connect with React Native engineers around the world? Join the conversation in the Infinite Red Community Slack! Our growing community is a safe space to ask questions, learn from others, and grow your network.",
    joinSlackLink: "Join the Slack Community",
    makeIgniteEvenBetterTitle: "Make Ignite even better",
    makeIgniteEvenBetter:
      "Have an idea to make Ignite even better? We're happy to hear that! We're always looking for others who want to help us build the best React Native tooling out there. Join us over on GitHub to join us in building the future of Ignite.",
    contributeToIgniteLink: "Contribute to Ignite",
    theLatestInReactNativeTitle: "The latest in React Native",
    theLatestInReactNative: "We're here to keep you current on all React Native has to offer.",
    reactNativeRadioLink: "React Native Radio",
    reactNativeNewsletterLink: "React Native Newsletter",
    reactNativeLiveLink: "React Native Live",
    chainReactConferenceLink: "Chain React Conference",
    hireUsTitle: "Hire Infinite Red for your next project",
    hireUs:
      "Whether it's running a full project or getting teams up to speed with our hands-on training, Infinite Red can help with just about any React Native project.",
    hireUsLink: "Send us a message",
  },
  demoShowroomScreen: {
    jumpStart: "Components to jump start your project!",
    lorem2Sentences:
      "Nulla cupidatat deserunt amet quis aliquip nostrud do adipisicing. Adipisicing excepteur elit laborum Lorem adipisicing do duis.",
    demoHeaderTxExample: "Yay",
    demoViaTxProp: "Via `tx` Prop",
    demoViaSpecifiedTxProp: "Via `{{prop}}Tx` Prop",
  },
  demoDebugScreen: {
    howTo: "HOW TO",
    title: "Debug",
    tagLine:
      "Congratulations, you've got a very advanced React Native app template here.  Take advantage of this boilerplate!",
    reactotron: "Send to Reactotron",
    reportBugs: "Report Bugs",
    demoList: "Demo List",
    demoPodcastList: "Demo Podcast List",
    androidReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running, run adb reverse tcp:9090 tcp:9090 from your terminal, and reload the app.",
    iosReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    macosReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    webReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    windowsReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
  },
  demoPodcastListScreen: {
    title: "React Native Radio episodes",
    onlyFavorites: "Only Show Favorites",
    favoriteButton: "Favorite",
    unfavoriteButton: "Unfavorite",
    accessibility: {
      cardHint:
        "Double tap to listen to the episode. Double tap and hold to {{action}} this episode.",
      switch: "Switch on to only show favorites",
      favoriteAction: "Toggle Favorite",
      favoriteIcon: "Episode not favorited",
      unfavoriteIcon: "Episode favorited",
      publishLabel: "Published {{date}}",
      durationLabel: "Duration: {{hours}} hours {{minutes}} minutes {{seconds}} seconds",
    },
    noFavoritesEmptyState: {
      heading: "This looks a bit empty",
      content:
        "No favorites have been added yet. Tap the heart on an episode to add it to your favorites!",
    },
  },
  // @demo remove-block-end
}

export default en
export type Translations = typeof en
