import React from 'react'
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import {useSelector , useDispatch} from 'react-redux'
import * as cartActions from '../store/actions/cartAction'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const DetailProduct = (props) => {
    const product = props.route.params.product;
    const dispatch = useDispatch()
    const [quantity, setQuantity] = React.useState(0)
    const carts = useSelector(state => state.cart.items)
    const add = () => {
        setQuantity(quantity +1)
    }
    const sub = () => {
        if (quantity == 0) {
            setQuantity(0)
        }
        else {
            setQuantity(quantity -1)
        }
    }
    return (
        <View style={styles.container}>
            <View style ={styles.block1}>
                <View style={styles.blockIcon}>
                    <TouchableOpacity style  ={styles.btnIcon}>
                        <Image source={require( '../assets/sunny.png')} style={styles.icon}/>
                    </TouchableOpacity>
                     <TouchableOpacity style  ={styles.btnIcon}>
                        <Image source={require( '../assets/temp.png')} style={styles.icon}/>
                    </TouchableOpacity>
                     
                     <TouchableOpacity style  ={styles.btnIcon}>
                        <Image source={require( '../assets/water.png')} style={styles.icon}/>
                    </TouchableOpacity>
                     
                    <TouchableOpacity style  ={styles.btnIcon}>
                        <Image source={require( '../assets/flower.png')} style={styles.icon}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.imageView}>
                    <Image source={{uri :product.image}} style={styles.img} />
                </View>
            </View>
            <View style={styles.block2}>
                <View style={styles.itemText}>
                    <Text style = {styles.title}>{product.nameProduct}</Text>
                    <Text style = {styles.price}>${product.price}</Text>
                </View>
                <View style={styles.itemText}>
                    <Text style ={styles.origin}>{product.origin}</Text>
                    <View style ={styles.quantity}>
                        <TouchableOpacity onPress ={add}>
                            <Icon name ="plus-circle" size ={25} color ='black'/>
                        </TouchableOpacity>
                        <Text style = {styles.quantityText}>{quantity}</Text>
                        <TouchableOpacity onPress ={sub}>
                            <Icon name ="divide-circle" size ={25} color ='black'/>
                        </TouchableOpacity>
                    </View>
                </View>
                
            </View>
            <View style={styles.block3}>
                <TouchableOpacity style={styles.btnAddToCart} onPress={() => {
                    if (quantity > 0) {
                        dispatch(cartActions.addToCart(product, quantity))
                        setQuantity(0)
                    }
                    else {
                        alert('hay chon so luong')
                    }
                   
                }}>
                    <Text style ={styles.addTocart}>Add To Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.back} onPress ={() => props.navigation.navigate('Tab')}>
                    <Text style = {styles.goBack}>Go Back</Text>
                </TouchableOpacity>
                
            </View>
        </View>
    )
}

export default DetailProduct

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor :'#fff'
    },
    block1: {
        flexDirection  :'row'
    },
    blockIcon: {
        width: windowWidth * 0.4,  
        justifyContent: 'center',
        alignItems: 'center',
        height : windowHeight*0.7

    },
    icon: {
        width: '80%',
        height: '80%',
        margin :5
    },
    
    img: {
        width: windowWidth * 0.6,
        height: windowHeight *0.7,
        borderTopLeftRadius: 70,
        borderBottomLeftRadius: 70
    },
    btnIcon: {
        width: 90,
        height: 90,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 3,
        margin :5
    },
    block2: {
        margin: 10,
        marginBottom: 20,
    },
    itemText: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems :'center'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color :'#4E4E4E'
    },
    price: {
        fontSize: 25,
        fontStyle: 'italic',
        color : '#707070'
    },
    quantity: {
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    quantityText: {
        fontSize: 25,
        paddingLeft: 10,
        paddingRight :10
        
    },
    origin: {
        fontSize: 20,
        fontWeight: '500',
        fontStyle: 'italic',
        marginTop :0
    },
    block3 : {
        flexDirection: 'row',
        marginTop: 10,
    
      
    },
    btnAddToCart: {
        width  :windowWidth *0.5,
        height: windowHeight *0.1,
        backgroundColor: '#028E62CC',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius :29
    },
    back: {
         alignItems: 'center',
        justifyContent: 'center',
        width  :windowWidth *0.5,
        height: windowHeight * 0.1,
    },
    addTocart: {
        fontSize: 23,
        color: '#FFFFFF',
        fontWeight : 'bold'
        
    },
    goBack: {
        fontSize: 25,
        fontWeight: 'bold',
        color : '#028E62CC'
    }


})
