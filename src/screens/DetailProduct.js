/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    TouchableOpacity,
    Modal,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useSelector, useDispatch } from 'react-redux';
import * as cartActions from '../store/actions/cartAction';
const { width, height } = Dimensions.get('window');
const DetailProduct = (props) => {
    const product = props.route.params.product;
    const dispatch = useDispatch();
    const [quantity, setQuantity] = React.useState(0);
    const [modalDetails, setModalDetails] = useState(false);
    const carts = useSelector((state) => state.cart.items);
    const add = () => {
        setQuantity(quantity + 1);
    };
    const sub = () => {
        if (quantity === 0) {
            setQuantity(0);
        } else {
            setQuantity(quantity - 1);
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.block1}>
                <View style={styles.blockIcon}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalDetails}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                        }}
                    >
                        <View style={styles.modalBody}>
                            <View style={styles.inforDetailProducts}>
                                <View style={styles.inforDetailItems}>
                                    <Image
                                        source={require('../assets/sunny.png')}
                                        style={styles.icons}
                                    />
                                    <Text style={styles.textIcon}>{product.sunLight}</Text>
                                </View>
                                <View style={styles.inforDetailItems}>
                                    <Image
                                        source={require('../assets/temp.png')}
                                        style={styles.icons}
                                    />
                                    <Text style={styles.textIcon}>{product.temp}</Text>
                                </View>
                                <View style={styles.inforDetailItems}>
                                    <Image
                                        source={require('../assets/water.png')}
                                        style={styles.icons}
                                    />
                                    <Text style={styles.textIcon}>{product.water}</Text>
                                </View>
                                <View style={styles.inforDetailItems}>
                                    <Image
                                        source={require('../assets/flower.png')}
                                        style={styles.icons}
                                    />
                                    <Text style={styles.textIcon}>{product.soil}</Text>
                                </View>
                                <View style={styles.btnModal}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setModalDetails(!modalDetails);
                                        }}>
                                        <Text style={styles.openBtn}>Hide Modal</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                    </Modal>

                    <TouchableOpacity style={styles.btnIcon} onPress={() => setModalDetails(true)}>
                        <Image
                            source={require('../assets/sunny.png')}
                            style={styles.icon}
                        />
                        <Image
                            source={require('../assets/temp.png')}
                            style={styles.icon}
                        />
                        <Image
                            source={require('../assets/water.png')}
                            style={styles.icon}
                        />
                        <Image
                            source={require('../assets/flower.png')}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.imageView}>
                    <Image source={{ uri: product.image }} style={styles.img} />
                </View>
            </View>
            <View style={styles.block2}>
                <View style={styles.itemText}>
                    <Text style={styles.title}>{product.nameProduct}</Text>
                    <Text style={styles.price}>${product.price}</Text>
                </View>
                <View style={styles.itemText}>
                    <Text style={styles.origin}>{product.origin}</Text>
                    <View style={styles.quantity}>
                        <TouchableOpacity onPress={add}>
                            <Icon name="plus-circle" size={25} color="black" />
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{quantity}</Text>
                        <TouchableOpacity onPress={sub}>
                            <Icon name="divide-circle" size={25} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.block3}>
                <TouchableOpacity
                    style={styles.btnAddToCart}
                    onPress={() => {
                        if (quantity > 0) {
                            dispatch(cartActions.addToCart(product, quantity));
                            setQuantity(0);
                        } else {
                            alert('hay chon so luong');
                        }
                    }}>
                    <Text style={styles.addTocart}>Add To Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.back}
                    onPress={() => props.navigation.navigate('Tab')}>
                    <Text style={styles.goBack}>Go Back</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default DetailProduct;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    block1: {
        flexDirection: 'row',
    },
    blockIcon: {
        width: width * 0.4,
        justifyContent: 'center',
        alignItems: 'center',
        height: height * 0.7,
    },
    modalBody: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(181,181,181,0.35)',
    },
    inforDetailProducts: {
        width: width * 0.8,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 40,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    inforDetailItems: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        // borderWidth: 1,
    },
    icons: {
        width: 65,
        height: 65,
        margin: 5,
    },
    textIcon: {
        paddingLeft: width * 0.15,
        fontStyle: 'italic',
        color: 'gray',
        fontSize: 20,
    },
    btnModal: {
        backgroundColor: '#EE0000',
        borderRadius: 10,
        width: width * 0.25,
        height: width * 0.1,
        elevation: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: width * 0.35,
    },
    openBtn: {
        fontWeight: 'bold',
        color: 'white',
    },
    icon: {
        width: 90,
        height: 90,
        margin: 5,
    },
    img: {
        width: width * 0.6,
        height: height * 0.7,
        borderTopLeftRadius: 70,
        borderBottomLeftRadius: 70,
    },
    btnIcon: {
        width: 90,
        alignItems: 'center',
        justifyContent: 'center',
        // borderWidth : 1,
    },
    block2: {
        margin: 10,
        marginBottom: 20,
    },
    itemText: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#4E4E4E',
    },
    price: {
        fontSize: 25,
        fontStyle: 'italic',
        color: '#707070',
    },
    quantity: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityText: {
        fontSize: 25,
        paddingLeft: 10,
        paddingRight: 10,
    },
    origin: {
        fontSize: 20,
        fontWeight: '500',
        fontStyle: 'italic',
        marginTop: 0,
    },
    block3: {
        flexDirection: 'row',
        marginTop: 10,
    },
    btnAddToCart: {
        width: width * 0.5,
        height: height * 0.1,
        backgroundColor: '#028E62CC',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 29,
    },
    back: {
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.5,
        height: height * 0.1,
    },
    addTocart: {
        fontSize: 23,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    goBack: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#028E62CC',
    },
});
