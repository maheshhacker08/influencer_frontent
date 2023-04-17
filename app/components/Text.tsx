import i18n from "i18n-js"
import React from "react"
import { StyleProp, Text as RNText, TextProps as RNTextProps, TextStyle } from "react-native"
import { isRTL, translate, TxKeyPath } from "../i18n"
import { colors, typography } from "../theme"


type Sizes = keyof typeof $sizeStyles
type Weights = keyof typeof typography.primary
type Presets = keyof typeof $presets

export interface TextProps extends RNTextProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: TxKeyPath
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: i18n.TranslateOptions
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<TextStyle>
  /**
   * One of the different types of text presets.
   */
  preset?: Presets
  /**
   * Text weight modifier.
   */
  weight?: Weights
  /**
   * Text size modifier.
   */
  size?: Sizes
  /**
   * Children components.
   */
  children?: React.ReactNode
}

/**
 * For your text displaying needs.
 * This component is a HOC over the built-in React Native one.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-Text.md)
 */
export function Text(props: TextProps) {
  const { weight, size, tx, txOptions, text, children, style: $styleOverride, ...rest } = props

  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  const preset: Presets = $presets[props.preset] ? props.preset : "default"
  const $styles = [
    $rtlStyle,
    $presets[preset],
    $fontWeightStyles[weight],
    $sizeStyles[size],
    $styleOverride,
  ]

  return (
    <RNText {...rest} style={$styles}>
      {content}
    </RNText>
  )
}


const $sizeStyles = {
    xxl: { fontSize: 32, lineHeight: 42 } as TextStyle,
    xl: { fontSize: 22, lineHeight: 32 } as TextStyle,
    lg: { fontSize: 18, lineHeight: 30 } as TextStyle,
    md: { fontSize: 16, lineHeight: 24 } as TextStyle,
    sm: { fontSize: 15, lineHeight: 22 } as TextStyle,
    xs: { fontSize: 14, lineHeight: 20 } as TextStyle,
    xxs: { fontSize: 12, lineHeight: 18 } as TextStyle,
  }

const $fontWeightStyles = Object.entries(typography.primary).reduce((acc, [weight, fontFamily]) => {
  return { ...acc, [weight]: { fontFamily } }
}, {}) as Record<Weights, TextStyle>

const $baseStyle: StyleProp<TextStyle> = [
  $sizeStyles.sm,
  $fontWeightStyles.normal,
  { color: colors.text },
]

const $presets = {
  default: [$baseStyle,{fontFamily: 'Poppins_400Regular'}],

  bold: [$baseStyle, $fontWeightStyles.bold, {fontFamily: 'Poppins_700Bold'}] as StyleProp<TextStyle>,

  heading: [$baseStyle, $sizeStyles.xxl, $fontWeightStyles.bold, {fontFamily: 'Poppins_700Bold'}] as StyleProp<TextStyle>,

  subheading: [$baseStyle, $sizeStyles.lg, $fontWeightStyles.medium, {fontFamily: 'Poppins_700Bold'}] as StyleProp<TextStyle>,

  formLabel: [$baseStyle, $fontWeightStyles.medium, {fontFamily: 'Poppins_700Bold'}] as StyleProp<TextStyle>,

  formHelper: [$baseStyle, $sizeStyles.sm, $fontWeightStyles.normal, {fontFamily: 'Poppins_700Bold'}] as StyleProp<TextStyle>,
  
  
  //................. socio fusion presets---------------->>
  heroH1: [{fontFamily: 'Poppins_700Bold', fontSize: 56, lineHeight: 67, color: '#223753'}],

  body: [{fontFamily: 'Poppins_400Regular', fontSize: 15, lineHeight: 21, color: '#545454'}] as StyleProp<TextStyle>,

  // headline: [{fontFamily: 'Poppins_700Bold', fontSize: 40, lineHeight: 48}] as StyleProp<TextStyle>,

  h1: [{fontFamily: 'Poppins_700Bold', fontSize: 37, lineHeight: 52, color: '#022f46'}] as StyleProp<TextStyle>,

  h2: [{fontFamily: 'Poppins_600SemiBold', fontSize: 32, lineHeight: 38, color: '#203655'}] as StyleProp<TextStyle>,

  h3: [{fontFamily: 'Poppins_500Medium', fontSize: 24, lineHeight: 29, color: '#354a66'}],

  h4: [{fontFamily: 'Poppins_700Bold', fontSize: 20, lineHeight: 26, color: '#3f4958'}] as StyleProp<TextStyle>,

  title: [{fontFamily: 'Poppins_700Bold', fontSize: 48, lineHeight: 58 , color: '#062249'}] as StyleProp<TextStyle>,

  b1: [{fontFamily: 'Poppins_700Bold', fontSize: 16, lineHeight: 21, color: '#272626'}] as StyleProp<TextStyle>,

  label: [{fontFamily: 'Poppins_400Regular', fontSize: 14, lineHeight: 21, color: '#9c9da5'}] as StyleProp<TextStyle>,

  textInput: [{fontFamily: 'Poppins_400Regular', fontSize: 14, lineHeight: 21, color: '#747474'}] as StyleProp<TextStyle>,
}

const $rtlStyle: TextStyle = isRTL ? { writingDirection: "rtl" } : {}
