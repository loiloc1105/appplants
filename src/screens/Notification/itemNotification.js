import React from 'react'
import { StyleSheet, Text, View ,Dimensions,Image} from 'react-native'
const {width,height} = Dimensions.get('window')
const itemNotification = ({itemName,itemImgUrl,itemPrice,itemAmount}) => {
    return (
        <View style={styles.container}>
            <Image style={styles.itemImg} source={{uri : itemImgUrl}} />
            <View style={styles.itemName}>
                <Text style={{fontSize : 22}}>{itemName}</Text>
                <Text>Price : ${itemPrice}</Text>
            </View>
            <View style={styles.itemAmount}>
                <Text style={{fontSize : 20}}>X {itemAmount} </Text>
            </View>
        </View>
    )
}

export default itemNotification

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        width : width / 1.2,
        marginLeft : width * 0.03,
        marginTop : width * 0.03,
        marginBottom : width * 0.02,
    },
    itemImg:{
        width : width / 5,
        height : width / 5,
        borderRadius : width * 0.03,
        borderWidth : width * 0.001,
        borderColor : 'grey',
        marginLeft : width * 0.07

    },
    itemName: {
        justifyContent: 'center',
        marginLeft : width * 0.05,
        width: width / 3.5
    },
    itemAmount: {
        flexDirection: 'row',
        marginTop : width / 10,
        marginLeft : width * 0.1,
    }
})
