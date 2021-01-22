import React from 'react'

const ThemeContext = React.createContext('dark')

export const ThemeConsumer = ThemeContext.Consumer
export const ThemeProvider = ThemeContext.Provider
export default ThemeContext;