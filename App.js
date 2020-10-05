import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Navigations from './src/navigation/index'

const App = () => {
  return (
      <Navigations />
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex : 1,
    justifyContent:'center',
    alignItems:'center'
  }
})
