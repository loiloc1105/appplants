import React from 'react'
import { StyleSheet, Text, View , Button } from 'react-native'

const itemHome = ({navigation}) => {
    return (
        <View>
            <Text>Item Home</Text>
            <Button title="itemReqHome" onPress={() => navigation.navigate('itemReqHome')} />
        </View>
    )
}

export default itemHome

const styles = StyleSheet.create({})
