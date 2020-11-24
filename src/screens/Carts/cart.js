import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import CartItem from './itemCart';
import firebase from 'firebase';
import * as cartActions from '../../store/actions/cartAction';
import moment from 'moment';
const {width, height} = Dimensions.get('window');

var date = new Date();
const cart = () => {
  const database = firebase.database();

  const dispatch = useDispatch();
  const carts = useSelector(state => {
    let arr = [];
    for (const key in state.cart.items) {
      arr.push({
        productId: key,
        productPrice: state.cart.items[key].productPrice,
        productTitle: state.cart.items[key].productTitle,
        productImage: state.cart.items[key].productImage,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return arr;
  });
  const user = useSelector(state => state.user.user);
  const [disable, setDisabel] = useState(cart.length == 0);
  const totalAmount = useSelector(state => state.cart.totalAmount);
  const checkOut = () => {
    database.ref('order/' + moment(date).format('MMMM Do YYYY, hh:mm')).set({
      idUser: user.idUser,
      phone: user.phoneUser,
      items: carts,
      totalAmount: totalAmount,
      date: moment(date).format('MMMM Do YYYY, hh:mm'),
      type: 0,
      nameUser: user.nameUser,
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.bgTitle}>
        <Text style={styles.txtTitle}>YOUR CART</Text>
      </View>
      <View style={styles.itemCart}>
        <FlatList
          data={carts}
          keyExtractor={item => `${item.productId}`}
          renderItem={({item}) => (
            <CartItem
              id={item.productId}
              itemName={item.productTitle}
              itemPrice={item.productPrice}
              itemAmount={item.quantity}
              itemImgUrl={item.productImage}
            />
          )}
        />
      </View>
      <View style={styles.checkOut}>
        <View style={styles.txtCheckOut}>
          <Text style={{color: '#815656'}}>Total:</Text>
          <Text>${totalAmount}</Text>
        </View>
        <TouchableOpacity
          style={
            carts.length == 0 ? styles.checkOutBtnDisable : styles.checkOutBtn
          }
          disabled={carts.length == 0}
          onPress={() => {
            checkOut();
            dispatch(cartActions.checkOut());
          }}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>CHECK OUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgTitle: {
    height: width / 4.8,
    backgroundColor: '#028E62CC',
    alignItems: 'center',
    borderBottomLeftRadius: width * 0.03,
    borderBottomRightRadius: width * 0.03,
  },
  txtTitle: {
    color: 'white',
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginTop: width * 0.11,
  },
  itemCart: {
    flex: 1,
  },
  checkOut: {
    height: width / 4,
    borderWidth: width * 0.001,
    borderTopLeftRadius: width * 0.11,
    borderTopRightRadius: width * 0.11,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'gray',
  },
  txtCheckOut: {
    width: width * 0.3,
    height: width * 0.13,
    justifyContent: 'center',
    marginLeft: width / 10,
    marginTop: width / 20,
    // borderWidth : width * 0.001,
    fontWeight: 'bold',
  },
  checkOutBtn: {
    width: width * 0.4,
    height: width * 0.13,
    borderWidth: width * 0.001,
    borderRadius: width * 0.04,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FB00008C',
    marginTop: width / 16,
    marginRight: width / 14,
    borderColor: 'lightgrey',
  },
  checkOutBtnDisable: {
    width: width * 0.4,
    height: width * 0.13,
    borderWidth: width * 0.001,
    borderRadius: width * 0.04,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#707070',
    marginTop: width / 16,
    marginRight: width / 14,
    borderColor: 'lightgrey',
  },
});
