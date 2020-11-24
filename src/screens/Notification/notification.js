import React from 'react'
import { StyleSheet, Text, View ,Dimensions, FlatList} from 'react-native'
import CartNotification from './itemNotification'
import {Data} from '../Data'
const{width,height} = Dimensions.get('window')
const notification = () => {
    const renderNotification = itemData =>{
        return(
            <CartNotification
                itemName   = {itemData.item.nameProduct}
                itemImgUrl = {itemData.item.imgURL}
                itemPrice  = {itemData.item.price}
                itemAmount = {itemData.item.amount}
            />
        )
    }
    return (
        <View style={styles.container}>
             <View style={styles.bgTitle}>
                <Text style={styles.fontTitle}>Notification</Text>
           </View>
                <View style={styles.viewContent}>
                    <FlatList
                    keyExtractor={(item) => `${item.id}`}
                    data={Data}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderNotification}
                    />
                    <Text style={styles.textST}>Status: Process to confirm</Text>
                </View>
                
        </View>
    )
}

export default notification

const styles = StyleSheet.create({
    container:{
        flex : 1,
        width:'100%',
        backgroundColor: 'white',
    },
    bgTitle:{
        width: width,
        height:height*0.1, 
        backgroundColor: '#028E62CC',
        alignItems: 'center',
        borderBottomLeftRadius: width * 0.02,
        borderBottomRightRadius: width * 0.02,
        justifyContent: 'center'
    },
    fontTitle:{
        fontSize: width * 0.05,
        fontWeight: 'bold',
        color: 'white',
    },
    viewContent:{
        width: width,
        marginBottom: width * 0.28,
    },
    textST:{
        fontSize:width * 0.05,
        color:'red',
        textAlign:'center',
        lineHeight: height * 0.05
    }
})
