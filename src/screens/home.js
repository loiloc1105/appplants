import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const home = () => {
    return (
        <View style={styles.container}>
            <Text>HOME</Text>
        </View>
    )
}

export default home

const styles = StyleSheet.create({
    container:{
        flex : 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
