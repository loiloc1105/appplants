import React ,{useState} from 'react'
import { StyleSheet, Text, View , Image , Dimensions , TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {useDispatch , useSelector} from 'react-redux'
import * as cartActions from '../store/actions/cartAction'

const { width , height } = Dimensions.get('window')
Icon.loadFont();

const itemCart = ({ itemName, itemPrice, itemAmount, itemImgUrl ,id }) => {
    const dispatch = useDispatch()
    
    return (
        <View style={styles.container}>
            <Image style={styles.itemImg} source={{uri : itemImgUrl}} />
            <View style={styles.itemName}>
                <Text style={{fontSize : 22}}>{itemName}</Text>
                <Text>Price : ${itemPrice}</Text>
            </View>
            <View style={styles.itemAmount}>
                <TouchableOpacity
                    onPress={() => dispatch(cartActions.addQuantity(id))} >
                    <Icon name="add-circle-outline" size={25}/>
                </TouchableOpacity>
                <Text style={{fontSize : 20}}> {itemAmount} </Text>
                <TouchableOpacity>
                    <Icon name="remove-circle-outline" size={25}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default itemCart

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        // justifyContent: 'space-between',
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
        marginLeft : width * 0.07,
        width: width / 3.8
    },
    itemAmount: {
        flexDirection: 'row',
        marginTop : width / 10,
        marginLeft : width * 0.1,
    }
})
