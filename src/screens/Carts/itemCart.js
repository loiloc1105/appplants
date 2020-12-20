import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import * as cartActions from '../../store/actions/cartAction';

const {width, height} = Dimensions.get('window');
Icon.loadFont();

const itemCart = ({itemName, itemPrice, itemAmount, itemImgUrl, id}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (itemAmount >= 11){
      dispatch(cartActions.subQuantity(id));
    }
  })

  const checkAddition = idItemAdd => {
    if (itemAmount !== 0 && itemAmount <= 9) {
      dispatch(cartActions.addQuantity(idItemAdd));
    } else if (itemAmount <= 10) {
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
    }
  };

  const checkDelete = idItemDel => {
    if (itemAmount === 1) {
      Alert.alert(
        'Warning',
        'Do you want to delete this item',
        [
          {
            text: 'No',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => {
              dispatch(cartActions.subQuantity(idItemDel));
            },
          },
        ],
        {cancelable: false},
      );
    } else if (itemAmount < 11) {
      dispatch(cartActions.subQuantity(idItemDel));
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.itemImg} source={{uri: itemImgUrl}} />
      <View style={styles.itemName}>
        <Text style={{fontSize: 22}}>{itemName}</Text>
        <Text>Price : ${itemPrice}</Text>
      </View>
      <View style={styles.itemAmount}>
      <TouchableOpacity onPress={() => checkDelete(id)}>
          <Icon name="remove-circle-outline" size={25} />
        </TouchableOpacity>
        <Text style={styles.itemText}> {itemAmount} </Text>
        <TouchableOpacity onPress={() => checkAddition(id)}>
          <Icon name="add-circle-outline" size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default itemCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    width: width / 1.2,
    marginLeft: width * 0.03,
    marginTop: width * 0.03,
    marginBottom: width * 0.02,
  },
  itemImg: {
    width: width / 5,
    height: width / 5,
    borderRadius: width * 0.03,
    borderWidth: width * 0.001,
    borderColor: 'grey',
    marginLeft: width * 0.07,
  },
  itemName: {
    justifyContent: 'center',
    marginLeft: width * 0.07,
    width: width / 3.8,
  },
  itemAmount: {
    width: width * 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 20
  }
});
