import React from 'react'
import { StyleSheet, Text, View ,Dimensions, FlatList} from 'react-native'
import CartNews from './itemNews'
import {Data} from '../Data'
const{width,height} = Dimensions.get('window')

const news = (props) => {
    const renderItemNews = itemData =>{
        return(
            <CartNews
                itemName={itemData.item.nameProduct}
                itemImgUrl={itemData.item.imgURL}
                itemContent={itemData.item.content}
                onSelected={()=>
                    props.navigation.navigate('DetailNews',{
                        itemId: itemData.item.id,
                    })
                }/>
        )
    }
    return (
        <View style={styles.container}>
           <View style={styles.bgTitle}>
                <Text style={styles.fontTitle}>NEWS</Text>
           </View>
           <View style={styles.viewContent}>
                <FlatList
                    keyExtractor={(item) => `${item.id}`}
                    data={Data}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderItemNews}
                />
           </View>

        </View>
    )
}

export default news

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
        marginBottom: width * 0.2,
    }
})
