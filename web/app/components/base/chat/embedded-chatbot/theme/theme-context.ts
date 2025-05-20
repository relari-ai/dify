import { createContext, useContext } from 'use-context-selector'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

export class Theme {
  public chatColorTheme: string | null
  public chatColorThemeInverted: boolean

  public primaryColor = '#74ABF5'
  public backgroundHeaderColorStyle = 'backgroundImage: linear-gradient(to right, #2563eb, #0ea5e9)'
  public headerBorderBottomStyle = ''
  public colorFontOnHeaderStyle = 'color: white'
  public colorPathOnHeader = 'text-text-primary-on-surface'
  public backgroundButtonDefaultColorStyle = 'backgroundColor: #1C64F2'
  // public roundedBackgroundColorStyle = 'backgroundColor: rgb(245 248 255)'
  public chatBubbleColorStyle = 'backgroundColor: #f4f4f4'
  // public chatBubbleColor = 'rgb(225 239 254)'
  public textAccentClass = 'text-text-accent'

  // New button styles
  public buttonAccentTextStyle = 'color: #1C64F2'
  public buttonPrimaryBgStyle = 'backgroundColor: #1C64F2'
  public buttonPrimaryTextStyle = 'color: white'
  public buttonPrimaryBorderStyle = 'borderColor: #1C64F2'

  constructor(chatColorTheme: string | null = null, chatColorThemeInverted = false) {
    this.chatColorTheme = chatColorTheme
    this.chatColorThemeInverted = chatColorThemeInverted
    this.configCustomColor()
    this.configInvertedColor()
  }

  private configCustomColor() {
    // Always set primary color with default fallback
    this.primaryColor = this.chatColorTheme ?? '#74ABF5'

    if (this.chatColorTheme !== null && this.chatColorTheme !== '') {
      this.backgroundHeaderColorStyle = `backgroundColor: ${this.primaryColor}`
      this.backgroundButtonDefaultColorStyle = `backgroundColor: ${this.primaryColor}; color: ${this.colorFontOnHeaderStyle};`
      // this.roundedBackgroundColorStyle = `backgroundColor: ${hexToRGBA(this.primaryColor, 0.05)}`
      // this.chatBubbleColorStyle = `backgroundColor: ${hexToRGBA(this.primaryColor, 0.15)}`
      // this.chatBubbleColor = `${hexToRGBA(this.primaryColor, 0.15)}`

      // Set button styles based on theme color
      this.buttonAccentTextStyle = `color: ${this.primaryColor}`
      this.buttonPrimaryBgStyle = this.chatColorThemeInverted
        ? `backgroundColor: white; borderColor: ${this.primaryColor}`
        : `backgroundColor: ${this.primaryColor}`
      this.buttonPrimaryTextStyle = this.chatColorThemeInverted
        ? `color: ${this.primaryColor}`
        : 'color: white'
      this.buttonPrimaryBorderStyle = `borderColor: ${this.primaryColor}`
    }

    // Initial theme values will be set in updateThemeBasedValues
    if (typeof window !== 'undefined') {
      const theme = document.documentElement.getAttribute('data-theme')
      const isDark = theme === 'dark'
      this.updateThemeBasedValues(isDark)
    }
  }

  private configInvertedColor() {
    if (this.chatColorThemeInverted) {
      this.backgroundHeaderColorStyle = 'backgroundColor: #ffffff'
      this.colorFontOnHeaderStyle = `color: ${this.primaryColor}`
      this.headerBorderBottomStyle = 'borderBottom: 1px solid #ccc'
      this.colorPathOnHeader = this.primaryColor
      this.textAccentClass = `color: ${this.primaryColor}`
    }
  }

  public updateThemeBasedValues(isDark: boolean) {
    // Set theme-based styles regardless of custom theme
    this.chatBubbleColorStyle = `backgroundColor: ${isDark ? '#2A2A2D' : '#f4f4f4'}`
    this.textAccentClass = `color: ${isDark ? '#f4f4f4' : this.primaryColor}`
  }
}

export class ThemeBuilder {
  private _theme?: Theme
  private buildChecker = false

  public get theme() {
    if (this._theme === undefined) {
      this._theme = new Theme()
      return this._theme
    }
    else {
      return this._theme
    }
  }

  public buildTheme(chatColorTheme: string | null = null, chatColorThemeInverted = false) {
    if (!this.buildChecker) {
      this._theme = new Theme(chatColorTheme, chatColorThemeInverted)
      this.buildChecker = true
    }
    else {
      if (this.theme?.chatColorTheme !== chatColorTheme || this.theme?.chatColorThemeInverted !== chatColorThemeInverted) {
        this._theme = new Theme(chatColorTheme, chatColorThemeInverted)
        this.buildChecker = true
      }
    }
  }
}

const ThemeContext = createContext<ThemeBuilder>(new ThemeBuilder())

export const useThemeContext = () => {
  const themeBuilder = useContext(ThemeContext)
  const { resolvedTheme } = useTheme()
  const [isDark, setIsDark] = useState(resolvedTheme === 'dark')

  useEffect(() => {
    setIsDark(resolvedTheme === 'dark')
    themeBuilder.theme?.updateThemeBasedValues(resolvedTheme === 'dark')
  }, [resolvedTheme, themeBuilder.theme])

  return themeBuilder
}
