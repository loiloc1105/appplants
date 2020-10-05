import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const notification = () => {
    return (
        <View style={styles.container}>
            <Text>Notification</Text>
        </View>
    )
}

export default notification

const styles = StyleSheet.create({
    container:{
        flex : 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
