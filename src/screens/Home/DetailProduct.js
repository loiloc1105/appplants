/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useSelector, useDispatch} from 'react-redux';
import * as cartActions from '../../store/actions/cartAction';
const {width, height} = Dimensions.get('window');

Icon.loadFont();

const DetailProduct = props => {
  const product = props.route.params.product;
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(0);
  const [modalDetails, setModalDetails] = useState(false);
  const carts = useSelector(state => state.cart.items);
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
            }}>
            <View style={styles.modalBody}>
              <View style={styles.inforDetailProducts}>
                <View style={styles.inforDetailItems}>
                  <Image
                    source={require('../../assets/sunny.png')}
                    style={styles.icons}
                  />
                  <Text style={styles.textIcon}>{product.sunLight}</Text>
                </View>
                <View style={styles.inforDetailItems}>
                  <Image
                    source={require('../../assets/temp.png')}
                    style={styles.icons}
                  />
                  <Text style={styles.textIcon}>{product.temp}*C</Text>
                </View>
                <View style={styles.inforDetailItems}>
                  <Image
                    source={require('../../assets/water.png')}
                    style={styles.icons}
                  />
                  <Text style={styles.textIcon}>{product.water} lần/tuần</Text>
                </View>
                <View style={styles.inforDetailItems}>
                  <Image
                    source={require('../../assets/flower.png')}
                    style={styles.icons}
                  />
                  <Text style={styles.textIcon}>{product.soil}mg</Text>
                </View>
                <TouchableOpacity
                  style={styles.btnModal}
                  onPress={() => {
                    setModalDetails(!modalDetails);
                  }}>
                  <Text style={styles.openBtn}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <TouchableOpacity
            style={styles.btnIcon}
            onPress={() => setModalDetails(true)}>
            <Image
              source={require('../../assets/sunny.png')}
              style={styles.icon}
            />
            <Image
              source={require('../../assets/temp.png')}
              style={styles.icon}
            />
            <Image
              source={require('../../assets/water.png')}
              style={styles.icon}
            />
            <Image
              source={require('../../assets/flower.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.imageView}>
          <Image source={{uri: product.image}} style={styles.img} />
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
            <TouchableOpacity onPress={sub}>
              <Icon name="divide-circle" size={25} color="black" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity onPress={add}>
              <Icon name="plus-circle" size={25} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.block3}>
        <TouchableOpacity
          style={styles.btnAddToCart}
          onPress={() => {
            if (quantity > 0 && quantity <= 10) {
              Alert.alert(
                'Success!!!',
                'Please check your cart to check again',
                [
                  {
                    text: 'OK',
                    onPress: () => console.log('OK Pressed'),
                    style: 'cancel',
                  },
                ],
              );
              dispatch(cartActions.addToCart(product, quantity));
              setQuantity(0);
            } else if (quantity >= 11) {
              Alert.alert(
                'Warning!!!',
                'Quantity can not over 10/times! Please check again',
                [
                  {
                    text: 'OK',
                    onPress: () => console.log('OK Pressed'),
                    style: 'cancel',
                  },
                ],
              );
            } else {
              Alert.alert('Warning!!!', 'Enter quantity please', [
                {
                  text: 'OK',
                  onPress: () => console.log('OK Pressed'),
                  style: 'cancel',
                },
              ]);
            }
          }}>
          <Text style={styles.addTocart}>Add To Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.back}
          onPress={() => props.navigation.goBack()}>
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
    height: Platform.OS === 'ios' ? height * 0.71 : height * 0.69,
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
    paddingLeft: width * 0.12,
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
    width: Platform.OS === 'ios' ? width * 0.6 : width * 0.6,
    height: Platform.OS === 'ios' ? height * 0.7 : height * 0.65,
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
    marginTop: Platform.OS === 'ios' ? 10 : 0,
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
    width : width * 0.25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    // borderWidth:1
  },
  quantityText: {
    fontSize: 25,
    // width: width * 0.1,
    // paddingLeft: 10,
    // // paddingRight: 10,
  },
  origin: {
    fontSize: 20,
    fontWeight: '500',
    fontStyle: 'italic',
    marginTop: 0,
  },
  block3: {
    flexDirection: 'row',
    marginTop: Platform.OS === 'ios' ? 20 : 0,
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
