import React from 'react'
import { StyleSheet, Text, View , Button} from 'react-native'

const itemRequireHome = ({navigation}) => {
    return (
        <View>
            <Text>item Require Home</Text>
            <Button title="Goback" onPress={() => navigation.goBack()} />
        </View>
    )
}

export default itemRequireHome

const styles = StyleSheet.create({})
