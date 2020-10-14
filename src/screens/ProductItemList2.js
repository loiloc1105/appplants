import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions} from 'react-native'
import ProductItem from './ProductItem';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const ProductItemList2 = ({ itemTitle, itemPrice, itemUrl }) => {
    return (
        <View style = {styles.container}>
            <TouchableOpacity >
                <Image source={require('../assets/BG-plant1.jpg')}
                    style={styles.img} />
            </TouchableOpacity>
            <View style = {styles.wraptext}>
                <Text style={styles.title}>{itemTitle}</Text>
                <Text style={styles.price}>${itemPrice}</Text>
            </View>
        </View>
        
     
            
    )
}

export default ProductItemList2


const styles = StyleSheet.create({

    container: {
        margin: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowColor: '#000',
        elevation: 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        
        

    
    },

    img: {
        width:200,
        height: 200,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    wraptext: {
        flexDirection: 'row',
        height: 40,
        justifyContent: 'space-around',
        alignItems:'center'
        
        
        
    
    },
    title: {
        fontWeight: 'bold',
        paddingRight: 10,
        fontSize: 20,
        textTransform  :'uppercase'
    },
    price: {
        color: '#707070',
        fontSize: 20,
        fontWeight: 'bold',
        fontStyle  :'italic'
    }
   
})
