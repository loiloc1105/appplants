import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const news = () => {
    return (
        <View style={styles.container}>
            <Text>NEWS</Text>
        </View>
    )
}

export default news

const styles = StyleSheet.create({
    container:{
        flex : 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
