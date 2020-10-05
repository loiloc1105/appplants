import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const cart = () => {
    return (
        <View style={styles.container}>
            <Text>CART</Text>
        </View>
    )
}

export default cart

const styles = StyleSheet.create({
    container:{
        flex : 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
