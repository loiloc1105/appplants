import React from 'react'
import { StyleSheet, Text, View , FlatList , Dimensions , ScrollView , TouchableOpacity, Image} from 'react-native'
import CartItem from './itemCart'

const {width , height} = Dimensions.get('window')

const data = [ 
    { id: 1 , nameProduct: 'Daisy' , price : 100 , amount : 3 , imgURL :  'https://www.inogarden.vn/wp-content/uploads/6b3aa0580860ef3eb671.jpg'} , 
    { id: 2 , nameProduct: 'Rose' , price : 300 , amount : 1 , imgURL : 'https://cayxinh.allnet.vn/wp-content/uploads/2019/06/cay-kim-tien.jpg'} , 
    { id: 3 , nameProduct: 'Narcissus' , price : 200 , amount : 5 , imgURL : 'https://salt.tikicdn.com/ts/product/cb/98/24/a0527a78f25e81d1a8a33d698dec7203.jpg'} , 
    { id: 4 , nameProduct: 'Tulip' , price : 80 , amount : 4 , imgURL : 'https://vn-live-02.slatic.net/p/20815c01fb9ab8d8f5aa6519dc2b0eef.jpg'} , 
    { id: 5 , nameProduct: 'Carnation' , price : 100 , amount : 3 , imgURL :  'https://www.inogarden.vn/wp-content/uploads/6b3aa0580860ef3eb671.jpg'} , 
    { id: 6 , nameProduct: 'ROSE' , price : 300 , amount : 1 , imgURL : 'https://cayxinh.allnet.vn/wp-content/uploads/2019/06/cay-kim-tien.jpg'} , 
    { id: 7 , nameProduct: 'Narcissus' , price : 200 , amount : 5 , imgURL : 'https://salt.tikicdn.com/ts/product/cb/98/24/a0527a78f25e81d1a8a33d698dec7203.jpg'} , 
    { id: 8 , nameProduct: 'Tulip' , price : 80 , amount : 4 , imgURL : 'https://vn-live-02.slatic.net/p/20815c01fb9ab8d8f5aa6519dc2b0eef.jpg'} , 
]

const cart = () => {
    return (
        <View style={styles.container}>
            <View style={styles.bgTitle}>
                <Text style={styles.txtTitle}>YOUR CART</Text>
            </View>
            <ScrollView style={styles.itemCart}>
                <FlatList 
                    data={data}
                    keyExtractor={ (item) => `${item.id}`}
                    renderItem ={ ({item}) => <CartItem 
                                                itemName={item.nameProduct} 
                                                itemPrice={item.price} 
                                                itemAmount={item.amount} 
                                                itemImgUrl={item.imgURL}  />  }
                />
            </ScrollView>
            <View style={styles.checkOut}>
                <View style={styles.txtCheckOut}>
                    <Text style={{color: '#815656'}}>Total:</Text>
                    <Text>$ 1200.00</Text>
                </View>
                <TouchableOpacity style={styles.checkOutBtn}>
                    <Text style={{color: 'white' , fontWeight : 'bold'}}>CHECK OUT</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default cart

const styles = StyleSheet.create({
    container:{
        flex : 1,
    },
    bgTitle:{
        height : width / 4.8,
        backgroundColor : '#028E62CC',
        alignItems : 'center', 
    },
    txtTitle: {
        color : 'white',
        fontSize : width * 0.05,
        fontWeight : 'bold',
        marginTop : width * 0.11
    },
    itemCart:{
        height : width / 6
    },
    checkOut: {
        height : width / 4,
        borderWidth : width * 0.001,
        borderTopLeftRadius : width * 0.11,
        borderTopRightRadius : width * 0.11,
        flexDirection : 'row',
        justifyContent: 'space-between',
        borderColor : 'gray'
    },
    txtCheckOut:{
        width : width * 0.3,
        height : width * 0.13,
        justifyContent: 'center',
        marginLeft : width / 10,
        marginTop: width / 20,
        // borderWidth : width * 0.001,
        fontWeight:'bold'
    },
    checkOutBtn: {
        width : width * 0.4,
        height : width * 0.13,
        borderWidth : width * 0.001,
        borderRadius : width * 0.04,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FB00008C',
        marginTop: width / 16,
        marginRight : width / 14,
        borderColor : 'lightgrey',
    }
})
