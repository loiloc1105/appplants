import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const profile = () => {
    return (
        <View style={styles.container}>
            <Text>Profile</Text>
        </View>
    )
}

export default profile

const styles = StyleSheet.create({
    container:{
        flex : 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
