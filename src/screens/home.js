import React from 'react'
import { StyleSheet, Text, View , Button } from 'react-native'

const home = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>HOME</Text>
            <Button title="itemHome" onPress={() => navigation.navigate('itemHome')} />
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
